import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { router, type Href } from 'expo-router';
import { useEffect, useRef } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';

const isExpoGo = Constants.appOwnership === 'expo';
const HANDLED_KEY = '@sanidapp/foro-push-handled-id';

function isForoNotificationData(data: unknown): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return (data as { screen?: unknown }).screen === 'foro';
}

function feedRouteFromNotificationData(data: unknown): Href | null {
  if (!data || typeof data !== 'object') {
    return null;
  }
  const screen = (data as { screen?: unknown }).screen;
  if (screen === 'cursos') return '/(drawer)/cursos' as Href;
  if (screen === 'congresos') return '/(drawer)/congresos' as Href;
  if (screen === 'cursos-institucion') return '/(drawer)/cursos-institucion' as Href;
  if (screen === 'congresos-institucion') return '/(drawer)/congresos-institucion' as Href;
  if (screen === 'docente-applications') return '/(drawer)/docente-applications' as Href;
  return null;
}

function meetingRouteFromNotificationData(data: unknown): Href | null {
  if (!data || typeof data !== 'object') {
    return null;
  }
  const typed = data as { type?: unknown; joinCode?: unknown; screen?: unknown };
  if (typed.type !== 'meeting_invite' && typed.screen !== 'reuniones') {
    return null;
  }
  const code = String(typed.joinCode || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  if (code.length >= 4) {
    return `${ROUTES.reuniones}?code=${encodeURIComponent(code)}` as Href;
  }
  return ROUTES.reuniones as Href;
}

export function useForoPushNotifications(): void {
  const { profile, firebaseEnabled, isAuthenticated } = useAuth();
  const syncedUidRef = useRef<string | null>(null);

  useEffect(() => {
    if (isExpoGo || !firebaseEnabled || !isAuthenticated || !profile) {
      syncedUidRef.current = null;
      return;
    }

    if (syncedUidRef.current === profile.uid) {
      return;
    }

    syncedUidRef.current = profile.uid;
    void import('@/services/notifications/pushNotificationService')
      .then(({ syncForoPushToken }) => syncForoPushToken(profile))
      .catch((error) => {
        console.warn('No se pudo registrar el token push del Foro:', error);
        syncedUidRef.current = null;
      });
  }, [firebaseEnabled, isAuthenticated, profile]);

  useEffect(() => {
    if (isExpoGo) {
      return;
    }

    let responseSubscription: { remove: () => void } | undefined;
    let cancelled = false;

    void import('expo-notifications').then((Notifications) => {
      if (cancelled) {
        return;
      }

      const openForoOnce = async (response: {
        notification: { request: { identifier?: string; content: { data?: unknown } } };
      }) => {
        const data = response.notification.request.content.data;
        const feedRoute = feedRouteFromNotificationData(data);
        const meetingRoute = meetingRouteFromNotificationData(data);
        const isForo = isForoNotificationData(data);
        if (!feedRoute && !meetingRoute && !isForo) {
          return;
        }

        const identifier =
          response.notification.request.identifier ||
          JSON.stringify(response.notification.request.content.data);

        try {
          const already = await AsyncStorage.getItem(HANDLED_KEY);
          if (already === identifier) {
            return;
          }
          await AsyncStorage.setItem(HANDLED_KEY, identifier);
        } catch {
          // Si falla storage, igual navegamos una sola vez por mount vía ref local.
        }

        try {
          await Notifications.clearLastNotificationResponseAsync();
        } catch {
          // ignore
        }

        router.push(meetingRoute ?? feedRoute ?? (ROUTES.foro as Href));
      };

      // Solo al tocar una notificación (evento en vivo). No reabrir Foro al alt-tab / remount.
      responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
        void openForoOnce(response);
      });

      // Cold start: la app se abrió tocando la notificación.
      void Notifications.getLastNotificationResponseAsync().then(async (response) => {
        if (!response || cancelled) {
          return;
        }
        await openForoOnce(response);
      });
    });

    return () => {
      cancelled = true;
      responseSubscription?.remove();
    };
  }, []);
}
