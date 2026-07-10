import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { playUiSound } from '@/services/audio/uiSoundService';

/** Impacto ligero + clic suave de oficina (iOS/Android; web solo sonido). */
export function hapticLight(): void {
  playUiSound('tap');

  if (Platform.OS === 'web') {
    return;
  }

  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

/** Confirmación suave (favorito, acción exitosa). */
export function hapticSuccess(): void {
  playUiSound('confirm');

  if (Platform.OS === 'web') {
    return;
  }

  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

/** Toggle de ajustes (sonido + haptic). */
export function hapticToggle(): void {
  playUiSound('toggle');

  if (Platform.OS === 'web') {
    return;
  }

  void Haptics.selectionAsync().catch(() => {});
}

/** Ejecuta haptic y luego el handler original. */
export function withHaptic<T extends (...args: never[]) => void>(handler?: T): T | undefined {
  if (!handler) {
    return undefined;
  }

  return ((...args: Parameters<T>) => {
    hapticLight();
    handler(...args);
  }) as T;
}
