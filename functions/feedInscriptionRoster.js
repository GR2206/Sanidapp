const { onCall, HttpsError } = require('firebase-functions/v2/https');

async function resolveCaller(getDb, request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
  }
  const uid = request.auth.uid;
  const db = getDb();
  const userSnap = await db.doc(`apps/sanidapp/usuarios/${uid}`).get();
  const role = userSnap.data()?.role;
  let isAdmin = role === 'admin';
  if (!isAdmin) {
    const adminsSnap = await db.doc('apps/sanidapp/config/admins').get();
    const uids = adminsSnap.data()?.uids;
    isAdmin = Array.isArray(uids) && uids.includes(uid);
  }
  return {
    uid,
    isAdmin,
    isSupervisor: role === 'supervisor',
  };
}

function mapInscription(id, data) {
  return {
    id,
    uid: data.uid ?? null,
    kind: data.kind ?? null,
    itemId: data.itemId ?? null,
    itemTitle: data.itemTitle ?? null,
    scopeType: data.scopeType ?? null,
    sanatorioId: data.sanatorioId ?? null,
    status: data.status ?? null,
    amountGross: Number(data.amountGross ?? 0),
    currency: data.currency ?? 'ARS',
    payerNombre: data.payerNombre ?? null,
    payerApellido: data.payerApellido ?? null,
    payerEmail: data.payerEmail ?? null,
    payeeNombre: data.payeeNombre ?? null,
    payeeApellido: data.payeeApellido ?? null,
    authorUid: data.authorUid ?? null,
    paymentId: data.paymentId ?? null,
    payoutStatus: data.payoutStatus ?? null,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt ?? null,
  };
}

/**
 * Listado de inscriptos con pago aprobado.
 * Admin: todos. Autor de la publicación: solo los suyos.
 */
function createListFeedInscriptionsHandler(getDb) {
  return onCall(async (request) => {
    const caller = await resolveCaller(getDb, request);
    if (!caller.isAdmin && !caller.isSupervisor) {
      throw new HttpsError(
        'permission-denied',
        'Solo administradores o publicadores pueden ver inscriptos.',
      );
    }

    const kindFilter = String(request.data?.kind ?? '').trim();
    const itemIdFilter = String(request.data?.itemId ?? '').trim();
    const db = getDb();
    const snap = await db.collection('apps/sanidapp/feedInscriptions').limit(400).get();

    const items = snap.docs
      .map((doc) => mapInscription(doc.id, doc.data() ?? {}))
      .filter((item) => item.status === 'approved')
      .filter((item) => {
        if (caller.isAdmin) return true;
        return item.authorUid === caller.uid;
      })
      .filter((item) => {
        if (kindFilter && item.kind !== kindFilter) return false;
        if (itemIdFilter && item.itemId !== itemIdFilter) return false;
        return true;
      })
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

    return { items };
  });
}

module.exports = {
  createListFeedInscriptionsHandler,
};
