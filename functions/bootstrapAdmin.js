const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');

/**
 * Crea el doc config/admins la primera vez.
 * Solo UIDs listados en BOOTSTRAP_ADMIN_UIDS (env / secret) pueden ejecutarlo
 * y únicamente si el documento aún no existe.
 */
function createBootstrapFirstAdminHandler(getDb) {
  return onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Tenés que iniciar sesión.');
    }

    const uid = request.auth.uid;
    const allowed = String(process.env.BOOTSTRAP_ADMIN_UIDS || process.env.ADMIN_UIDS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (allowed.length === 0 || !allowed.includes(uid)) {
      throw new HttpsError('permission-denied', 'No autorizado para bootstrap de admin.');
    }

    const db = getDb();
    const adminsRef = db.doc('apps/sanidapp/config/admins');
    const adminsSnap = await adminsRef.get();
    if (adminsSnap.exists) {
      return { created: false, alreadyExists: true };
    }

    await adminsRef.set({
      uids: [uid],
      createdAt: FieldValue.serverTimestamp(),
      createdBy: uid,
    });

    await db.doc(`apps/sanidapp/usuarios/${uid}`).set(
      {
        role: 'admin',
        accessTier: 'premium',
        premiumSource: 'admin',
        premiumGrantedAt: new Date().toISOString(),
        canPublishFeeds: false,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return { created: true, alreadyExists: false };
  });
}

module.exports = { createBootstrapFirstAdminHandler };
