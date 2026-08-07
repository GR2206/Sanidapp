import type { DrugDoseScheme } from '@/utils/clinicalCalculations';

export type DoseIndicationHint = {
  label: string;
  dailyMgPerKg: number;
  perDoseMgPerKg: number | null;
  intervalHours: number | null;
};

type ClinicalRole =
  | 'loading'
  | 'maintenance'
  | 'mild'
  | 'severe'
  | 'prophylaxis'
  | 'route_iv'
  | 'route_oral'
  | 'age'
  | 'other';

const ROLE_PATTERNS: { role: ClinicalRole; re: RegExp; label: string }[] = [
  {
    role: 'loading',
    re: /\b(dosis\s+de\s+ataque|dosis\s+de\s+carga|ataque|carga|impregnaci[oó]n|bolo\s+inicial|dosis\s+inicial|digitalizaci[oó]n)\b/i,
    label: 'Dosis de ataque / carga',
  },
  {
    role: 'maintenance',
    re: /\b(mantenimiento|dosis\s+de\s+mantenimiento|continuar|luego|despu[eé]s)\b/i,
    label: 'Dosis de mantenimiento',
  },
  {
    role: 'prophylaxis',
    re: /\b(profilaxis|profil[aá]ctico|prevenci[oó]n)\b/i,
    label: 'Profilaxis',
  },
  {
    role: 'severe',
    re: /\b(graves?|severas?|meningitis|bacteriemia|sepsis|UTI\s*grave|infecciones?\s+graves?)\b/i,
    label: 'Infecciones graves',
  },
  {
    role: 'mild',
    re: /\b(leves?|moderadas?|no\s+complicad|infecciones?\s+leves?)\b/i,
    label: 'Infecciones leves / moderadas',
  },
  {
    role: 'route_iv',
    re: /\b(e\.?\s*v\.?|i\.?\s*v\.?|endovenos|intravenos|infusi[oó]n)\b/i,
    label: 'Vía endovenosa',
  },
  {
    role: 'route_oral',
    re: /\b(v\.?\s*o\.?|oral|v[ií]a\s+oral)\b/i,
    label: 'Vía oral',
  },
];

function decodeDoseHtml(text: string): string {
  return text
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&Aacute;/gi, 'Á')
    .replace(/&Eacute;/gi, 'É')
    .replace(/&Iacute;/gi, 'Í')
    .replace(/&Oacute;/gi, 'Ó')
    .replace(/&Uacute;/gi, 'Ú')
    .replace(/&Ntilde;/gi, 'Ñ')
    .replace(/&sup2;/gi, '²')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumber(raw: string): number {
  return Number.parseFloat(raw.replace(',', '.'));
}

function detectRole(snippet: string): { role: ClinicalRole; label: string } | null {
  for (const item of ROLE_PATTERNS) {
    if (item.re.test(snippet)) {
      return { role: item.role, label: item.label };
    }
  }
  return null;
}

