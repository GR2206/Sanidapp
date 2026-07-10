/**
 * Exporta el ícono estetoscopio de LogoMark (Material Community Icons) a PNG.
 * Uso: node scripts/export-sanidapp-stethoscope-icon.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const ACCENT = '#2C4A6E';
const BORDER = '#E8E8EA';
const WHITE = '#FFFFFF';
const SIZE = 1024;
const ICON_VIEWBOX = 24;
const ICON_SIZE = SIZE * 0.44;

/** Material Design Icons — stethoscope (misma glifo que MaterialCommunityIcons). */
const STETHOSCOPE_PATH =
  'M19,11C19.5,11 20,11.5 20,12V17.5C20,19.43 18.43,21 16.5,21C14.57,21 13,19.43 13,17.5V12H11V17.5C11,19.43 9.43,21 7.5,21C5.57,21 4,19.43 4,17.5V12C4,11.5 4.5,11 5,11C5.55,11 6,11.45 6,12V17.5C6,18.33 6.67,19 7.5,19C8.33,19 9,18.33 9,17.5V12H15V17.5C15,18.33 15.67,19 16.5,19C17.33,19 18,18.33 18,17.5V12C18,11.45 18.45,11 19,11M12,10A3,3 0 0,0 15,7V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V7A3,3 0 0,0 12,10Z';

function buildLogoMarkSvg({ transparentBackground }) {
  const bg = transparentBackground ? 'none' : WHITE;
  const iconScale = ICON_SIZE / ICON_VIEWBOX;
  const iconOffset = (SIZE - ICON_SIZE) / 2;
  const radius = SIZE / 2 - 2;

  return `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  ${transparentBackground ? '' : `<rect width="${SIZE}" height="${SIZE}" fill="${WHITE}"/>`}
  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${radius}" fill="${WHITE}" stroke="${BORDER}" stroke-width="4"/>
  <g transform="translate(${iconOffset} ${iconOffset}) scale(${iconScale})">
    <path fill="${ACCENT}" d="${STETHOSCOPE_PATH}"/>
  </g>
</svg>`;
}

async function exportPng(filename, transparentBackground) {
  const svg = buildLogoMarkSvg({ transparentBackground });
  const outPath = join(root, 'assets', 'images', filename);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  return outPath;
}

const withBg = await exportPng('sanidapp-stethoscope-icon.png', false);
const transparent = await exportPng('sanidapp-stethoscope-icon-transparent.png', true);

writeFileSync(
  join(root, 'assets', 'images', 'sanidapp-stethoscope-icon.svg'),
  buildLogoMarkSvg({ transparentBackground: true }),
  'utf8',
);

console.log('Generado:');
console.log(' -', withBg);
console.log(' -', transparent);
console.log(' -', join(root, 'assets', 'images', 'sanidapp-stethoscope-icon.svg'));
