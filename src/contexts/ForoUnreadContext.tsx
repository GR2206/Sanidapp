import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { router, type Href } from 'expo-router';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { subscribeForoPosts } from '@/services/firebase/foroService';
import {
  loadForoLastSeenAt,
  saveForoLastSeenAt,
} from '@/services/storage/foroReadStorage';
import type { ForoPost } from '@/types/foro';
import { canViewForoPost } from '@/utils/foroVisibility';

interface ForoUnreadContextValue {
  unreadCount: number;
  isReady: boolean;
  markForoAsRead: () => Promise<void>;
}

const ForoUnreadContext = createContext<ForoUnreadContextValue>({
  unreadCount: 0,
  isReady: false,
  markForoAsRead: async () => {},
});

function resolveForoSanatorioId(
  profile: { sanatorioId: string; role: string } | null,
  previewSanatorioId: string | null,
  themeSanatorioId: string | undefined,
): string | null {
  if (!profile) {
    return null;
  }

  if (profile.role === 'admin') {
    return previewSanatorioId;
  }

  return themeSanatorioId ?? profile.sanatorioId ?? null;
}

function countUnreadPosts(
  posts: ForoPost[],
  lastSeenAt: string | null,
  viewerUid: string | null,
  isAdmin: boolean,
): number {
  const visiblePosts = posts.filter((post) =>
    canViewForoPost(post, viewerUid, { isAdmin }),
  );

  if (!lastSeenAt) {
    return visiblePosts.filter((post) => post.authorUid !== viewerUid).length;
  }

  const seenTime = new Date(lastSeenAt).getTime();
  if (Number.isNaN(seenTime)) {
    return visiblePosts.filter((post) => post.authorUid !== viewerUid).length;
  }

  return visiblePosts.filter((post) => {
    if (post.authorUid === viewerUid) {
      return false;
    }

    const createdTime = new Date(post.createdAt).getTime();
    return !Number.isNaN(createdTime) && createdTime > seenTime;
  }).length;
}

export function ForoUnreadProvider({ children }: { children: ReactNode }) {
  const { profile, firebaseEnabled, isAuthenticated } = useAuth();
  const { previewSanatorioId, sanatorio } = useSanatorioTheme();
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [lastSeenAt, setLastSeenAt] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const sanatorioId = resolveForoSanatorioId(
    profile,
    previewSanatorioId,
    sanatorio?.id,
  );

  useEffect(() => {
    if (!profile?.uid || !sanatorioId) {
      setLastSeenAt(null);
      setIsReady(true);
      return;
    }

    let active = true;
    setIsReady(false);
    void loadForoLastSeenAt(profile.uid, sanatorioId).then((value) => {
      if (active) {
        setLastSeenAt(value);
        setIsReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [profile?.uid, sanatorioId]);

  useEffect(() => {
    if (!firebaseEnabled || !sanatorioId) {
      setPosts([]);
      return;
    }

    const unsubscribe = subscribeForoPosts(
      sanatorioId,
      setPosts,
      () => setPosts([]),
    );

    return unsubscribe;
  }, [firebaseEnabled, sanatorioId]);

  const unreadCount = useMemo(() => {
    if (!isAuthenticated || !sanatorioId) {
      return 0;
    }

    return countUnreadPosts(posts, lastSeenAt, profile?.uid ?? null, profile?.role === 'admin');
  }, [isAuthenticated, lastSeenAt, posts, profile?.role, profile?.uid, sanatorioId]);

  const markForoAsRead = useCallback(async () => {
    if (!profile?.uid || !sanatorioId) {
      return;
    }

    const now = new Date().toISOString();
    await saveForoLastSeenAt(profile.uid, sanatorioId, now);
    setLastSeenAt(now);
  }, [profile?.uid, sanatorioId]);

  const value = useMemo(
    () => ({
      unreadCount,
      isReady,
      markForoAsRead,
    }),
    [isReady, markForoAsRead, unreadCount],
  );

  return <ForoUnreadContext.Provider value={value}>{children}</ForoUnreadContext.Provider>;
}

export function useForoUnread(): ForoUnreadContextValue {
  return useContext(ForoUnreadContext);
}

export function ForoUnreadAlert(): null {
  const { unreadCount, isReady } = useForoUnread();
  const { t } = useLocale();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (!isReady || unreadCount <= 0 || promptedRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      if (promptedRef.current) {
        return;
      }

      promptedRef.current = true;

      Alert.alert(t('foro.alertTitle'), t('foro.unreadPrompt', { count: unreadCount }), [
        { text: t('common.notNow'), style: 'cancel' },
        {
          text: t('foro.viewForo'),
          onPress: () => router.push(ROUTES.foro as Href),
        },
      ]);
    }, 900);

    return () => clearTimeout(timer);
  }, [isReady, t, unreadCount]);

  return null;
}
