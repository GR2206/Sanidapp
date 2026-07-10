import { APP_CONFIG } from '@/constants/config';
import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import { sharePdfFromHtml } from '@/services/pdf/sharePdf';
import type {
  Pathology,
  PathologyClinicalBox,
  PathologyClinicalIllustration,
} from '@/types/pathology';
import { htmlLang } from '@/utils/collatorLocale';
import { escapeHtml } from '@/utils/escapeHtml';
import { markdownToHtml } from '@/utils/markdownToHtml';

function illustrationLabel(locale: AppLocale, illustration: PathologyClinicalIllustration): string {
  return translate(locale, `pdf.illustration.${illustration}`);
}

function resolveClinicalBoxes(pathology: Pathology): PathologyClinicalBox[] {
  if (pathology.clinicalBoxes && pathology.clinicalBoxes.length > 0) {
    return pathology.clinicalBoxes;
  }
  if (pathology.clinicalBox) {
    return [pathology.clinicalBox];
  }
  return [];
}

function buildClinicalBoxesHtml(pathology: Pathology, locale: AppLocale): string {
  const boxes = resolveClinicalBoxes(pathology);
  if (boxes.length === 0) {
    return '';
  }

  const sections = boxes
    .map((box) => {
      const illustrationNote = box.illustration
        ? `<p class="illustration-note">${escapeHtml(illustrationLabel(locale, box.illustration))}</p>`
        : '';
      const contentHtml = box.content?.trim() ? markdownToHtml(box.content) : '';

      return `
        <section class="clinical-box">
          <h3>${escapeHtml(box.title)}</h3>
          ${illustrationNote}
          ${contentHtml}
        </section>
      `;
    })
    .join('');

  return `
    <section class="section">
      <h2>${escapeHtml(translate(locale, 'pdf.clinicalBox'))}</h2>
      ${sections}
    </section>
  `;
}

function buildRelatedDrugsHtml(pathology: Pathology, locale: AppLocale): string {
  if (!pathology.relatedDrugs || pathology.relatedDrugs.length === 0) {
    return '';
  }

  const items = pathology.relatedDrugs
    .map((item) => `<li>${escapeHtml(item.label ?? item.drugId)} <span class="muted">(${escapeHtml(item.drugId)})</span></li>`)
    .join('');

  return `
    <section class="section">
      <h2>${escapeHtml(translate(locale, 'pdf.relatedDrugs'))}</h2>
      <ul>${items}</ul>
    </section>
  `;
}

function buildBibliographyHtml(pathology: Pathology, locale: AppLocale): string {
  if (pathology.bibliography.length === 0) {
    return '';
  }

  const items = pathology.bibliography
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

function buildMetaLine(pathology: Pathology, locale: AppLocale): string {
  const parts = [APP_CONFIG.name, translate(locale, 'pdf.pathologies'), `v${pathology.version}`];
  if (pathology.updatedAt) {
    parts.push(translate(locale, 'pdf.metaUpdated', { date: pathology.updatedAt }));
  }
  return parts.join(' · ');
}

export function buildPathologyPdfHtml(pathology: Pathology, locale: AppLocale = 'es'): string {
  const bodyHtml = markdownToHtml(pathology.body);
  const clinicalBoxesHtml = buildClinicalBoxesHtml(pathology, locale);
  const relatedDrugsHtml = buildRelatedDrugsHtml(pathology, locale);
  const bibliographyHtml = buildBibliographyHtml(pathology, locale);
  const year = new Date().getFullYear();

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
      .section h2 {
        font-size: 13pt;
        color: #2c4a6e;
        margin: 0 0 4mm;
      }
      .clinical-box {
        margin-bottom: 6mm;
        padding: 4mm;
        border: 1px solid #e8e8ea;
        border-radius: 6px;
        page-break-inside: avoid;
      }
      .clinical-box h3 {
        font-size: 11.5pt;
        color: #2c4a6e;
        margin: 0 0 3mm;
      }
      .illustration-note {
        margin: 0 0 3mm;
        font-size: 9.5pt;
        color: #52525b;
        font-style: italic;
      }
      .content h2, .content h3, .content h4 {
        color: #2c4a6e;
        margin-top: 6mm;
        margin-bottom: 3mm;
      }
      .content p, .content ul, .content ol { margin: 0 0 4mm; }
      .content li { margin-bottom: 1.5mm; }
      .content blockquote {
        margin: 0 0 4mm;
        padding: 3mm 4mm;
        border-left: 3px solid #3d5a80;
        background: #f4f4f5;
        color: #52525b;
      }
      .muted { color: #8a8a8e; font-size: 9.5pt; }
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
    <h1>${escapeHtml(pathology.name)}</h1>
    <p class="meta">${escapeHtml(buildMetaLine(pathology, locale))} · ID ${escapeHtml(pathology.id)}</p>

    <section class="section content">
      ${bodyHtml}
    </section>

    ${clinicalBoxesHtml}
    ${relatedDrugsHtml}
    ${bibliographyHtml}

    <p class="footer">
      ${escapeHtml(translate(locale, 'pdf.footer', { year }))}
    </p>
  </body>
</html>`;
}

export async function exportPathologyPdf(pathology: Pathology, locale: AppLocale = 'es'): Promise<void> {
  const html = buildPathologyPdfHtml(pathology, locale);
  await sharePdfFromHtml(html, translate(locale, 'pdf.downloadDialog', { title: pathology.name }));
}
