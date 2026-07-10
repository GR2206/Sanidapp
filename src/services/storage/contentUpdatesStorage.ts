import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ContentSection, ContentUpdateBadgeMap } from '@/types/contentUpdates';

const STORAGE_PREFIX = 'sanidapp_content_seen_';

const SECTIONS: ContentSection[] = ['adulto', 'pediatrico', 'neonatologia', 'farmacologia'];

function storageKey(section: ContentSection): string {
  return `${STORAGE_PREFIX}${section}`;
}

export async function getSectionLastSeen(section: ContentSection): Promise<string | null> {
  return AsyncStorage.getItem(storageKey(section));
}

export async function getAllSectionLastSeen(): Promise<Partial<Record<ContentSection, string>>> {
  const entries = await AsyncStorage.multiGet(SECTIONS.map(storageKey));
  const result: Partial<Record<ContentSection, string>> = {};

  entries.forEach(([key, value], index) => {
    if (value) {
      result[SECTIONS[index]] = value;
    }
  });

  return result;
}

export async function markContentSectionSeen(section: ContentSection): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  await AsyncStorage.setItem(storageKey(section), today);
}

export function emptyBadgeMap(): ContentUpdateBadgeMap {
  return {
    adulto: 0,
    pediatrico: 0,
    neonatologia: 0,
    farmacologia: 0,
  };
}
