#!/usr/bin/env node
/**
 * Genera monografías EN y PT-BR desde el contenido español base.
 * Uso: node scripts/translate-drug-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { PHRASES_EN, PHRASES_PT_BR, sortPhrases } from './drug-locale-phrases.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANCH = 'atencion-sanitaria';
const SOURCE_DIR = path.join(ROOT, 'content/branches', BRANCH, 'farmacologia/drugs');

const EN_PHRASES = sortPhrases(PHRASES_EN);
const PT_PHRASES = sortPhrases(PHRASES_PT_BR);

const LOCALES = [
  { code: 'en', phrases: EN_PHRASES },
  { code: 'pt-BR', phrases: PT_PHRASES },
];

function translateText(text, phrases) {
  if (!text || typeof text !== 'string') return text;
  let result = text;
  for (const [from, to] of phrases) {
    if (result.includes(from)) {
      result = result.split(from).join(to);
    }
  }
  return result;
}

function translateValue(value, phrases) {
  if (typeof value === 'string') {
    return translateText(value, phrases);
  }
  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item, phrases));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, nested] of Object.entries(value)) {
      out[key] = translateValue(nested, phrases);
    }
    return out;
  }
  return value;
}

function translateDrug(drug, phrases) {
  return {
    ...drug,
    name: translateText(drug.name, phrases),
    executiveSummary: drug.executiveSummary
      ? translateText(drug.executiveSummary, phrases)
      : undefined,
    indications: translateText(drug.indications, phrases),
    dilution: translateValue(drug.dilution, phrases),
    stability: translateText(drug.stability, phrases),
    adverseEffects: translateText(drug.adverseEffects, phrases),
    bibliography: drug.bibliography.map((entry) => ({
      ...entry,
      citation: translateText(entry.citation, phrases),
    })),
  };
}

function main() {
  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  for (const { code, phrases } of LOCALES) {
    const outDir = path.join(ROOT, 'content/locales', code, 'farmacologia/drugs');
    fs.mkdirSync(outDir, { recursive: true });

    for (const filename of files) {
      const source = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf8'));
      const translated = translateDrug(source, phrases);
      fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(translated, null, 2)}\n`);
    }

    console.log(`✓ ${code}: ${files.length} monografías generadas`);
  }
}

main();
