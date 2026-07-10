import type { ReactNode } from 'react';

import { useForoPushNotifications } from '@/hooks/useForoPushNotifications';

/** Registra push del Foro y abre la pantalla al tocar la notificación. */
export function ForoPushNotificationsProvider({ children }: { children: ReactNode }) {
  useForoPushNotifications();
  return children;
}
