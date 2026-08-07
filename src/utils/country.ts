/** Códigos ISO 3166-1 alpha-2 que cuentan como Argentina para cursos/congresos free. */
const ARGENTINA_CODES = new Set(['AR', 'ARG', 'ARGENTINA']);

export function normalizeCountryCode(value: string | null | undefined): string {
  return (value ?? '').trim().toUpperCase();
}

export function isArgentinaCountry(value: string | null | undefined): boolean {
  const code = normalizeCountryCode(value);
  if (!code) return false;
  if (ARGENTINA_CODES.has(code)) return true;
  return code.includes('ARGENTINA') || code === 'AR-';
}

/** Heurística por región de sanatorio (catálogo local). */
export function countryFromSanatorioRegion(
  regionId?: string | null,
  regionLabel?: string | null,
): string {
  const id = (regionId ?? '').toLowerCase();
  const label = (regionLabel ?? '').toLowerCase();
  if (id.includes('rosario') || id.startsWith('ar-') || id === 'ar') {
    return 'AR';
  }
  if (label.includes('argentina')) {
    return 'AR';
  }
  return '';
}
