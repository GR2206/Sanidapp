function normalizePersonText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function detectDelimiter(headerLine) {
  const semicolons = (headerLine.match(/;/g) ?? []).length;
  const commas = (headerLine.match(/,/g) ?? []).length;
  return semicolons > commas ? ';' : ',';
}

function parseCsvLine(line, delimiter) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsvStaff(csv) {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = parseCsvLine(lines[0], delimiter).map((header) => header.toLowerCase());
  const columnIndex = Object.fromEntries(headers.map((header, index) => [header, index]));

  if (!('nombre' in columnIndex) || !('apellido' in columnIndex)) {
    return [];
  }

  const rangoIndex = columnIndex.rango;

  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line, delimiter);
    return {
      nombre: cells[columnIndex.nombre] ?? '',
      apellido: cells[columnIndex.apellido] ?? '',
      rango: rangoIndex !== undefined ? cells[rangoIndex] ?? '' : '',
    };
  });
}

function personNameTokens(value) {
  return normalizePersonText(value).split(' ').filter(Boolean);
}

function staffEntryMatchesPerson(entry, input) {
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

function findStaffEntryByPerson(staff, input) {
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

function entryMatchesName(entry, nombre, apellido) {
  return findStaffEntryByPerson([entry], { nombre, apellido }) !== null;
}

async function fetchGistCsv(gistEntry) {
  const user = gistEntry.user?.trim() || 'GR2206';
  const gistId = gistEntry.gistId?.trim();
  const filename = gistEntry.filename?.trim();

  if (!gistId || !filename) {
    throw new Error('Padrón sin gistId o filename configurado.');
  }

  const url = `https://gist.githubusercontent.com/${user}/${gistId}/raw/${filename}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el padrón (${response.status}).`);
  }

  return parseCsvStaff(await response.text());
}

async function loadStaffAllowlist(config, sanatorioId) {
  const gistEntry = config?.sanatorios?.[sanatorioId];
  if (!gistEntry) {
    return [];
  }

  return fetchGistCsv(gistEntry);
}

function findStaffMatch(staff, nombre, apellido) {
  return findStaffEntryByPerson(staff, { nombre, apellido });
}

module.exports = {
  findStaffMatch,
  loadStaffAllowlist,
  normalizePersonText,
};
