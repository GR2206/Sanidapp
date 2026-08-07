/**
 * Píldoras de categoría — solo app free (Recientes / Favoritos).
 * Sanatorios siguen con subtítulo gris.
 */
export type FreeCategoryPillKind =
  | 'farmacologia'
  | 'protocolo'
  | 'pediatria'
  | 'neonatologia'
  | 'adulto'
  | 'patologia';

export type FreeCategoryPillTone = {
  backgroundColor: string;
  color: string;
};

export const FREE_CATEGORY_PILL_TONES: Record<FreeCategoryPillKind, FreeCategoryPillTone> = {
  /** Fondo violeta claro + texto violeta oscuro */
  farmacologia: {
    backgroundColor: '#EDE9FE',
    color: '#5B21B6',
  },
  /** Fondo verde claro + texto verde oscuro */
  protocolo: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
  },
  /** Naranja / amarillo pastel */
  pediatria: {
    backgroundColor: '#FFEDD5',
    color: '#9A3412',
  },
  neonatologia: {
    backgroundColor: '#E0F2FE',
    color: '#075985',
  },
  adulto: {
    backgroundColor: '#DCFCE7',
    color: '#14532D',
  },
  patologia: {
    backgroundColor: '#FCE7F3',
    color: '#9D174D',
  },
};

/** Contenedores de Acceso rápido (círculos) — solo free. */
export type FreeQuickAccessTone = {
  gradient: [string, string];
  icon: string;
  label: string;
};

export const FREE_QUICK_ACCESS_TONES: Record<
  'adulto' | 'pediatrico' | 'neonatologia' | 'farmacologia' | 'cursos' | 'congresos',
  FreeQuickAccessTone
> = {
  adulto: {
    gradient: ['#D1FAE5', '#A7F3D0'],
    icon: '#059669',
    label: '#047857',
  },
  pediatrico: {
    gradient: ['#FFEDD5', '#FDE68A'],
    icon: '#EA580C',
    label: '#C2410C',
  },
  neonatologia: {
    gradient: ['#E0F2FE', '#BAE6FD'],
    icon: '#0284C7',
    label: '#0369A1',
  },
  farmacologia: {
    gradient: ['#EDE9FE', '#DDD6FE'],
    icon: '#7C3AED',
    label: '#6D28D9',
  },
  /** Cursos: teal / cian */
  cursos: {
    gradient: ['#CCFBF1', '#99F6E4'],
    icon: '#0D9488',
    label: '#0F766E',
  },
  /** Congresos: rosa / fucsia */
  congresos: {
    gradient: ['#FCE7F3', '#FBCFE8'],
    icon: '#DB2777',
    label: '#BE185D',
  },
};
