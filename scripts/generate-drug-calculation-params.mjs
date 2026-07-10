import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const catalogPath = path.join(root, 'src/constants/calculations/drugCalculationCatalog.ts');
const drugsDir = path.join(root, 'content/branches/atencion-sanitaria/farmacologia/drugs');
const outPath = path.join(root, 'src/constants/calculations/drugCalculationParams.ts');

const catalogSource = fs.readFileSync(catalogPath, 'utf8');
const ids = [...catalogSource.matchAll(/"id": "([^"]+)"/g)].map((match) => match[1]);

function parseNumber(value) {
  return Number.parseFloat(value.replace(',', '.'));
}

function parseDoseString(dose) {
  if (!dose) return null;

  const normalized = dose.toLowerCase();

  const perDoseIntervalMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)(?:\s*a\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*dosis[\s\S]*?cada\s*(\d+)\s*h/,
  );
  if (perDoseIntervalMatch) {
    const perDose = parseNumber(perDoseIntervalMatch[2] ?? perDoseIntervalMatch[1]);
    const intervalHours = Number.parseInt(perDoseIntervalMatch[3], 10);
    const doses = Math.max(1, Math.round(24 / intervalHours));
    return {
      maxDailyDoseMgPerKgPerDay: perDose * doses,
      maxDosesPerDay: doses,
      doseIntervalHours: intervalHours,
    };
  }

  const onceDailyMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)(?:\s*a\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*dosis[\s\S]*?una vez al d[ií]a/,
  );
  if (onceDailyMatch) {
    const perDose = parseNumber(onceDailyMatch[2] ?? onceDailyMatch[1]);
    return {
      maxDailyDoseMgPerKgPerDay: perDose,
      maxDosesPerDay: 1,
    };
  }

  const perDoseMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)(?:\s*a\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*dosis[\s\S]*?(\d+)\s*dosis/,
  );
  if (perDoseMatch) {
    const perDose = parseNumber(perDoseMatch[2] ?? perDoseMatch[1]);
    const doses = Number.parseInt(perDoseMatch[3], 10);
    return {
      maxDailyDoseMgPerKgPerDay: perDose * doses,
      maxDosesPerDay: doses,
    };
  }

  const dailyMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)(?:\s*a\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*d[ií]a[\s\S]*?(\d+)(?:\s*a\s*(\d+))?\s*dosis/,
  );
  if (dailyMatch) {
    const dailyMax = parseNumber(dailyMatch[2] ?? dailyMatch[1]);
    const dosesMax = Number.parseInt(dailyMatch[4] ?? dailyMatch[3], 10);
    return {
      maxDailyDoseMgPerKgPerDay: dailyMax,
      maxDosesPerDay: dosesMax,
    };
  }

  const dailyOnlyMatch = normalized.match(
    /(\d+(?:[.,]\d+)?)(?:\s*a\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*d[ií]a/,
  );
  if (dailyOnlyMatch) {
    const dailyMax = parseNumber(dailyOnlyMatch[2] ?? dailyOnlyMatch[1]);
    const dosesMatch = normalized.match(/(\d+)(?:\s*a\s*(\d+))?\s*(?:dosis|veces)/);
    const doses = dosesMatch ? Number.parseInt(dosesMatch[2] ?? dosesMatch[1], 10) : 1;
    return {
      maxDailyDoseMgPerKgPerDay: dailyMax,
      maxDosesPerDay: doses,
    };
  }

  return null;
}

function withInterval(params) {
  return {
    ...params,
    doseIntervalHours: params.doseIntervalHours ?? Math.round(24 / params.maxDosesPerDay),
  };
}

function asParams(schemes) {
  return { schemes: schemes.map((scheme) => withInterval(scheme)) };
}

const garrahanPath = path.join(root, 'src/constants/calculations/drugCalculationGarrahan.json');
const garrahanParams = fs.existsSync(garrahanPath)
  ? JSON.parse(fs.readFileSync(garrahanPath, 'utf8'))
  : {};

