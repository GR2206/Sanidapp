import { useMemo } from 'react';

import { FREE_ACCESS_SECTIONS } from '@/constants/subscription';
import { useAuth } from '@/contexts/AuthContext';
import { hasPremiumAccess } from '@/services/subscription/subscriptionService';
import type { ContentSection } from '@/types/contentUpdates';
import type { CategoryId } from '@/types/protocol';
import {
  canAccessDrug,
  canAccessPathology,
  canAccessProtocol,
  canBrowseSection,
} from '@/utils/subscriptionAccess';

export function usePremiumAccess() {
  const { profile, isPremium } = useAuth();

  return useMemo(
    () => ({
      profile,
      isPremium,
      accessTier: profile?.accessTier ?? 'free',
      canAccessSection: (sectionId: ContentSection) =>
        isPremium || FREE_ACCESS_SECTIONS.has(sectionId),
      canBrowseSection: (sectionId: ContentSection) => canBrowseSection(sectionId, isPremium),
      canAccessPathology: (pathologyId: string) => canAccessPathology(pathologyId, isPremium),
      canAccessDrug: (drugId: string) => canAccessDrug(drugId, isPremium),
      canAccessProtocol: (protocolId: string, category: CategoryId) =>
        canAccessProtocol(protocolId, category, isPremium),
    }),
    [isPremium, profile],
  );
}

export function requiresPremiumForSection(sectionId: ContentSection, isPremium: boolean): boolean {
  return !isPremium && !FREE_ACCESS_SECTIONS.has(sectionId);
}

export { hasPremiumAccess };
