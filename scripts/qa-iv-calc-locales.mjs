/**
 * QA: fail if Spanish leftovers remain in EN/pt-BR IV-calc locale overlays.
 * node scripts/qa-iv-calc-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const IDS = [
  'adr-001', 'nor-001', 'vas-001', 'teo-001', 'ins-001', 'dop-001', 'dob-001',
  'kcl-001', 'cac-001', 'bic-001', 'ket-001', 'pro-001', 'hef-001', 'cef-003',
  'cag-001', 'rem-001', 'roc-001', 'alb-001', 'pol-001', 'col-001', 'lvt-001',
  'bum-001', 'hdr-001',
];

/** Markers forbidden in BOTH locales (Spanish leftovers). */
const BOTH = [
  { re: /\bsegún\b/i, label: 'según' },
  { re: /\bvía\b/i, label: 'vía' },
  { re: /\bampolla\b/i, label: 'ampolla' },
  { re: /\btitular\b/i, label: 'titular' },
  { re: /\bcartilla\b/i, label: 'cartilla' },
  { re: /\bIndicaciones\b/, label: 'Indicaciones' },
  { re: /\bPrecauciones\b/, label: 'Precauciones' },
  { re: /## Estabilidad\b/, label: '## Estabilidad' },
  { re: /\bEfectos adversos\b/i, label: 'Efectos adversos' },
  { re: /\bdesechar\b/i, label: 'desechar' },
  { re: /\bDescartar\b/, label: 'Descartar' },
  { re: /\bMonitorizar\b/i, label: 'Monitorizar' },
  { re: /\binfusión\b/i, label: 'infusión' },
  { re: /\bdilución\b/i, label: 'dilución' },
  { re: /\badministración\b/i, label: 'administración' },
  { re: /\bpediatría\b/i, label: 'pediatría' },
  { re: /\bmantenimiento\b/i, label: 'mantenimiento' },
  { re: /\bNNU\b/, label: 'NNU' },
  { re: /\bBIC\b/, label: 'BIC' },
  { re: /\bc\/\d/, label: 'c/N' },
  { re: /\bpuede\b/i, label: 'puede' },
  { re: /\bsólo\b/i, label: 'sólo' },
  { re: /\bheladera\b/i, label: 'heladera' },
];

/** Extra markers for EN only. */
const EN_ONLY = [
  { re: /\bbomba\b/i, label: 'bomba' },
  { re: /\bVO\b/, label: 'VO' },
  { re: /\bSF\b/, label: 'SF' },
  { re: /\bDext\.?\s*5%/i, label: 'Dext. 5%' },
  { re: /\bcada\s+\d/i, label: 'cada N' },
  { re: /\bmáx\./i, label: 'máx.' },
  { re: /\brefrigerado\b/i, label: 'refrigerado' },
  { re: /\bfrasco\b/i, label: 'frasco' },
  { re: /## Indicações/, label: '## Indicações (PT)' },
  { re: /## Estabilidade/, label: '## Estabilidade (PT)' },
  { re: /## Efeitos adversos/, label: '## Efeitos adversos (PT)' },
];

/** Extra markers for PT only (EN headings left behind). */
const PT_ONLY = [
  { re: /## Indications\b/, label: '## Indications (EN)' },
  { re: /## Precautions\b/, label: '## Precautions (EN)' },
  { re: /## Stability\b/, label: '## Stability (EN)' },
  { re: /## Adverse effects\b/, label: '## Adverse effects (EN)' },
];

function collectText(doc) {
  const parts = [doc.name, doc.executiveSummary, doc.indications, doc.stability, doc.adverseEffects];
  for (const pop of ['adulto', 'pediatrico', 'neonatal']) {
    const d = doc.dilution?.[pop];
    if (!d) continue;
    for (const v of Object.values(d)) {
      if (typeof v === 'string') parts.push(v);
    }
  }
  return parts.filter(Boolean).join('\n');
}

const fails = [];

for (const id of IDS) {
  for (const [loc, rel, extra] of [
    ['en', 'content/locales/en/farmacologia/drugs', EN_ONLY],
    ['pt-BR', 'content/locales/pt-BR/farmacologia/drugs', PT_ONLY],
  ]) {
    const p = path.join(ROOT, rel, `${id}.json`);
    if (!fs.existsSync(p)) {
      fails.push({ id, loc, label: 'FILE MISSING' });
      continue;
    }
    const doc = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!doc.translationReviewed) {
      fails.push({ id, loc, label: 'translationReviewed missing' });
    }
    if (loc === 'en') {
      if (!doc.indications?.includes('## Indications')) fails.push({ id, loc, label: 'missing ## Indications' });
      if (!doc.stability?.includes('## Stability')) fails.push({ id, loc, label: 'missing ## Stability' });
      if (!doc.adverseEffects?.includes('## Adverse effects')) fails.push({ id, loc, label: 'missing ## Adverse effects' });
    } else {
      if (!doc.indications?.includes('## Indicações')) fails.push({ id, loc, label: 'missing ## Indicações' });
      if (!doc.stability?.includes('## Estabilidade')) fails.push({ id, loc, label: 'missing ## Estabilidade' });
      if (!doc.adverseEffects?.includes('## Efeitos adversos')) fails.push({ id, loc, label: 'missing ## Efeitos adversos' });
    }
    const text = collectText(doc);
    for (const { re, label } of [...BOTH, ...extra]) {
      if (re.test(text)) fails.push({ id, loc, label });
    }
  }
}

const key = (f) => `${f.id}|${f.loc}|${f.label}`;
const uniq = [...new Map(fails.map((f) => [key(f), f])).values()];

console.log(`QA checked ${IDS.length} drugs × 2 locales`);
console.log(`Failures: ${uniq.length}`);
for (const f of uniq) {
  console.log(` - ${f.id} [${f.loc}] → ${f.label}`);
}

if (uniq.length) process.exit(1);
console.log('PASS: no Spanish leftovers detected in required fields.');
