#!/usr/bin/env node
/**
 * Genera el JSON para cargar sanatorios en Firestore (colección apps/sanidapp/sanatorios).
 * Uso: node scripts/seed-sanatorios-firestore.mjs
 *
 * En Firebase Console → Firestore → Importar o pegar cada documento manualmente
 * con ID = campo "id" del sanatorio.
 *
 * Admin: crear documento apps/sanidapp/config/admins con { "uids": ["TU_UID_DE_FIREBASE_AUTH"] }
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'content/sanatorios/rosario.json');
const OUTPUT_PATH = path.join(ROOT, 'content/sanatorios/firestore-seed.json');

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

const payload = {
  sanatorios: Object.fromEntries(
    catalog.sanatorios.map((item) => [
      item.id,
      {
        ...item,
        region: catalog.region,
        updatedAt: new Date().toISOString(),
      },
    ]),
  ),
  adminConfig: {
    path: 'apps/sanidapp/config/admins',
    example: {
      uids: ['REEMPLAZAR_CON_TU_UID'],
    },
  },
};

fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`✓ ${OUTPUT_PATH}`);
console.log(`  ${catalog.sanatorios.length} sanatorios listos para importar.`);
