#!/usr/bin/env node
/**
 * Genera patologías EN y PT-BR desde el contenido español base.
 * Uso: node scripts/translate-pathology-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  PATHOLOGY_NAMES_EN,
  PATHOLOGY_NAMES_PT_BR,
  PATHOLOGY_PHRASES_EN,
  PATHOLOGY_PHRASES_PT_BR,
} from './pathology-locale-phrases.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANCH = 'atencion-sanitaria';
const SOURCE_DIR = path.join(ROOT, 'content/branches', BRANCH, 'patologias/items');

const LOCALES = [
  { code: 'en', phrases: PATHOLOGY_PHRASES_EN, names: PATHOLOGY_NAMES_EN },
  { code: 'pt-BR', phrases: PATHOLOGY_PHRASES_PT_BR, names: PATHOLOGY_NAMES_PT_BR },
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

function translateClinicalBox(box, phrases) {
  return {
    ...box,
    title: translateText(box.title, phrases),
    content: box.content ? translateText(box.content, phrases) : undefined,
  };
}

function translatePathology(pathology, phrases, names) {
  const translated = {
    ...pathology,
    name: names[pathology.id] ?? translateText(pathology.name, phrases),
    body: translateText(pathology.body, phrases),
    bibliography: pathology.bibliography.map((entry) => ({
      ...entry,
      citation: translateText(entry.citation, phrases),
    })),
  };

  if (pathology.clinicalBox) {
    translated.clinicalBox = translateClinicalBox(pathology.clinicalBox, phrases);
  }

  if (pathology.clinicalBoxes) {
    translated.clinicalBoxes = pathology.clinicalBoxes.map((box) =>
      translateClinicalBox(box, phrases),
    );
  }

  if (pathology.relatedDrugs) {
    translated.relatedDrugs = pathology.relatedDrugs.map((item) => ({
      ...item,
      label: item.label ? translateText(item.label, phrases) : undefined,
    }));
  }

  return translated;
}

function main() {
  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  for (const { code, phrases, names } of LOCALES) {
    const outDir = path.join(ROOT, 'content/locales', code, 'patologias/items');
    fs.mkdirSync(outDir, { recursive: true });

    for (const filename of files) {
      const source = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf8'));
      const translated = translatePathology(source, phrases, names);
      fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(translated, null, 2)}\n`);
    }

    console.log(`✓ ${code}: ${files.length} patologías generadas`);
  }
}

main();
