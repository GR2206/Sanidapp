#!/usr/bin/env node
/**
 * Sincroniza los JSON empaquetados desde content/banners/gist/banners.json
 * Uso: node scripts/sync-banners.mjs
 *
 * Flujo gist:
 * 1. Editar content/banners/gist/banners.json (o el mismo archivo en tu gist)
 * 2. node scripts/sync-banners.mjs
 * 3. Publicar el gist y pegar la URL raw en APP_CONFIG.banners.gistRawUrl
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GIST_PATH = path.join(ROOT, 'content/banners/gist/banners.json');
const BANNERS_DIR = path.join(ROOT, 'content/banners');
const INDEX_PATH = path.join(BANNERS_DIR, 'index.json');

const SLOT_IDS = ['bannerTOP', 'bannerMEDIO', 'bannerBOT'];
const REQUIRED_FIELDS = ['id', 'label', 'enabled', 'title', 'subtitle', 'imageUrl', 'linkUrl', 'version'];

function validateSlot(slot, index) {
  const errors = [];
  const label = `slots[${index}]`;

  for (const field of REQUIRED_FIELDS) {
    if (slot[field] === undefined) {
      errors.push(`${label}: falta "${field}"`);
    }
  }

  if (!SLOT_IDS.includes(slot.id)) {
    errors.push(`${label}: id "${slot.id}" no es válido (${SLOT_IDS.join(', ')})`);
  }

  return errors;
}

function main() {
  if (!fs.existsSync(GIST_PATH)) {
    console.error(`No existe ${GIST_PATH}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(GIST_PATH, 'utf8'));
  const slots = payload.slots ?? [];
  const errors = [];

  if (!slots.length) {
    errors.push('El gist debe incluir al menos un slot en "slots"');
  }

  slots.forEach((slot, index) => {
    errors.push(...validateSlot(slot, index));
  });

  const ids = new Set(slots.map((slot) => slot.id));
  for (const id of SLOT_IDS) {
    if (!ids.has(id)) {
      errors.push(`Falta el slot obligatorio "${id}"`);
    }
  }

  if (errors.length) {
    console.error('Errores de validación:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }

  const ordered = SLOT_IDS.map((id) => slots.find((slot) => slot.id === id));

  for (const slot of ordered) {
    const filePath = path.join(BANNERS_DIR, `${slot.id}.json`);
    fs.writeFileSync(filePath, `${JSON.stringify(slot, null, 2)}\n`, 'utf8');
    console.log(`✓ ${slot.id}.json`);
  }

  const index = {
    version: payload.version ?? '1.0.0',
    slots: SLOT_IDS,
  };
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
  console.log('✓ index.json');
  console.log(`\n${ordered.length} banners sincronizados. Estructura visual fija en la app (offline).`);
}

main();
