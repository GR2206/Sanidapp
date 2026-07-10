import { useMemo } from 'react';

import { useAppearance } from '@/contexts/AppearanceContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { getSanatorioLogoSource } from '@/constants/sanatorioAssets';
import { palette } from '@/theme/colors';
import { getBrandedDashboardColors, getDashboardColors } from '@/theme/dashboardColors';
import { resolveSanatorioFonts, type ResolvedSanatorioFonts } from '@/theme/sanatorioFonts';
import { hexToRgba } from '@/utils/color';

export interface AppThemeColors {
  button: string;
  buttonAlt: string;
  buttonMuted: string;
  header: string;
  textAccent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  menuText: string;
  menuTextMuted: string;
  background: string;
  backgroundSoft: string;
  menuBackground: string;
  menuTint: string;
  border: string;
  borderStrong: string;
}

export interface AppNavigationTheme {
  headerStyle: { backgroundColor: string };
  headerTintColor: string;
  headerTitleColor: string;
  headerTitleFontFamily: string;
  contentBackground: string;
  drawerBackground: string;
}

export function useAppTheme() {
  const { sanatorio, theme, hasBranding } = useSanatorioTheme();
  const { isDark } = useAppearance();

  return useMemo(() => {
    const logoSource = sanatorio ? getSanatorioLogoSource(sanatorio.id) : null;
    const fonts: ResolvedSanatorioFonts = resolveSanatorioFonts(theme.fontFamily);

    if (!hasBranding || !sanatorio) {
      const dashboard = getDashboardColors(isDark);
      const colors: AppThemeColors = {
        button: dashboard.accent,
        buttonAlt: dashboard.accent,
        buttonMuted: hexToRgba(dashboard.accent, 0.55),
        header: dashboard.accent,
        textAccent: dashboard.accent,
        text: dashboard.text,
        textSecondary: dashboard.textSecondary,
        textMuted: dashboard.textMuted,
        menuText: dashboard.text,
        menuTextMuted: dashboard.textMuted,
        background: dashboard.pageBackground,
        backgroundSoft: dashboard.surfaceMuted,
        menuBackground: dashboard.surface,
        menuTint: 'transparent',
        border: dashboard.border,
        borderStrong: dashboard.borderSubtle,
      };

      return {
        hasBranding: false,
        isDashboardDark: isDark,
        sanatorio: null,
        theme,
        logoSource,
        fonts,
        colors,
        navigation: {
          headerStyle: { backgroundColor: isDark ? dashboard.surfaceMuted : palette.background },
          headerTintColor: dashboard.accent,
          headerTitleColor: dashboard.text,
          headerTitleFontFamily: fonts.semiBold,
          contentBackground: dashboard.pageBackground,
          drawerBackground: dashboard.surface,
        } satisfies AppNavigationTheme,
      };
    }

    const dashboard = getBrandedDashboardColors(theme, isDark);
    const menuBackground = theme.transparentMenu
      ? isDark
        ? 'rgba(14, 20, 29, 0.94)'
        : 'rgba(255, 255, 255, 0.82)'
      : dashboard.surface;
    const menuTint =
      theme.transparentMenu || theme.neutralChrome
        ? 'transparent'
        : hexToRgba(theme.primary, isDark ? 0.1 : 0.14);
    const menuText = isDark ? '#F0F4F8' : theme.accent;
    const menuTextMuted = isDark ? '#9AA8B8' : hexToRgba(theme.accent, 0.62);
    const colors: AppThemeColors = {
      button: theme.primary,
      buttonAlt: theme.accent,
      buttonMuted: hexToRgba(theme.primary, 0.55),
      header: isDark ? dashboard.accent : theme.accent,
      textAccent: isDark ? dashboard.text : theme.accent,
      text: dashboard.text,
      textSecondary: dashboard.textSecondary,
      textMuted: dashboard.textMuted,
      menuText,
      menuTextMuted,
      background: dashboard.pageBackground,
      backgroundSoft: isDark
        ? hexToRgba('#FFFFFF', 0.08)
        : theme.neutralChrome
          ? '#F5F7FA'
          : dashboard.surfaceMuted,
      menuBackground,
      menuTint,
      border: dashboard.border,
      borderStrong: dashboard.borderSubtle,
    };

    return {
      hasBranding: true,
      isDashboardDark: isDark,
      sanatorio,
      theme,
      logoSource,
      fonts,
      colors,
      navigation: {
        headerStyle: { backgroundColor: dashboard.surfaceMuted },
        headerTintColor: theme.primary,
        headerTitleColor: isDark ? dashboard.text : theme.accent,
        headerTitleFontFamily: fonts.semiBold,
        contentBackground: dashboard.pageBackground,
        drawerBackground: menuBackground,
      } satisfies AppNavigationTheme,
    };
  }, [hasBranding, isDark, sanatorio, theme]);
}
