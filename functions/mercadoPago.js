const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineString } = require('firebase-functions/params');
const { FieldValue } = require('firebase-admin/firestore');
const crypto = require('crypto');
const { recordFeedInscriptionFromPayment } = require('./feedInscriptionMp');

const MP_API = 'https://api.mercadopago.com';
const PREMIUM_PRICE_USD = Number(process.env.MERCADO_PAGO_PREMIUM_PRICE_USD ?? '12');
/** test = token de prueba; live = token real. */
const mercadoPagoMode = defineString('MERCADO_PAGO_MODE', { default: 'test' });
const MP_PUBLIC_BASE =
  process.env.MERCADO_PAGO_PUBLIC_BASE_URL || 'https://sanidapp-b67d7.web.app';

function getMercadoPagoMode() {
  return String(mercadoPagoMode.value() ?? 'test').toLowerCase();
}

function isLiveMercadoPagoMode(mode = getMercadoPagoMode()) {
  return mode === 'live' || mode === 'prod' || mode === 'production';
}

function getAccessToken() {
  const live = isLiveMercadoPagoMode();
  const token = live
    ? process.env.MERCADO_PAGO_ACCESS_TOKEN_LIVE
    : process.env.MERCADO_PAGO_ACCESS_TOKEN_TEST;

  return String(token || '').trim();
}

function pickCheckoutUrl(preference) {
  if (isLiveMercadoPagoMode()) {
    return preference?.init_point || preference?.sandbox_init_point || null;
  }
  return preference?.sandbox_init_point || preference?.init_point || null;
}

