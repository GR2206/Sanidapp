import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'content/branches/atencion-sanitaria/farmacologia/index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const entries = index.drugs.map((drug) => ({ id: drug.id }));

const outPath = path.join(root, 'src/constants/calculations/drugCalculationCatalog.ts');
const content = `/** Generated from farmacologia/index.json — run scripts/generate-drug-calculation-catalog.mjs */
export type CalculationDrugCatalogEntry = {
  id: string;
};

export const CALCULATION_DRUG_CATALOG: CalculationDrugCatalogEntry[] = ${JSON.stringify(entries, null, 2)};

export const CALCULATION_DRUG_IDS = CALCULATION_DRUG_CATALOG.map((entry) => entry.id);
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content);
console.log(`Wrote ${entries.length} entries to ${outPath}`);
