import type { TextStyle, ViewStyle } from 'react-native';

import {
  FREE_CATEGORY_PILL_TONES,
  FREE_QUICK_ACCESS_TONES,
  type FreeCategoryPillTone,
  type FreeQuickAccessTone,
} from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';

/** Ciclo de pasteles (mismo lenguaje visual que Acceso rápido). */
export const LIVELY_ACCENT_CYCLE = [
  FREE_QUICK_ACCESS_TONES.adulto,
  FREE_QUICK_ACCESS_TONES.pediatrico,
  FREE_QUICK_ACCESS_TONES.neonatologia,
  FREE_QUICK_ACCESS_TONES.farmacologia,
] as const;

export const LIVELY_PILL_CYCLE: FreeCategoryPillTone[] = [
  FREE_CATEGORY_PILL_TONES.adulto,
  FREE_CATEGORY_PILL_TONES.pediatria,
  FREE_CATEGORY_PILL_TONES.neonatologia,
  FREE_CATEGORY_PILL_TONES.farmacologia,
  FREE_CATEGORY_PILL_TONES.patologia,
  FREE_CATEGORY_PILL_TONES.protocolo,
];

export function livelyToneAt(index: number): FreeQuickAccessTone {
  return LIVELY_ACCENT_CYCLE[((index % LIVELY_ACCENT_CYCLE.length) + LIVELY_ACCENT_CYCLE.length) % LIVELY_ACCENT_CYCLE.length];
}

export function livelyPillAt(index: number): FreeCategoryPillTone {
  return LIVELY_PILL_CYCLE[((index % LIVELY_PILL_CYCLE.length) + LIVELY_PILL_CYCLE.length) % LIVELY_PILL_CYCLE.length];
}

/** Título de sección tipo Favoritos / Recientes / Acceso rápido. */
export function livelySectionTitleStyle(
  textSecondary: string,
  fontFamily?: string,
): TextStyle {
  return {
    color: textSecondary,
    fontFamily,
    letterSpacing: 0.7,
  };
}

/** Título con acento de paleta (p. ej. letra A–Z o tabs). */
export function livelyAccentTitleStyle(tone: FreeQuickAccessTone, fontFamily?: string): TextStyle {
  return {
    color: tone.label,
    fontFamily,
    letterSpacing: 0.5,
  };
}

export function livelyElevatedStyle(isDark: boolean): ViewStyle | null {
  return freeElevatedCardStyle(!isDark);
}

export function livelySearchFieldStyle(
  isDark: boolean,
  fallback: { backgroundColor: string; borderColor: string },
): ViewStyle {
  const elevated = livelyElevatedStyle(isDark);
  if (elevated) {
    return {
      ...elevated,
      borderRadius: 999,
      borderWidth: 0,
    };
  }
  return {
    backgroundColor: fallback.backgroundColor,
    borderColor: fallback.borderColor,
    borderWidth: 1,
    borderRadius: 999,
  };
}

/** Tabs de Cálculos: Dosis / Goteo / Regla 3. */
export function livelyCalcTabTone(tabId: 'dose' | 'goteo' | 'regla'): FreeQuickAccessTone {
  switch (tabId) {
    case 'dose':
      return FREE_QUICK_ACCESS_TONES.farmacologia;
    case 'goteo':
      return FREE_QUICK_ACCESS_TONES.neonatologia;
    case 'regla':
      return FREE_QUICK_ACCESS_TONES.pediatrico;
  }
}
