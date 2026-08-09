import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Linking, Platform } from 'react-native';

import bundledAppUpdate from '../../../content/app-update.json';
import { APP_CONFIG } from '@/constants/config';
import type { AppLocale } from '@/i18n/types';
import { fetchGitHubJson } from '@/services/github/githubClient';
import { isVersionOlder } from '@/utils/compareVersions';

const DISMISSED_VERSION_KEY = '@sanidapp/appUpdate.dismissedLatestVersion';

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

async function loadRemoteOrBundledConfig(): Promise<AppUpdateConfig> {
  try {
    const remote = asConfig(await fetchGitHubJson<AppUpdateConfig>(APP_CONFIG.appUpdate.remotePath));
    if (remote) return remote;
  } catch {
    // offline / gist lento → empaquetado
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
