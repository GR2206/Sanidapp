import { Platform, type ViewStyle } from 'react-native';

import { mixHexWithBlack, mixHexWithWhite } from '@/utils/color';
import type { FreeQuickAccessTone } from '@/theme/freeCategoryPills';

/**
 * Tarjetas elevadas (home vivo): free y sanatorios en modo claro.
 */
export function freeElevatedCardStyle(enabled: boolean): ViewStyle | null {
  if (!enabled) {
    return null;
  }

  return {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: Platform.OS === 'android' ? 3 : 0,
  };
}

/** Pastel + acento vivo a partir del color de marca del sanatorio. */
export function brandQuickAccessTone(brandHex: string): FreeQuickAccessTone {
  const base = brandHex?.trim() || '#00B4D8';
  return {
    gradient: [mixHexWithWhite(base, 0.82), mixHexWithWhite(base, 0.66)],
    icon: base,
    label: mixHexWithBlack(base, 0.22),
  };
}

export function brandGradientTriple(primary: string, accent?: string): [string, string, string] {
  const a = primary?.trim() || '#00B4D8';
  const b = accent?.trim() || mixHexWithWhite(a, 0.25);
  return [a, b, mixHexWithBlack(a, 0.45)];
}

export function brandSoftFill(brandHex: string, amount = 0.88): string {
  return mixHexWithWhite(brandHex?.trim() || '#00B4D8', amount);
}
