import { APP_CONFIG } from '@/constants/config';
import { fetchGitHubJson } from '@/services/github/githubClient';
import { fetchRemoteJson } from '@/services/github/remoteJson';
import { LOCAL_BANNER_INDEX, LOCAL_BANNERS } from '@/services/content/localBanners';
import {
  BANNER_SLOT_ORDER,
  type BannerSlot,
  type BannerSlotId,
  type BannersGistPayload,
} from '@/types/banner';

function getSlotOrder(): BannerSlotId[] {
  return LOCAL_BANNER_INDEX.slots?.length ? LOCAL_BANNER_INDEX.slots : BANNER_SLOT_ORDER;
}

function slotsFromRecord(slotIds: BannerSlotId[]): BannerSlot[] {
  return slotIds.map((id) => LOCAL_BANNERS[id]);
}

function normalizeGistPayload(payload: BannersGistPayload): BannerSlot[] {
  const order = getSlotOrder();
  const byId = new Map(payload.slots.map((slot) => [slot.id, slot]));

  return order.map((id) => {
    const remote = byId.get(id);
    return remote ? { ...LOCAL_BANNERS[id], ...remote, id } : LOCAL_BANNERS[id];
  });
}

/** Banners empaquetados en la app (sin red). Siempre disponibles offline. */
export function getBundledPromoBanners(): BannerSlot[] {
  return slotsFromRecord(getSlotOrder());
}

async function loadBannerSlotFromGitHub(slotId: BannerSlotId): Promise<BannerSlot> {
  try {
    return await fetchGitHubJson<BannerSlot>(`banners/${slotId}.json`);
  } catch {
    return LOCAL_BANNERS[slotId];
  }
}

async function loadFromGitHub(): Promise<BannerSlot[]> {
  const index = await fetchGitHubJson<{ slots: BannerSlotId[] }>('banners/index.json');
  const slotIds = index.slots?.length ? index.slots : getSlotOrder();
  return Promise.all(slotIds.map((id) => loadBannerSlotFromGitHub(id)));
}

async function loadFromGist(): Promise<BannerSlot[] | null> {
  const gistRawUrl = APP_CONFIG.banners.gistRawUrl.trim();
  if (!gistRawUrl) {
    return null;
  }

  const payload = await fetchRemoteJson<BannersGistPayload>(gistRawUrl);
  if (!payload.slots?.length) {
    throw new Error('El gist de banners no tiene slots');
  }

  return normalizeGistPayload(payload);
}

/**
 * Intenta actualizar desde gist → repo GitHub → empaquetado.
 * Nunca deja la pantalla sin banners si hay contenido local.
 */
export async function refreshPromoBanners(): Promise<BannerSlot[]> {
  try {
    const fromGist = await loadFromGist();
    if (fromGist) {
      return fromGist;
    }
  } catch {
    // Gist opcional; seguir con GitHub o local.
  }

  try {
    return await loadFromGitHub();
  } catch {
    return getBundledPromoBanners();
  }
}

/** @deprecated Usar getBundledPromoBanners + refreshPromoBanners. */
export async function loadPromoBanners(): Promise<BannerSlot[]> {
  return refreshPromoBanners();
}
