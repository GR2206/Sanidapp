import { palette } from '@/theme/colors';
import { hexToRgba } from '@/utils/color';

import type { SanatorioTheme } from '@/contexts/SanatorioThemeContext';

export type AppearanceMode = 'light' | 'dark' | 'auto';

export interface DashboardColors {
  accent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderSubtle: string;
  overlay: string;
  imageOverlay: string;
  shadow: string;
  pageBackground: string;
  watermarkOpacity: number;
}

export const dashboardLightColors: DashboardColors = {
  accent: palette.accent,
  text: palette.text,
  textSecondary: palette.textSecondary,
  textMuted: palette.textMuted,
  surface: 'rgba(255, 255, 255, 0.92)',
  surfaceMuted: palette.backgroundSoft,
  border: palette.border,
  borderSubtle: 'rgba(44, 74, 110, 0.14)',
  overlay: 'rgba(255, 255, 255, 0.08)',
  imageOverlay: 'rgba(255, 255, 255, 0.12)',
  shadow: palette.accent,
  pageBackground: palette.background,
  watermarkOpacity: 0,
};

export const dashboardDarkColors: DashboardColors = {
  accent: '#9EC5F0',
  text: '#F0F4F8',
  textSecondary: '#C2CED9',
  textMuted: '#8A97A8',
  surface: 'rgba(22, 30, 42, 0.88)',
  surfaceMuted: 'rgba(30, 40, 54, 0.9)',
  border: 'rgba(255, 255, 255, 0.14)',
  borderSubtle: 'rgba(158, 197, 240, 0.2)',
  overlay: 'rgba(8, 12, 20, 0.62)',
  imageOverlay: 'rgba(8, 12, 20, 0.58)',
  shadow: '#000000',
  pageBackground: '#0E141D',
  watermarkOpacity: 0,
};

export function getBrandedDashboardColors(theme: SanatorioTheme, isDark: boolean): DashboardColors {
  const chrome = theme.neutralChrome ? theme.accent : theme.primary;

  if (isDark) {
    return {
      accent: theme.neutralChrome ? theme.accent : theme.primary,
      text: '#F0F4F8',
      textSecondary: hexToRgba(theme.secondary, 0.92),
      textMuted: '#9AA8B8',
      surface: theme.neutralChrome ? 'rgba(18, 24, 32, 0.9)' : 'rgba(18, 24, 32, 0.9)',
      surfaceMuted: theme.neutralChrome ? 'rgba(255, 255, 255, 0.06)' : hexToRgba(theme.primary, 0.14),
      border: hexToRgba(chrome, 0.28),
      borderSubtle: hexToRgba(chrome, 0.18),
      overlay: hexToRgba('#000000', 0.45),
      imageOverlay: theme.neutralChrome ? 'transparent' : hexToRgba(theme.primary, 0.18),
      shadow: '#000000',
      pageBackground: '#0E141D',
      watermarkOpacity: theme.neutralChrome ? 0.035 : 0.055,
    };
  }

  return {
    accent: theme.neutralChrome ? theme.accent : theme.primary,
    text: theme.accent,
    textSecondary: hexToRgba(theme.accent, 0.78),
    textMuted: hexToRgba(theme.accent, 0.58),
    surface: theme.neutralChrome ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.9)',
    surfaceMuted: theme.neutralChrome ? '#FFFFFF' : theme.secondary,
    border: hexToRgba(chrome, theme.neutralChrome ? 0.12 : 0.16),
    borderSubtle: hexToRgba(chrome, theme.neutralChrome ? 0.1 : 0.2),
    overlay: theme.neutralChrome ? 'transparent' : hexToRgba(theme.primary, 0.05),
    imageOverlay: theme.neutralChrome ? 'transparent' : hexToRgba(theme.primary, 0.06),
    shadow: theme.neutralChrome ? theme.accent : theme.primary,
    pageBackground: theme.background,
    watermarkOpacity: theme.neutralChrome ? 0.05 : 0.09,
  };
}

export function getDashboardColors(isDark: boolean): DashboardColors {
  return isDark ? dashboardDarkColors : dashboardLightColors;
}

/** Modo guardia: oscuro entre las 20:00 y las 07:00 (hora local). */
export function isGuardiaDarkHour(date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= 20 || hour < 7;
}

export function resolveAppearanceIsDark(mode: AppearanceMode, date = new Date()): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return isGuardiaDarkHour(date);
}

/** @deprecated Use `useAppLabels().appearanceMode()` or `t('appearance.modes.*')` instead. */
export const APPEARANCE_MODE_LABELS: Record<AppearanceMode, string> = {
  light: 'Claro',
  dark: 'Guardia',
  auto: 'Auto (guardia)',
};
