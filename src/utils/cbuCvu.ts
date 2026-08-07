/** CBU/CVU argentino: 22 dígitos. */
export function normalizeCbuCvu(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validación de formato CBU/CVU (longitud + dígitos verificadores de bloque).
 * No consulta titularidad bancaria; eso requiere API externa.
 */
export function isValidCbuCvuFormat(value: string): boolean {
  const digits = normalizeCbuCvu(value);
  if (!/^\d{22}$/.test(digits)) {
    return false;
  }

  const block1 = digits.slice(0, 8);
  const block2 = digits.slice(8, 22);
  return verifyCbuBlock(block1) && verifyCbuBlock(block2);
}

function verifyCbuBlock(block: string): boolean {
  const weights =
    block.length === 8 ? [7, 1, 3, 9, 7, 1, 3] : [3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3];
  const body = block.slice(0, -1);
  const checkDigit = Number(block[block.length - 1]);
  if (!Number.isFinite(checkDigit)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < body.length; i += 1) {
    sum += Number(body[i]) * weights[i];
  }
  const expected = (10 - (sum % 10)) % 10;
  return expected === checkDigit;
}

export function formatCbuCvuDisplay(value: string): string {
  const digits = normalizeCbuCvu(value);
  if (digits.length <= 8) return digits;
  return `${digits.slice(0, 8)} ${digits.slice(8)}`;
}
