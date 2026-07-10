import QRCode from 'qrcode';

import { APP_CONFIG } from '@/constants/config';
import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import { i18nError } from '@/i18n/resolveMessage';
import { sharePdfFromHtml } from '@/services/pdf/sharePdf';
import { getProtocolQrPayload } from '@/services/qr/qrEncoder';
import { getProtocolDisplayDate, type ProtocolMeta } from '@/types/protocol';
import { htmlLang } from '@/utils/collatorLocale';
import { escapeHtml } from '@/utils/escapeHtml';

export type QrSheetSection = {
  title: string;
  protocols: ProtocolMeta[];
};

async function buildQrSvg(value: string): Promise<string> {
  return QRCode.toString(value, {
    type: 'svg',
    margin: 1,
    width: 132,
    color: {
      dark: '#1A1A1A',
      light: '#FFFFFF',
    },
  });
}

async function buildQrCardHtml(protocol: ProtocolMeta): Promise<string> {
  const qrValue = getProtocolQrPayload(protocol.id, protocol.qrPayload);
  const svg = await buildQrSvg(qrValue);
  const displayDate = getProtocolDisplayDate(protocol);

  return `
    <article class="qr-card">
      <div class="qr-frame">${svg}</div>
      <h2 class="qr-title">${escapeHtml(protocol.title)}</h2>
      <p class="qr-year">${escapeHtml(displayDate)}</p>
    </article>
  `;
}

async function buildSectionHtml(section: QrSheetSection): Promise<string> {
  const cards = await Promise.all(section.protocols.map((protocol) => buildQrCardHtml(protocol)));

  return `
    <section class="category-block">
      <h2 class="category-title">${escapeHtml(section.title)}</h2>
      ${cards.join('')}
    </section>
  `;
}

export async function buildQrSheetPdfHtml(
  sections: QrSheetSection[],
  locale: AppLocale = 'es',
): Promise<string> {
  const sectionHtml = await Promise.all(sections.map((section) => buildSectionHtml(section)));
  const totalProtocols = sections.reduce((sum, section) => sum + section.protocols.length, 0);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="${htmlLang(locale)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @page {
        margin: 14mm 12mm;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: Helvetica, Arial, sans-serif;
        color: #1a1a1a;
        background: #ffffff;
      }
      .sheet-header {
        text-align: center;
        margin-bottom: 8mm;
        padding-bottom: 4mm;
        border-bottom: 1px solid #e8e8ea;
      }
      .brand {
        font-size: 9pt;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #2c4a6e;
        margin: 0 0 2mm;
      }
      .sheet-title {
        font-size: 15pt;
        color: #2c4a6e;
        margin: 0 0 2mm;
        font-weight: 600;
      }
      .sheet-meta {
        font-size: 9pt;
        color: #8a8a8e;
        margin: 0;
      }
      .category-block {
        margin-bottom: 6mm;
      }
      .category-title {
        font-size: 10pt;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #2c4a6e;
        margin: 0 0 4mm;
        font-weight: 600;
      }
      .qr-card {
        border: 1px solid #d4d4d8;
        border-radius: 10px;
        padding: 5mm 4mm;
        margin: 0 0 4mm;
        text-align: center;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .qr-frame {
        display: inline-block;
        border: 1px solid #e8e8ea;
        border-radius: 6px;
        padding: 2mm;
        background: #ffffff;
      }
      .qr-frame svg {
        display: block;
        width: 34mm;
        height: 34mm;
      }
      .qr-title {
        font-size: 11pt;
        line-height: 1.35;
        margin: 3mm 2mm 1mm;
        font-weight: 600;
        color: #1a1a1a;
      }
      .qr-year {
        font-size: 9pt;
        margin: 0;
        color: #8a8a8e;
      }
      .sheet-footer {
        margin-top: 6mm;
        padding-top: 4mm;
        border-top: 1px solid #e8e8ea;
        font-size: 8pt;
        color: #8a8a8e;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <header class="sheet-header">
      <p class="brand">${escapeHtml(APP_CONFIG.name.toUpperCase())}</p>
      <h1 class="sheet-title">${escapeHtml(translate(locale, 'pdf.qrSheetTitle'))}</h1>
      <p class="sheet-meta">${escapeHtml(translate(locale, 'pdf.qrSheetMeta', { count: totalProtocols }))}</p>
    </header>

    ${sectionHtml.join('')}

    <p class="sheet-footer">
      ${escapeHtml(translate(locale, 'pdf.footer', { year }))}
    </p>
  </body>
</html>`;
}

export async function exportQrSheetPdf(
  sections: QrSheetSection[],
  locale: AppLocale = 'es',
): Promise<void> {
  if (sections.every((section) => section.protocols.length === 0)) {
    throw i18nError('pdf.noProtocolsExport');
  }

  const html = await buildQrSheetPdfHtml(sections, locale);
  await sharePdfFromHtml(html, translate(locale, 'pdf.downloadQrDialog'));
}
