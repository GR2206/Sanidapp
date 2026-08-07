const { HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
const { parseFeedCupos, formatFeedCupos } = require('./feedCupos');
const { getStripe, PUBLIC_BASE } = require('./stripeConnect');

const COMMISSION_PERCENT = 20;
const STRIPE_CURRENCIES = new Set(['eur', 'usd']);

function parsePriceMoney(precio) {
  const raw = String(precio ?? '').trim().toLowerCase();
  if (!raw) return null;
  if (raw.includes('gratis') || raw.includes('free') || raw === '0') {
    return 0;
  }

  let cleaned = raw.replace(/[^\d.,]/g, '');
  if (!cleaned) return null;

  if (cleaned.includes(',') && cleaned.includes('.')) {
    // 1.200,50 (EU) o 1,200.50 (US) — heurística por posición
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    if (lastComma > lastDot) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = `${parts[0].replace(/\./g, '')}.${parts[1]}`;
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes('.')) {
    const parts = cleaned.split('.');
    const last = parts[parts.length - 1];
    if (parts.length === 2 && last.length <= 2) {
      // decimal 20.50
      cleaned = cleaned;
    } else if (parts.length > 2 || (parts.length === 2 && last.length === 3)) {
      // miles estilo 1.200
      cleaned = cleaned.replace(/\./g, '');
    }
  }

  const amount = Number(cleaned);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

function splitAmounts(gross) {
  const commissionAmount = Math.round(((gross * COMMISSION_PERCENT) / 100) * 100) / 100;
  const payeeAmount = Math.round((gross - commissionAmount) * 100) / 100;
  return { commissionAmount, payeeAmount };
}

function toMinorUnits(amount) {
  return Math.round(Number(amount) * 100);
}

function itemDocRef(db, { scopeType, sanatorioId, kind, itemId }) {
  if (scopeType === 'sanatorio' && sanatorioId) {
    return db.doc(
      `apps/sanidapp/sanatorios/${sanatorioId}/feeds/${kind}/items/${itemId}`,
    );
  }
  return db.doc(`apps/sanidapp/feeds/${kind}/items/${itemId}`);
}

function normalizeCurrency(value) {
  const c = String(value ?? 'ARS').trim().toUpperCase();
  if (c === 'EUR' || c === 'USD' || c === 'ARS') return c;
  return 'ARS';
}

function isStripeCurrency(currency) {
  return STRIPE_CURRENCIES.has(String(currency).toLowerCase());
}

/**
 * Checkout Session Stripe Connect (destination charge + application fee 20%).
 * El organizador debe tener cuenta Express con charges_enabled.
 */
async function createStripeFeedCheckout(getDb, request, item, ctx) {
  const {
    uid,
    kind,
    itemId,
    scopeType,
    sanatorioId,
    email,
    name,
    surname,
  } = ctx;

  const currency = normalizeCurrency(item.paymentCurrency);
  if (!isStripeCurrency(currency)) {
    throw new HttpsError(
      'failed-precondition',
      'Esta publicación no usa moneda Stripe (EUR/USD).',
    );
  }

  const unitPrice = parsePriceMoney(item.precio);
  if (unitPrice == null || unitPrice <= 0) {
    throw new HttpsError(
      'failed-precondition',
      'El precio de inscripción no es válido para cobro internacional.',
    );
  }

  const accountId = String(item.stripeConnectAccountId ?? '').trim();
  if (!accountId) {
    throw new HttpsError(
      'failed-precondition',
      'El organizador aún no conectó su cuenta Stripe.',
    );
  }

  const stripe = getStripe();
  const account = await stripe.accounts.retrieve(accountId);
  if (!account.charges_enabled) {
    throw new HttpsError(
      'failed-precondition',
      'La cuenta Stripe del organizador aún no está habilitada para cobrar.',
    );
  }

  const { commissionAmount, payeeAmount } = splitAmounts(unitPrice);
  const amountMinor = toMinorUnits(unitPrice);
  const feeMinor = toMinorUnits(commissionAmount);
  if (feeMinor <= 0 || feeMinor >= amountMinor) {
    throw new HttpsError('failed-precondition', 'Monto o comisión inválidos.');
  }

  const title = String(item.title ?? 'Inscripción').slice(0, 120);
  const externalReference = `sanidapp_feed_stripe:${kind}:${itemId}:${uid}:${Date.now()}`;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email || undefined,
    client_reference_id: uid,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: amountMinor,
          product_data: {
            name: `Inscripción · ${title}`.slice(0, 120),
            description: `Canon Sanidapp ${COMMISSION_PERCENT}%`.slice(0, 200),
          },
        },
      },
    ],
    payment_intent_data: {
      application_fee_amount: feeMinor,
      transfer_data: {
        destination: accountId,
      },
      metadata: {
        productId: 'sanidapp_feed_inscription',
        provider: 'stripe',
        uid,
        kind,
        itemId,
        scopeType,
        sanatorioId: sanatorioId || '',
        commissionPercent: String(COMMISSION_PERCENT),
        commissionAmount: String(commissionAmount),
        payeeAmount: String(payeeAmount),
        unitPrice: String(unitPrice),
        currency,
      },
    },
    success_url: `${PUBLIC_BASE}/feed/inscription/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${PUBLIC_BASE}/feed/inscription/failure`,
    metadata: {
      productId: 'sanidapp_feed_inscription',
      provider: 'stripe',
      uid,
      kind,
      itemId,
      scopeType,
      sanatorioId: sanatorioId || '',
      commissionPercent: String(COMMISSION_PERCENT),
      commissionAmount: String(commissionAmount),
      payeeAmount: String(payeeAmount),
      unitPrice: String(unitPrice),
      currency,
      externalReference,
      payeeNombre: String(item.payeeNombre ?? '').trim(),
      payeeApellido: String(item.payeeApellido ?? '').trim(),
      stripeConnectAccountId: accountId,
      authorUid: String(item.authorUid ?? '').trim(),
      payerNombre: name || '',
      payerApellido: surname || '',
      payerEmail: email || '',
      itemTitle: title,
    },
  });

  if (!session.url) {
    throw new HttpsError('internal', 'Stripe no devolvió URL de checkout.');
  }

  const db = getDb();
  await db.doc(`apps/sanidapp/stripe_checkouts/${session.id}`).set(
    {
      type: 'feed_inscription',
      provider: 'stripe',
      uid,
      sessionId: session.id,
      externalReference,
      kind,
      itemId,
      scopeType,
      sanatorioId: sanatorioId || null,
      currency,
      unitPrice,
      commissionPercent: COMMISSION_PERCENT,
      commissionAmount,
      payeeAmount,
      payeeNombre: String(item.payeeNombre ?? '').trim() || null,
      payeeApellido: String(item.payeeApellido ?? '').trim() || null,
      stripeConnectAccountId: accountId,
      authorUid: String(item.authorUid ?? '').trim() || null,
      payerNombre: name || null,
      payerApellido: surname || null,
      payerEmail: email || null,
      itemTitle: title,
      status: 'created',
      createdAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return {
    preferenceId: session.id,
    sessionId: session.id,
    checkoutUrl: session.url,
    unitPrice,
    currency,
    commissionPercent: COMMISSION_PERCENT,
    commissionAmount,
    payeeAmount,
    provider: 'stripe',
  };
}

async function recordFeedInscriptionFromStripeSession(getDb, session) {
  const meta = session?.metadata || {};
  const productId = meta.productId;
  const isFeed =
    productId === 'sanidapp_feed_inscription' ||
    String(meta.externalReference || '').startsWith('sanidapp_feed_stripe:');

  if (!isFeed) {
    return false;
  }

  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return true;
  }

  const db = getDb();
  const sessionId = String(session.id || '');
  let checkout = null;
  if (sessionId) {
    const snap = await db.doc(`apps/sanidapp/stripe_checkouts/${sessionId}`).get();
    checkout = snap.exists ? snap.data() : null;
  }

  const uid = String(meta.uid || checkout?.uid || session.client_reference_id || '').trim();
  const kind = String(meta.kind || checkout?.kind || '').trim();
  const itemId = String(meta.itemId || checkout?.itemId || '').trim();
  const scopeType =
    String(meta.scopeType || checkout?.scopeType || 'global') === 'sanatorio'
      ? 'sanatorio'
      : 'global';
  const sanatorioId =
    String(meta.sanatorioId || checkout?.sanatorioId || '').trim() || null;

  const currency = normalizeCurrency(meta.currency || checkout?.currency || 'EUR');
  const gross = Number(meta.unitPrice ?? checkout?.unitPrice ?? (session.amount_total || 0) / 100);
  const { commissionAmount, payeeAmount } = splitAmounts(gross);

  const paymentId = String(session.payment_intent || sessionId);
  const inscriptionId = `stripe_${paymentId}`;

  let payerNombre = checkout?.payerNombre || meta.payerNombre || null;
  let payerApellido = checkout?.payerApellido || meta.payerApellido || null;
  let payerEmail = checkout?.payerEmail || meta.payerEmail || session.customer_email || null;
  let authorUid = checkout?.authorUid || meta.authorUid || null;

  if (uid && (!payerNombre || !payerEmail || !authorUid)) {
    try {
      const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
      const user = userSnap.data() ?? {};
      payerNombre = payerNombre || user.nombre || null;
      payerApellido = payerApellido || user.apellido || null;
      payerEmail = payerEmail || user.email || null;
    } catch {
      // ignore
    }
  }

  const inscriptionRef = db.doc(`apps/sanidapp/feedInscriptions/${inscriptionId}`);
  const itemRef =
    kind && itemId ? itemDocRef(db, { scopeType, sanatorioId, kind, itemId }) : null;

  await db.runTransaction(async (tx) => {
    const existingInsc = await tx.get(inscriptionRef);
    const alreadyRecorded =
      existingInsc.exists &&
      existingInsc.data()?.status === 'approved' &&
      existingInsc.data()?.cuposDecremented === true;

    let nextCupos = null;
    if (!alreadyRecorded && itemRef) {
      const itemSnap = await tx.get(itemRef);
      if (itemSnap.exists) {
        const parsed = parseFeedCupos(itemSnap.data()?.cupos);
        if (parsed) {
          const remaining = Math.max(0, parsed.remaining - 1);
          nextCupos = formatFeedCupos(remaining, parsed.total);
          tx.set(
            itemRef,
            { cupos: nextCupos, updatedAt: FieldValue.serverTimestamp() },
            { merge: true },
          );
        }
      }
    }

    tx.set(
      inscriptionRef,
      {
        uid,
        kind,
        itemId,
        scopeType,
        sanatorioId,
        itemTitle: checkout?.itemTitle || meta.itemTitle || null,
        paymentId,
        preferenceId: sessionId || null,
        sessionId: sessionId || null,
        provider: 'stripe',
        status: 'approved',
        currency,
        amountGross: gross,
        commissionPercent: COMMISSION_PERCENT,
        commissionAmount: Number(meta.commissionAmount ?? commissionAmount),
        payeeAmount: Number(meta.payeeAmount ?? payeeAmount),
        payeeNombre: checkout?.payeeNombre || meta.payeeNombre || null,
        payeeApellido: checkout?.payeeApellido || meta.payeeApellido || null,
        payeeCbuCvu: null,
        stripeConnectAccountId:
          checkout?.stripeConnectAccountId || meta.stripeConnectAccountId || null,
        authorUid: authorUid || null,
        payerNombre: payerNombre || null,
        payerApellido: payerApellido || null,
        payerEmail: payerEmail || null,
        // Connect ya transfirió el 80% al organizador automáticamente.
        payoutStatus: 'paid',
        payoutMethod: 'stripe_connect',
        payoutNote: 'Liquidación automática Stripe Connect (80% destino · 20% canon)',
        cuposDecremented: true,
        cuposAfter: nextCupos ?? existingInsc.data()?.cuposAfter ?? null,
        externalReference: meta.externalReference || checkout?.externalReference || null,
        verifiedAt: FieldValue.serverTimestamp(),
        createdAt: existingInsc.data()?.createdAt || FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  if (sessionId) {
    await db.doc(`apps/sanidapp/stripe_checkouts/${sessionId}`).set(
      {
        status: 'approved',
        paymentId,
        paidAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }

  return true;
}

module.exports = {
  createStripeFeedCheckout,
  recordFeedInscriptionFromStripeSession,
  parsePriceMoney,
  normalizeCurrency,
  isStripeCurrency,
  COMMISSION_PERCENT,
};
