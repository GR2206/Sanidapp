export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : normalized;

  const value = Number.parseInt(full, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/** Luminancia relativa sRGB (0–1). Acepta `#RGB` / `#RRGGBB`. */
export function hexLuminance(hex: string): number {
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : raw;
  if (full.length !== 6 || !/^[0-9a-fA-F]+$/.test(full)) {
    return 0.5;
  }
  const red = Number.parseInt(full.slice(0, 2), 16) / 255;
  const green = Number.parseInt(full.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(full.slice(4, 6), 16) / 255;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function colorLuminance(color: string): number {
  const rgba = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (rgba) {
    const red = Number(rgba[1]) / 255;
    const green = Number(rgba[2]) / 255;
    const blue = Number(rgba[3]) / 255;
    const alpha = rgba[4] != null ? Number(rgba[4]) : 1;
    const solid = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    // Sobre fondo oscuro, el relleno semitransparente se ve más claro cuanto mayor es el alpha.
    return solid * Math.min(Math.max(alpha, 0), 1);
  }
  return hexLuminance(color);
}

/** Tinta legible sobre un relleno (blanco o casi negro). */
export function contrastingInk(background: string): string {
  return colorLuminance(background) > 0.52 ? '#0E141D' : '#FFFFFF';
}

function parseHexRgb(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((channel) => channel + channel)
          .join('')
      : raw;
  if (full.length !== 6 || !/^[0-9a-fA-F]+$/.test(full)) {
    return null;
  }
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('')}`;
}

/** Mezcla un color con blanco (0 = original, 1 = blanco). Ideal pasteles de marca. */
export function mixHexWithWhite(hex: string, whiteAmount: number): string {
  const rgb = parseHexRgb(hex);
  if (!rgb) return hex;
  const t = Math.max(0, Math.min(1, whiteAmount));
  return toHex(
    rgb.r + (255 - rgb.r) * t,
    rgb.g + (255 - rgb.g) * t,
    rgb.b + (255 - rgb.b) * t,
  );
}

/** Mezcla un color con negro (0 = original, 1 = negro). Ideal extremos de gradiente. */
export function mixHexWithBlack(hex: string, blackAmount: number): string {
  const rgb = parseHexRgb(hex);
  if (!rgb) return hex;
  const t = Math.max(0, Math.min(1, blackAmount));
  return toHex(rgb.r * (1 - t), rgb.g * (1 - t), rgb.b * (1 - t));
}