function buildPremiumPayload(existingRole) {
  const payload = {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'mercadopago',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (existingRole !== 'admin') {
    payload.role = 'user';
  }

  return payload;
}

async function mpFetch(path, { method = 'GET', body, optional = false } = {}) {
  const token = getAccessToken();
  if (!token) {
    throw new HttpsError(
      'failed-precondition',
      'Mercado Pago no está configurado. Falta el Access Token en Secret Manager.',
    );
  }

  const response = await fetch(`${MP_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (optional) {
      return null;
    }
    const message =
      data?.message ||
      data?.cause?.[0]?.description ||
      data?.error ||
      `Mercado Pago error HTTP ${response.status}`;
    const err = new HttpsError('internal', String(message).slice(0, 180));
    err.mpStatus = response.status;
    err.mpBody = data;
    throw err;
  }

  return data;
}

/** Cotización USD→ARS vía Mercado Libre (misma red que MP). */
async function fetchUsdToArsRate() {
  const response = await fetch(
    'https://api.mercadolibre.com/currency_conversions/search?from=USD&to=ARS',
  );
  const data = await response.json().catch(() => ({}));
  const ratio = Number(data?.ratio ?? data?.inv_rate ?? 0);
  if (!response.ok || !Number.isFinite(ratio) || ratio <= 0) {
    throw new HttpsError(
      'unavailable',
      'No se pudo obtener la cotización USD→ARS de Mercado Pago.',
    );
  }
  return ratio;
}

/**
 * Precio premium: US$ 12. Si la cuenta no acepta USD en la preferencia,
 * convierte al equivalente en ARS con la cotización del momento.
 */
async function resolvePremiumItemPricing() {
  const usd = Number.isFinite(PREMIUM_PRICE_USD) && PREMIUM_PRICE_USD > 0 ? PREMIUM_PRICE_USD : 12;
  return {
    preferred: {
      currency_id: 'USD',
      unit_price: usd,
      amountUsd: usd,
      amountArs: null,
      rate: null,
    },
    async toArsFallback() {
      const rate = await fetchUsdToArsRate();
      const amountArs = Math.round(usd * rate * 100) / 100;
      return {
        currency_id: 'ARS',
        unit_price: amountArs,
        amountUsd: usd,
        amountArs,
        rate,
      };
    },
  };
}

/**
 * Checkout Pro muestra sobre todo `title` (+ imagen si hay URL pública).
 * `description` es el detalle del ítem que el comprador debería ver al pagar.
 * Opcional: MERCADO_PAGO_ITEM_PICTURE_URL = HTTPS público del logo (p. ej. Firebase Storage).
 */
const PREMIUM_ITEM = {
  id: 'sanidapp_premium',
  title: 'Sanidapp Plan PREMIUM',
  description:
    'Acceso personal completo: pediatría, neonatología, farmacología, patologías, protocolos y cálculos clínicos. Sin skin de sanatorio (podés vincular un token institucional después).',
  category_id: 'services',
};

function buildPreferenceBody({
  pricing,
  email,
  name,
  surname,
  externalReference,
  uid,
  notificationUrl,
}) {
  const pictureUrl = String(process.env.MERCADO_PAGO_ITEM_PICTURE_URL || '').trim();
  return {
    items: [
      {
        ...PREMIUM_ITEM,
        ...(pictureUrl ? { picture_url: pictureUrl } : {}),
        quantity: 1,
        currency_id: pricing.currency_id,
        unit_price: pricing.unit_price,
      },
    ],
    payer: {
      email: email || undefined,
      name: name || undefined,
      surname: surname || undefined,
    },
    external_reference: externalReference,
    metadata: {
      uid,
      productId: 'sanidapp_premium',
      amountUsd: pricing.amountUsd,
      amountArs: pricing.amountArs,
      fxRate: pricing.rate,
    },
    notification_url: notificationUrl,
    back_urls: {
      success: `${MP_PUBLIC_BASE}/premium/success`,
      failure: `${MP_PUBLIC_BASE}/premium/failure`,
      pending: `${MP_PUBLIC_BASE}/premium/pending`,
    },
    auto_return: 'approved',
    statement_descriptor: 'SANIDAPP PREMIUM',
  };
}

const MP_SECRET_OPTS = {
  secrets: [
    'MERCADO_PAGO_ACCESS_TOKEN_TEST',
    'MERCADO_PAGO_ACCESS_TOKEN_LIVE',
    'MERCADO_PAGO_WEBHOOK_SECRET',
  ],
};

function headerValue(req, name) {
  const raw = req.get?.(name) ?? req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  if (Array.isArray(raw)) return String(raw[0] ?? '');
  return String(raw ?? '');
}

/**
 * Valida x-signature de webhooks MP (HMAC-SHA256).
 * Manifest: id:{data.id};request-id:{x-request-id};ts:{ts};
 */
function assertValidMercadoPagoWebhookSignature(req, dataId) {
  const secret = String(process.env.MERCADO_PAGO_WEBHOOK_SECRET || '').trim();
  const xSignature = headerValue(req, 'x-signature');
  const xRequestId = headerValue(req, 'x-request-id');

  if (!secret) {
    if (isLiveMercadoPagoMode()) {
      throw new Error('MERCADO_PAGO_WEBHOOK_SECRET requerido en modo live');
    }
    console.warn('MP webhook: secret ausente — se omite firma solo en modo test');
    return;
  }

  if (!xSignature || !xRequestId || !dataId) {
    throw new Error('MP webhook: faltan headers de firma');
  }

  const parts = Object.fromEntries(
    xSignature.split(',').map((part) => {
      const [key, ...rest] = part.trim().split('=');
      return [key, rest.join('=')];
    }),
  );
  const ts = parts.ts;
  const hash = parts.v1;
  if (!ts || !hash) {
    throw new Error('MP webhook: x-signature incompleta');
  }

  const dataIdNorm = String(dataId).toLowerCase();
  const manifest = `id:${dataIdNorm};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  const a = Buffer.from(hash, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new Error('MP webhook: firma inválida');
  }
}

function amountsMatch(paid, expected) {
  const a = Number(paid);
  const b = Number(expected);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= 0.51;
}

function createMercadoPagoCheckoutHandler(getDb) {
  return onCall(MP_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const email = String(request.auth.token?.email ?? request.data?.email ?? '').trim();
    const name = String(request.data?.name ?? '').trim();
    const surname = String(request.data?.surname ?? '').trim();

    const db = getDb();
    const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new HttpsError('not-found', 'Perfil de usuario no encontrado.');
    }

    const userData = userSnap.data() ?? {};
    const pricingHelper = await resolvePremiumItemPricing();
    let pricing = pricingHelper.preferred;

    const externalReference = `sanidapp_premium:${uid}:${Date.now()}`;
    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'sanidapp-b67d7';
    const notificationUrl =
      process.env.MERCADO_PAGO_NOTIFICATION_URL ||
      `https://us-central1-${projectId}.cloudfunctions.net/mercadoPagoWebhook`;

    const preferencePayload = {
      email: email || undefined,
      name: name || userData.nombre || undefined,
      surname: surname || userData.apellido || undefined,
      externalReference,
      uid,
      notificationUrl,
    };

    let preference;
    try {
      preference = await mpFetch('/checkout/preferences', {
        method: 'POST',
        body: buildPreferenceBody({ ...preferencePayload, pricing }),
      });
    } catch (cause) {
      const msg = String(cause?.message ?? '');
      const currencyIssue = /currency|moneda|USD|invalid/i.test(msg);
      if (!currencyIssue) {
        throw cause;
      }

      pricing = await pricingHelper.toArsFallback();
      preference = await mpFetch('/checkout/preferences', {
        method: 'POST',
        body: buildPreferenceBody({ ...preferencePayload, pricing }),
      });
    }

    const checkoutUrl = pickCheckoutUrl(preference);
    if (!checkoutUrl) {
      throw new HttpsError('internal', 'Mercado Pago no devolvió URL de checkout.');
    }

    await db.doc(`apps/sanidapp/mp_checkouts/${preference.id}`).set(
      {
        uid,
        preferenceId: preference.id,
        externalReference,
        currency: pricing.currency_id,
        unitPrice: pricing.unit_price,
        amountUsd: pricing.amountUsd,
        amountArs: pricing.amountArs,
        fxRate: pricing.rate,
        mode: getMercadoPagoMode(),
        status: 'created',
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      preferenceId: preference.id,
      checkoutUrl,
      unitPrice: pricing.unit_price,
      currency: pricing.currency_id,
      amountUsd: pricing.amountUsd,
      amountArs: pricing.amountArs,
    };
  });
}

async function grantPremiumFromPayment(getDb, payment) {
  const metadataUid = payment?.metadata?.uid;
  const external = String(payment?.external_reference ?? '');
  const uidFromRef = external.startsWith('sanidapp_premium:')
    ? external.split(':')[1]
    : '';
  const uid = String(metadataUid || uidFromRef || '').trim();

  if (!uid || !/^[A-Za-z0-9_-]{6,128}$/.test(uid)) {
    console.warn('MP payment without valid uid', payment?.id);
    return;
  }

  if (payment.status !== 'approved') {
    return;
  }

  const db = getDb();
  const preferenceId = String(payment.preference_id ?? '').trim();
  if (!preferenceId) {
    console.warn('MP premium payment missing preference_id', payment?.id);
    return;
  }

  const checkoutSnap = await db.doc(`apps/sanidapp/mp_checkouts/${preferenceId}`).get();
  if (!checkoutSnap.exists) {
    console.warn('MP premium payment without local checkout', payment?.id, preferenceId);
    return;
  }
  const checkout = checkoutSnap.data() ?? {};
  if (checkout.uid && checkout.uid !== uid) {
    console.warn('MP premium uid mismatch', payment?.id, checkout.uid, uid);
    return;
  }
  if (checkout.status === 'approved') {
    return;
  }
  if (!amountsMatch(payment.transaction_amount, checkout.unitPrice)) {
    console.warn(
      'MP premium amount mismatch',
      payment?.id,
      payment.transaction_amount,
      checkout.unitPrice,
    );
    return;
  }
  if (
    checkout.currency &&
    payment.currency_id &&
    String(checkout.currency) !== String(payment.currency_id)
  ) {
    console.warn(
      'MP premium currency mismatch',
      payment?.id,
      payment.currency_id,
      checkout.currency,
    );
    return;
  }

  const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
  const snap = await userRef.get();
  const existing = snap.data() ?? {};

  const payload = buildPremiumPayload(existing.role);
  if (existing.sanatorioId && existing.role !== 'admin') {
    delete payload.role;
  }

  await userRef.set(payload, { merge: true });

  await db.doc(`apps/sanidapp/purchases/${uid}`).set(
    {
      uid,
      productId: 'sanidapp_premium',
      platform: 'mercadopago',
      paymentId: String(payment.id ?? ''),
      status: payment.status,
      transactionAmount: payment.transaction_amount ?? null,
      currencyId: payment.currency_id ?? null,
      externalReference: external,
      preferenceId,
      verifiedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  await db.doc(`apps/sanidapp/mp_checkouts/${preferenceId}`).set(
    {
      status: 'approved',
      paymentId: String(payment.id ?? ''),
      paidAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

function createMercadoPagoWebhookHandler(getDb) {
  return onRequest(MP_SECRET_OPTS, async (req, res) => {
    try {
      if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
      }

      const type = req.query.type || req.body?.type || req.body?.topic;
      const dataId = req.query['data.id'] || req.body?.data?.id || req.body?.id;

      if (String(type) !== 'payment' || !dataId) {
        res.status(200).json({ ok: true, ignored: true });
        return;
      }

      try {
        assertValidMercadoPagoWebhookSignature(req, dataId);
      } catch (sigError) {
        console.warn('MP webhook rejected', sigError?.message ?? sigError);
        res.status(401).json({ ok: false, error: 'invalid_signature' });
        return;
      }

      const payment = await mpFetch(`/v1/payments/${dataId}`);
      const handledFeed = await recordFeedInscriptionFromPayment(getDb, payment);
      if (!handledFeed) {
        await grantPremiumFromPayment(getDb, payment);
      }
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('mercadoPagoWebhook error', error);
      res.status(500).json({ ok: false });
    }
  });
}

module.exports = {
  createMercadoPagoCheckoutHandler,
  createMercadoPagoWebhookHandler,
  mpFetch,
  MP_SECRET_OPTS,
};
