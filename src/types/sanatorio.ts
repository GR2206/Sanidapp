export type SanatorioBrandingStatus = 'pending_branding' | 'ready';

export interface SanatorioBranding {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  /** URL remota del logo del sanatorio (assets locales en fases posteriores). */
  logoUrl: string | null;
  fontFamily: string;
  /** Alto / ancho del logo horizontal (por defecto 0.28). */
  logoAspectRatio?: number;
  /** Escala extra del logo en home (1 = base, 0.88 = −12%). */
  homeLogoScale?: number;
  /** Forma de render en home: horizontal (default) o circular. */
  logoShape?: 'horizontal' | 'circle';
  /** Ajuste del logo dentro del círculo; solo aplica con circleLogoFit "contain". */
  circleLogoInset?: number;
  /** cover = llena el círculo (default); contain = logo completo sin recortar. */
  circleLogoFit?: 'cover' | 'contain';
  /** Zoom extra en cover para recortar bordes del asset (solo HPR u otros casos puntuales). */
  circleLogoCoverScale?: number;
  /** Zoom del logo en el header del dashboard (< 1 achica; > 1 recorta bordes del asset). */
  dashboardHeaderLogoCoverScale?: number;
  /** Zoom de la marca de agua del dashboard. */
  dashboardWatermarkCoverScale?: number;
  /** Marca de agua recortada en círculo (útil si el PNG trae fondo cuadrado). */
  dashboardWatermarkCircle?: boolean;
  /** Fondo del logo en dashboard = branding.background (difumina blanco del asset). */
  dashboardLogoBlendBackground?: boolean;
  /** Tamaño del logo en header (contain); 0.86 = 86% del círculo. */
  dashboardHeaderLogoInset?: number;
  /** Tamaño del logo en marca de agua (contain). */
  dashboardWatermarkLogoInset?: number;
  /** Texto en color accent (p. ej. rojo sobre verde) en negrita para mejor contraste. */
  boldAccentText?: boolean;
  /** Superficies blancas/neutras; bordes y overlays en azul (accent), sin tintes rojos. */
  neutralChrome?: boolean;
  /** Menú lateral con fondo semitransparente. */
  transparentMenu?: boolean;
  /** Botón primary rojo y secondary azul; categorías del home alternadas. */
  alternateButtonColors?: boolean;
}

export interface Sanatorio {
  id: string;
  name: string;
  shortName: string;
  city: string;
  branding: SanatorioBranding;
  status: SanatorioBrandingStatus;
}

export interface SanatorioCatalog {
  region: string;
  sanatorios: Sanatorio[];
}
