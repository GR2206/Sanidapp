import type { DoseResultRow } from '@/utils/clinicalCalculations';
import { formatClinicalNumber } from '@/utils/clinicalCalculations';
import type { Drug } from '@/types/drug';

type RateKind =
  | 'mcg_kg_min'
  | 'ui_kg_min'
  | 'ui_kg_h'
  | 'mg_kg_h'
  | 'meq_kg_h'
  | 'mg_kg'
  | 'ui_kg'
  | 'meq_kg';

type ParsedRate = {
  kind: RateKind;
  low: number;
  high: number;
  context: string;
};

function decodeHtml(text: string): string {
  return text
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&micro;/gi, 'µ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNum(raw: string): number {
  return Number.parseFloat(raw.replace(',', '.'));
}

function cleanContext(before: string): string {
  let label = before
    .replace(/^[\s.;:,\-–—|/]+/, '')
    .replace(/[\s.;:,\-–—|/]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = label.split(/(?<=[.;])\s+/);
  label = (parts[parts.length - 1] ?? label).trim();
  if (label.length > 64) label = `${label.slice(0, 61).trim()}…`;
  return label;
}

function collectDoseTexts(drug: Drug | null | undefined): string[] {
  if (!drug?.dilution) return [];
  const texts = [
    drug.dilution.pediatrico?.dose,
    drug.dilution.adulto?.dose,
    drug.dilution.neonatal?.dose,
    drug.executiveSummary,
  ]
    .map((t) => (t ? decodeHtml(t) : ''))
    .filter((t) => t.length > 0);
  return texts;
}

/**
 * Extrae tasas peso-dependientes de texto clínico (infusiones y bolos).
 */
export function extractWeightBasedRates(doseText: string): ParsedRate[] {
  const text = decodeHtml(doseText);
  const out: ParsedRate[] = [];

  const patterns: { kind: RateKind; re: RegExp }[] = [
    {
      kind: 'mcg_kg_min',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*(?:µg|ug|mcg|μg)\s*\/\s*kg\s*\/\s*(?:min(?:uto)?s?)/gi,
    },
    {
      kind: 'ui_kg_min',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*(?:UI|U\.?I\.?|U|units?)\s*\/\s*kg\s*\/\s*(?:min(?:uto)?s?)/gi,
    },
    {
      kind: 'ui_kg_h',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*(?:UI|U\.?I\.?|U|units?)\s*\/\s*kg\s*\/\s*h(?:ora)?s?/gi,
    },
    {
      kind: 'mg_kg_h',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg\s*\/\s*h(?:ora)?s?/gi,
    },
    {
      kind: 'meq_kg_h',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*mEq\s*\/\s*kg\s*\/\s*h(?:ora)?s?/gi,
    },
    {
      kind: 'ui_kg',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*(?:UI|U\.?I\.?|U)\s*\/\s*kg(?!\s*\/)/gi,
    },
    {
      kind: 'meq_kg',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*mEq\s*\/\s*kg(?!\s*\/)/gi,
    },
    {
      kind: 'mg_kg',
      re: /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*mg\s*\/\s*kg(?!\s*\/)/gi,
    },
  ];

  for (const { kind, re } of patterns) {
    let match: RegExpExecArray | null;
    re.lastIndex = 0;
    while ((match = re.exec(text)) !== null) {
      const low = parseNum(match[1]);
      const high = match[2] ? parseNum(match[2]) : low;
      if (!Number.isFinite(low) || low <= 0) continue;
      const before = text.slice(Math.max(0, match.index - 100), match.index);
      out.push({
        kind,
        low,
        high: Number.isFinite(high) && high >= low ? high : low,
        context: cleanContext(before),
      });
    }
  }

  return out;
}

function rateKey(rate: ParsedRate): string {
  return `${rate.kind}:${rate.low}:${rate.high}`;
}

function formatRange(low: number, high: number, digits = 2): string {
  const a = formatClinicalNumber(low, digits);
  if (Math.abs(high - low) < 1e-9) return a;
  return `${a}–${formatClinicalNumber(high, digits)}`;
}

function formatAbsDose(rate: ParsedRate, weightKg: number): { dose: string; indication: string } {
  const absLow = rate.low * weightKg;
  const absHigh = rate.high * weightKg;
  const rateLabel = formatRange(rate.low, rate.high);
  const ctx = rate.context ? `${rate.context} · ` : '';

  switch (rate.kind) {
    case 'mcg_kg_min':
      return {
        dose: `${formatRange(absLow, absHigh)} mcg/min`,
        indication: `${ctx}${rateLabel} mcg/kg/min`,
      };
    case 'ui_kg_min':
      return {
        dose: `${formatRange(absLow, absHigh, 4)} UI/min`,
        indication: `${ctx}${rateLabel} UI/kg/min`,
      };
    case 'ui_kg_h':
      return {
        dose: `${formatRange(absLow, absHigh)} UI/h`,
        indication: `${ctx}${rateLabel} UI/kg/h`,
      };
    case 'mg_kg_h':
      return {
        dose: `${formatRange(absLow, absHigh)} mg/h`,
        indication: `${ctx}${rateLabel} mg/kg/h`,
      };
    case 'meq_kg_h':
      return {
        dose: `${formatRange(absLow, absHigh)} mEq/h`,
        indication: `${ctx}${rateLabel} mEq/kg/h`,
      };
    case 'ui_kg':
      return {
        dose: `${formatRange(absLow, absHigh)} UI`,
        indication: `${ctx}${rateLabel} UI/kg (bolo / dosis)`,
      };
    case 'meq_kg':
      return {
        dose: `${formatRange(absLow, absHigh)} mEq`,
        indication: `${ctx}${rateLabel} mEq/kg (bolo / dosis)`,
      };
    case 'mg_kg':
    default:
      return {
        dose: `${formatRange(absLow, absHigh)} mg`,
        indication: `${ctx}${rateLabel} mg/kg (bolo / dosis)`,
      };
  }
}

function snippetDoseText(text: string, maxLen = 140): string {
  const cleaned = decodeHtml(text)
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen - 1).trim()}…`;
}

/**
 * Cuando no hay fórmula mg/kg intermitente en DRUG_CALCULATION_PARAMS,
 * calcula dosis absolutas desde la monografía (infusiones/bolos) o muestra el esquema clínico.
 * Nunca debería devolver vacío si la monografía tiene texto de dosis.
 */
export function buildMonographFallbackDoseRows(
  weightKg: number,
  drug: Drug | null | undefined,
): DoseResultRow[] {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return [];
  }

  const texts = collectDoseTexts(drug);
  const seen = new Set<string>();
  const rows: DoseResultRow[] = [];

  for (const text of texts) {
    for (const rate of extractWeightBasedRates(text)) {
      const key = rateKey(rate);
      if (seen.has(key)) continue;
      seen.add(key);
      const formatted = formatAbsDose(rate, weightKg);
      rows.push(formatted);
      if (rows.length >= 6) return rows;
    }
  }

  if (rows.length > 0) {
    return rows;
  }

  // Sin patrón peso-dependiente parseable: mostrar esquemas de monografía (siempre info presente).
  const profiles: { label: string; dose?: string }[] = [
    { label: 'Pediátrico', dose: drug?.dilution?.pediatrico?.dose },
    { label: 'Adulto', dose: drug?.dilution?.adulto?.dose },
    { label: 'Neonatal', dose: drug?.dilution?.neonatal?.dose },
  ];

  for (const profile of profiles) {
    if (!profile.dose?.trim()) continue;
    rows.push({
      dose: snippetDoseText(profile.dose),
      indication: `Esquema ${profile.label.toLowerCase()} (monografía)`,
    });
    if (rows.length >= 3) break;
  }

  if (rows.length === 0 && drug?.executiveSummary?.trim()) {
    rows.push({
      dose: snippetDoseText(drug.executiveSummary, 160),
      indication: 'Resumen ejecutivo',
    });
  }

  return rows;
}
