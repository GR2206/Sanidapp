import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { translate } from '@/i18n';
import { DEFAULT_LOCALE } from '@/i18n/types';
import { getFirestoreDb } from '@/services/firebase/firebaseApp';
import type { UserProfile } from '@/types/auth';
import type { ForoPostType } from '@/types/foro';

export const FORO_NOTIFICATION_CHANNEL_ID = 'foro-sum';

function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

let notificationHandlerConfigured = false;

function ensureNotificationHandler(): void {
  if (notificationHandlerConfigured || isExpoGo()) {
    return;
  }

  notificationHandlerConfigured = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

function getExpoProjectId(): string | undefined {
  return (
    Constants.expoConfig?.extra?.eas?.projectId ??
    (Constants as { easConfig?: { projectId?: string } }).easConfig?.projectId
  );
}

export async function configureForoNotificationChannel(): Promise<void> {
  if (isExpoGo() || Platform.OS !== 'android') {
    return;
  }

  ensureNotificationHandler();

  await Notifications.setNotificationChannelAsync(FORO_NOTIFICATION_CHANNEL_ID, {
    name: 'Foro / Sum',
    description: 'Avisos, eventos y planificaciones de tu sanatorio',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#1E7E34',
    sound: 'default',
    enableVibrate: true,
    showBadge: true,
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

export async function requestForoPushPermissions(): Promise<boolean> {
  await configureForoNotificationChannel();

  if (!Device.isDevice) {
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function getExpoPushToken(): Promise<string | null> {
  if (isExpoGo()) {
    return null;
  }

  ensureNotificationHandler();
  const granted = await requestForoPushPermissions();
  if (!granted) {
    return null;
  }

  const projectId = getExpoProjectId();
  if (!projectId) {
    console.warn(
      'Falta extra.eas.projectId en app.json. Ejecutá `eas init` para habilitar push.',
    );
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
}

export async function syncForoPushToken(profile: UserProfile): Promise<void> {
  if (profile.role === 'admin') {
    return;
  }

  const db = getFirestoreDb();
  if (!db) {
    return;
  }

  const expoPushToken = await getExpoPushToken();
  if (!expoPushToken) {
    return;
  }

  await setDoc(
    doc(db, ...FIRESTORE_PATHS.pushToken(profile.sanatorioId, profile.uid)),
    {
      uid: profile.uid,
      sanatorioId: profile.sanatorioId,
      role: profile.role,
      expoPushToken,
      platform: Platform.OS,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function getForoNotificationTitle(type: ForoPostType, sanatorioName: string): string {
  if (type === 'notificacion') {
    return translate(DEFAULT_LOCALE, 'foro.pushAvisoTitle', { sanatorio: sanatorioName });
  }

  return `${translate(DEFAULT_LOCALE, `foro.postType.${type}`)} · ${sanatorioName}`;
}
