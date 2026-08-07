import AsyncStorage from '@react-native-async-storage/async-storage';

import localGuardTips from '../../../content/feeds/home-guard-tip-free.json';
import { APP_CONFIG } from '@/constants/config';
import type { AppLocale } from '@/i18n/types';
import { fetchGistJson, getGistRawUrl } from '@/services/gist/gistClient';
import {
  resolveLocalizedText,
  type GuardTipItem,
  type GuardTipPage,
} from '@/types/guardTip';

const LOCAL_TIPS = localGuardTips as GuardTipPage;
const RECENT_TIP_IDS_KEY = '@sanidapp/recent-home-tip-ids';
/** Evita repetir los mismos tips en aperturas seguidas. */
const RECENT_TIP_WINDOW = 30;

export type ResolvedGuardTip = {
  id: string;
  label: string;
  text: string;
};

function tipHasText(tip: GuardTipItem, locale: AppLocale): boolean {
  return Boolean(resolveLocalizedText(tip.text, locale));
}

function normalizePage(payload: GuardTipPage | null | undefined): GuardTipItem[] {
  if (!payload?.tips || !Array.isArray(payload.tips)) {
    return LOCAL_TIPS.tips ?? [];
  }
  return payload.tips;
}

function resolveTip(tip: GuardTipItem, locale: AppLocale): ResolvedGuardTip | null {
  const text = resolveLocalizedText(tip.text, locale);
  if (!text) {
    return null;
  }
  return {
    id: tip.id,
    label: resolveLocalizedText(tip.label, locale),
    text,
  };
}

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = items[i]!;
    items[i] = items[j]!;
    items[j] = tmp;
  }
  return items;
}

async function readRecentTipIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(RECENT_TIP_IDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((id) => String(id)).filter(Boolean);
  } catch {
    return [];
  }
}

async function rememberTipIds(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  try {
    const previous = await readRecentTipIds();
    const merged = [...ids, ...previous.filter((id) => !ids.includes(id))].slice(
      0,
      RECENT_TIP_WINDOW,
    );
    await AsyncStorage.setItem(RECENT_TIP_IDS_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
}

function pickAvoidingRecent(pool: GuardTipItem[], recentIds: string[], count: number): GuardTipItem[] {
  if (pool.length === 0 || count <= 0) return [];
  const recent = new Set(recentIds);
  const fresh = shuffleInPlace(pool.filter((tip) => !recent.has(tip.id)));
  const reused = shuffleInPlace(pool.filter((tip) => recent.has(tip.id)));
  const ordered = fresh.length > 0 ? [...fresh, ...reused] : reused;
  const picked: GuardTipItem[] = [];
  const used = new Set<string>();
  for (const tip of ordered) {
    if (used.has(tip.id)) continue;
    used.add(tip.id);
    picked.push(tip);
    if (picked.length >= Math.min(count, pool.length)) break;
  }
  return picked;
}

async function loadTipPool(locale: AppLocale): Promise<GuardTipItem[]> {
  const localTips = normalizePage(LOCAL_TIPS);
  const byId = new Map<string, GuardTipItem>();
  for (const tip of localTips) {
    if (tip?.id) byId.set(String(tip.id), tip);
  }

  const { gistUser, gistId, filename } = APP_CONFIG.homeGuardTip;
  try {
    if (gistId.trim()) {
      const remote = await fetchGistJson<GuardTipPage>({
        user: gistUser,
        gistId,
        filename,
      });
      for (const tip of normalizePage(remote)) {
        if (tip?.id) byId.set(String(tip.id), tip);
      }
    }
  } catch (error) {
    console.warn('No se pudo cargar tip de guardia desde gist:', error);
  }

  return [...byId.values()].filter((tip) => tipHasText(tip, locale));
}

/**
 * Un tip aleatorio para el banner (evita los vistos recientemente).
 */
export async function loadGuardTipOfDay(locale: AppLocale): Promise<ResolvedGuardTip | null> {
  const [picked] = await loadRandomGuardTips(locale, 1);
  return picked ?? null;
}

/**
 * Varios tips aleatorios para el carrusel del home.
 */
export async function loadRandomGuardTips(
  locale: AppLocale,
  count: number,
): Promise<ResolvedGuardTip[]> {
  const pool = await loadTipPool(locale);
  if (pool.length === 0) return [];

  const recentIds = await readRecentTipIds();
  const picked = pickAvoidingRecent(pool, recentIds, count);
  const resolved = picked
    .map((tip) => resolveTip(tip, locale))
    .filter((tip): tip is ResolvedGuardTip => Boolean(tip));

  await rememberTipIds(resolved.map((tip) => tip.id));
  return resolved;
}

export function getGuardTipGistRawUrl(): string {
  const { gistUser, gistId, filename } = APP_CONFIG.homeGuardTip;
  return getGistRawUrl({ user: gistUser, gistId, filename });
}
