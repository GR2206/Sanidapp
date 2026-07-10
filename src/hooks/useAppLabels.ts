import { useCallback } from 'react';

import { useLocale } from '@/contexts/LocaleContext';
import type { AppearanceMode } from '@/theme/dashboardColors';
import type { ForoPostType } from '@/types/foro';
import type { PremiumSource } from '@/types/subscription';

export function useAppLabels() {
  const { t } = useLocale();

  const appearanceMode = useCallback(
    (mode: AppearanceMode) => t(`appearance.modes.${mode}`),
    [t],
  );

  const accessTier = useCallback(
    (tier: 'free' | 'premium') => t(`subscription.tier.${tier}`),
    [t],
  );

  const premiumSource = useCallback(
    (source: PremiumSource) => (source ? t(`subscription.source.${source}`) : ''),
    [t],
  );

  const foroPostType = useCallback(
    (type: ForoPostType) => t(`foro.postType.${type}`),
    [t],
  );

  const registrationType = useCallback(
    (type: 'institutional' | 'premium' | 'individual') => t(`registration.type.${type}`),
    [t],
  );

  return {
    appearanceMode,
    accessTier,
    premiumSource,
    foroPostType,
    registrationType,
  };
}
