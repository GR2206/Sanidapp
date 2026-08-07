import AsyncStorage from '@react-native-async-storage/async-storage';

import { normalizeCountryCode } from '@/utils/country';

const KEY = '@sanidapp/countryCode';

export async function readLocalCountryCode(): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(KEY);
    const code = normalizeCountryCode(value);
    return code || null;
  } catch {
    return null;
  }
}

export async function writeLocalCountryCode(countryCode: string): Promise<void> {
  const code = normalizeCountryCode(countryCode);
  if (!code) {
    await AsyncStorage.removeItem(KEY);
    return;
  }
  await AsyncStorage.setItem(KEY, code);
}
