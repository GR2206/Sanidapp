import { APP_CONFIG } from '@/constants/config';
import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import { sharePdfFromHtml } from '@/services/pdf/sharePdf';
import {
  DRUG_POPULATIONS,
  type Drug,
  type DrugDilutionProfile,
  type DrugPopulation,
} from '@/types/drug';
import { htmlLang } from '@/utils/collatorLocale';
import { escapeHtml } from '@/utils/escapeHtml';
import { markdownToHtml } from '@/utils/markdownToHtml';

const FIELD_KEYS = [
  'presentation',
  'reconstitution',
  'diluent',
  'finalConcentration',
  'dose',
  'infusionRate',
  'administration',
  'compatibility',
  'notes',
] as const satisfies readonly (keyof DrugDilutionProfile)[];

function populationLabel(locale: AppLocale, population: DrugPopulation): string {
  return translate(locale, `drug.population.${population}`);
}

function fieldLabel(locale: AppLocale, key: keyof DrugDilutionProfile): string {
  return translate(locale, `drug.field.${key}`);
}

function buildDilutionHtml(drug: Drug, locale: AppLocale): string {
  const sections = DRUG_POPULATIONS.map((population) => {
    const profile = drug.dilution[population];
    const rows = profile
      ? FIELD_KEYS.filter((key) => profile[key]?.trim())
          .map(
            (key) => `
        <tr>
          <th>${escapeHtml(fieldLabel(locale, key))}</th>
          <td>${escapeHtml(profile[key] ?? '')}</td>
        </tr>`,
          )
          .join('')
      : '';

    const body = rows
      ? `<table><tbody>${rows}</tbody></table>`
      : `<p class="empty-population">${escapeHtml(translate(locale, 'drug.noDataForPopulation'))}</p>`;

    return `
      <section class="population">
        <h3>${escapeHtml(populationLabel(locale, population))}</h3>
        ${body}
      </section>
    `;
  }).join('');

  return `
    <section class="section">
      <h2>${escapeHtml(translate(locale, 'pdf.preparationAllAges'))}</h2>
      ${sections}
    </section>
  `;
}

function buildBibliographyHtml(drug: Drug, locale: AppLocale): string {
  if (drug.bibliography.length === 0) {
    return '';
  }

  const items = drug.bibliography
    .map((entry, index) => {
      const citation = escapeHtml(entry.citation);
      const link = entry.url
        ? `<br /><a href="${escapeHtml(entry.url)}">${escapeHtml(entry.url)}</a>`
        : '';
      return `<li><span class="bib-index">${index + 1}.</span> ${citation}${link}</li>`;
    })
    .join('');

  return `
    <section class="section bibliography">
      <h2>${escapeHtml(translate(locale, 'pdf.bibliography'))}</h2>
      <ol class="bib-list">${items}</ol>
    </section>
  `;
}

function buildMetaLine(drug: Drug, locale: AppLocale): string {
  const parts = [APP_CONFIG.name, translate(locale, 'pdf.pharmacology'), `v${drug.version}`];
  if (drug.updatedAt) {
    parts.push(translate(locale, 'pdf.metaUpdated', { date: drug.updatedAt }));
  }
  return parts.join(' · ');
}

