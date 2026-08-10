/**
 * Otorga premium de por vida a testers (sin cobro).
 *
 * - Si el usuario ya existe en Auth + Firestore → premium inmediato.
 * - Si aún no se registró → queda pendiente en apps/sanidapp/tester_lifetime/{emailId}
 *   y se aplica al primer login vía syncAllowlistPremium.
 *
 * Uso:
 *   node functions/scripts/grantTesterLifetimePremium.js correo1@x.com correo2@x.com
 *   node functions/scripts/grantTesterLifetimePremium.js --file functions/scripts/tester-lifetime-emails.txt
 *
 * Requiere: gcloud auth application-default login
 *           (o GOOGLE_APPLICATION_CREDENTIALS apuntando a una SA con acceso al proyecto)
 */
const fs = require('fs');
const path = require('path');
const { initializeApp, applicationDefault, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const PROJECT_ID = 'sanidapp-b67d7';

function testerLifetimeDocId(email) {
  return String(email || '')
    .trim()
    .toLowerCase()
    .replace(/@/g, '_at_')
    .replace(/\./g, '_dot_');
}

function parseTargets(argv) {
  const args = argv.slice(2);
  const fileIdx = args.indexOf('--file');
  if (fileIdx >= 0) {
    const filePath = args[fileIdx + 1];
    if (!filePath) {
      throw new Error('Falta ruta tras --file');
    }
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    const raw = fs.readFileSync(absolute, 'utf8');
    return raw
      .split(/\r?\n/)
      .map((line) => line.replace(/#.*$/, '').trim())
      .filter(Boolean);
  }
  return args.map((value) => value.trim()).filter(Boolean);
}

async function resolveUid(value) {
  if (value.includes('@')) {
    const user = await getAuth().getUserByEmail(value.trim().toLowerCase());
    return { uid: user.uid, email: user.email || value };
  }
  return { uid: value.trim(), email: null };
}

async function grantOne(db, target) {
  const { uid, email } = await resolveUid(target);
  const userRef = db.doc(`apps/sanidapp/usuarios/${uid}`);
  const snap = await userRef.get();

  if (!snap.exists) {
    return { ok: false, target, uid, error: 'Sin perfil Firestore' };
  }

  const data = snap.data() ?? {};
  const payload = {
    accessTier: 'premium',
    premiumSource: 'tester_lifetime',
    premiumGrantedAt: data.premiumGrantedAt || new Date().toISOString(),
    premiumForever: true,
    institutionToken: data.institutionToken || '',
    updatedAt: FieldValue.serverTimestamp(),
  };

  await userRef.set(payload, { merge: true });

  const sanatorioId = String(data.sanatorioId ?? '').trim();
  if (sanatorioId) {
    await db
      .doc(`apps/sanidapp/sanatorios/${sanatorioId}/usuarios/${uid}`)
      .set(payload, { merge: true });
  }

  const normalizedEmail = String(email || data.email || target).trim().toLowerCase();
  if (normalizedEmail.includes('@')) {
    await db.doc(`apps/sanidapp/tester_lifetime/${testerLifetimeDocId(normalizedEmail)}`).set(
      {
        email: normalizedEmail,
        claimed: true,
        claimedUid: uid,
        claimedAt: FieldValue.serverTimestamp(),
        source: 'grant_script',
      },
      { merge: true },
    );
  }

  return {
    ok: true,
    status: 'granted',
    target,
    uid,
    email: email || data.email || '',
    was: data.accessTier || 'free',
    sanatorioId: sanatorioId || '(sin sanatorio)',
  };
}

async function queuePending(db, email) {
  const normalized = email.trim().toLowerCase();
  const ref = db.doc(`apps/sanidapp/tester_lifetime/${testerLifetimeDocId(normalized)}`);
  const snap = await ref.get();
  if (snap.exists && snap.data()?.claimed === true) {
    return {
      ok: true,
      status: 'already_claimed',
      target: email,
      email: normalized,
    };
  }

  await ref.set(
    {
      email: normalized,
      claimed: false,
      queuedAt: FieldValue.serverTimestamp(),
      source: 'grant_script',
    },
    { merge: true },
  );

  return {
    ok: true,
    status: 'pending',
    target: email,
    email: normalized,
  };
}

async function main() {
  let targets;
  try {
    targets = parseTargets(process.argv);
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }

  if (targets.length === 0) {
    console.error(`Uso:
  node functions/scripts/grantTesterLifetimePremium.js pepe@mail.com ana@mail.com
  node functions/scripts/grantTesterLifetimePremium.js --file functions/scripts/tester-lifetime-emails.txt`);
    process.exit(1);
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: applicationDefault(),
      projectId: PROJECT_ID,
    });
  }

  const db = getFirestore();
  console.log(`Proyecto: ${PROJECT_ID}`);
  console.log(`Testers a marcar: ${targets.length}\n`);

  const results = [];
  for (const target of targets) {
    try {
      let result;
      try {
        result = await grantOne(db, target);
      } catch (error) {
        const message = error.message || String(error);
        if (
          target.includes('@') &&
          /no user record corresponding/i.test(message)
        ) {
          result = await queuePending(db, target);
        } else {
          throw error;
        }
      }

      results.push(result);
      if (result.status === 'granted') {
        console.log(`✓ GRANT ${result.email || result.target} (${result.was} → premium forever)`);
      } else if (result.status === 'pending') {
        console.log(`… PENDING ${result.email} (aún no tiene cuenta; se activa al registrarse)`);
      } else if (result.status === 'already_claimed') {
        console.log(`✓ YA CLAIMED ${result.email}`);
      } else {
        console.log(`✗ ${result.target}: ${result.error}`);
      }
    } catch (error) {
      const message = error.message || String(error);
      results.push({ ok: false, target, error: message });
      console.log(`✗ ${target}: ${message}`);
    }
  }

  const granted = results.filter((item) => item.status === 'granted').length;
  const pending = results.filter((item) => item.status === 'pending').length;
  const fail = results.filter((item) => !item.ok).length;
  console.log(`\nListo: ${granted} grant, ${pending} pending, ${fail} con error.`);
  if (fail > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
