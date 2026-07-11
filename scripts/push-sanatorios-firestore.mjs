#!/usr/bin/env node
/**
 * Sube todos los sanatorios de firestore-seed.json a Firestore.
 *
 * 1) Firebase Console → ⚙️ Project settings → Service accounts
 * 2) "Generate new private key" → guardá el JSON en la raíz como:
 *      service-account.sanidapp.json
 *    (ya está en .gitignore)
 * 3) npm run seed:sanatorios:push
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SEED_PATH = path.join(ROOT, 'content/sanatorios/firestore-seed.json');
const SA_CANDIDATES = [
  path.join(ROOT, 'service-account.sanidapp.json'),
  path.join(ROOT, 'service-account.json'),
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
].filter(Boolean);

function loadServiceAccount() {
  for (const candidate of SA_CANDIDATES) {
    if (candidate && fs.existsSync(candidate)) {
      return { path: candidate, json: JSON.parse(fs.readFileSync(candidate, 'utf8')) };
    }
  }

  const matches = fs
    .readdirSync(ROOT)
    .filter((name) => name.includes('firebase-adminsdk') && name.endsWith('.json'));
  if (matches[0]) {
    const candidate = path.join(ROOT, matches[0]);
    return { path: candidate, json: JSON.parse(fs.readFileSync(candidate, 'utf8')) };
  }

  return null;
}

async function main() {
  const sa = loadServiceAccount();
  if (!sa) {
    console.error(`
No encontré la clave de servicio.

Hacé esto una sola vez:
  1. Abrí https://console.firebase.google.com/project/sanidapp-b67d7/settings/serviceaccounts/adminsdk
  2. "Generate new private key" / Generar nueva clave privada
  3. Guardá el archivo descargado en:
       ${path.join(ROOT, 'service-account.sanidapp.json')}
  4. Volvé a correr: npm run seed:sanatorios:push

No subas ese archivo a GitHub.
`);
    process.exit(1);
  }

  const { initializeApp, cert, getApps } = require('firebase-admin/app');
  const { getFirestore } = require('firebase-admin/firestore');

  if (!getApps().length) {
    initializeApp({
      credential: cert(sa.json),
      projectId: sa.json.project_id || 'sanidapp-b67d7',
    });
  }

  const db = getFirestore();
  const seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
  const entries = Object.entries(seed.sanatorios ?? {});

  console.log(`Usando credencial: ${path.basename(sa.path)}`);
  console.log(`Subiendo ${entries.length} sanatorios…\n`);

  for (const [id, data] of entries) {
    const ref = db.doc(`apps/sanidapp/sanatorios/${id}`);
    const payload = {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
    await ref.set(payload, { merge: true });
    console.log(`✓ ${id}`);
  }

  console.log(`\nListo. Revisá Firestore → apps/sanidapp/sanatorios`);
}

main().catch((error) => {
  console.error('Error al subir:', error.message || error);
  process.exit(1);
});
