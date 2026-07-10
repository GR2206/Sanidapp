import {
  FREE_ACCESS_DRUG_IDS,
  FREE_ACCESS_PATHOLOGY_IDS,
  FREE_ACCESS_PROTOCOL_IDS,
  FREE_ACCESS_PROTOCOLS_BY_CATEGORY,
  FREE_ACCESS_SECTIONS,
} from '@/constants/subscription';
import type { ContentSection } from '@/types/contentUpdates';
import type { CategoryId } from '@/types/protocol';
import type { ContentItemType } from '@/types/userActivity';

export function canAccessContentSection(section: ContentSection, isPremium: boolean): boolean {
  return isPremium || FREE_ACCESS_SECTIONS.has(section);
}

export function hasFreeSamplesInSection(section: ContentSection): boolean {
  if (section === 'farmacologia') {
    return FREE_ACCESS_DRUG_IDS.size > 0;
  }

  if (section === 'pediatrico' || section === 'neonatologia' || section === 'adulto') {
    return (FREE_ACCESS_PROTOCOLS_BY_CATEGORY[section]?.length ?? 0) > 0;
  }

  return false;
}

export function canBrowseSection(section: ContentSection, isPremium: boolean): boolean {
  return canAccessContentSection(section, isPremium) || hasFreeSamplesInSection(section);
}

export function canAccessProtocolCategory(category: CategoryId, isPremium: boolean): boolean {
  return canAccessContentSection(category, isPremium);
}

export function canAccessPathology(pathologyId: string, isPremium: boolean): boolean {
  return isPremium || FREE_ACCESS_PATHOLOGY_IDS.has(pathologyId);
}

export function canAccessDrug(drugId: string, isPremium: boolean): boolean {
  return isPremium || FREE_ACCESS_DRUG_IDS.has(drugId);
}

export function canAccessProtocol(
  protocolId: string,
  category: CategoryId,
  isPremium: boolean,
): boolean {
  if (isPremium) {
    return true;
  }

  if (FREE_ACCESS_PROTOCOL_IDS.has(protocolId)) {
    return true;
  }

  return canAccessProtocolCategory(category, isPremium);
}

/** @deprecated Usar canAccessPathology(id, isPremium) */
export function canAccessPathologies(isPremium: boolean): boolean {
  return isPremium;
}

/** @deprecated Usar canAccessDrug(id, isPremium) */
export function canAccessPharmacology(isPremium: boolean): boolean {
  return canAccessContentSection('farmacologia', isPremium);
}

export function canAccessContentItem(
  type: ContentItemType,
  isPremium: boolean,
  options?: { protocolCategory?: CategoryId; itemId?: string },
): boolean {
  const itemId = options?.itemId;

  if (type === 'protocol') {
    if (itemId && options?.protocolCategory) {
      return canAccessProtocol(itemId, options.protocolCategory, isPremium);
    }

    return options?.protocolCategory
      ? canAccessProtocolCategory(options.protocolCategory, isPremium)
      : false;
  }

  if (type === 'drug') {
    return itemId ? canAccessDrug(itemId, isPremium) : canAccessPharmacology(isPremium);
  }

  return itemId ? canAccessPathology(itemId, isPremium) : canAccessPathologies(isPremium);
}
