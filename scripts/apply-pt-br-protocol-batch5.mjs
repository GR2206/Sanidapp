#!/usr/bin/env node
/**
 * Lote 5/5 — 10 protocolos neonatologia pt-BR finales desde español revisado.
 * CRÍTICO: peso (g), IG, edad postnatal, volúmenes y parâmetros ventilatórios idênticos al ES.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_BASE = path.join(__dirname, '../content/locales/pt-BR/categories');

// Conteúdo completo — cada protocolo preserva valores numéricos del ES fuente
const protocols = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'apply-pt-br-protocol-batch5-data.json'),
  'utf8'
));

for (const p of protocols) {
  const out = {
    id: p.id,
    title: p.title,
    category: p.category,
    branch: 'atencion-sanitaria',
    version: p.version,
    executiveSummary: p.executiveSummary,
    body: p.body,
    bibliography: p.bibliography,
  };
  if (p.division) out.division = p.division;
  const dir = path.join(OUT_BASE, p.category, 'protocols');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${p.id}.json`), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`✓ ${p.id}`);
}

console.log(`\nLote 5 protocolos: ${protocols.length} monografías pt-BR (neonatologia) — PROTOCOLOS COMPLETOS`);
