export const palette = {
  white: '#FFFFFF',
  /** Fondo de pantalla (más claro que los recuadros). */
  background: '#F7F7F8',
  /** Superficies secundarias / chips. */
  backgroundSoft: '#E6E7EB',
  /** Recuadros / cards: gris suave con contraste sobre el fondo. */
  surface: '#ECEEF2',
  /** Borde fino elegante (negro suave). */
  border: '#1A1A1A',
  borderStrong: '#0D0D0D',
  text: '#1A1A1A',
  textSecondary: '#52525B',
  textMuted: '#8A8A8E',
  /**
   * Acento vivo solo de la app free (Sanidapp).
   * Los sanatorios usan `theme.primary` / `theme.accent` propios.
   */
  accent: '#00B4D8',
  accentMuted: '#0891B2',
} as const;