function cleanLabel(raw: string): string {
  let label = raw
    .replace(/^[\s.;:,\-–—|/]+/, '')
    .replace(/[\s.;:,\-–—|/]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();

  const byBreak = label.split(/(?<=[.;])\s+/);
  label = (byBreak[byBreak.length - 1] ?? label).trim();

  if (label.length > 72) {
    label = `${label.slice(0, 69).trim()}…`;
  }

  return label;
}

function buildLabelFromContext(before: string, after: string): string {
  const window = `${before} ${after}`.trim();

  // Nombre clínico tipo "Varicela, herpes zóster:" o "Encefalitis herpética:"
  const clinicalName = before.match(
    /([A-Za-zÁÉÍÓÚÜáéíóúüÑñ][A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s,/()\-]{2,50}?)\s*:\s*(?:[<>]=?\s*\d+[^:]{0,20}:\s*)?$/i,
  );
  let clinical = clinicalName?.[1] ? cleanLabel(clinicalName[1]) : '';
  if (/^(v\.?\s*o\.?|e\.?\s*v\.?|i\.?\s*v\.?|ni[nñ]os?|adultos?)$/i.test(clinical)) {
    clinical = '';
  }

  const role = detectRole(window);
  const age = before.match(/([<>]=?\s*\d+(?:\s*a\s*\d+)?\s*(?:meses|a[ñn]os))/i);
  const ageLabel = age?.[1]?.replace(/\s+/g, ' ').trim() ?? '';

  if (role && role.role !== 'route_iv' && role.role !== 'route_oral') {
    if (clinical && clinical.length >= 4) {
      return ageLabel ? `${role.label}: ${clinical} (${ageLabel})` : `${role.label}: ${clinical}`;
    }
    if (ageLabel) return `${role.label} (${ageLabel})`;
    return role.label;
  }

  if (clinical && clinical.length >= 4) {
    const routeSuffix =
      role?.role === 'route_oral' ? ' · VO' : role?.role === 'route_iv' ? ' · EV' : '';
    return ageLabel ? `${clinical} (${ageLabel})${routeSuffix}` : `${clinical}${routeSuffix}`;
  }

  if (ageLabel) {
    return `Edad: ${ageLabel}`;
  }

  if (role?.role === 'route_oral') return 'Vía oral';
  if (role?.role === 'route_iv') return 'Vía endovenosa';

  const cleaned = cleanLabel(before);
  if (cleaned.length >= 4) return cleaned;

  return '';
}

/**
 * Extrae pares etiqueta ↔ dosis del texto de monografía (dilution.*.dose).
 */
export function extractDoseIndicationHints(doseText: string | undefined | null): DoseIndicationHint[] {
  if (!doseText?.trim()) {
    return [];
  }

  const text = decodeDoseHtml(doseText);
  const hints: DoseIndicationHint[] = [];

  const re =
    /(\d+(?:[.,]\d+)?)(?:\s*(?:a|[-–—])\s*(\d+(?:[.,]\d+)?))?\s*mg\s*(?:\([^)]{0,80}\))?\s*\/\s*kg(?:\s*\/\s*(d[ií]a|dosis))?/gi;

  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const low = parseNumber(match[1]);
    const high = match[2] ? parseNumber(match[2]) : low;
    if (!Number.isFinite(low) || low <= 0) {
      continue;
    }

    const unit = (match[3] ?? 'día').toLowerCase();
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 56);
    const intervalMatch = after.match(/^\s*(?:c\/\s*|cada\s*)(\d+)\s*h/i);
    const intervalHours = intervalMatch ? Number.parseInt(intervalMatch[1], 10) : null;

    const before = text.slice(Math.max(0, match.index - 140), match.index);
    const label = buildLabelFromContext(before, after);

    const values = low === high ? [low] : [low, high];
    for (const value of values) {
      const perDose = unit.startsWith('dos') ? value : null;
      const daily =
        unit.startsWith('dos') && intervalHours
          ? value * Math.max(1, Math.round(24 / intervalHours))
          : value;

      hints.push({
        label: label || 'Esquema de la monografía',
        dailyMgPerKg: daily,
        perDoseMgPerKg: perDose,
        intervalHours: Number.isFinite(intervalHours as number) ? intervalHours : null,
      });
    }
  }

  return hints;
}

function almostEqual(a: number, b: number, tolerance = 0.08): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const scale = Math.max(Math.abs(a), Math.abs(b), 1);
  return Math.abs(a - b) <= scale * tolerance;
}

function scoreHint(scheme: DrugDoseScheme, hint: DoseIndicationHint): number {
  const perDose = scheme.maxDailyDoseMgPerKgPerDay / Math.max(1, scheme.maxDosesPerDay);
  let score = 0;

  const intervalBonus =
    hint.intervalHours != null &&
    Number.isFinite(scheme.doseIntervalHours) &&
    hint.intervalHours === scheme.doseIntervalHours
      ? 3
      : 0;

  const intervalPenalty =
    hint.intervalHours != null &&
    Number.isFinite(scheme.doseIntervalHours) &&
    hint.intervalHours !== scheme.doseIntervalHours
      ? -4
      : 0;

  if (hint.perDoseMgPerKg != null) {
    if (almostEqual(hint.perDoseMgPerKg, perDose)) {
      score += 5;
      if (almostEqual(hint.dailyMgPerKg, scheme.maxDailyDoseMgPerKgPerDay)) {
        score += 1;
      }
    }
  } else if (almostEqual(hint.dailyMgPerKg, scheme.maxDailyDoseMgPerKgPerDay)) {
    score += 7;
  } else if (almostEqual(hint.dailyMgPerKg, perDose)) {
    score += 3;
  }

  score += intervalBonus + intervalPenalty;
  return score;
}

function formatMg(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2).replace(/\.?0+$/, '');
}

