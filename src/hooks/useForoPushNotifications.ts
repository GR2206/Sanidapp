import Constants from 'expo-constants';
import { router, type Href } from 'expo-router';
import { useEffect, useRef } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';

const isExpoGo = Constants.appOwnership === 'expo';

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

    void import('expo-notifications').then((Notifications) => {
      const openForo = () => {
        router.push(ROUTES.foro as Href);
      };

      responseSubscription = Notifications.addNotificationResponseReceivedListener(() => {
        openForo();
      });

      void Notifications.getLastNotificationResponseAsync().then((response) => {
        if (response?.notification.request.content.data?.screen === 'foro') {
          openForo();
        }
      });
    });

    return () => {
      responseSubscription?.remove();
    };
  }, []);
}
