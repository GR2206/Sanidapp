#!/usr/bin/env node
/**
 * Aplica datos del Formulario Farmacéutico Garrahan a monografías y parámetros de cálculo.
 * Uso: node scripts/apply-garrahan-batch.mjs aci-001 ade-001 ...
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const BASE = 'https://farmacia.garrahan.gov.ar/Vademecum';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const drugsDir = path.join(root, 'content/branches/atencion-sanitaria/farmacologia/drugs');
const garrahanParamsPath = path.join(root, 'src/constants/calculations/drugCalculationGarrahan.json');
const indexPath = path.join(root, 'content/branches/atencion-sanitaria/farmacologia/index.json');

const MANUAL_SCHEMES = {
  'amp-002': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 300, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'azi-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 12, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'azt-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cvd-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.16, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.7, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'cas-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'cef-006': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 300, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'cef-008': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'cef-009': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cef-010': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 18, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 24, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 36, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cef-011': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 187.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cef-012': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 135, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cip-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'cli-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'caf-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 2.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'clp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 6, doseIntervalHours: 4 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 6, doseIntervalHours: 4 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'col-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'dap-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'dia-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 1.8, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'dig-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.01, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.02, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.005, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'bup-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'dif-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'dip-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 40, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 80, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'enp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.08, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.6, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'eno-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'eri-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 50, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'ert-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 2, doseIntervalHours: 12 }],
  },
  'esp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3.3, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 3.3, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'est-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'fny-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'phb-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'flc-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'flu-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 12, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'fsc-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 180, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 180, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'fos-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 400, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'fur-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'gen-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 7.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'hal-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.025, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 0.025, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.15, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'hdr-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.75, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 7.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'hct-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'hio-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.9, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 1.8, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'imp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 60, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 60, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'ket-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'lin-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'mer-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 60, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'met-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 35, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'ome-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'ond-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.45, maxDosesPerDay: 3, doseIntervalHours: 8 }],
  },
  'ivb-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 2, doseIntervalHours: 12 }],
  },
  'ktr-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'lvt-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 40, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 60, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'lid-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'man-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 250, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 500, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 1000, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'mor-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 6, doseIntervalHours: 4 },
      { maxDailyDoseMgPerKgPerDay: 0.6, maxDosesPerDay: 6, doseIntervalHours: 4 },
    ],
  },
  'nal-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.01, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'pnc-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'lor-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.3, maxDosesPerDay: 6, doseIntervalHours: 4 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 0.15, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'los-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.75, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'mep-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'mtp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.4, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 0.8, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'pip-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 300, maxDosesPerDay: 3, doseIntervalHours: 8 }],
  },
  'roc-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.45, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.6, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'vec-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'rif-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'sal-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 12, doseIntervalHours: 2 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 12, doseIntervalHours: 2 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'trm-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'min-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'nit-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 7, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 2.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'ose-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'pol-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'pos-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 12, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 18, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'prp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.75, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 5, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 16, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'ran-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'tei-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 16, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'tri-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 12, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'val-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 50, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 30, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'vor-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 18, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 16, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'zid-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 6, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 24, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'sav-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 3.2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 4.6, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 6.2, maxDosesPerDay: 2, doseIntervalHours: 12 },
    ],
  },
  'sil-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 1.5, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 4, doseIntervalHours: 6 },
    ],
  },
  'vrp-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 8, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'sug-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 16, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'srf-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 100, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 200, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'war-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'mag-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 25, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 75, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'ate-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'clo-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.002, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.006, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.0015, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 0.003, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 0.025, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'azt-002': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 4, doseIntervalHours: 6 },
      { maxDailyDoseMgPerKgPerDay: 90, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 120, maxDosesPerDay: 3, doseIntervalHours: 8 },
      { maxDailyDoseMgPerKgPerDay: 150, maxDosesPerDay: 3, doseIntervalHours: 8 },
    ],
  },
  'tia-001': { schemes: [] },
  'nif-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 0.25, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'mox-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'lev-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 2, doseIntervalHours: 12 },
      { maxDailyDoseMgPerKgPerDay: 10, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 15, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 20, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'ade-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'atr-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.02, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'flm-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.01, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'mid-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'ltx-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.01, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.015, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'esm-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.6, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'lab-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.5, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 1, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 2, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 3, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 4, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'mil-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.05, maxDosesPerDay: 1, doseIntervalHours: 24 }],
  },
  'glc-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.02, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.03, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.1, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
  'ipr-001': {
    schemes: [{ maxDailyDoseMgPerKgPerDay: 0.075, maxDosesPerDay: 3, doseIntervalHours: 8 }],
  },
  'fnt-001': {
    schemes: [
      { maxDailyDoseMgPerKgPerDay: 0.001, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.002, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.005, maxDosesPerDay: 1, doseIntervalHours: 24 },
      { maxDailyDoseMgPerKgPerDay: 0.01, maxDosesPerDay: 1, doseIntervalHours: 24 },
    ],
  },
};

/** Garrahan devuelve otro fármaco o no tiene monografía útil — no sobrescribir. */
const GARRAHAN_SKIP = new Set([
  'dxt-001', 'glu-001', 'dic-001', 'eri-001', 'fen-001', 'gnc-001', 'fon-001',
  'hdc-001', 'pho-001', 'inp-001', 'ins-001', 'isa-001', 'sul-001', 'tob-001', 'vls-001',
  'met-001', 'hct-001',
]);

