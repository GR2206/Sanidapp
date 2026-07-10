import { APP_CONFIG } from '@/constants/config';
import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import { sharePdfFromHtml } from '@/services/pdf/sharePdf';
import type { Protocol } from '@/types/protocol';
import { htmlLang } from '@/utils/collatorLocale';
import { escapeHtml } from '@/utils/escapeHtml';
import { markdownToHtml } from '@/utils/markdownToHtml';
import { protocolCategoryLabel, protocolDivisionLabel } from '@/utils/protocolLabels';

function buildBibliographyHtml(protocol: Protocol, locale: AppLocale): string {
  if (protocol.bibliography.length === 0) {
    return '';
  }

  const items = protocol.bibliography
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

function buildMetaLine(protocol: Protocol, locale: AppLocale): string {
  const parts = [
    APP_CONFIG.name,
    protocolCategoryLabel(protocol.category, locale),
    `v${protocol.version}`,
  ];

  if (protocol.division) {
    parts.splice(2, 0, protocolDivisionLabel(protocol.division, locale));
  }

  if (protocol.updatedAt) {
    parts.push(translate(locale, 'pdf.metaUpdated', { date: protocol.updatedAt }));
  }

  return parts.join(' · ');
}

export function buildProtocolPdfHtml(protocol: Protocol, locale: AppLocale = 'es'): string {
  const bodyHtml = markdownToHtml(protocol.body);
  const bibliographyHtml = buildBibliographyHtml(protocol, locale);
  const year = new Date().getFullYear();

  const summaryHtml = protocol.executiveSummary?.trim()
    ? `
    <section class="summary">
      <p class="summary-label">${escapeHtml(translate(locale, 'pdf.executiveSummary'))}</p>
      <p class="summary-text">${escapeHtml(protocol.executiveSummary)}</p>
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
      .bibliography {
        margin-top: 8mm;
        padding-top: 6mm;
        border-top: 1px solid #e8e8ea;
      }
      .bib-list {
        margin: 0;
        padding-left: 5mm;
      }
      .bib-list li {
        margin-bottom: 3mm;
        color: #52525b;
      }
      .bib-index {
        font-weight: 600;
        color: #1a1a1a;
      }
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
    <h1>${escapeHtml(protocol.title)}</h1>
    <p class="meta">${escapeHtml(buildMetaLine(protocol, locale))} · ID ${escapeHtml(protocol.id)}</p>

    ${summaryHtml}

    <section class="section content">
      ${bodyHtml}
    </section>

    ${bibliographyHtml}

    <p class="footer">
      ${escapeHtml(translate(locale, 'pdf.footer', { year }))}
    </p>
  </body>
</html>`;
}

export async function exportProtocolPdf(protocol: Protocol, locale: AppLocale = 'es'): Promise<void> {
  const html = buildProtocolPdfHtml(protocol, locale);
  await sharePdfFromHtml(html, translate(locale, 'pdf.downloadDialog', { title: protocol.title }));
}
