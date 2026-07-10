import type { ImageSourcePropType } from 'react-native';

const SANATORIO_LOGOS: Record<string, ImageSourcePropType> = {
  'sanatorio-de-la-mujer': require('../../assets/images/sanatorios/sanatorio-de-la-mujer.png'),
  'sanatorio-britanico': require('../../assets/images/sanatorios/sanatorio-britanico.png'),
  'sanatorio-parque': require('../../assets/images/sanatorios/sanatorio-parque.png'),
  'sanatorio-delta': require('../../assets/images/sanatorios/sanatorio-delta.png'),
  'sanatorio-alliare': require('../../assets/images/sanatorios/sanatorio-alliare.png'),
  'hospital-privado-rosario': require('../../assets/images/sanatorios/hospital-privado-rosario.png'),
  'hospital-italiano-rosario': require('../../assets/images/sanatorios/hospital-italiano-rosario.png'),
  'hospital-espanol': require('../../assets/images/sanatorios/hospital-espanol.png'),
  'sanatorio-mapaci': require('../../assets/images/sanatorios/sanatorio-mapaci.png'),
  'sanatorio-centro': require('../../assets/images/sanatorios/sanatorio-centro.png'),
  'maternidad-orono': require('../../assets/images/sanatorios/maternidad-orono.png'),
};

export function getSanatorioLogoSource(sanatorioId: string): ImageSourcePropType | null {
  return SANATORIO_LOGOS[sanatorioId] ?? null;
}
