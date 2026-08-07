import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import {
  NURSING_REMINDER_CHANNEL_ID,
  NURSING_REMINDER_ID_PREFIX,
  NURSING_REMINDER_SLOTS,
  nursingReminderBodyKey,
  nursingReminderNotificationId,
  nursingReminderTitleKey,
} from '@/constants/nursingReminders';
import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import {
  getNursingRemindersEnabled,
  setNursingRemindersEnabled,
} from '@/services/notifications/nursingReminderPrefs';
import { getNotificationLargeIconUri } from '@/services/notifications/notificationIcons';

export { getNursingRemindersEnabled, setNursingRemindersEnabled };

function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

async function loadNotifications() {
  if (isExpoGo()) {
    return null;
  }
  return import('expo-notifications');
}

export async function configureNursingReminderChannel(): Promise<void> {
  if (isExpoGo() || Platform.OS !== 'android') {
    return;
  }

  const Notifications = await loadNotifications();
  if (!Notifications) return;

  await Notifications.setNotificationChannelAsync(NURSING_REMINDER_CHANNEL_ID, {
    name: 'Tips de enfermería',
    description: 'Recordatorios de labor: indicaciones y balances',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 220, 180, 220],
    lightColor: '#00B4D8',
    sound: 'default',
    enableVibrate: true,
    showBadge: true,
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

export async function cancelNursingReminderNotifications(): Promise<void> {
  if (isExpoGo()) {
    return;
  }

  const Notifications = await loadNotifications();
  if (!Notifications) return;

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((item) => item.identifier.startsWith(NURSING_REMINDER_ID_PREFIX))
      .map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier)),
  );
}

/**
 * Programa notificaciones locales diarias (aparecen con celular bloqueado).
 * Requiere permiso de notificaciones; no usa servidor push.
 * En Expo Go no hace nada (SDK 53+ no soporta notificaciones ahí).
 */
export async function syncNursingReminderNotifications(locale: AppLocale): Promise<boolean> {
  if (isExpoGo() || !Device.isDevice) {
    return false;
  }

  const Notifications = await loadNotifications();
  if (!Notifications) {
    return false;
  }

  await configureNursingReminderChannel();

  const enabled = await getNursingRemindersEnabled();
  if (!enabled) {
    await cancelNursingReminderNotifications();
    return false;
  }

  const { requestForoPushPermissions } = await import(
    '@/services/notifications/pushNotificationService'
  );
  const granted = await requestForoPushPermissions();
  if (!granted) {
    return false;
  }

  await cancelNursingReminderNotifications();

  const largeIcon = getNotificationLargeIconUri();

  for (const slot of NURSING_REMINDER_SLOTS) {
    const identifier = nursingReminderNotificationId(slot.id);
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title: translate(locale, nursingReminderTitleKey(slot.kind)),
        body: translate(locale, nursingReminderBodyKey(slot.kind)),
        sound: 'default',
        data: {
          screen: 'home',
          kind: 'nursing-reminder',
          reminderKind: slot.kind,
        },
        ...(Platform.OS === 'android'
          ? {
              channelId: NURSING_REMINDER_CHANNEL_ID,
              ...(largeIcon ? { largeIcon } : null),
            }
          : null),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: slot.hour,
        minute: slot.minute,
        channelId: Platform.OS === 'android' ? NURSING_REMINDER_CHANNEL_ID : undefined,
      },
    });
  }

  return true;
}
