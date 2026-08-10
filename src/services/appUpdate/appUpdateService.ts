import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { InteractionManager, Linking, Platform } from 'react-native';

import bundledAppUpdate from '../../../content/app-update.json';
import { APP_CONFIG, getGitHubRawUrl } from '@/constants/config';
import type { AppLocale } from '@/i18n/types';
import { isVersionOlder } from '@/utils/compareVersions';

const DISMISSED_VERSION_KEY = '@sanidapp/appUpdate.dismissedLatestVersion';
const REMOTE_TIMEOUT_MS = 5000;

export type AppUpdateConfig = {
  latestVersion: string;
  minVersion?: string;
  forceUpdate?: boolean;
  message?: Partial<Record<AppLocale, string>> | string;
};

export type AppUpdatePrompt = {
  latestVersion: string;
  currentVersion: string;
  forceUpdate: boolean;
  message: string | null;
};

function asConfig(raw: unknown): AppUpdateConfig | null {
  if (!raw || typeof raw !== 'object') return null;
  const latestVersion = String((raw as AppUpdateConfig).latestVersion ?? '').trim();
  if (!latestVersion) return null;
  return {
    latestVersion,
    minVersion: (raw as AppUpdateConfig).minVersion,
    forceUpdate: Boolean((raw as AppUpdateConfig).forceUpdate),
    message: (raw as AppUpdateConfig).message,
  };
}

export function getInstalledAppVersion(): string {
  const fromNative = Constants.nativeAppVersion?.trim();
  if (fromNative) return fromNative;
  const fromExpo = Constants.expoConfig?.version?.trim();
  if (fromExpo) return fromExpo;
  return '0.0.0';
}

function pickMessage(config: AppUpdateConfig, locale: AppLocale): string | null {
  const message = config.message;
  if (!message) return null;
  if (typeof message === 'string') return message.trim() || null;
  return (message[locale] ?? message.es ?? message.en ?? message['pt-BR'] ?? '').trim() || null;
}

function withCacheBust(url: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}t=${Date.now()}`;
}

async function fetchJsonWithTimeout<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);
  try {
    const response = await fetch(withCacheBust(url), {
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function loadRemoteOrBundledConfig(): Promise<AppUpdateConfig> {
  const gistUrl = APP_CONFIG.appUpdate.gistRawUrl?.trim();
  if (gistUrl) {
    try {
      const fromGist = asConfig(await fetchJsonWithTimeout<AppUpdateConfig>(gistUrl));
      if (fromGist) return fromGist;
    } catch {
      // seguir con GitHub
    }
  }

  try {
    const githubUrl = getGitHubRawUrl(
      `${APP_CONFIG.github.contentRoot}/${APP_CONFIG.appUpdate.remotePath}`,
    );
    const fromGithub = asConfig(await fetchJsonWithTimeout<AppUpdateConfig>(githubUrl));
    if (fromGithub) return fromGithub;
  } catch {
    // offline → empaquetado
  }

  const bundled = asConfig(bundledAppUpdate);
  if (!bundled) {
    throw new Error('app-update.json inválido');
  }
  return bundled;
}

export async function resolveAppUpdatePrompt(locale: AppLocale): Promise<AppUpdatePrompt | null> {
  // En Expo Go no empujamos a la store.
  if (Constants.appOwnership === 'expo') {
    return null;
  }

  // Esperar a que termine la transición inicial evita pelear con splash/nav.
  await new Promise<void>((resolve) => {
    InteractionManager.runAfterInteractions(() => resolve());
  });

  const config = await loadRemoteOrBundledConfig();
  const currentVersion = getInstalledAppVersion();
  const needsUpdate =
    isVersionOlder(currentVersion, config.latestVersion) ||
    (config.minVersion ? isVersionOlder(currentVersion, config.minVersion) : false);

  if (!needsUpdate) {
    return null;
  }

  const forceUpdate =
    Boolean(config.forceUpdate) ||
    (config.minVersion ? isVersionOlder(currentVersion, config.minVersion) : false);

  if (!forceUpdate) {
    const dismissed = await AsyncStorage.getItem(DISMISSED_VERSION_KEY);
    if (dismissed && dismissed === config.latestVersion) {
      return null;
    }
  }

  return {
    latestVersion: config.latestVersion,
    currentVersion,
    forceUpdate,
    message: pickMessage(config, locale),
  };
}

export async function dismissAppUpdatePrompt(latestVersion: string): Promise<void> {
  await AsyncStorage.setItem(DISMISSED_VERSION_KEY, latestVersion);
}

async function resolveIosStoreUrl(): Promise<string> {
  if (APP_CONFIG.stores.ios) {
    return APP_CONFIG.stores.ios;
  }

  try {
    const bundleId = encodeURIComponent(APP_CONFIG.stores.iosBundleId);
    const response = await fetch(`https://itunes.apple.com/lookup?bundleId=${bundleId}`);
    if (response.ok) {
      const data = (await response.json()) as {
        resultCount?: number;
        results?: { trackViewUrl?: string }[];
      };
      const url = data.results?.[0]?.trackViewUrl?.trim();
      if (url) return url;
    }
  } catch {
    // sin listing todavía
  }

  return APP_CONFIG.stores.android;
}

export async function openStoreForUpdate(): Promise<void> {
  const url =
    Platform.OS === 'ios' ? await resolveIosStoreUrl() : APP_CONFIG.stores.android;
  const can = await Linking.canOpenURL(url);
  if (!can) {
    throw new Error('No se pudo abrir la tienda');
  }
  await Linking.openURL(url);
}