const manualOverrides = {
  'pen-001': null,
  'pen-002': null,
  'gen-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 7.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'ami-001': asParams([{ maxDailyDoseMgPerKgPerDay: 22.5, maxDosesPerDay: 3 }]),
  'mic-001': asParams([{ maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1 }]),
  'fos-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'amp-002': asParams([
    {
      maxDailyDoseMgPerKgPerDay: 150,
      maxDosesPerDay: 4,
      doseIntervalHours: 6,
      indication: 'Infecciones leves / moderadas y profilaxis',
    },
    {
      maxDailyDoseMgPerKgPerDay: 300,
      maxDosesPerDay: 4,
      doseIntervalHours: 6,
      indication: 'Infecciones graves (meningitis, bacteriemia, intraabdominal, osteomielitis)',
    },
  ]),
  'tei-001': asParams([{ maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1 }]),
  'tig-001': null,
  'rif-001': asParams([{ maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1 }]),
  'van-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 60, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 40, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 45, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'adr-001': null,
  'nor-001': null,
  'dob-001': null,
  'dop-001': null,
  'des-001': null,
  'mil-001': null,
  'mid-001': null,
  'pro-001': null,
  'ket-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'fnt-001': null,
  'mor-001': null,
  'suf-001': null,
  'rem-001': null,
  'dex-001': null,
  'dia-001': null,
  'esm-001': null,
  'lis-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.07, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.6, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'lab-001': null,
  'dlt-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.25, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.35, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.4, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 0.9, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 0.9, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'dox-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
    { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 2, doseIntervalHours: 12 },
  ]),
  'efe-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'cef-002': asParams([
    { maxDailyDoseMgPerKgPerDay: 25, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 25, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'cef-004': asParams([
    { maxDailyDoseMgPerKgPerDay: 80, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 160, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 80, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 160, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'suc-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'ngl-001': null,
  'vas-001': null,
  'imu-001': null,
  'cap-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.9, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.03, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 0.15, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'tob-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 7, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'tia-001': null,
  'bum-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.06, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 0.03, maxDosesPerDay: 2, doseIntervalHours: 12 },
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 2, doseIntervalHours: 12 },
  ]),
  'bis-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'olm-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'ram-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'tel-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'tor-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 2, doseIntervalHours: 12 },
    { maxDailyDoseMgPerKgPerDay: 0.4, maxDosesPerDay: 2, doseIntervalHours: 12 },
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'pan-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'ppf-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'oxa-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 50, maxDosesPerDay: 2, doseIntervalHours: 12 },
    { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 2, doseIntervalHours: 12 },
  ]),
  'tic-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 4, doseIntervalHours: 6 },
    { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 3, doseIntervalHours: 8 },
    { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 3, doseIntervalHours: 8 },
  ]),
  'mop-001': asParams([{ maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 }]),
  'cst-001': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.15, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
  'oct-001': null,
  'fon-001': null,
  'iso-001': null,
  'atr-002': asParams([
    { maxDailyDoseMgPerKgPerDay: 0.4, maxDosesPerDay: 1, doseIntervalHours: 24 },
    { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
  ]),
};

const params = {};
const missing = [];

for (const id of ids) {
  if (manualOverrides[id] === null) {
    continue;
  }

  if (manualOverrides[id]) {
    params[id] = manualOverrides[id];
    continue;
  }

  const drugPath = path.join(drugsDir, `${id}.json`);
  if (!fs.existsSync(drugPath)) {
    missing.push(id);
    continue;
  }

  const drug = JSON.parse(fs.readFileSync(drugPath, 'utf8'));
  const dose =
    drug.dilution?.pediatrico?.dose ??
    drug.dilution?.neonatal?.dose ??
    drug.dilution?.adulto?.dose ??
    '';

  const parsed = parseDoseString(dose);
  if (parsed) {
    params[id] = asParams([parsed]);
  } else {
    missing.push(id);
  }
}

Object.assign(params, garrahanParams);

const content = `/** Generated from pediatric dose strings — run scripts/generate-drug-calculation-params.mjs */
export type DrugDoseScheme = {
  maxDailyDoseMgPerKgPerDay: number;
  maxDosesPerDay: number;
  doseIntervalHours: number;
};

export type DrugCalculationParams = {
  schemes: DrugDoseScheme[];
};

export const DRUG_CALCULATION_PARAMS: Record<string, DrugCalculationParams> = ${JSON.stringify(params, null, 2)};

export const DRUG_CALCULATION_PARAM_IDS = Object.keys(DRUG_CALCULATION_PARAMS);
`;

fs.writeFileSync(outPath, content);
console.log(`Wrote ${Object.keys(params).length} params; missing ${missing.length}`);
if (missing.length) {
  console.log(missing.join(', '));
}
