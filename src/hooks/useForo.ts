import { useEffect, useMemo, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { i18nError } from '@/i18n/resolveMessage';
import { subscribeForoPosts } from '@/services/firebase/foroService';
import type { ForoPost } from '@/types/foro';
import { filterForoPostsForViewer } from '@/utils/foroVisibility';

interface UseForoResult {
  posts: ForoPost[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useForo(sanatorioId: string | null): UseForoResult {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [loading, setLoading] = useState(Boolean(sanatorioId));
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!sanatorioId) {
      setPosts([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeForoPosts(
      sanatorioId,
      (nextPosts) => {
        setPosts(
          filterForoPostsForViewer(nextPosts, profile?.uid ?? null, {
            isAdmin: profile?.role === 'admin',
          }),
        );
        setLoading(false);
      },
      (cause) => {
        const code = (cause as { code?: string }).code;
        if (code === 'permission-denied') {
          setError(i18nError('foro.errors.permissionDenied').message);
        } else {
          setError(cause.message);
        }
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [profile?.role, profile?.uid, sanatorioId, version]);

  return {
    posts,
    loading,
    error,
    refresh: () => setVersion((value) => value + 1),
  };
}

export function useForoAccess() {
  const { profile, isSupervisor } = useAuth();
  const { sanatorio } = useSanatorioTheme();

  return useMemo(() => {
    const sanatorioId = sanatorio?.id ?? profile?.sanatorioId ?? null;
    const canManageForo =
      isSupervisor && Boolean(sanatorioId) && profile?.sanatorioId === sanatorioId;

    return {
      sanatorioId,
      sanatorioName: sanatorio?.name ?? profile?.sanatorioName ?? null,
      canManageForo,
      canViewForo: Boolean(sanatorioId),
    };
  }, [isSupervisor, profile?.sanatorioId, profile?.sanatorioName, sanatorio?.id, sanatorio?.name]);
}