/** Fallback corto y útil cuando no hay match textual exacto. */
function buildRelativeFallback(
  scheme: DrugDoseScheme,
  orderedByDaily: DrugDoseScheme[],
  doseText: string | null,
): string {
  const decoded = doseText ? decodeDoseHtml(doseText) : '';
  const hasLoading = /\b(ataque|carga|impregnaci[oó]n|digitalizaci[oó]n|dosis\s+inicial)\b/i.test(
    decoded,
  );
  const hasMaintenance = /\b(mantenimiento|continuar)\b/i.test(decoded);
  const hasMildSevere =
    /\b(leve|moderad|grave|sever)\b/i.test(decoded) ||
    /\bprofilaxis\b/i.test(decoded);

  const idx = orderedByDaily.indexOf(scheme);
  const n = orderedByDaily.length;
  const lowest = orderedByDaily[0];
  const highest = orderedByDaily[n - 1];

  if (hasLoading && hasMaintenance) {
    if (scheme === highest) return 'Dosis de ataque / carga';
    if (scheme === lowest) return 'Dosis de mantenimiento';
    return 'Dosis intermedia';
  }

  if (hasLoading && scheme === highest) {
    return 'Dosis de ataque / carga';
  }
  if (hasMaintenance && scheme === lowest) {
    return 'Dosis de mantenimiento';
  }

  if (n === 2) {
    if (scheme === lowest) {
      return hasMildSevere ? 'Dosis habitual / leve-moderada' : 'Dosis menor';
    }
    return hasLoading ? 'Dosis de ataque / carga' : hasMildSevere ? 'Dosis mayor / grave' : 'Dosis mayor';
  }

  if (scheme === lowest) return 'Dosis más baja';
  if (scheme === highest) return hasLoading ? 'Dosis de ataque / carga' : 'Dosis más alta';
  if (n === 3 && idx === 1) return 'Dosis intermedia';

  return `Esquema ${idx + 1} · ${formatMg(scheme.maxDailyDoseMgPerKgPerDay)} mg/kg/día`;
}

/**
 * Completa `indication` en esquemas múltiples con una explicación breve.
 * Nunca deja filas vacías ni textos genéricos tipo “según monografía”.
 */
export function enrichSchemesWithMonographIndications(
  schemes: DrugDoseScheme[],
  doseText: string | undefined | null,
): DrugDoseScheme[] {
  if (schemes.length <= 1) {
    return schemes;
  }

  const hints = extractDoseIndicationHints(doseText);
  const used = new Set<number>();
  const orderedByDaily = [...schemes].sort(
    (a, b) => a.maxDailyDoseMgPerKgPerDay - b.maxDailyDoseMgPerKgPerDay,
  );

  const preliminary = schemes.map((scheme) => {
    if (scheme.indication?.trim() && !/monograf/i.test(scheme.indication)) {
      return { ...scheme, indication: scheme.indication.trim() };
    }

    let bestIdx = -1;
    let bestScore = 0;
    hints.forEach((hint, index) => {
      if (used.has(index)) return;
      const score = scoreHint(scheme, hint);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = index;
      }
    });

    if (bestIdx >= 0 && bestScore >= 5) {
      const label = hints[bestIdx].label.trim();
      if (label && !/monograf/i.test(label) && label !== 'Esquema de la monografía') {
        used.add(bestIdx);
        return { ...scheme, indication: label };
      }
    }

    return {
      ...scheme,
      indication: buildRelativeFallback(scheme, orderedByDaily, doseText ?? null),
    };
  });

  // Si varias filas quedaron con la misma etiqueta débil (solo vía), discriminar por magnitud.
  const isWeakLabel = (label: string) =>
    /^Vía (oral|endovenosa)\b/i.test(label) || /^Esquema \d+/i.test(label);

  const weakCount = preliminary.filter((s) => isWeakLabel(s.indication ?? '')).length;
  if (weakCount >= Math.ceil(schemes.length / 2)) {
    return preliminary.map((scheme, index) => {
      const label = scheme.indication ?? '';
      if (!isWeakLabel(label) && scheme.indication?.trim()) {
        return scheme;
      }
      return {
        ...scheme,
        indication: buildRelativeFallback(schemes[index], orderedByDaily, doseText ?? null),
      };
    });
  }

  return preliminary;
}

/** Texto de dosis de monografía (prioriza pediátrico, como el motor de cálculos). */
export function pickMonographDoseText(drug: {
  dilution?: {
    pediatrico?: { dose?: string };
    neonatal?: { dose?: string };
    adulto?: { dose?: string };
  };
  executiveSummary?: string;
  indications?: string;
} | null | undefined): string | null {
  const dose =
    drug?.dilution?.pediatrico?.dose?.trim() ||
    drug?.dilution?.neonatal?.dose?.trim() ||
    drug?.dilution?.adulto?.dose?.trim() ||
    '';

  // Sumar resumen/indicaciones ayuda a detectar “ataque/carga/grave”.
  const extra = [drug?.executiveSummary, drug?.indications]
    .filter(Boolean)
    .join(' ')
    .replace(/[#>*_`]/g, ' ')
    .slice(0, 400);

  const merged = `${dose} ${extra}`.trim();
  return merged || null;
}