const SEARCH_TERMS = {
  'amo-002': 'clavulanico',
  'amp-002': 'sulbactam',
  'atr-002': 'atracurium',
  'amf-003': 'anfotericina',
  'amf-001': 'anfotericina',
  'amf-002': 'liposomal',
  'adr-001': 'adrenalina',
  'alb-001': 'albumina',
  'aml-001': 'amlodipina',
  'ipr-001': 'ipratropio',
  'cas-001': 'caspofung',
  'cef-001': 'cefalexina',
  'cef-009': 'cefalotina',
  'cef-011': 'avibactam',
  'cef-012': 'ceftolozano',
  'cst-001': 'cisatracurio',
  'caf-001': 'cafeina',
  'cac-001': 'calcio cloruro',
  'clp-001': 'clorpromazina',
  'kcl-001': 'potasio cloruro',
  'nsh-001': 'sodio cloruro',
  'col-001': 'colistimetato',
  'dap-001': 'daptomicina',
  'des-001': 'desmopresina',
  'dex-001': 'dexmedetomidina',
  'dia-001': 'diazepam',
  'dif-001': 'difenhidramina',
  'dig-001': 'digoxina',
  'bup-001': 'bupivacaina',
  'dip-001': 'dipirona',
  'dob-001': 'dobutamina',
  'dop-001': 'dopamina',
  'enp-001': 'enalapril',
  'eno-001': 'enoxaparina',
  'eri-001': 'eritromicina',
  'esm-001': 'esmolol',
  'ert-001': 'ertapenem',
  'esp-001': 'espironolactona',
  'est-001': 'estreptomicina',
  'fny-001': 'fenitoina',
  'phb-001': 'fenobarbital',
  'vit-001': 'fitomenadiona',
  'flc-001': 'flecainida',
  'flu-001': 'fluconazol',
  'fnt-001': 'fentanilo citrato',
  'flm-001': 'flumazenil',
  'fsc-001': 'foscarnet',
  'fos-001': 'fosfomicina',
  'fur-001': 'furosemida',
  'gen-001': 'gentamicina',
  'hal-001': 'haloperidol',
  'hdr-001': 'hidralazina',
  'cag-001': 'calcio gluconato',
  'glc-001': 'glucagon',
  'hef-001': 'heparina',
  'hct-001': 'hidroclorotiazida',
  'hio-001': 'hioscina',
  'imp-001': 'imipenem',
  'ket-001': 'ketamina',
  'lab-001': 'labetalol',
  'lin-001': 'linezolid',
  'mer-001': 'meropenem',
  'met-001': 'metroNIDAZOL',
  'mid-001': 'midazolam',
  'ome-001': 'omeprazol',
  'ond-001': 'ondansetron',
  'fer-001': 'hierro',
  'ivb-001': 'ivabradina',
  'ktr-001': 'ketorolac',
  'lvt-001': 'levetiracetam',
  'lid-001': 'lidocaina',
  'man-001': 'manitol',
  'mor-001': 'morfina',
  'nal-001': 'naloxona',
  'pnc-001': 'pancuronio',
  'nip-001': 'nitroprusiato',
  'nor-001': 'noradrenalina',
  'mil-001': 'milrinona',
  'ltx-001': 'levotiroxina',
  'lor-001': 'lorazepam',
  'los-001': 'losartan',
  'mep-001': 'metilprednisolona',
  'mtp-001': 'metoclopramida',
  'pro-001': 'propofol',
  'roc-001': 'rocuronio',
  'vec-001': 'vecuronio',
  'pip-001': 'piperacilina',
  'pen-001': 'penicilina g',
  'pen-002': 'benzatinica',
  'rif-001': 'rifampicina',
  'sal-001': 'salbutamol',
  'trm-001': 'tramadol',
  'min-001': 'minociclina',
  'nit-001': 'nitrofurantoina',
  'ose-001': 'oseltamivir',
  'pol-001': 'polimixina b',
  'pos-001': 'posaconazol',
  'prp-001': 'propranolol',
  'prt-001': 'protamina',
  'ran-001': 'ranitidina',
  'tei-001': 'teicoplanina',
  'tri-001': 'trimetoprima',
  'val-001': 'acido valproico',
  'vor-001': 'voriconazol',
  'zid-001': 'zidovudina',
  'sav-001': 'sacubitril',
  'sil-001': 'sildenafil',
  'vrp-001': 'verapamilo',
  'sug-001': 'sugammadex',
  'srf-001': 'surfactante',
  'war-001': 'warfarina',
  'ngl-001': 'nitroglicerina',
  'vas-001': 'vasopresina',
  'mag-001': 'magnesio sulfato',
  'imu-001': 'gammaglobulina',
  'ate-001': 'atenolol',
  'clo-001': 'clonidina',
  'rem-001': 'remifentanilo',
  'azt-002': 'aztreonam',
  'tia-001': 'tiamina',
  'nif-001': 'nifedipina',
  'mox-001': 'moxifloxacina',
  'lev-001': 'levofloxacina',
  'ade-001': 'adenosina',
  'atr-001': 'atropina',
  'flm-001': 'flumazenil',
};

