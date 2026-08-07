import { useEffect } from 'react';
import Constants from 'expo-constants';

import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';

const isExpoGo = Constants.appOwnership === 'expo';

/**
 * Programa tips/recordatorios de enfermería (locales diarios)
 * para usuarios autenticados (free y sanatorio).
 */
export function useNursingReminders(): void {
  const { isAuthenticated, profile } = useAuth();
  const { locale } = useLocale();

  useEffect(() => {
    if (isExpoGo) {
      return;
    }

    let cancelled = false;

    void import('@/services/notifications/nursingReminderService')
      .then(async ({ syncNursingReminderNotifications, cancelNursingReminderNotifications }) => {
        if (cancelled) return;

        if (!isAuthenticated || !profile) {
          await cancelNursingReminderNotifications();
          return;
        }

        await syncNursingReminderNotifications(locale);
        if (cancelled) {
          await cancelNursingReminderNotifications();
        }
      })
      .catch((error) => {
        console.warn('No se pudieron programar recordatorios de enfermería:', error);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, locale, profile?.uid]);
}
