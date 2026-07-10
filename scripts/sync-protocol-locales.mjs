#!/usr/bin/env node
/**
 * Genera protocolLocaleRegistry.ts desde content/locales/{en,pt-BR}/categories/.../protocols/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const LOCALES = ['en', 'pt-BR'];
const REGISTRY_PATH = path.join(ROOT, 'src/services/content/protocolLocaleRegistry.ts');

function toImportVar(id, locale) {
  const localeSuffix = locale === 'pt-BR' ? '_ptBR' : '_en';
  return `${id.replace(/-/g, '_')}${localeSuffix}`;
}

function collectLocaleFiles(locale) {
  const baseDir = path.join(ROOT, 'content/locales', locale, 'categories');
  const files = [];

  if (!fs.existsSync(baseDir)) {
    return files;
  }

  for (const category of fs.readdirSync(baseDir)) {
    const protocolsDir = path.join(baseDir, category, 'protocols');
    if (!fs.existsSync(protocolsDir)) continue;

    for (const filename of fs.readdirSync(protocolsDir).filter((name) => name.endsWith('.json'))) {
      files.push({
        id: filename.replace('.json', ''),
        category,
        filename,
      });
    }
  }

  return files.sort((a, b) => a.id.localeCompare(b.id, 'es'));
}

function main() {
  const blocks = [];
  const registryEntries = [];

  for (const locale of LOCALES) {
    const files = collectLocaleFiles(locale);
    if (files.length === 0) {
      console.warn(`⚠ ${locale}: sin archivos`);
      continue;
    }

    const imports = files.map(({ id, category, filename }) => {
      const varName = toImportVar(id, locale);
      const rel = `../../../content/locales/${locale}/categories/${category}/protocols/${filename}`;
      return `import ${varName} from '${rel}';`;
    });

    const entries = files.map(({ id }) => `    '${id}': ${toImportVar(id, locale)} as Protocol,`);

    blocks.push(...imports);
    registryEntries.push(`  '${locale}': {\n${entries.join('\n')}\n  },`);
    console.log(`✓ ${locale}: ${files.length} protocolos`);
  }

  const registry = `import type { Protocol } from '@/types/protocol';

${blocks.join('\n')}

/** Generado por scripts/sync-protocol-locales.mjs — no editar a mano */
export const LOCAL_PROTOCOL_LOCALES: Record<string, Record<string, Protocol>> = {
${registryEntries.join('\n')}
};
`;

  fs.writeFileSync(REGISTRY_PATH, registry);
  console.log('✓ protocolLocaleRegistry.ts regenerado');
}

main();
