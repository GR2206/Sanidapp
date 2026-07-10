export function normalizePersonText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

export function personNameTokens(value: string): string[] {
  return normalizePersonText(value).split(' ').filter(Boolean);
}

export function staffEntryMatchesPerson(
  entry: { nombre: string; apellido: string },
  input: { nombre: string; apellido: string },
): boolean {
  if (
    normalizePersonText(entry.nombre) === normalizePersonText(input.nombre) &&
    normalizePersonText(entry.apellido) === normalizePersonText(input.apellido)
  ) {
    return true;
  }

  const entryTokenSet = new Set(personNameTokens(`${entry.nombre} ${entry.apellido}`));
  const inputTokens = personNameTokens(`${input.nombre} ${input.apellido}`);

  if (inputTokens.length < 2) {
    return false;
  }

  if (!inputTokens.every((token) => entryTokenSet.has(token))) {
    return false;
  }

  const inputApellidoTokens = personNameTokens(input.apellido);
  if (inputApellidoTokens.length === 0) {
    return false;
  }

  const entryApellidoTokens = new Set(personNameTokens(entry.apellido));
  return inputApellidoTokens.some(
    (token) => entryApellidoTokens.has(token) || entryTokenSet.has(token),
  );
}

export function findStaffEntryByPerson<T extends { nombre: string; apellido: string }>(
  staff: T[],
  input: { nombre: string; apellido: string },
): T | null {
  const exact = staff.find(
    (entry) =>
      normalizePersonText(entry.nombre) === normalizePersonText(input.nombre) &&
      normalizePersonText(entry.apellido) === normalizePersonText(input.apellido),
  );

  if (exact) {
    return exact;
  }

  const matches = staff.filter((entry) => staffEntryMatchesPerson(entry, input));
  if (matches.length === 1) {
    return matches[0];
  }

  if (matches.length > 1) {
    const inputFull = normalizePersonText(`${input.nombre} ${input.apellido}`);
    return (
      matches.find(
        (entry) => normalizePersonText(`${entry.nombre} ${entry.apellido}`) === inputFull,
      ) ?? null
    );
  }

  return null;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
