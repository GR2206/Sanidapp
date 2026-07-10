/**
 * Uso: node functions/scripts/grantAllowlistPremium.js <email|uid>
 * Requiere: firebase login + GOOGLE_APPLICATION_CREDENTIALS o gcloud auth application-default login
 */
const { initializeApp, applicationDefault, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { findStaffMatch, loadStaffAllowlist } = require('../staffAllowlist');
const bundledStaffConfig = require('../staff-allowlist-config.json');

const target = process.argv[2];

if (!target) {
  console.error('Indicá un correo o UID: node functions/scripts/grantAllowlistPremium.js pepe@ejemplo.com');
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
  const db = getFirestore();
  const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new Error(`No existe perfil Firestore para ${uid}`);
  }

  const userData = userSnap.data() ?? {};
  const sanatorioId = String(userData.sanatorioId ?? '').trim();
  const nombre = String(userData.nombre ?? '').trim();
  const apellido = String(userData.apellido ?? '').trim();

  console.log('Perfil actual:', {
    uid,
    email: userData.email,
    nombre,
    apellido,
    sanatorioId,
    role: userData.role,
    accessTier: userData.accessTier ?? '(missing)',
    premiumSource: userData.premiumSource ?? '',
  });

  if (userData.accessTier === 'premium') {
    console.log('Ya tiene premium.');
    return;
  }

  if (!sanatorioId || !nombre || !apellido) {
    throw new Error('Faltan sanatorioId, nombre o apellido en el perfil.');
  }

  const staff = await loadStaffAllowlist(bundledStaffConfig, sanatorioId);
  const match = findStaffMatch(staff, nombre, apellido);

  if (!match) {
    throw new Error(`No hay match en padrón para ${nombre} ${apellido} (${sanatorioId}).`);
  }

  const payload = {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'allowlist',
    premiumGrantedAt: new Date().toISOString(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  await userRef.set(payload, { merge: true });
  await db
    .doc(`apps/sanidapp/sanatorios/${sanatorioId}/usuarios/${uid}`)
    .set(payload, { merge: true });

  console.log('Premium allowlist otorgado correctamente.');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
