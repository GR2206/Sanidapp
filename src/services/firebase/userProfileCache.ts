import AsyncStorage from '@react-native-async-storage/async-storage';

import type { UserProfile } from '@/types/auth';

const CACHE_KEY = '@sanidapp/lastUserProfile';

/** Perfil del último ingreso: permite abrir home sin esperar Firestore. */
export async function readCachedUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    return parsed?.uid === uid ? parsed : null;
  } catch {
    return null;
  }
}

export async function writeCachedUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export async function clearCachedUserProfile(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}
