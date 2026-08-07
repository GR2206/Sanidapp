/** Interpreta precios libres de cursos.
 * ARS histórico: digitos (“$15.000” → 15000).
 * Internacional: respeta decimales (“20.50”, “€20”, “20,50”).
 */
export function parseFeedPriceArs(precio: string | undefined | null): number | null {
  return parseFeedPriceMoney(precio, 'ARS');
}

export function parseFeedPriceMoney(
  precio: string | undefined | null,
  currency: 'ARS' | 'EUR' | 'USD' = 'ARS',
): number | null {
  const raw = String(precio ?? '')
    .trim()
    .toLowerCase();
  if (!raw) return null;
  if (raw.includes('gratis') || raw.includes('free') || raw === '0') {
    return 0;
  }

  if (currency === 'ARS') {
    const digits = raw.replace(/[^\d]/g, '');
    if (!digits) return null;
    const amount = Number(digits);
    return Number.isFinite(amount) && amount >= 0 ? amount : null;
  }

  let cleaned = raw.replace(/[^\d.,]/g, '');
  if (!cleaned) return null;

  if (cleaned.includes(',') && cleaned.includes('.')) {
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    if (lastComma > lastDot) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = `${parts[0].replace(/\./g, '')}.${parts[1]}`;
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes('.')) {
    const parts = cleaned.split('.');
    const last = parts[parts.length - 1];
    if (parts.length === 2 && last.length <= 2) {
      // decimal OK
    } else if (parts.length > 2 || (parts.length === 2 && last.length === 3)) {
      cleaned = cleaned.replace(/\./g, '');
    }
  }

  const amount = Number(cleaned);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export function isStripeFeedCurrency(
  currency: string | undefined | null,
): currency is 'EUR' | 'USD' {
  const c = String(currency ?? '').toUpperCase();
  return c === 'EUR' || c === 'USD';
}
