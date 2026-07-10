#!/usr/bin/env node
/**
 * Genera drugLocaleRegistry.ts desde content/locales/{en,pt-BR}/farmacologia/drugs/*.json
 * Uso: node scripts/sync-drug-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const LOCALES = ['en', 'pt-BR'];
const REGISTRY_PATH = path.join(ROOT, 'src/services/content/drugLocaleRegistry.ts');

function toImportVar(drugId, locale) {
  const localeSuffix = locale === 'pt-BR' ? '_ptBR' : '_en';
  return `${drugId.replace(/-/g, '_')}${localeSuffix}`;
}

function main() {
  const blocks = [];
  const registryEntries = [];

  for (const locale of LOCALES) {
    const dir = path.join(ROOT, 'content/locales', locale, 'farmacologia/drugs');
    if (!fs.existsSync(dir)) {
      console.warn(`⚠ Sin carpeta ${dir}`);
      continue;
    }

    const files = fs
      .readdirSync(dir)
      .filter((name) => name.endsWith('.json'))
      .sort((a, b) => a.localeCompare(b, 'es'));

    const imports = files.map((filename) => {
      const id = filename.replace('.json', '');
      const varName = toImportVar(id, locale);
      const rel = `../../../content/locales/${locale}/farmacologia/drugs/${filename}`;
      return `import ${varName} from '${rel}';`;
    });

    const entries = files.map((filename) => {
      const id = filename.replace('.json', '');
      return `    '${id}': ${toImportVar(id, locale)} as Drug,`;
    });

    blocks.push(...imports);
    registryEntries.push(`  '${locale}': {\n${entries.join('\n')}\n  },`);
    console.log(`✓ ${locale}: ${files.length} monografías`);
  }

  const registry = `import type { Drug } from '@/types/drug';

${blocks.join('\n')}

/** Generado por scripts/sync-drug-locales.mjs — no editar a mano */
export const LOCAL_DRUG_LOCALES: Record<string, Record<string, Drug>> = {
${registryEntries.join('\n')}
};
`;

  fs.writeFileSync(REGISTRY_PATH, registry);
  console.log('✓ drugLocaleRegistry.ts regenerado');
}

main();
