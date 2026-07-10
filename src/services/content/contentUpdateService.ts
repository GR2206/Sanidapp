import { loadAllDrugMeta } from '@/services/content/drugService';
import { loadAllProtocolMeta } from '@/services/content/manifestService';
import { getAllSectionLastSeen, emptyBadgeMap } from '@/services/storage/contentUpdatesStorage';
import type { CategoryId } from '@/types/protocol';
import type { ContentSection, ContentUpdateBadgeMap } from '@/types/contentUpdates';

const RECENT_UPDATE_DAYS = 14;

function isWithinRecentWindow(updatedAt: string, now = Date.now()): boolean {
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(updated)) return false;
  const ageDays = (now - updated) / (1000 * 60 * 60 * 24);
  return ageDays >= 0 && ageDays <= RECENT_UPDATE_DAYS;
}

function isUnseenUpdate(updatedAt: string | undefined, lastSeen: string | null | undefined): boolean {
  if (!updatedAt || !isWithinRecentWindow(updatedAt)) return false;
  if (!lastSeen) return true;
  return updatedAt > lastSeen;
}

export async function computeContentUpdateBadges(): Promise<ContentUpdateBadgeMap> {
  const [protocols, drugs, lastSeen] = await Promise.all([
    loadAllProtocolMeta(),
    loadAllDrugMeta(),
    getAllSectionLastSeen(),
  ]);

  const counts = emptyBadgeMap();

  for (const protocol of protocols) {
    const section = protocol.category as CategoryId;
    if (isUnseenUpdate(protocol.updatedAt, lastSeen[section])) {
      counts[section] += 1;
    }
  }

  for (const drug of drugs) {
    if (isUnseenUpdate(drug.updatedAt, lastSeen.farmacologia)) {
      counts.farmacologia += 1;
    }
  }

  return counts;
}

export function getTotalUpdateCount(badges: ContentUpdateBadgeMap): number {
  return Object.values(badges).reduce((sum, count) => sum + count, 0);
}

export function getBadgeCountForSection(
  badges: ContentUpdateBadgeMap,
  section: ContentSection,
): number {
  return badges[section] ?? 0;
}
