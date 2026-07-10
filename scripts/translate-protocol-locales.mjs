#!/usr/bin/env node
/**
 * Genera protocolos EN y PT-BR desde el contenido español base.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  PROTOCOL_PHRASES_EN,
  PROTOCOL_PHRASES_PT_BR,
  PROTOCOL_TITLES_EN,
  PROTOCOL_TITLES_PT_BR,
} from './protocol-locale-phrases.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANCH = 'atencion-sanitaria';
const CATEGORIES_DIR = path.join(ROOT, 'content/branches', BRANCH, 'categories');

const LOCALES = [
  { code: 'en', phrases: PROTOCOL_PHRASES_EN, titles: PROTOCOL_TITLES_EN },
  { code: 'pt-BR', phrases: PROTOCOL_PHRASES_PT_BR, titles: PROTOCOL_TITLES_PT_BR },
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

function translateProtocol(protocol, phrases, titles) {
  return {
    ...protocol,
    title: titles[protocol.id] ?? translateText(protocol.title, phrases),
    executiveSummary: translateText(protocol.executiveSummary, phrases),
    body: translateText(protocol.body, phrases),
    bibliography: protocol.bibliography.map((entry) => ({
      ...entry,
      citation: translateText(entry.citation, phrases),
    })),
  };
}

function listProtocolFiles() {
  const results = [];

  for (const category of fs.readdirSync(CATEGORIES_DIR)) {
    const protocolsDir = path.join(CATEGORIES_DIR, category, 'protocols');
    if (!fs.existsSync(protocolsDir)) continue;

    for (const filename of fs.readdirSync(protocolsDir).filter((name) => name.endsWith('.json'))) {
      results.push({ category, filename });
    }
  }

  return results.sort((a, b) => a.filename.localeCompare(b.filename, 'es'));
}

function main() {
  const files = listProtocolFiles();

  for (const { code, phrases, titles } of LOCALES) {
    let count = 0;

    for (const { category, filename } of files) {
      const sourcePath = path.join(CATEGORIES_DIR, category, 'protocols', filename);
      const outDir = path.join(ROOT, 'content/locales', code, 'categories', category, 'protocols');
      fs.mkdirSync(outDir, { recursive: true });

      const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
      const translated = translateProtocol(source, phrases, titles);
      fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(translated, null, 2)}\n`);
      count += 1;
    }

    console.log(`✓ ${code}: ${count} protocolos generados`);
  }
}

main();
