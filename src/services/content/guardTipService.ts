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

export type ResolvedGuardTip = {
  id: string;
  label: string;
  text: string;
};

function dayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function tipHasText(tip: GuardTipItem, locale: AppLocale): boolean {
  return Boolean(resolveLocalizedText(tip.text, locale));
}

function pickTipOfDay(
  tips: GuardTipItem[],
  locale: AppLocale,
  date = new Date(),
): GuardTipItem | null {
  const list = tips.filter((tip) => tipHasText(tip, locale));
  if (list.length === 0) {
    return null;
  }
  return list[dayOfYear(date) % list.length] ?? list[0];
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

/**
 * Tip clínico del día para home free.
 * Prioriza Gist; si falla, usa JSON empaquetado. Resuelve textos por idioma.
 */
export async function loadGuardTipOfDay(locale: AppLocale): Promise<ResolvedGuardTip | null> {
  const { gistUser, gistId, filename } = APP_CONFIG.homeGuardTip;
  try {
    if (gistId.trim()) {
      const remote = await fetchGistJson<GuardTipPage>({
        user: gistUser,
        gistId,
        filename,
      });
      const picked = pickTipOfDay(normalizePage(remote), locale);
      return picked ? resolveTip(picked, locale) : null;
    }
  } catch (error) {
    console.warn('No se pudo cargar tip de guardia desde gist:', error);
  }

  const localPicked = pickTipOfDay(normalizePage(LOCAL_TIPS), locale);
  return localPicked ? resolveTip(localPicked, locale) : null;
}

export function getGuardTipGistRawUrl(): string {
  const { gistUser, gistId, filename } = APP_CONFIG.homeGuardTip;
  return getGistRawUrl({ user: gistUser, gistId, filename });
}
