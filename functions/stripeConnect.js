const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
const Stripe = require('stripe');

/**
 * Stripe keys via .env / runtime env (no Secret Manager binding required to deploy).
 * Cuando existan en Secret Manager, se pueden volver a declarar aquí.
 */
const STRIPE_SECRET_OPTS = {
  secrets: [],
};

const PUBLIC_BASE =
  process.env.STRIPE_PUBLIC_BASE_URL ||
  process.env.MERCADO_PAGO_PUBLIC_BASE_URL ||
  'https://sanidapp-b67d7.web.app';

const ALLOWED_CONNECT_COUNTRIES = new Set([
  'ES',
  'US',
  'PT',
  'IT',
  'FR',
  'DE',
  'GB',
  'IE',
  'NL',
  'BE',
  'MX',
  'CL',
  'CO',
  'PE',
  'UY',
  'BR',
]);

function getStripe() {
  const key = String(process.env.STRIPE_SECRET_KEY || '').trim();
  if (!key) {
    throw new HttpsError(
      'failed-precondition',
      'Stripe no está configurado. Falta STRIPE_SECRET_KEY.',
    );
  }
  return new Stripe(key);
}

function userDocRef(db, uid) {
  return db.doc(`apps/sanidapp/usuarios/${uid}`);
}

async function syncConnectStatusToUser(db, uid, account) {
  const payload = {
    stripeConnectAccountId: account.id,
    stripeConnectChargesEnabled: Boolean(account.charges_enabled),
    stripeConnectPayoutsEnabled: Boolean(account.payouts_enabled),
    stripeConnectDetailsSubmitted: Boolean(account.details_submitted),
    stripeConnectCountry: account.country || null,
    stripeConnectUpdatedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await userDocRef(db, uid).set(payload, { merge: true });
  return {
    accountId: account.id,
    chargesEnabled: Boolean(account.charges_enabled),
    payoutsEnabled: Boolean(account.payouts_enabled),
    detailsSubmitted: Boolean(account.details_submitted),
    country: account.country || null,
  };
}

/**
 * Crea (si falta) cuenta Express + Account Link de onboarding KYC.
 * El organizador completa datos bancarios en el hosted onboarding de Stripe.
 */
function createStripeConnectOnboardingHandler(getDb) {
  return onCall(STRIPE_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const email = String(request.auth.token?.email ?? request.data?.email ?? '').trim();
    const country = String(request.data?.country ?? '')
      .trim()
      .toUpperCase();

    if (!ALLOWED_CONNECT_COUNTRIES.has(country)) {
      throw new HttpsError(
        'invalid-argument',
        'País no soportado para cobro internacional. Elegí p. ej. ES, US, PT, MX…',
      );
    }

    const db = getDb();
    const userRef = userDocRef(db, uid);
    const userSnap = await userRef.get();
    const user = userSnap.data() ?? {};
    let accountId = String(user.stripeConnectAccountId ?? '').trim();

    const stripe = getStripe();

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country,
        email: email || undefined,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          product_description: 'Cursos y congresos de salud en Sanidapp',
          mcc: '8299',
        },
        metadata: {
          uid,
          sanatorioId: String(user.sanatorioId ?? ''),
          platform: 'sanidapp',
        },
      });
      accountId = account.id;
      await syncConnectStatusToUser(db, uid, account);
    } else {
      // País de cuenta ya creada no se puede cambiar; validamos existencia.
      const account = await stripe.accounts.retrieve(accountId);
      await syncConnectStatusToUser(db, uid, account);
      if (account.charges_enabled) {
        return {
          alreadyReady: true,
          onboardingUrl: null,
          ...{
            accountId: account.id,
            chargesEnabled: true,
            payoutsEnabled: Boolean(account.payouts_enabled),
            detailsSubmitted: Boolean(account.details_submitted),
            country: account.country || country,
          },
        };
      }
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${PUBLIC_BASE}/feed/inscription/pending`,
      return_url: `${PUBLIC_BASE}/feed/inscription/success`,
      type: 'account_onboarding',
    });

    return {
      alreadyReady: false,
      onboardingUrl: accountLink.url,
      accountId,
      chargesEnabled: false,
      payoutsEnabled: false,
      detailsSubmitted: false,
      country,
    };
  });
}

function createGetStripeConnectStatusHandler(getDb) {
  return onCall(STRIPE_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const db = getDb();
    const userSnap = await userDocRef(db, uid).get();
    const user = userSnap.data() ?? {};
    const accountId = String(user.stripeConnectAccountId ?? '').trim();

    if (!accountId) {
      return {
        accountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        country: null,
      };
    }

    const stripe = getStripe();
    const account = await stripe.accounts.retrieve(accountId);
    return syncConnectStatusToUser(db, uid, account);
  });
}

/**
 * Webhook Stripe: checkout completado + actualización de cuentas Connect.
 */
function createStripeWebhookHandler(getDb, { recordFeedInscriptionFromStripeSession }) {
  return onRequest(STRIPE_SECRET_OPTS, async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const stripe = getStripe();
    const webhookSecret = String(process.env.STRIPE_WEBHOOK_SECRET || '').trim();
    const signature = req.headers['stripe-signature'];

    let event;
    try {
      if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET missing');
      }
      event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (error) {
      console.error('Stripe webhook signature failed', error);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    const db = getDb();

    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await recordFeedInscriptionFromStripeSession(getDb, session);
      }

      if (event.type === 'account.updated') {
        const account = event.data.object;
        const uid = String(account.metadata?.uid ?? '').trim();
        if (uid) {
          await syncConnectStatusToUser(db, uid, account);
        } else {
          const snap = await db
            .collection('apps/sanidapp/usuarios')
            .where('stripeConnectAccountId', '==', account.id)
            .limit(1)
            .get();
          if (!snap.empty) {
            await syncConnectStatusToUser(db, snap.docs[0].id, account);
          }
        }
      }
    } catch (error) {
      console.error('Stripe webhook handler error', event.type, error);
      res.status(500).json({ ok: false });
      return;
    }

    res.json({ received: true });
  });
}

module.exports = {
  STRIPE_SECRET_OPTS,
  getStripe,
  PUBLIC_BASE,
  createStripeConnectOnboardingHandler,
  createGetStripeConnectStatusHandler,
  createStripeWebhookHandler,
  ALLOWED_CONNECT_COUNTRIES,
};
