const { onCall } = require('firebase-functions/v2/https');
const { onDocumentCreated, onDocumentDeleted } = require('firebase-functions/v2/firestore');
const { FieldValue } = require('firebase-admin/firestore');

const STATS_PATH = 'apps/sanidapp/config/publicStats';

async function countUsuarios(db) {
  // Preferir aggregation count si está disponible.
  try {
    const aggregate = await db.collection('apps/sanidapp/usuarios').count().get();
    return Number(aggregate.data().count ?? 0);
  } catch {
    const snap = await db.collection('apps/sanidapp/usuarios').select().get();
    return snap.size;
  }
}

async function writeRegisteredUsers(db, count) {
  await db.doc(STATS_PATH).set(
    {
      registeredUsers: Math.max(0, Math.floor(count)),
      updatedAt: FieldValue.serverTimestamp(),
      source: 'firestore_usuarios',
    },
    { merge: true },
  );
}

/** Incrementa al crear un perfil de usuario. */
function createIncrementUserStatsHandler(getDb) {
  return onDocumentCreated('apps/sanidapp/usuarios/{uid}', async () => {
    const db = getDb();
    const ref = db.doc(STATS_PATH);
    const snap = await ref.get();
    if (!snap.exists) {
      const total = await countUsuarios(db);
      await writeRegisteredUsers(db, total);
      return;
    }
    await ref.set(
      {
        registeredUsers: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
}

/** Decrementa al borrar un perfil (si ocurre). */
function createDecrementUserStatsHandler(getDb) {
  return onDocumentDeleted('apps/sanidapp/usuarios/{uid}', async () => {
    const db = getDb();
    const ref = db.doc(STATS_PATH);
    const snap = await ref.get();
    if (!snap.exists) return;
    const current = Number(snap.data()?.registeredUsers ?? 0);
    if (current <= 0) return;
    await ref.set(
      {
        registeredUsers: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
}

/**
 * Sincroniza el contador con el total real de perfiles.
 * Público (sin auth): solo para inicializar / corregir el número del login.
 */
function createSyncPublicAppStatsHandler(getDb) {
  return onCall(async () => {
    const db = getDb();
    const total = await countUsuarios(db);
    await writeRegisteredUsers(db, total);
    return { registeredUsers: total };
  });
}

module.exports = {
  createIncrementUserStatsHandler,
  createDecrementUserStatsHandler,
  createSyncPublicAppStatsHandler,
};
