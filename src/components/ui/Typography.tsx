import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { resolveSanatorioFonts } from '@/theme/sanatorioFonts';
import { fontFamily, fontSize } from '@/theme/typography';
import { resolveBrandedTextFontFamily } from '@/utils/brandedTextStyle';

type TypographyVariant =
  | 'body'
  | 'bodyMedium'
  | 'caption'
  | 'label'
  | 'title'
  | 'subtitle'
  | 'section'
  | 'reference';

const variantBase: Record<
  TypographyVariant,
  {
    fontFamily: string;
    fontSize: number;
    lineHeightRatio: number;
    letterSpacing?: number;
    textTransform?: TextStyle['textTransform'];
  }
> = {
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    lineHeightRatio: 1.5,
  },
  bodyMedium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    lineHeightRatio: 1.5,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeightRatio: 1.45,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    lineHeightRatio: 1.4,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.display,
    lineHeightRatio: 1.2,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xl,
    lineHeightRatio: 1.3,
  },
  section: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    lineHeightRatio: 1.35,
  },
  reference: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeightRatio: 1.55,
  },
};

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function Typography({ variant = 'body', color, style, ...rest }: TypographyProps) {
  const { theme, hasBranding } = useSanatorioTheme();
  const { colors } = useAppTheme();
  const { s } = useTextScale();
  const fonts = resolveSanatorioFonts(theme.fontFamily);
  const base = variantBase[variant];
  const flatStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  const defaultColor =
    variant === 'caption'
      ? colors.textMuted
      : variant === 'label' || variant === 'reference'
        ? colors.textSecondary
        : colors.text;

  const resolvedColor =
    color ?? (typeof flatStyle?.color === 'string' ? flatStyle.color : defaultColor);
  const brandedFontFamily = resolveBrandedTextFontFamily({
    boldAccentText: hasBranding && theme.boldAccentText,
    color: resolvedColor,
    primaryColor: theme.primary,
    boldFont: fonts.bold,
    baseFont: base.fontFamily,
  });

  const scaledFontSize = s(
    typeof flatStyle?.fontSize === 'number' ? flatStyle.fontSize : base.fontSize,
  );
  const scaledLineHeight =
    typeof flatStyle?.lineHeight === 'number'
      ? s(flatStyle.lineHeight)
      : Math.round(scaledFontSize * base.lineHeightRatio * 2) / 2;

  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          fontFamily: base.fontFamily,
          fontSize: scaledFontSize,
          lineHeight: scaledLineHeight,
          color: resolvedColor,
          letterSpacing: base.letterSpacing,
          textTransform: base.textTransform,
        },
        style,
        {
          fontSize: scaledFontSize,
          lineHeight: scaledLineHeight,
          color: resolvedColor,
        },
        brandedFontFamily ? { fontFamily: brandedFontFamily } : null,
      ]}
      {...rest}
    />
  );
}
