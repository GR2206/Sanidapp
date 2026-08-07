export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

/** Escala ~18–20% más compacta para lectura más panorámica. */
export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  lg: 15,
  xl: 18,
  xxl: 22,
  display: 26,
} as const;

export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.65,
} as const;