export function buildDrugPdfHtml(drug: Drug, locale: AppLocale = 'es'): string {
  const indicationsHtml = markdownToHtml(drug.indications);
  const stabilityHtml = markdownToHtml(drug.stability);
  const adverseEffectsHtml = markdownToHtml(drug.adverseEffects);
  const dilutionHtml = buildDilutionHtml(drug, locale);
  const bibliographyHtml = buildBibliographyHtml(drug, locale);
  const year = new Date().getFullYear();

  const summaryHtml = drug.executiveSummary
    ? `
    <section class="summary">
      <p class="summary-label">${escapeHtml(translate(locale, 'pdf.executiveSummary'))}</p>
      <p class="summary-text">${escapeHtml(drug.executiveSummary)}</p>
    </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="${htmlLang(locale)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @page { margin: 20mm 16mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #1a1a1a;
        background: #ffffff;
      }
      .brand {
        font-size: 9pt;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #2c4a6e;
        margin-bottom: 6mm;
      }
      h1 {
        font-size: 20pt;
        line-height: 1.25;
        color: #2c4a6e;
        margin: 0 0 4mm;
        font-weight: 600;
      }
      .meta {
        font-size: 9.5pt;
        color: #52525b;
        margin: 0 0 8mm;
      }
      .summary {
        background: #f4f4f5;
        border: 1px solid #e8e8ea;
        border-radius: 8px;
        padding: 5mm;
        margin-bottom: 8mm;
      }
      .summary-label {
        font-size: 9pt;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #2c4a6e;
        margin: 0 0 2mm;
      }
      .summary-text { margin: 0; color: #52525b; }
      .section h2 {
        font-size: 13pt;
        color: #2c4a6e;
        margin: 0 0 4mm;
      }
      .population {
        margin-bottom: 6mm;
        page-break-inside: avoid;
      }
      .population h3 {
        font-size: 11.5pt;
        color: #2c4a6e;
        margin: 0 0 3mm;
        padding-bottom: 2mm;
        border-bottom: 1px solid #e8e8ea;
      }
      .empty-population {
        margin: 0 0 4mm;
        color: #8a8a8e;
        font-style: italic;
      }
      .content h2, .content h3, .content h4 {
        color: #2c4a6e;
        margin-top: 6mm;
        margin-bottom: 3mm;
      }
      .content h2 { font-size: 13pt; }
      .content h3 { font-size: 11.5pt; }
      .content p, .content ul, .content ol { margin: 0 0 4mm; }
      .content li { margin-bottom: 1.5mm; }
      .content blockquote {
        margin: 0 0 4mm;
        padding: 3mm 4mm;
        border-left: 3px solid #3d5a80;
        background: #f4f4f5;
        color: #52525b;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 5mm;
        font-size: 10pt;
      }
      th, td {
        border: 1px solid #e8e8ea;
        padding: 2.5mm 3mm;
        text-align: left;
        vertical-align: top;
      }
      th {
        width: 32%;
        background: #f4f4f5;
        color: #1a1a1a;
        font-weight: 600;
      }
      .bibliography {
        margin-top: 8mm;
        padding-top: 6mm;
        border-top: 1px solid #e8e8ea;
      }
      .bib-list { margin: 0; padding-left: 5mm; }
      .bib-list li { margin-bottom: 3mm; color: #52525b; }
      .bib-index { font-weight: 600; color: #1a1a1a; }
      .footer {
        margin-top: 10mm;
        padding-top: 4mm;
        border-top: 1px solid #e8e8ea;
        font-size: 8.5pt;
        color: #8a8a8e;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="brand">SANIDAPP</div>
    <h1>${escapeHtml(drug.name)}</h1>
    <p class="meta">${escapeHtml(buildMetaLine(drug, locale))} · ID ${escapeHtml(drug.id)}</p>

    ${summaryHtml}

    <section class="section content">
      <h2>${escapeHtml(translate(locale, 'drug.indication'))}</h2>
      ${indicationsHtml}
    </section>

    ${dilutionHtml}

    <section class="section content">
      <h2>${escapeHtml(translate(locale, 'drug.stability'))}</h2>
      ${stabilityHtml}
    </section>

    <section class="section content">
      <h2>${escapeHtml(translate(locale, 'drug.adverseEffects'))}</h2>
      ${adverseEffectsHtml}
    </section>

    ${bibliographyHtml}

    <p class="footer">
      ${escapeHtml(translate(locale, 'pdf.footer', { year }))}
    </p>
  </body>
</html>`;
}

export async function exportDrugPdf(drug: Drug, locale: AppLocale = 'es'): Promise<void> {
  const html = buildDrugPdfHtml(drug, locale);
  await sharePdfFromHtml(html, translate(locale, 'pdf.downloadDialog', { title: drug.name }));
}
