/**
 * Uso: node scripts/deleteAuthUser.js <email|uid>
 * Requiere: firebase login + proyecto activo (sanidapp-b67d7)
 */
const { initializeApp, applicationDefault, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const target = process.argv[2];

if (!target) {
  console.error('Indicá un correo o UID: node scripts/deleteAuthUser.js pepe@ejemplo.com');
  process.exit(1);
}

if (getApps().length === 0) {
  initializeApp({
    credential: applicationDefault(),
    projectId: 'sanidapp-b67d7',
  });
}

async function resolveUid(value) {
  if (value.includes('@')) {
    const user = await getAuth().getUserByEmail(value.trim().toLowerCase());
    return user.uid;
  }

  return value.trim();
}

async function main() {
  const uid = await resolveUid(target);
  await getAuth().deleteUser(uid);
  console.log(`Usuario Auth eliminado: ${uid}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
