import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { loadAllDrugMeta } from '@/services/content/drugService';
import { loadAllProtocolMeta } from '@/services/content/manifestService';
import { loadAllPathologyMeta } from '@/services/content/pathologyService';
import type { UniversalSearchResult } from '@/types/userActivity';
import { canAccessContentItem } from '@/utils/subscriptionAccess';
import { protocolSubtitle } from '@/utils/protocolLabels';

export function useUniversalSearch(query: string) {
  const { isPremium } = useAuth();
  const { locale, t } = useLocale();
  const [catalog, setCatalog] = useState<UniversalSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      try {
        const [protocols, drugs, pathologies] = await Promise.all([
          loadAllProtocolMeta(locale),
          loadAllDrugMeta(undefined, locale),
          loadAllPathologyMeta(undefined, locale),
        ]);

        if (cancelled) return;

        const items: UniversalSearchResult[] = [
          ...protocols.map((item) => ({
            id: item.id,
            type: 'protocol' as const,
            title: item.title,
            subtitle: protocolSubtitle(item.category, locale),
            protocolCategory: item.category,
          })),
          ...drugs.map((item) => ({
            id: item.id,
            type: 'drug' as const,
            title: item.name,
            subtitle: t('content.pharmacology'),
          })),
          ...pathologies.map((item) => ({
            id: item.id,
            type: 'pathology' as const,
            title: item.name,
            subtitle: t('content.pathology'),
          })),
        ];

        setCatalog(items);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadCatalog();
    return () => {
      cancelled = true;
    };
  }, [locale, t]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];

    return catalog
      .filter(
        (item) =>
          canAccessContentItem(item.type, isPremium, {
            protocolCategory: item.protocolCategory,
            itemId: item.id,
          }) &&
          (item.title.toLowerCase().includes(term) || item.subtitle.toLowerCase().includes(term)),
      )
      .slice(0, 10);
  }, [catalog, isPremium, query]);

  return { results, loading };
}
