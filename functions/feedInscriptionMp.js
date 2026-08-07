const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
const { parseFeedCupos, formatFeedCupos } = require('./feedCupos');
const {
  createStripeFeedCheckout,
  isStripeCurrency,
  normalizeCurrency,
  parsePriceMoney,
} = require('./feedInscriptionStripe');

const COMMISSION_PERCENT = 20;

function parsePriceArs(precio) {
  const raw = String(precio ?? '').trim().toLowerCase();
  if (!raw) return null;
  if (raw.includes('gratis') || raw.includes('free') || raw === '0') {
    return 0;
  }

  let cleaned = raw.replace(/[^\d.,]/g, '');
  if (!cleaned) return null;

  if (cleaned.includes(',') && cleaned.includes('.')) {
    // Formato AR: 1.200,50
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = `${parts[0]}.${parts[1]}`;
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes('.')) {
    const parts = cleaned.split('.');
    const last = parts[parts.length - 1];
    if (parts.length === 2 && last.length <= 2 && parts[0].length <= 3) {
      // Decimal estilo 12.50
      cleaned = cleaned;
    } else {
      // Miles: 1.200 / 1.200.000
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

function itemDocRef(db, { scopeType, sanatorioId, kind, itemId }) {
  if (scopeType === 'sanatorio' && sanatorioId) {
    return db.doc(
      `apps/sanidapp/sanatorios/${sanatorioId}/feeds/${kind}/items/${itemId}`,
    );
  }
  return db.doc(`apps/sanidapp/feeds/${kind}/items/${itemId}`);
}

/**
 * Checkout de inscripción a curso/congreso con cobro en app (canon 20%).
 * Reutiliza tokens MP de premium (inyectados vía mpFetch del módulo padre).
 */
function createFeedInscriptionCheckoutHandler(getDb, mpFetch, MP_SECRET_OPTS) {
  return onCall(MP_SECRET_OPTS, async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const kind = String(request.data?.kind ?? '').trim();
    const itemId = String(request.data?.itemId ?? '').trim();
    const scopeType = String(request.data?.scopeType ?? 'global').trim() === 'sanatorio'
      ? 'sanatorio'
      : 'global';
    const sanatorioId = String(request.data?.sanatorioId ?? '').trim() || null;

    if (!['cursos', 'congresos'].includes(kind) || !itemId) {
      throw new HttpsError('invalid-argument', 'Curso o congreso inválido.');
    }
    if (scopeType === 'sanatorio' && !sanatorioId) {
      throw new HttpsError('invalid-argument', 'Falta sanatorioId.');
    }

    const db = getDb();
    const itemRef = itemDocRef(db, { scopeType, sanatorioId, kind, itemId });
    const itemSnap = await itemRef.get();
    if (!itemSnap.exists) {
      throw new HttpsError('not-found', 'Publicación no encontrada.');
    }

    const item = itemSnap.data() ?? {};
    const paymentCurrency = normalizeCurrency(item.paymentCurrency);
    const unitPrice = isStripeCurrency(paymentCurrency)
      ? parsePriceMoney(item.precio)
      : parsePriceArs(item.precio);
    const isGratis = unitPrice === 0;

    // Inscripción gratuita solo si el organizador puso precio "Gratis" / 0.
    // No hay exención automática por pertenecer al sanatorio.
    if (isGratis) {
      const cupos = parseFeedCupos(item.cupos);
      if (cupos && cupos.remaining <= 0) {
        throw new HttpsError('failed-precondition', 'No quedan cupos disponibles.');
      }

      const existingPaid = await db
        .collection('apps/sanidapp/feedInscriptions')
        .where('uid', '==', uid)
        .limit(100)
        .get();
      const alreadyEnrolled = existingPaid.docs.some((docSnap) => {
        const data = docSnap.data() ?? {};
        const sameScope =
          (data.scopeType || 'global') === scopeType &&
          String(data.sanatorioId || '') === String(sanatorioId || '');
        return (
          data.status === 'approved' &&
          data.kind === kind &&
          data.itemId === itemId &&
          sameScope
        );
      });
      if (alreadyEnrolled) {
        throw new HttpsError('already-exists', 'Ya estás inscripto en esta publicación.');
      }

      const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
      const userData = userSnap.data() ?? {};
      const email = String(request.auth.token?.email ?? request.data?.email ?? '').trim();
      const name = String(request.data?.name ?? userData.nombre ?? '').trim();
      const surname = String(request.data?.surname ?? userData.apellido ?? '').trim();
      const title = String(item.title ?? 'Inscripción').slice(0, 120);
      const inscriptionId = `free_${scopeType}_${kind}_${itemId}_${uid}`;
      const inscriptionRef = db.doc(`apps/sanidapp/feedInscriptions/${inscriptionId}`);

      await db.runTransaction(async (tx) => {
        const existingInsc = await tx.get(inscriptionRef);
        const alreadyRecorded =
          existingInsc.exists && existingInsc.data()?.status === 'approved';

        let nextCupos = null;
        if (!alreadyRecorded) {
          const liveItem = await tx.get(itemRef);
          if (liveItem.exists) {
            const parsed = parseFeedCupos(liveItem.data()?.cupos);
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
            sanatorioId: scopeType === 'sanatorio' ? sanatorioId : null,
            itemTitle: title,
            paymentId: inscriptionId,
            preferenceId: null,
            status: 'approved',
            currency: paymentCurrency,
            amountGross: 0,
            commissionPercent: 0,
            commissionAmount: 0,
            payeeAmount: 0,
            payeeNombre: item.payeeNombre ?? null,
            payeeApellido: item.payeeApellido ?? null,
            payeeCbuCvu: item.payeeCbuCvu ?? null,
            stripeConnectAccountId: item.stripeConnectAccountId ?? null,
            provider: isStripeCurrency(paymentCurrency) ? 'stripe' : 'mercadopago',
            authorUid: String(item.authorUid ?? '').trim() || null,
            organizerSanatorioId: String(item.organizerSanatorioId ?? '').trim() || null,
            payerNombre: name || null,
            payerApellido: surname || null,
            payerEmail: email || null,
            payoutStatus: 'not_applicable',
            payoutNote: 'Inscripción gratuita (precio Gratis · sin canon)',
            cuposDecremented: true,
            cuposAfter: nextCupos ?? existingInsc.data()?.cuposAfter ?? null,
            priceFree: true,
            externalReference: `sanidapp_feed_free:${kind}:${itemId}:${uid}`,
            verifiedAt: FieldValue.serverTimestamp(),
            createdAt: existingInsc.data()?.createdAt || FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      });

      return {
        freeEnrolled: true,
        preferenceId: null,
        checkoutUrl: null,
        unitPrice: 0,
        currency: paymentCurrency,
        commissionPercent: 0,
        commissionAmount: 0,
        payeeAmount: 0,
        provider: isStripeCurrency(paymentCurrency) ? 'stripe' : 'mercadopago',
      };
    }

    if (item.paymentMode !== 'in_app') {
      throw new HttpsError(
        'failed-precondition',
        'Esta publicación no admite cobro mediante la app. Usá el enlace externo de inscripción.',
      );
    }

    const cupos = parseFeedCupos(item.cupos);
    if (cupos && cupos.remaining <= 0) {
      throw new HttpsError('failed-precondition', 'No quedan cupos disponibles.');
    }

    const existingPaid = await db
      .collection('apps/sanidapp/feedInscriptions')
      .where('uid', '==', uid)
      .limit(100)
      .get();
    const alreadyEnrolled = existingPaid.docs.some((docSnap) => {
      const data = docSnap.data() ?? {};
      const sameScope =
        (data.scopeType || 'global') === scopeType &&
        String(data.sanatorioId || '') === String(sanatorioId || '');
      return (
        data.status === 'approved' &&
        data.kind === kind &&
        data.itemId === itemId &&
        sameScope
      );
    });
    if (alreadyEnrolled) {
      throw new HttpsError('already-exists', 'Ya estás inscripto en esta publicación.');
    }

    const email = String(request.auth.token?.email ?? request.data?.email ?? '').trim();
    const name = String(request.data?.name ?? '').trim();
    const surname = String(request.data?.surname ?? '').trim();

    // EUR / USD → Stripe Connect (split automático 20% / 80%).
    if (isStripeCurrency(paymentCurrency)) {
      return createStripeFeedCheckout(getDb, request, item, {
        uid,
        kind,
        itemId,
        scopeType,
        sanatorioId,
        email,
        name,
        surname,
      });
    }

    const payeeCbuCvu = String(item.payeeCbuCvu ?? '').replace(/\D/g, '');
    const payeeNombre = String(item.payeeNombre ?? '').trim();
    const payeeApellido = String(item.payeeApellido ?? '').trim();
    if (!payeeCbuCvu || payeeCbuCvu.length !== 22 || !payeeNombre || !payeeApellido) {
      throw new HttpsError(
        'failed-precondition',
        'El organizador aún no cargó una cuenta de cobro válida.',
      );
    }

    if (unitPrice == null) {
      throw new HttpsError(
        'failed-precondition',
        'El precio de inscripción no es válido. Debe ser un monto numérico en ARS o «Gratis».',
      );
    }
    if (unitPrice <= 0) {
      throw new HttpsError(
        'failed-precondition',
        'Esta inscripción es gratuita; no requiere pago.',
      );
    }

    const { commissionAmount, payeeAmount } = splitAmounts(unitPrice);
    const title = String(item.title ?? 'Inscripción').slice(0, 120);
    const externalReference = `sanidapp_feed:${kind}:${itemId}:${uid}:${Date.now()}`;
    const projectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'sanidapp-b67d7';
    const notificationUrl =
      process.env.MERCADO_PAGO_NOTIFICATION_URL ||
      `https://us-central1-${projectId}.cloudfunctions.net/mercadoPagoWebhook`;

    const preferenceBody = {
      items: [
        {
          id: `feed_${kind}_${itemId}`.slice(0, 60),
          title: `Inscripción · ${title}`.slice(0, 250),
          description: `Inscripción Sanidapp. Canon plataforma ${COMMISSION_PERCENT}%.`.slice(
            0,
            250,
          ),
          category_id: 'services',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: unitPrice,
        },
      ],
      payer: {
        email: email || undefined,
        name: name || undefined,
        surname: surname || undefined,
      },
      external_reference: externalReference,
      metadata: {
        productId: 'sanidapp_feed_inscription',
        uid,
        kind,
        itemId,
        scopeType,
        sanatorioId: sanatorioId || '',
        commissionPercent: COMMISSION_PERCENT,
        commissionAmount,
        payeeAmount,
        unitPrice,
      },
      notification_url: notificationUrl,
      back_urls: {
        success: `${process.env.MERCADO_PAGO_PUBLIC_BASE_URL || 'https://sanidapp-b67d7.web.app'}/feed/inscription/success`,
        failure: `${process.env.MERCADO_PAGO_PUBLIC_BASE_URL || 'https://sanidapp-b67d7.web.app'}/feed/inscription/failure`,
        pending: `${process.env.MERCADO_PAGO_PUBLIC_BASE_URL || 'https://sanidapp-b67d7.web.app'}/feed/inscription/pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'SANIDAPP CURSO',
    };

    const preference = await mpFetch('/checkout/preferences', {
      method: 'POST',
      body: preferenceBody,
    });

    const mpMode = String(process.env.MERCADO_PAGO_MODE || 'test').toLowerCase();
    const liveMp = mpMode === 'live' || mpMode === 'prod' || mpMode === 'production';
    const checkoutUrl = liveMp
      ? preference.init_point || preference.sandbox_init_point || null
      : preference.sandbox_init_point || preference.init_point || null;
    if (!checkoutUrl) {
      throw new HttpsError('internal', 'Mercado Pago no devolvió URL de checkout.');
    }

    await db.doc(`apps/sanidapp/mp_checkouts/${preference.id}`).set(
      {
        type: 'feed_inscription',
        uid,
        preferenceId: preference.id,
        externalReference,
        kind,
        itemId,
        scopeType,
        sanatorioId: sanatorioId || null,
        currency: 'ARS',
        unitPrice,
        commissionPercent: COMMISSION_PERCENT,
        commissionAmount,
        payeeAmount,
        payeeNombre,
        payeeApellido,
        payeeCbuCvu,
        authorUid: String(item.authorUid ?? '').trim() || null,
        payerNombre: name || null,
        payerApellido: surname || null,
        payerEmail: email || null,
        itemTitle: title,
        mode: process.env.MERCADO_PAGO_MODE || 'test',
        status: 'created',
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return {
      preferenceId: preference.id,
      checkoutUrl,
      unitPrice,
      currency: 'ARS',
      commissionPercent: COMMISSION_PERCENT,
      commissionAmount,
      payeeAmount,
    };
  });
}

async function recordFeedInscriptionFromPayment(getDb, payment) {
  const productId = payment?.metadata?.productId;
  const external = String(payment?.external_reference ?? '');
  const isFeed =
    productId === 'sanidapp_feed_inscription' || external.startsWith('sanidapp_feed:');

  if (!isFeed) {
    return false;
  }

  if (payment.status !== 'approved') {
    return true;
  }

  const db = getDb();
  const preferenceId = String(payment.preference_id ?? '');
  let checkout = null;
  if (preferenceId) {
    const snap = await db.doc(`apps/sanidapp/mp_checkouts/${preferenceId}`).get();
    checkout = snap.exists ? snap.data() : null;
  }

  const uid = String(
    payment?.metadata?.uid || checkout?.uid || external.split(':')[3] || '',
  ).trim();
  const kind = String(payment?.metadata?.kind || checkout?.kind || '').trim();
  const itemId = String(payment?.metadata?.itemId || checkout?.itemId || '').trim();
  const scopeType =
    String(payment?.metadata?.scopeType || checkout?.scopeType || 'global') === 'sanatorio'
      ? 'sanatorio'
      : 'global';
  const sanatorioId = String(
    payment?.metadata?.sanatorioId || checkout?.sanatorioId || '',
  ).trim() || null;

  const gross = Number(payment.transaction_amount ?? checkout?.unitPrice ?? 0);
  const { commissionAmount, payeeAmount } = splitAmounts(gross);

  const inscriptionId = String(payment.id || `${preferenceId}_${uid}`);

  let payerNombre = checkout?.payerNombre ?? null;
  let payerApellido = checkout?.payerApellido ?? null;
  let payerEmail = checkout?.payerEmail ?? null;
  let authorUid = checkout?.authorUid ?? null;

  if (uid && (!payerNombre || !payerEmail || !authorUid)) {
    try {
      const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
      const user = userSnap.data() ?? {};
      payerNombre = payerNombre || user.nombre || null;
      payerApellido = payerApellido || user.apellido || null;
      payerEmail = payerEmail || user.email || null;
    } catch {
      // ignore profile lookup failures
    }
  }

  if (!authorUid && kind && itemId) {
    try {
      const itemRef = itemDocRef(db, {
        scopeType,
        sanatorioId,
        kind,
        itemId,
      });
      const itemSnap = await itemRef.get();
      authorUid = itemSnap.data()?.authorUid ?? null;
    } catch {
      // ignore
    }
  }

  const inscriptionRef = db.doc(`apps/sanidapp/feedInscriptions/${inscriptionId}`);
  const itemRef =
    kind && itemId
      ? itemDocRef(db, { scopeType, sanatorioId, kind, itemId })
      : null;

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
          tx.set(itemRef, { cupos: nextCupos, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
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
        itemTitle: checkout?.itemTitle ?? payment?.description ?? null,
        paymentId: String(payment.id ?? ''),
        preferenceId: preferenceId || null,
        status: payment.status,
        currency: payment.currency_id ?? 'ARS',
        amountGross: gross,
        commissionPercent: COMMISSION_PERCENT,
        commissionAmount: Number(payment?.metadata?.commissionAmount ?? commissionAmount),
        payeeAmount: Number(payment?.metadata?.payeeAmount ?? payeeAmount),
        payeeNombre: checkout?.payeeNombre ?? null,
        payeeApellido: checkout?.payeeApellido ?? null,
        payeeCbuCvu: checkout?.payeeCbuCvu ?? null,
        authorUid: authorUid || null,
        payerNombre: payerNombre || null,
        payerApellido: payerApellido || null,
        payerEmail: payerEmail || null,
        payoutStatus: existingInsc.data()?.payoutStatus || 'pending',
        payoutNote: existingInsc.data()?.payoutNote || 'Liquidación al CBU/CVU pendiente',
        cuposDecremented: true,
        cuposAfter: nextCupos ?? existingInsc.data()?.cuposAfter ?? null,
        externalReference: external,
        verifiedAt: FieldValue.serverTimestamp(),
        createdAt: existingInsc.data()?.createdAt || FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  if (preferenceId) {
    await db.doc(`apps/sanidapp/mp_checkouts/${preferenceId}`).set(
      {
        status: 'approved',
        paymentId: String(payment.id ?? ''),
        paidAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }

  return true;
}

module.exports = {
  createFeedInscriptionCheckoutHandler,
  recordFeedInscriptionFromPayment,
  parsePriceArs,
  COMMISSION_PERCENT,
};
