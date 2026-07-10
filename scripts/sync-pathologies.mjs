#!/usr/bin/env node
/**
 * Sincroniza index.json y pathologyLocalRegistry.ts desde content/.../patologias/items/*.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANCH = 'atencion-sanitaria';
const ITEMS_DIR = path.join(ROOT, 'content/branches', BRANCH, 'patologias/items');
const INDEX_PATH = path.join(ROOT, 'content/branches', BRANCH, 'patologias/index.json');
const REGISTRY_PATH = path.join(ROOT, 'src/services/content/pathologyLocalRegistry.ts');

const REQUIRED = ['id', 'name', 'branch', 'version', 'body', 'bibliography'];

function toImportVar(id) {
  return id.replace(/-/g, '_');
}

function validate(item, filename) {
  const errors = [];
  for (const field of REQUIRED) {
    if (item[field] === undefined || item[field] === null) {
      errors.push(`${filename}: falta "${field}"`);
    }
  }
  if (!Array.isArray(item.bibliography) || item.bibliography.length < 4) {
    errors.push(`${filename}: bibliography debe tener al menos 4 entradas`);
  }
  if (`${item.id}.json` !== filename) {
    errors.push(`${filename}: id no coincide con archivo`);
  }
  return errors;
}

function main() {
  const files = fs.readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json')).sort();
  const allErrors = [];
  const items = files.map((filename) => {
    const item = JSON.parse(fs.readFileSync(path.join(ITEMS_DIR, filename), 'utf8'));
    allErrors.push(...validate(item, filename));
    return item;
  });

  if (allErrors.length > 0) {
    console.error(allErrors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }

  const meta = items
    .map(({ id, name, branch, version, updatedAt }) => {
      const entry = { id, name, branch, version };
      if (updatedAt) entry.updatedAt = updatedAt;
      return entry;
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));

  fs.writeFileSync(INDEX_PATH, `${JSON.stringify({ branch: BRANCH, pathologies: meta }, null, 2)}\n`);

  const ids = items.map((i) => i.id).sort();
  const imports = ids.map(
    (id) => `import ${toImportVar(id)} from '../../../content/branches/${BRANCH}/patologias/items/${id}.json';`,
  );
  const entries = ids.map((id) => `  '${id}': ${toImportVar(id)} as Pathology,`);

  const registry = `import patologiasIndex from '../../../content/branches/${BRANCH}/patologias/index.json';
${imports.join('\n')}
import type { Pathology, PathologyIndex } from '@/types/pathology';

export const LOCAL_PATHOLOGY_INDEX = patologiasIndex as PathologyIndex;

/** Generado por scripts/sync-pathologies.mjs */
export const LOCAL_PATHOLOGIES: Record<string, Pathology> = {
${entries.join('\n')}
};
`;

  fs.writeFileSync(REGISTRY_PATH, registry);
  console.log(`✓ ${files.length} patologías sincronizadas`);
}

main();
