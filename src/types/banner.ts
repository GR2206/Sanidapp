/** Identificadores fijos de los tres espacios publicitarios en el inicio. */
export type BannerSlotId = 'bannerTOP' | 'bannerMEDIO' | 'bannerBOT';

export const BANNER_SLOT_ORDER: BannerSlotId[] = ['bannerTOP', 'bannerMEDIO', 'bannerBOT'];

export interface BannerSlot {
  id: BannerSlotId;
  /** Nombre interno del espacio (p. ej. Banner superior). */
  label: string;
  /** Si es true y hay imagen o título, se muestra contenido; si no, recuadro reservado. */
  enabled: boolean;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  /** Ruta interna Expo Router (prioritaria sobre linkUrl). */
  appRoute?: string | null;
  version: string;
}

export interface BannerIndex {
  version: string;
  slots: BannerSlotId[];
}

/** Un solo archivo para editar en GitHub Gist (ver content/banners/gist/banners.json). */
export interface BannersGistPayload {
  version: string;
  updatedAt?: string;
  slots: BannerSlot[];
}
