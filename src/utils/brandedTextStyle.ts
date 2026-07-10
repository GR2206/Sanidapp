const WHITE_HEX = '#ffffff';

export function normalizeHexColor(color: string): string | null {
  if (!color || typeof color !== 'string') {
    return null;
  }

  const trimmed = color.trim().toLowerCase();

  if (trimmed.startsWith('rgba') || trimmed.startsWith('rgb')) {
    const match = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!match) {
      return null;
    }

    const channels = [match[1], match[2], match[3]].map((value) =>
      Number(value).toString(16).padStart(2, '0'),
    );
    return `#${channels.join('')}`;
  }

  if (!trimmed.startsWith('#')) {
    return null;
  }

  const hex = trimmed.slice(1);
  if (hex.length === 3) {
    return `#${hex
      .split('')
      .map((channel) => channel + channel)
      .join('')}`;
  }

  if (hex.length >= 6) {
    return `#${hex.slice(0, 6)}`;
  }

  return null;
}

export function shouldBoldAccentTextColor(
  color: string | undefined,
  options: { boldAccentText: boolean; primaryColor: string },
): boolean {
  if (!options.boldAccentText || !color) {
    return false;
  }

  const normalized = normalizeHexColor(color);
  const primary = normalizeHexColor(options.primaryColor);

  if (!normalized) {
    return false;
  }

  if (normalized === primary || normalized === WHITE_HEX) {
    return false;
  }

  return true;
}

export function resolveBrandedTextFontFamily(options: {
  boldAccentText: boolean;
  color?: string;
  primaryColor: string;
  boldFont: string;
  baseFont?: string;
}): string | null {
  if (
    !shouldBoldAccentTextColor(options.color, {
      boldAccentText: options.boldAccentText,
      primaryColor: options.primaryColor,
    })
  ) {
    return null;
  }

  return options.boldFont;
}
