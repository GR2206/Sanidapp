export const ETT_SIZES_MM = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as const;

export type EttSizeMm = (typeof ETT_SIZES_MM)[number];

const ETT_SIZE_BY_MAX_WEIGHT_KG: { maxKg: number; size: EttSizeMm }[] = [
  { maxKg: 2, size: 2.5 },
  { maxKg: 3, size: 3 },
  { maxKg: 5, size: 3.5 },
  { maxKg: 7, size: 4 },
  { maxKg: 10, size: 4.5 },
  { maxKg: 12, size: 5 },
  { maxKg: 15, size: 5.5 },
  { maxKg: 18, size: 6 },
  { maxKg: 22, size: 6.5 },
  { maxKg: 26, size: 7 },
  { maxKg: 32, size: 7.5 },
  { maxKg: 40, size: 8 },
  { maxKg: 50, size: 8.5 },
  { maxKg: Number.POSITIVE_INFINITY, size: 9 },
];

export function parseWeightKg(value: string): number | null {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return null;

  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;

  return parsed;
}

/** Talla en cm (opcional). */
export function parseHeightCm(value: string): number | null {
  const normalized = value.trim().replace(',', '.');
  if (!normalized) return null;

  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;

  return parsed;
}

export function calculateDoseMg(params: {
  weightKg: number;
  maxDailyDoseMgPerKgPerDay: number;
  maxDosesPerDay: number;
}): number {
  return (params.weightKg * params.maxDailyDoseMgPerKgPerDay) / params.maxDosesPerDay;
}

export type DrugDoseScheme = {
  maxDailyDoseMgPerKgPerDay: number;
  maxDosesPerDay: number;
  doseIntervalHours: number;
  /** Indicación clínica breve (p. ej. infecciones graves). */
  indication?: string;
};

export type DoseResultRow = {
  dose: string;
  indication?: string;
};

export function buildDoseResultRows(
  weightKg: number,
  schemes: DrugDoseScheme[],
  formatDose: (mg: number, hours: number) => string,
): DoseResultRow[] {
  return schemes.map((scheme) => {
    const doseMg = calculateDoseMg({ weightKg, ...scheme });
    return {
      dose: formatDose(doseMg, scheme.doseIntervalHours),
      indication: scheme.indication?.trim() || undefined,
    };
  });
}

/** @deprecated Prefer buildDoseResultRows for indication-aware lists. */
export function buildDoseResultLines(
  weightKg: number,
  schemes: DrugDoseScheme[],
  formatLine: (mg: number, hours: number) => string,
): string[] {
  return buildDoseResultRows(weightKg, schemes, formatLine).map((row) =>
    row.indication ? `${row.dose} · ${row.indication}` : row.dose,
  );
}

/**
 * Superficie corporal (m²) — fórmula simplificada por peso:
 * BSA = (4·W + 7) / (W + 90)
 */
export function calculateBodySurfaceAreaM2(weightKg: number): number {
  return (weightKg * 4 + 7) / (90 + weightKg);
}

/** @deprecated Usar calculateBodySurfaceAreaM2 */
export function calculatePediatricBmiIndex(weightKg: number): number {
  return calculateBodySurfaceAreaM2(weightKg);
}

/** IMC (kg/m²) = peso / talla². `heightCm` en centímetros. */
export function calculateBodyMassIndex(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function recommendEttSizeByWeightKg(weightKg: number): EttSizeMm {
  const match = ETT_SIZE_BY_MAX_WEIGHT_KG.find((entry) => weightKg <= entry.maxKg);
  return match?.size ?? 9;
}

export function calculateEttDepthCm(ettSizeMm: number): number {
  return ettSizeMm * 3;
}

export function formatClinicalNumber(value: number, fractionDigits = 2): string {
  const rounded = Number(value.toFixed(fractionDigits));
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatEttSize(size: number): string {
  return Number.isInteger(size) ? String(size) : size.toFixed(1).replace('.', ',');
}
