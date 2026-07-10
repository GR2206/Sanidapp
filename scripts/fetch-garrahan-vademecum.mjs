#!/usr/bin/env node
/**
 * Consulta el Formulario Farmacéutico del Hospital Garrahan por nombre genérico.
 * Uso: node scripts/fetch-garrahan-vademecum.mjs "vancomicina"
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const BASE = 'https://farmacia.garrahan.gov.ar/Vademecum';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function decodeHtml(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Ntilde;/g, 'Ñ')
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
    const valueHtml = match[2].trim();
    fields[label] = label === 'Dosis' || label === 'Comentario de Acción Terapéutica'
      ? stripTags(valueHtml)
      : stripTags(valueHtml).replace(/\s+/g, ' ');
  }

  return fields;
}

async function fetchGarrahanDrug(genericName) {
  const query = genericName.trim();
  if (query.length < 4) {
    throw new Error('Ingrese al menos 4 caracteres (requisito del vademécum Garrahan).');
  }

  const body = new URLSearchParams({
    tipoConsulta: '1',
    txtBuscar: query,
  });

  const response = await fetch(`${BASE}/Busqueda/ObtenerDetalle/`, {
    method: 'POST',
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Garrahan respondió HTTP ${response.status}`);
  }

  const html = await response.text();
  if (!html.toLowerCase().includes('nombre genérico') && !html.toLowerCase().includes('nombre generico')) {
    throw new Error(`Sin resultados para "${query}"`);
  }

  return parseGarrahanDetail(html);
}

const query = process.argv[2];
if (!query) {
  console.error('Uso: node scripts/fetch-garrahan-vademecum.mjs "nombre generico"');
  process.exit(1);
}

const fields = await fetchGarrahanDrug(query);
const outDir = path.join(root, '.garrahan-cache');
fs.mkdirSync(outDir, { recursive: true });

const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const outPath = path.join(outDir, `${slug}.json`);
fs.writeFileSync(outPath, JSON.stringify(fields, null, 2), 'utf8');

console.log(`Guardado en ${outPath}`);
console.log(JSON.stringify(fields, null, 2));
