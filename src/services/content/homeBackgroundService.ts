import { APP_CONFIG } from '@/constants/config';
import { getGistRawUrl } from '@/services/gist/gistClient';
import { fetchRemoteJson } from '@/services/github/remoteJson';

export type HomeBackgroundGistPayload = {
  /** URL pública de la imagen (JPG/PNG/WebP). */
  imageUrl?: string;
};

function resolveHomeBackgroundGistUrl(): string {
  const configured = APP_CONFIG.homeBackground.gistRawUrl.trim();
  if (configured) {
    return configured;
  }

  return getGistRawUrl({
    user: APP_CONFIG.homeBackground.gistUser,
    gistId: APP_CONFIG.homeBackground.gistId,
    filename: APP_CONFIG.homeBackground.filename,
  });
}

/**
 * Fondo remoto del home free vía gist Sanidapp.
 * Si falla la red o `imageUrl` está vacío, el caller usa el asset local.
 */
export async function loadFreeHomeBackgroundImageUrl(): Promise<string | null> {
  const gistRawUrl = resolveHomeBackgroundGistUrl();
  if (!gistRawUrl) {
    return null;
  }

  try {
    const payload = await fetchRemoteJson<HomeBackgroundGistPayload>(gistRawUrl);
    const imageUrl = payload.imageUrl?.trim() ?? '';
    return imageUrl || null;
  } catch (error) {
    console.warn('No se pudo cargar el fondo del home desde gist:', error);
    return null;
  }
}
