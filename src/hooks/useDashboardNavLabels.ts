import { useCallback } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import type { ContentSection } from '@/types/contentUpdates';

const NAV_LABEL_KEYS: Record<ContentSection, string> = {
  adulto: 'protocol.category.adulto',
  pediatrico: 'protocol.category.pediatrico',
  neonatologia: 'protocol.category.neonatologia',
  farmacologia: 'content.pharmacology',
};

const NAV_SHORT_LABEL_KEYS: Record<ContentSection, string> = {
  adulto: 'protocol.categoryShort.adulto',
  pediatrico: 'protocol.categoryShort.pediatrico',
  neonatologia: 'protocol.categoryShort.neonatologia',
  farmacologia: 'protocol.categoryShort.farmacologia',
};

export function useDashboardNavLabels() {
  const { t } = useLocale();

  const sectionLabel = useCallback(
    (section: ContentSection) => t(NAV_LABEL_KEYS[section]),
    [t],
  );

  const sectionShortLabel = useCallback(
    (section: ContentSection) => t(NAV_SHORT_LABEL_KEYS[section]),
    [t],
  );

  return { sectionLabel, sectionShortLabel };
}