function decodeHtml(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&micro;/g, 'µ');
}

function stripTags(html) {
  return decodeHtml(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  );
}

function parseGarrahanDetail(html) {
  const fields = {};
  const rowPattern =
    /<tr>\s*<td class="titleGrilla">([^<]+)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/gi;
  let match;

  while ((match = rowPattern.exec(html)) !== null) {
    const label = decodeHtml(match[1].trim());
    fields[label] = stripTags(match[2]);
  }

  return fields;
}

async function fetchGarrahanDrug(query) {
  const body = new URLSearchParams({ tipoConsulta: '1', txtBuscar: query });
  const response = await fetch(`${BASE}/Busqueda/ObtenerDetalle/`, {
    method: 'POST',
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  });

  if (!response.ok) throw new Error(`HTTP ${response.status} for ${query}`);
  const html = await response.text();
  if (!html.toLowerCase().includes('nombre gen')) throw new Error(`Sin resultados para ${query}`);
  return parseGarrahanDetail(html);
}

function parseNumber(value) {
  return Number.parseFloat(value.replace(',', '.'));
}

function parseGarrahanDoseSchemes(dosisText) {
  if (!dosisText) return [];

  const schemes = [];
  const seen = new Set();
  const text = dosisText.replace(/\s+/g, ' ');

  const dailyPatterns = [
    /(\d+(?:[.,]\d+)?)(?:\s*-\s*(\d+(?:[.,]\d+)?))?\s*mg[^.]*?\/\s*kg\s*\/\s*d[ií]a[^.]*?(?:cada|c\s*\/)\s*(\d+)\s*h(?:s)?/gi,
    /(\d+(?:[.,]\d+)?)(?:\s*-\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*d[ií]a[^.]*?(?:cada|c\s*\/)\s*(\d+)\s*h(?:s)?/gi,
    /(\d+(?:[.,]\d+)?)\s*mg\s*\/\s*kg\s*\/\s*dosis[^.]*?(?:cada|c\s*\/)\s*(\d+)\s*h(?:s)?/gi,
    /(\d+(?:[.,]\d+)?)(?:\s*-\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*d[ií]a[^.]*una vez por d[ií]a/gi,
    /(\d+(?:[.,]\d+)?)\s*mg\s*\/\s*kg\s*\/\s*d[ií]a[^.]*una vez por d[ií]a/gi,
  ];

  for (const pattern of dailyPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const values = match[2] && !match[0].includes('una vez')
        ? [parseNumber(match[1]), parseNumber(match[2])]
        : [parseNumber(match[1])];
      const interval = match[3]
        ? Number.parseInt(match[3], 10)
        : match[0].includes('una vez')
          ? 24
          : null;
      if (!interval) continue;

      for (const daily of values) {
        const doses = Math.max(1, Math.round(24 / interval));
        const key = `${daily}-${interval}`;
        if (seen.has(key)) continue;
        seen.add(key);
        schemes.push({
          maxDailyDoseMgPerKgPerDay: daily,
          maxDosesPerDay: doses,
          doseIntervalHours: interval,
        });
      }
    }
  }

  return schemes.sort((a, b) => a.doseIntervalHours - b.doseIntervalHours);
}

function sanitizeGarrahanText(text) {
  if (!text) return text;
  return text
    .replace(/\s*Ver tabla de ajuste de dosis de antimicrobianos en I\.R\.?/gi, '')
    .replace(/\s*Ver tabla de ajuste de antimicrobianos en I\.R\.?/gi, '')
    .replace(/\s*Ver tabla de ajuste de dosis en I\.R\.[^.]*\.?/gi, '')
    .replace(/\s*Ver tabla de ajuste de dosis de antibi[oó]ticos en I\.R\.?/gi, '')
    .replace(/\s*Ver tabla de dosis de antiinfecciosos en I\.H\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildIndications(actionText) {
  const body = actionText?.trim();
  if (!body) return undefined;
  return `## Indicaciones principales\n\n${body}\n\n> Ajustar según protocolo institucional y prescripción médica.`;
}

function buildBibliographyEntry(fields) {
  const generic = fields['Nombre Genérico']?.trim() ?? 'Fármaco';
  const code = fields['Código Quimico'] ?? fields['Código Químico'] ?? '';
  const atc = fields.ATC ?? '';
  const codePart = [code && `cód. ${code}`, atc && `ATC ${atc}`].filter(Boolean).join(', ');
  return {
    citation: `Hospital de Pediatría SAMIC Prof. Dr. Juan P. Garrahan. Formulario Farmacéutico Institucional — ${generic}${codePart ? ` (${codePart})` : ''}.`,
    url: 'https://farmacia.garrahan.gov.ar/Vademecum/Busqueda',
  };
}

function upsertBibliography(drug, entry) {
  const bibliography = Array.isArray(drug.bibliography) ? [...drug.bibliography] : [];
  const filtered = bibliography.filter(
    (item) =>
      !item.url?.includes('AjustedosisIR') &&
      !item.citation?.toLowerCase().includes('tabla de ajuste de dosis'),
  );
  const garrahanIndex = filtered.findIndex(
    (item) => item.url === entry.url && item.citation?.includes('Garrahan'),
  );
  if (garrahanIndex >= 0) {
    filtered[garrahanIndex] = entry;
  } else {
    filtered.unshift(entry);
  }
  return filtered;
}

function applyGarrahanToDrug(drug, fields) {
  const action = fields['Comentario de Acción Terapéutica'];
  const dosis = fields.Dosis;
  const effects = fields['Efectos Adversos'];
  const presentation = fields['Forma de Presentación'];
  const observation = fields.Observación;
  const routes = fields['Vías de Administración'];

  if (action) {
    drug.executiveSummary = action.replace(/\s+/g, ' ').slice(0, 280);
    const indications = buildIndications(action);
    if (indications) drug.indications = indications;
  }

  drug.dilution ??= {};
  drug.dilution.pediatrico ??= {};
  if (presentation) drug.dilution.pediatrico.presentation = sanitizeGarrahanText(presentation);
  if (routes) drug.dilution.pediatrico.administration = sanitizeGarrahanText(routes);
  if (dosis) drug.dilution.pediatrico.dose = sanitizeGarrahanText(dosis).slice(0, 1200);
  if (observation) drug.dilution.pediatrico.notes = sanitizeGarrahanText(observation).slice(0, 1200);

  if (effects) {
    drug.adverseEffects = `## Efectos adversos\n\n${effects.replace(/\s+/g, ' ')}`;
  }

  drug.bibliography = upsertBibliography(drug, buildBibliographyEntry(fields));
  drug.version = bumpPatchVersion(drug.version);
  drug.updatedAt = new Date().toISOString().slice(0, 10);

  return drug;
}

function bumpPatchVersion(version = '1.0') {
  const parts = String(version).split('.').map((part) => Number.parseInt(part, 10));
  const major = parts[0] || 1;
  const minor = parts[1] || 0;
  const patch = (parts[2] || 0) + 1;
  return `${major}.${minor}.${patch}`;
}

function searchTermForDrug(drugId, drugName) {
  if (SEARCH_TERMS[drugId]) return SEARCH_TERMS[drugId];
  return drugName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[/(]/)[0]
    .trim()
    .toLowerCase();
}

const drugIds = process.argv.slice(2);
if (!drugIds.length) {
  console.error('Uso: node scripts/apply-garrahan-batch.mjs <drug-id> [...]');
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const names = Object.fromEntries(index.drugs.map((drug) => [drug.id, drug.name]));
const garrahanParams = fs.existsSync(garrahanParamsPath)
  ? JSON.parse(fs.readFileSync(garrahanParamsPath, 'utf8'))
  : {};

for (const drugId of drugIds) {
  const drugName = names[drugId];
  const drugPath = path.join(drugsDir, `${drugId}.json`);
  if (!drugName || !fs.existsSync(drugPath)) {
    console.warn(`Omitido ${drugId}: no encontrado`);
    continue;
  }

  if (GARRAHAN_SKIP.has(drugId)) {
    console.log(`  ⊘ Omitido: búsqueda Garrahan no confiable para este fármaco`);
    continue;
  }

  const query = searchTermForDrug(drugId, drugName);
  console.log(`\n→ ${drugId} (${drugName}) buscando "${query}"...`);

  try {
    const fields = await fetchGarrahanDrug(query);
    const drug = applyGarrahanToDrug(JSON.parse(fs.readFileSync(drugPath, 'utf8')), fields);
    fs.writeFileSync(drugPath, `${JSON.stringify(drug, null, 2)}\n`, 'utf8');

    const schemes =
      MANUAL_SCHEMES[drugId]?.schemes ?? parseGarrahanDoseSchemes(fields.Dosis ?? '');
    if (schemes.length) {
      garrahanParams[drugId] = { schemes };
      console.log(
        `  ✓ monografía + ${schemes.length} pauta(s) de cálculo${MANUAL_SCHEMES[drugId] ? ' (manual)' : ''}`,
      );
      schemes.forEach((scheme) => {
        console.log(
          `    · ${scheme.maxDailyDoseMgPerKgPerDay} mg/kg/día · cada ${scheme.doseIntervalHours} h`,
        );
      });
    } else {
      console.log('  ✓ monografía (sin pautas mg/kg automáticas)');
    }
  } catch (error) {
    console.error(`  ✗ ${error.message}`);
  }
}

fs.writeFileSync(garrahanParamsPath, `${JSON.stringify(garrahanParams, null, 2)}\n`, 'utf8');
console.log(`\nGuardado ${garrahanParamsPath}`);
