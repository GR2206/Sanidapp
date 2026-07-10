import { useMemo } from 'react';

import { useAppearance } from '@/contexts/AppearanceContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { getSanatorioLogoSource } from '@/constants/sanatorioAssets';
import { palette } from '@/theme/colors';
import { resolveSanatorioFonts } from '@/theme/sanatorioFonts';
import { getBrandedDashboardColors, getDashboardColors } from '@/theme/dashboardColors';

export function useDashboardTheme() {
  const { hasBranding, sanatorio, theme } = useSanatorioTheme();
  const { mode, isDark: appearanceDark, cycleMode, setMode } = useAppearance();

  const isDark = appearanceDark;
  const logoSource = sanatorio ? getSanatorioLogoSource(sanatorio.id) : null;
  const fonts = resolveSanatorioFonts(theme.fontFamily);

  const colors = useMemo(() => {
    if (hasBranding && sanatorio) {
      return getBrandedDashboardColors(theme, isDark);
    }
    return getDashboardColors(isDark);
  }, [hasBranding, isDark, sanatorio, theme]);

  const categoryButtonColor = hasBranding && sanatorio ? theme.primary : colors.accent;
  const categoryButtonAltColor = hasBranding && sanatorio ? theme.accent : colors.accent;
  const alternateCategoryColors = hasBranding && theme.alternateButtonColors;

  const getCategoryAccent = (index: number) =>
    alternateCategoryColors
      ? index % 2 === 0
        ? categoryButtonColor
        : categoryButtonAltColor
      : categoryButtonColor;
  const boldAccentText = hasBranding && theme.boldAccentText;
  const accentTextFontFamily = boldAccentText ? fonts.bold : fonts.regular;

  const categoryNavColor = palette.white;
  const categoryNavCircleBackground = categoryButtonColor;
  const categoryNavCircleBorder = categoryButtonColor;
  const categoryNavLabelColor = categoryButtonColor;

  return {
    hasBranding,
    sanatorio,
    logoSource,
    fonts,
    isDark,
    colors,
    mode,
    cycleMode,
    setMode,
    categoryNavColor,
    categoryNavCircleBackground,
    categoryNavCircleBorder,
    categoryNavLabelColor,
    getCategoryAccent,
    boldAccentText,
    accentTextFontFamily,
  };
}
