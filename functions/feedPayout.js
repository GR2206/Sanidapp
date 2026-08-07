const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');

const COMMISSION_CONCEPT = 'Comisión Sanidapp';
const PAYEE_CONCEPT = 'Liquidación inscripción Sanidapp';

async function assertAdmin(getDb, request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
  }
  const uid = request.auth.uid;
  const db = getDb();
  const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
  const role = userSnap.data()?.role;
  if (role === 'admin') {
    return uid;
  }
  const adminsSnap = await db.doc('apps/sanidapp/config/admins').get();
  const uids = adminsSnap.data()?.uids;
  if (Array.isArray(uids) && uids.includes(uid)) {
    return uid;
  }
  throw new HttpsError('permission-denied', 'Solo administradores.');
}

function mapInscription(id, data) {
  return {
    id,
    uid: data.uid ?? null,
    kind: data.kind ?? null,
    itemId: data.itemId ?? null,
    itemTitle: data.itemTitle ?? null,
    amountGross: Number(data.amountGross ?? 0),
    commissionPercent: Number(data.commissionPercent ?? 20),
    commissionAmount: Number(data.commissionAmount ?? 0),
    payeeAmount: Number(data.payeeAmount ?? 0),
    currency: data.currency ?? 'ARS',
    payeeNombre: data.payeeNombre ?? null,
    payeeApellido: data.payeeApellido ?? null,
    payeeCbuCvu: data.payeeCbuCvu ?? null,
    payoutStatus: data.payoutStatus ?? 'pending',
    payoutMethod: data.payoutMethod ?? null,
    payoutSettledAt: data.payoutSettledAt ?? null,
    payoutTransferRef: data.payoutTransferRef ?? null,
    paymentId: data.paymentId ?? null,
    status: data.status ?? null,
    payeeConcept: PAYEE_CONCEPT,
    commissionConcept: COMMISSION_CONCEPT,
  };
}

/** Lista liquidaciones (pendientes por defecto). Solo admin. */
function createListFeedPayoutsHandler(getDb) {
  return onCall(async (request) => {
    await assertAdmin(getDb, request);
    const statusFilter = String(request.data?.payoutStatus ?? 'pending').trim() || 'pending';
    const db = getDb();
    const snap = await db.collection('apps/sanidapp/feedInscriptions').limit(200).get();

    const items = snap.docs
      .map((doc) => mapInscription(doc.id, doc.data() ?? {}))
      .filter((item) => {
        if (statusFilter === 'all') return true;
        return item.payoutStatus === statusFilter;
      })
      .sort((a, b) => String(b.paymentId || b.id).localeCompare(String(a.paymentId || a.id)));

    return { items };
  });
}

/**
 * Intenta payout automático vía API MP (si la cuenta lo tiene habilitado).
 * Si falla o no está habilitado, el admin puede liquidar manualmente.
 */
async function tryMercadoPagoBankPayout(mpFetch, inscription) {
  const amount = Number(inscription.payeeAmount);
  const cbu = String(inscription.payeeCbuCvu || '').replace(/\D/g, '');
  if (!amount || amount <= 0 || cbu.length !== 22) {
    throw new HttpsError('failed-precondition', 'Datos de liquidación incompletos.');
  }

  // Endpoint de payouts bank-transfer (requiere habilitación en la cuenta MP).
  const body = {
    transactions: [
      {
        external_reference: `sanidapp_payout_${inscription.id}`,
        amount,
        description: PAYEE_CONCEPT,
        bank_transfer: {
          bank_account: {
            account_id: cbu,
            account_type: 'cbu',
          },
          beneficiary: {
            first_name: String(inscription.payeeNombre || '').slice(0, 50),
            last_name: String(inscription.payeeApellido || '').slice(0, 50),
          },
        },
      },
    ],
  };

  try {
    const result = await mpFetch('/v1/online-payments/payouts/bank-transfer', {
      method: 'POST',
      body,
    });
    return {
      ok: true,
      transferRef: String(result?.id || result?.transactions?.[0]?.id || ''),
      raw: result,
    };
  } catch (primaryError) {
    // Fallback legacy / alternativo si la cuenta usa otro path.
    try {
      const alt = await mpFetch('/v1/payouts', {
        method: 'POST',
        body: {
          amount,
          description: PAYEE_CONCEPT,
          external_reference: `sanidapp_payout_${inscription.id}`,
          bank_account: { account_number: cbu },
          beneficiary: {
            first_name: inscription.payeeNombre,
            last_name: inscription.payeeApellido,
          },
        },
      });
      return {
        ok: true,
        transferRef: String(alt?.id || ''),
        raw: alt,
      };
    } catch {
      const message = String(primaryError?.message || 'Payout MP no disponible');
      return { ok: false, error: message.slice(0, 200) };
    }
  }
}

/**
 * Liquida el 80% al disertante.
 * method: 'manual' | 'mercadopago'
 */
function createSettleFeedPayoutHandler(getDb, mpFetch, MP_SECRET_OPTS) {
  return onCall(MP_SECRET_OPTS, async (request) => {
    const adminUid = await assertAdmin(getDb, request);
    const inscriptionId = String(request.data?.inscriptionId ?? '').trim();
    const method = String(request.data?.method ?? 'manual').trim() === 'mercadopago'
      ? 'mercadopago'
      : 'manual';
    const transferRefInput = String(request.data?.transferRef ?? '').trim();

    if (!inscriptionId) {
      throw new HttpsError('invalid-argument', 'Falta inscriptionId.');
    }

    const db = getDb();
    const ref = db.doc(`apps/sanidapp/feedInscriptions/${inscriptionId}`);
    const snap = await ref.get();
    if (!snap.exists) {
      throw new HttpsError('not-found', 'Inscripción no encontrada.');
    }

    const data = snap.data() ?? {};
    if (data.payoutStatus === 'paid') {
      return { ok: true, alreadyPaid: true, item: mapInscription(inscriptionId, data) };
    }
    if (data.status && data.status !== 'approved') {
      throw new HttpsError('failed-precondition', 'El pago del alumno aún no está aprobado.');
    }

    let transferRef = transferRefInput;
    let payoutError = null;

    if (method === 'mercadopago') {
      const attempt = await tryMercadoPagoBankPayout(mpFetch, {
        id: inscriptionId,
        ...data,
      });
      if (!attempt.ok) {
        throw new HttpsError(
          'failed-precondition',
          `No se pudo liquidar por Mercado Pago: ${attempt.error}. Usá liquidación manual (transferencia al CBU) y marcá como pagado.`,
        );
      }
      transferRef = attempt.transferRef || transferRef;
    }

    const payload = {
      payoutStatus: 'paid',
      payoutMethod: method,
      payoutSettledAt: FieldValue.serverTimestamp(),
      payoutSettledBy: adminUid,
      payoutTransferRef: transferRef || null,
      payoutNote:
        method === 'manual'
          ? `Liquidación manual al CBU. Concepto destinatario: ${PAYEE_CONCEPT}. Remanente Sanidapp (20%): ${COMMISSION_CONCEPT}.`
          : `Liquidación automática Mercado Pago. ${COMMISSION_CONCEPT} retenida en cuenta Sanidapp.`,
      payoutError: payoutError,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await ref.set(payload, { merge: true });
    const updated = await ref.get();
    return { ok: true, item: mapInscription(inscriptionId, updated.data() ?? {}) };
  });
}

module.exports = {
  createListFeedPayoutsHandler,
  createSettleFeedPayoutHandler,
  COMMISSION_CONCEPT,
  PAYEE_CONCEPT,
};
