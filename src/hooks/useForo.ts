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
    const profileSanatorioId = profile?.sanatorioId?.trim() || null;
    const themeSanatorioId = sanatorio?.id ?? null;
    // Nunca mezclar datos de otro sanatorio por tema/branding.
    const sanatorioId =
      themeSanatorioId && profileSanatorioId && themeSanatorioId === profileSanatorioId
        ? profileSanatorioId
        : profileSanatorioId;
    const canManageForo = isSupervisor && Boolean(sanatorioId);
    const institutionalPremium =
      profile?.accessTier === 'premium' &&
      (profile.premiumSource === 'allowlist' ||
        profile.premiumSource === 'institution_token' ||
        profile.role === 'supervisor' ||
        profile.role === 'admin');

    return {
      sanatorioId,
      sanatorioName:
        sanatorioId && themeSanatorioId === sanatorioId
          ? (sanatorio?.name ?? profile?.sanatorioName ?? null)
          : (profile?.sanatorioName ?? null),
      canManageForo,
      canViewForo:
        Boolean(sanatorioId) && Boolean(institutionalPremium || profile?.role === 'admin'),
    };
  }, [
    isSupervisor,
    profile?.accessTier,
    profile?.premiumSource,
    profile?.role,
    profile?.sanatorioId,
    profile?.sanatorioName,
    sanatorio?.id,
    sanatorio?.name,
  ]);
}
