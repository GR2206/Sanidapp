import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { requireOptionalNativeModule } from 'expo-modules-core';
import { AppState, Platform } from 'react-native';

export type UiSound = 'tap' | 'confirm' | 'toggle' | 'key';

/** WAV del waterdrop (freesound) para botones — convertido desde MP3. */
const TAP_SOURCE = require('../../../assets/sounds/ui-tap.wav');
/** Toc suave de tecla (~45 ms). */
const KEY_SOURCE = require('../../../assets/sounds/ui-key.wav');

const VOLUME = 0.62;
const KEY_VOLUME = 0.5;

const POOL_SIZE = 4;
const KEY_POOL_SIZE = 5;

let enabled = true;
let ready = false;
let priming: Promise<void> | null = null;
let pool: AudioPlayer[] = [];
let keyPool: AudioPlayer[] = [];
let cursor = 0;
let keyCursor = 0;

type DeviceRingerNative = {
  getRingerMode: () => 'normal' | 'vibrate' | 'silent';
  getRingVolumeRatio: () => number;
};

const DeviceRinger = requireOptionalNativeModule<DeviceRingerNative>('DeviceRinger');

function isSupportedPlatform(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web';
}

/**
 * Respeta el perfil del celular cuando hay API nativa.
 * - iOS: playsInSilentMode: false (silent switch).
 * - Android con DeviceRinger: solo suena en modo normal, al volumen de timbre.
 * - Android sin módulo (Expo Go): permite sonido (no hay forma fiable de leer el vibrador).
 */
function isDeviceSoundProfileAllowingAudio(): boolean {
  if (Platform.OS !== 'android' || !DeviceRinger) {
    return true;
  }
  try {
    return DeviceRinger.getRingerMode() === 'normal';
  } catch {
    return true;
  }
}

/** Escala al volumen del perfil de timbre (Android), no al de multimedia. */
function volumeForProfile(base: number): number {
  if (Platform.OS !== 'android' || !DeviceRinger) {
    return base;
  }
  try {
    const ratio = DeviceRinger.getRingVolumeRatio();
    if (!Number.isFinite(ratio)) return base;
    return base * Math.max(0, Math.min(1, ratio));
  } catch {
    return base;
  }
}

function resetAndPlay(player: AudioPlayer, volume: number): void {
  try {
    if (player.playing) {
      player.pause();
    }
    try {
      player.currentTime = 0;
    } catch {
      void player.seekTo(0);
    }
    player.volume = volume;
    player.play();
  } catch {
    // Silenciar fallos de audio (Expo Go / sesión ocupada).
  }
}

function warmPlayer(player: AudioPlayer, volume: number): void {
  player.volume = 0;
  player.play();
  player.pause();
  try {
    player.currentTime = 0;
  } catch {
    void player.seekTo(0);
  }
  player.volume = volume;
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
        // iOS: respeta el switch de silencio. En Android Expo Go este flag se ignora.
        playsInSilentMode: Platform.OS === 'ios' ? false : true,
        interruptionMode: 'mixWithOthers',
        shouldPlayInBackground: false,
        shouldRouteThroughEarpiece: false,
      });

      pool = Array.from({ length: POOL_SIZE }, () => {
        const player = createAudioPlayer(TAP_SOURCE, {
          keepAudioSessionActive: true,
          downloadFirst: true,
          updateInterval: 1000,
        });
        player.volume = VOLUME;
        return player;
      });

      keyPool = Array.from({ length: KEY_POOL_SIZE }, () => {
        const player = createAudioPlayer(KEY_SOURCE, {
          keepAudioSessionActive: true,
          downloadFirst: true,
          updateInterval: 1000,
        });
        player.volume = KEY_VOLUME;
        return player;
      });

      if (pool[0]) warmPlayer(pool[0], VOLUME);
      if (keyPool[0]) warmPlayer(keyPool[0], KEY_VOLUME);

      ready = true;
    } catch {
      ready = false;
      pool = [];
      keyPool = [];
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

export function primeUiSounds(): void {
  void ensureReady();
}

function canPlayNow(): boolean {
  if (!enabled) return false;
  if (AppState.currentState !== 'active') return false;
  return isDeviceSoundProfileAllowingAudio();
}

export function playUiSound(_kind: UiSound = 'tap'): void {
  if (!canPlayNow()) return;

  const volume = volumeForProfile(VOLUME);

  if (ready && pool.length > 0) {
    const player = pool[cursor % pool.length];
    cursor = (cursor + 1) % pool.length;
    if (player) resetAndPlay(player, volume);
    return;
  }

  void (async () => {
    const ok = await ensureReady();
    if (!ok || pool.length === 0 || !canPlayNow()) return;
    const player = pool[cursor % pool.length];
    cursor = (cursor + 1) % pool.length;
    if (player) resetAndPlay(player, volumeForProfile(VOLUME));
  })();
}

let lastKeySoundAt = 0;
const KEY_THROTTLE_MS = 32;

export function playKeySound(): void {
  if (!canPlayNow()) return;
  const now = Date.now();
  if (now - lastKeySoundAt < KEY_THROTTLE_MS) return;
  lastKeySoundAt = now;

  const volume = volumeForProfile(KEY_VOLUME);

  if (ready && keyPool.length > 0) {
    const player = keyPool[keyCursor % keyPool.length];
    keyCursor = (keyCursor + 1) % keyPool.length;
    if (player) resetAndPlay(player, volume);
    return;
  }

  void (async () => {
    const ok = await ensureReady();
    if (!ok || keyPool.length === 0 || !canPlayNow()) return;
    const player = keyPool[keyCursor % keyPool.length];
    keyCursor = (keyCursor + 1) % keyPool.length;
    if (player) resetAndPlay(player, volumeForProfile(KEY_VOLUME));
  })();
}
