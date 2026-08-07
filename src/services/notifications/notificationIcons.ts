import { Image, Platform } from 'react-native';

/**
 * Logo a color para el ícono grande a la izquierda (Android).
 * El ícono pequeño (status bar) lo define el plugin expo-notifications.
 */
export function getNotificationLargeIconUri(): string | undefined {
  if (Platform.OS !== 'android') {
    return undefined;
  }

  try {
    const asset = Image.resolveAssetSource(
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('../../../assets/images/notification-large-icon.png'),
    );
    return asset?.uri || undefined;
  } catch {
    return undefined;
  }
}
