const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
const { parseFeedCupos, formatFeedCupos } = require('./feedCupos');
const {
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
      cleaned = cleaned;
    } else {
      cleaned = cleaned.replace(/\./g, '');
    }
  }

  const amount = Number(cleaned);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

function splitAmounts(gross) {
  // Canon sobre bruto cobrado al alumno: no se deducen comisiones del procesador.
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
 * Inscripción con cobro externo: el alumno declara que pagó al disertante.
 * Genera el roster y el canon 20% bruto pendiente de transferencia Mercado Pago a Sanidapp.
 * Sanidapp NO retiene ni bloquea el dinero del link externo.
 */
function createConfirmExternalFeedInscriptionHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const kind = String(request.data?.kind ?? '').trim();
    const itemId = String(request.data?.itemId ?? '').trim();
    const scopeType =
      String(request.data?.scopeType ?? 'global').trim() === 'sanatorio'
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
    if (item.paymentMode !== 'external') {
      throw new HttpsError(
        'failed-precondition',
        'Esta publicación no usa cobro externo. Usá el pago en app.',
      );
    }

    if (!String(item.paymentTermsAcceptedAt ?? '').trim()) {
      throw new HttpsError(
        'failed-precondition',
        'El organizador no aceptó los términos de cobro externo.',
      );
    }

    const paymentCurrency = normalizeCurrency(item.paymentCurrency || 'ARS');
    const unitPrice = isStripeCurrency(paymentCurrency)
      ? parsePriceMoney(item.precio)
      : parsePriceArs(item.precio);

    if (unitPrice == null) {
      throw new HttpsError('failed-precondition', 'El precio de inscripción no es válido.');
    }
    if (unitPrice <= 0) {
      throw new HttpsError(
        'failed-precondition',
        'Esta inscripción es gratuita; usá la inscripción sin cargo.',
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

    const { commissionAmount, payeeAmount } = splitAmounts(unitPrice);
    const email = String(request.auth.token?.email ?? request.data?.email ?? '').trim();
    const name = String(request.data?.name ?? '').trim();
    const surname = String(request.data?.surname ?? '').trim();
    const title = String(item.title ?? 'Inscripción').slice(0, 120);
    const inscriptionId = `ext_${scopeType}_${kind}_${itemId}_${uid}`;
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
          provider: 'external',
          paymentMode: 'external',
          status: 'approved',
          currency: paymentCurrency,
          amountGross: unitPrice,
          commissionPercent: COMMISSION_PERCENT,
          commissionAmount,
          payeeAmount,
          payeeNombre: item.payeeNombre ?? null,
          payeeApellido: item.payeeApellido ?? null,
          payeeCbuCvu: null,
          authorUid: String(item.authorUid ?? '').trim() || null,
          organizerSanatorioId: String(item.organizerSanatorioId ?? '').trim() || null,
          payerNombre: name || null,
          payerApellido: surname || null,
          payerEmail: email || null,
          /**
           * Canon pendiente: el disertante cobró el 100% afuera y debe
           * transferir el 20% bruto a Sanidapp (Mercado Pago) en el plazo acordado.
           */
          payoutStatus: 'pending_organizer_commission',
          payoutMethod: 'mercadopago_manual',
          payoutNote:
            'Canon 20% sobre bruto cobrado al alumno (sin descontar fees). Transferencia Mercado Pago a Sanidapp · 3 días hábiles posteriores a la fecha de inicio del evento. Comunicación: grproducciones2026@gmail.com',
          studentDeclaredPaid: true,
          cuposDecremented: true,
          cuposAfter: nextCupos ?? existingInsc.data()?.cuposAfter ?? null,
          externalReference: `sanidapp_feed_external:${kind}:${itemId}:${uid}`,
          eventStartDate: String(item.date ?? '').trim() || null,
          verifiedAt: FieldValue.serverTimestamp(),
          createdAt: existingInsc.data()?.createdAt || FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    });

    return {
      enrolled: true,
      freeEnrolled: false,
      unitPrice,
      currency: paymentCurrency,
      commissionPercent: COMMISSION_PERCENT,
      commissionAmount,
      payeeAmount,
      provider: 'external',
    };
  });
}

module.exports = {
  createConfirmExternalFeedInscriptionHandler,
  COMMISSION_PERCENT,
};
