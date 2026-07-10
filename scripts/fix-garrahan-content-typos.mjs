#!/usr/bin/env node
/** Corrige truncados y typos documentados en monografías Garrahan (ES + EN + pt-BR). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function writeJson(rel, data) {
  fs.writeFileSync(path.join(ROOT, rel), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function bump(data) {
  const [maj, min, pat] = data.version.split('.').map(Number);
  data.version = `${maj}.${min}.${pat + 1}`;
  data.updatedAt = '2026-07-10';
}

function replaceIn(data, field, from, to) {
  if (!data[field]?.includes(from)) {
    throw new Error(`Campo ${field} no contiene: ${from}`);
  }
  data[field] = data[field].replaceAll(from, to);
}

function replaceNested(data, pathKeys, from, to) {
  let node = data;
  for (let i = 0; i < pathKeys.length - 1; i++) node = node[pathKeys[i]];
  const key = pathKeys.at(-1);
  if (!node[key]?.includes(from)) {
    throw new Error(`${pathKeys.join('.')} no contiene: ${from}`);
  }
  node[key] = node[key].replaceAll(from, to);
}

const patches = [
  // ome-001 — truncado atazanavir
  {
    file: 'content/branches/atencion-sanitaria/farmacologia/drugs/ome-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'Contraindicado con ata', 'Contraindicado con atazanavir. Ver alerta');
      bump(d);
    },
  },
  {
    file: 'content/locales/en/farmacologia/drugs/ome-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'Contraindicated with ata', 'Contraindicated with atazanavir. See alert.');
      bump(d);
    },
  },
  {
    file: 'content/locales/pt-BR/farmacologia/drugs/ome-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'Contraindicado com ata', 'Contraindicado com atazanavir. Ver alerta');
      bump(d);
    },
  },
  // sav-001 — truncado potasio/PAS
  {
    file: 'content/branches/atencion-sanitaria/farmacologia/drugs/sav-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'niveles de p', 'niveles de potasio sérico 5,3 mmol/L o con presión arterial sistólica (PAS) < percentil 5 para la edad del paciente.');
      bump(d);
    },
  },
  {
    file: 'content/locales/en/farmacologia/drugs/sav-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'potassium levels of p', 'serum potassium levels of 5.3 mmol/L or with systolic blood pressure (SBP) < 5th percentile for patient age.');
      bump(d);
    },
  },
  {
    file: 'content/locales/pt-BR/farmacologia/drugs/sav-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'notes'], 'níveis de p', 'níveis de potássio sérico de 5,3 mmol/L ou com pressão arterial sistólica (PAS) < percentil 5 para a idade do paciente.');
      bump(d);
    },
  },
  // srf-001 — typo Garrahan mg → g (peso al nacer)
  {
    file: 'content/branches/atencion-sanitaria/farmacologia/drugs/srf-001.json',
    apply(d) {
      replaceIn(d, 'executiveSummary', '1250 mg', '1250 g');
      replaceIn(d, 'indications', '1250 mg', '1250 g');
      bump(d);
    },
  },
  {
    file: 'content/locales/en/farmacologia/drugs/srf-001.json',
    apply(d) {
      replaceIn(d, 'executiveSummary', '1250 mg', '1250 g');
      replaceIn(d, 'indications', '1250 mg', '1250 g');
      bump(d);
    },
  },
  {
    file: 'content/locales/pt-BR/farmacologia/drugs/srf-001.json',
    apply(d) {
      replaceIn(d, 'executiveSummary', '1250 mg', '1250 g');
      replaceIn(d, 'indications', '1250 mg', '1250 g');
      bump(d);
    },
  },
  // cef-010 — typo Garrahan 300 mg/min → cada 12 h
  {
    file: 'content/branches/atencion-sanitaria/farmacologia/drugs/cef-010.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'dose'], '300 mg/min', '300 mg/dosis cada 12 hs');
      bump(d);
    },
  },
  {
    file: 'content/locales/pt-BR/farmacologia/drugs/cef-010.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'dose'], '300 mg/min', '300 mg/dose a cada 12 h');
      bump(d);
    },
  },
  // esp-001 — typo Garrahan Hipocalcemia → Hipokalemia
  {
    file: 'content/branches/atencion-sanitaria/farmacologia/drugs/esp-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'dose'], 'Hipocalcemia', 'Hipokalemia');
      bump(d);
    },
  },
  {
    file: 'content/locales/pt-BR/farmacologia/drugs/esp-001.json',
    apply(d) {
      replaceNested(d, ['dilution', 'pediatrico', 'dose'], 'Hipocalcemia', 'Hipocalemia');
      bump(d);
    },
  },
];

for (const { file, apply } of patches) {
  const data = readJson(file);
  apply(data);
  writeJson(file, data);
  console.log(`✓ ${file}`);
}

console.log(`\n${patches.length} archivos corregidos.`);
