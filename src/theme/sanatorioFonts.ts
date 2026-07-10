import { fontFamily as interFonts } from '@/theme/typography';

export type SanatorioFontFamilyId = 'Inter' | 'PlayfairDisplay' | 'Nunito' | 'Montserrat';

export interface ResolvedSanatorioFonts {
  regular: string;
  medium: string;
  semiBold: string;
  bold: string;
}

const PLAYFAIR_FONTS: ResolvedSanatorioFonts = {
  regular: 'Playfair_400Regular',
  medium: 'Playfair_500Medium',
  semiBold: 'Playfair_600SemiBold',
  bold: 'Playfair_700Bold',
};

const NUNITO_FONTS: ResolvedSanatorioFonts = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semiBold: 'Nunito_700Bold',
  bold: 'Nunito_800ExtraBold',
};

const MONTSERRAT_FONTS: ResolvedSanatorioFonts = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_700Bold',
  bold: 'Montserrat_800ExtraBold',
};

export function resolveSanatorioFonts(fontFamilyId: string): ResolvedSanatorioFonts {
  if (fontFamilyId === 'PlayfairDisplay') {
    return PLAYFAIR_FONTS;
  }

  if (fontFamilyId === 'Nunito') {
    return NUNITO_FONTS;
  }

  if (fontFamilyId === 'Montserrat') {
    return MONTSERRAT_FONTS;
  }

  return interFonts;
}
