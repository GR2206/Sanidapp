import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { Platform } from 'react-native';

export type UiSound = 'tap' | 'confirm' | 'toggle';

/** Un solo sonido de marca para toda la UI. */
const TAP_SOURCE = require('../../../assets/sounds/ui-tap.mp3');

const SOURCES: Record<UiSound, number> = {
  tap: TAP_SOURCE,
  confirm: TAP_SOURCE,
  toggle: TAP_SOURCE,
};

/** Volumen al máximo. */
const VOLUME = 1;

let enabled = true;
let ready = false;
let priming: Promise<void> | null = null;
const players = new Map<UiSound, AudioPlayer>();

function isSupportedPlatform(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web';
}

async function ensureReady(): Promise<boolean> {
  if (!isSupportedPlatform()) return false;
  if (ready) return true;
  if (priming) {
    await priming;
    return ready;
  }

  priming = (async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
        shouldPlayInBackground: false,
        shouldRouteThroughEarpiece: false,
      });

      (Object.keys(SOURCES) as UiSound[]).forEach((key) => {
        const player = createAudioPlayer(SOURCES[key], { keepAudioSessionActive: true });
        player.volume = VOLUME;
        players.set(key, player);
      });

      ready = true;
    } catch {
      ready = false;
    } finally {
      priming = null;
    }
  })();

  await priming;
  return ready;
}

export function setUiSoundsEnabled(value: boolean): void {
  enabled = value;
}

export function getUiSoundsEnabled(): boolean {
  return enabled;
}

/** Precarga jugadores (llamar al montar la app). */
export function primeUiSounds(): void {
  void ensureReady();
}

export function playUiSound(kind: UiSound = 'tap'): void {
  if (!enabled) return;

  void (async () => {
    const ok = await ensureReady();
    if (!ok) return;

    const player = players.get(kind) ?? players.get('tap');
    if (!player) return;

    try {
      player.volume = VOLUME;
      await player.seekTo(0);
      player.play();
    } catch {
      // Silenciar fallos de audio (Expo Go / sesión ocupada).
    }
  })();
}
