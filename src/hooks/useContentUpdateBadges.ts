import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  computeContentUpdateBadges,
  getTotalUpdateCount,
} from '@/services/content/contentUpdateService';
import { emptyBadgeMap } from '@/services/storage/contentUpdatesStorage';
import type { ContentUpdateBadgeMap } from '@/types/contentUpdates';

export function useContentUpdateBadges() {
  const [badges, setBadges] = useState<ContentUpdateBadgeMap>(emptyBadgeMap());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await computeContentUpdateBadges();
    setBadges(next);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return {
    badges,
    loading,
    total: getTotalUpdateCount(badges),
    refresh,
  };
}
