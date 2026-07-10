import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  ContentItemType,
  FavoriteContentItem,
  RecentContentItem,
} from '@/types/userActivity';

const RECENTS_KEY = 'sanidapp_recent_items';
const FAVORITES_KEY = 'sanidapp_favorite_items';
const MAX_RECENTS = 12;

export interface RecordContentViewInput {
  id: string;
  type: ContentItemType;
  title: string;
  subtitle?: string;
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getRecentItems(): Promise<RecentContentItem[]> {
  return readJson<RecentContentItem[]>(RECENTS_KEY, []);
}

export async function getFavoriteItems(): Promise<FavoriteContentItem[]> {
  return readJson<FavoriteContentItem[]>(FAVORITES_KEY, []);
}

export async function recordContentView(input: RecordContentViewInput): Promise<RecentContentItem[]> {
  const now = new Date().toISOString();
  const current = await getRecentItems();
  const nextItem: RecentContentItem = {
    id: input.id,
    type: input.type,
    title: input.title,
    subtitle: input.subtitle,
    viewedAt: now,
  };

  const withoutDuplicate = current.filter(
    (item) => !(item.id === input.id && item.type === input.type),
  );
  const next = [nextItem, ...withoutDuplicate].slice(0, MAX_RECENTS);
  await writeJson(RECENTS_KEY, next);
  return next;
}

export async function toggleFavorite(input: RecordContentViewInput): Promise<FavoriteContentItem[]> {
  const current = await getFavoriteItems();
  const exists = current.find((item) => item.id === input.id && item.type === input.type);

  if (exists) {
    const next = current.filter((item) => !(item.id === input.id && item.type === input.type));
    await writeJson(FAVORITES_KEY, next);
    return next;
  }

  const nextItem: FavoriteContentItem = {
    id: input.id,
    type: input.type,
    title: input.title,
    subtitle: input.subtitle,
    savedAt: new Date().toISOString(),
  };
  const next = [nextItem, ...current];
  await writeJson(FAVORITES_KEY, next);
  return next;
}

export async function isFavorite(id: string, type: ContentItemType): Promise<boolean> {
  const current = await getFavoriteItems();
  return current.some((item) => item.id === id && item.type === type);
}
