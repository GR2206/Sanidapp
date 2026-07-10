#!/usr/bin/env node
/**
 * Sincroniza index.json y drugLocalRegistry.ts desde content/.../farmacologia/drugs/*.json
 * Uso: node scripts/sync-drugs.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BRANCH = 'atencion-sanitaria';
const DRUGS_DIR = path.join(ROOT, 'content/branches', BRANCH, 'farmacologia/drugs');
const INDEX_PATH = path.join(ROOT, 'content/branches', BRANCH, 'farmacologia/index.json');
const REGISTRY_PATH = path.join(ROOT, 'src/services/content/drugLocalRegistry.ts');

const REQUIRED_DRUG_FIELDS = [
  'id',
  'name',
  'branch',
  'version',
  'indications',
  'dilution',
  'stability',
  'adverseEffects',
  'bibliography',
];

function toImportVar(drugId) {
  return drugId.replace(/-/g, '_');
}

function validateDrug(drug, filename) {
  const errors = [];
  for (const field of REQUIRED_DRUG_FIELDS) {
    if (drug[field] === undefined || drug[field] === null) {
      errors.push(`${filename}: falta campo "${field}"`);
    }
  }
  if (!Array.isArray(drug.bibliography) || drug.bibliography.length < 4) {
    errors.push(`${filename}: bibliography debe tener al menos 4 entradas`);
  }
  if (drug.branch !== BRANCH) {
    errors.push(`${filename}: branch debe ser "${BRANCH}"`);
  }
  if (`${drug.id}.json` !== filename) {
    errors.push(`${filename}: id "${drug.id}" no coincide con el nombre del archivo`);
  }
  return errors;
}

function main() {
  const files = fs
    .readdirSync(DRUGS_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  if (files.length === 0) {
    console.error('No hay archivos JSON en', DRUGS_DIR);
    process.exit(1);
  }

  const allErrors = [];
  const drugs = [];

  for (const filename of files) {
    const filePath = path.join(DRUGS_DIR, filename);
    const drug = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allErrors.push(...validateDrug(drug, filename));
    drugs.push(drug);
  }

  if (allErrors.length > 0) {
    console.error('Errores de validación:\n' + allErrors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }

  const meta = drugs
    .map((drug) => {
      const entry = {
        id: drug.id,
        name: drug.name,
        branch: drug.branch,
        version: drug.version,
      };
      if (drug.updatedAt) {
        entry.updatedAt = drug.updatedAt;
      }
      return entry;
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));

  const index = { branch: BRANCH, drugs: meta };
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`);

  const sortedIds = drugs.map((d) => d.id).sort((a, b) => a.localeCompare(b, 'es'));
  const imports = sortedIds.map(
    (id) =>
      `import ${toImportVar(id)} from '../../../content/branches/${BRANCH}/farmacologia/drugs/${id}.json';`,
  );
  const entries = sortedIds.map((id) => `  '${id}': ${toImportVar(id)} as Drug,`);

  const registry = `import farmacologiaIndex from '../../../content/branches/${BRANCH}/farmacologia/index.json';
${imports.join('\n')}
import type { Drug, DrugIndex } from '@/types/drug';

export const LOCAL_DRUG_INDEX = farmacologiaIndex as DrugIndex;

/** Generado por scripts/sync-drugs.mjs — no editar a mano. Ejecutar: npm run sync-drugs */
export const LOCAL_DRUGS: Record<string, Drug> = {
${entries.join('\n')}
};
`;

  fs.writeFileSync(REGISTRY_PATH, registry);

  console.log(`✓ ${files.length} drogas validadas`);
  console.log(`✓ index.json actualizado (${meta.length} entradas)`);
  console.log(`✓ drugLocalRegistry.ts regenerado`);
}

main();
