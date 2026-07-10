import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import {
  getFavoriteItems,
  getRecentItems,
  toggleFavorite as toggleFavoriteStorage,
  type RecordContentViewInput,
} from '@/services/storage/userActivityStorage';
import type { FavoriteContentItem, RecentContentItem } from '@/types/userActivity';

export function useUserActivity() {
  const [recents, setRecents] = useState<RecentContentItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [nextRecents, nextFavorites] = await Promise.all([getRecentItems(), getFavoriteItems()]);
    setRecents(nextRecents);
    setFavorites(nextFavorites);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  const toggleFavorite = useCallback(
    async (input: RecordContentViewInput) => {
      const next = await toggleFavoriteStorage(input);
      setFavorites(next);
      return next;
    },
    [],
  );

  return {
    recents,
    favorites,
    loading,
    refresh,
    toggleFavorite,
  };
}
