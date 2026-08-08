/**
 * Apply clinical EN / pt-BR overlays for the IV/cálculos drug batch.
 * Usage: node scripts/apply-iv-calc-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IV_LOCALE_OVERRIDES } from './data/iv-calc-locale-overrides.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ES_DIR = path.join(ROOT, 'content/branches/atencion-sanitaria/farmacologia/drugs');
const EN_DIR = path.join(ROOT, 'content/locales/en/farmacologia/drugs');
const PT_DIR = path.join(ROOT, 'content/locales/pt-BR/farmacologia/drugs');

const POPULATIONS = ['adulto', 'pediatrico', 'neonatal'];

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * @param {object} es
 * @param {object} ov locale override for one language
 */
function buildLocale(es, ov) {
  const out = deepClone(es);
  out.name = ov.name;
  out.executiveSummary = ov.executiveSummary;
  out.indications = ov.indications;
  out.stability = ov.stability;
  out.adverseEffects = ov.adverseEffects;
  out.translationReviewed = true;

  if (!out.dilution) out.dilution = {};
  for (const pop of POPULATIONS) {
    if (ov[pop]) {
      out.dilution[pop] = { ...ov[pop] };
    }
  }

  // Keep bibliography from ES (already cloned)
  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

ensureDir(EN_DIR);
ensureDir(PT_DIR);

const ids = Object.keys(IV_LOCALE_OVERRIDES);
console.log(`Applying IV calc locales for ${ids.length} drugs…`);

let written = 0;
for (const id of ids) {
  const esPath = path.join(ES_DIR, `${id}.json`);
  if (!fs.existsSync(esPath)) {
    console.error(`MISSING ES source: ${esPath}`);
    process.exitCode = 1;
    continue;
  }
  const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
  const ov = IV_LOCALE_OVERRIDES[id];
  if (!ov?.en || !ov?.pt) {
    console.error(`Incomplete override for ${id}`);
    process.exitCode = 1;
    continue;
  }

  const enDoc = buildLocale(es, ov.en);
  const ptDoc = buildLocale(es, ov.pt);

  writeJson(path.join(EN_DIR, `${id}.json`), enDoc);
  writeJson(path.join(PT_DIR, `${id}.json`), ptDoc);
  written += 1;
  console.log(`  ✓ ${id} → en + pt-BR`);
}

console.log(`Done. Wrote ${written}/${ids.length} drug locale pairs.`);
