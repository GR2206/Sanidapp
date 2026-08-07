import type { ReactNode } from 'react';

import { useForoPushNotifications } from '@/hooks/useForoPushNotifications';
import { useNursingReminders } from '@/hooks/useNursingReminders';

/** Push del Foro + recordatorios locales de enfermería (app free). */
export function ForoPushNotificationsProvider({ children }: { children: ReactNode }) {
  useForoPushNotifications();
  useNursingReminders();
  return children;
}
