import AsyncStorage from '@react-native-async-storage/async-storage';

import { NURSING_REMINDERS_PREF_KEY } from '@/constants/nursingReminders';

/** Preferencia local (sin tocar expo-notifications). */
export async function getNursingRemindersEnabled(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(NURSING_REMINDERS_PREF_KEY);
    if (raw == null) {
      return true;
    }
    return raw === '1' || raw === 'true';
  } catch {
    return true;
  }
}

export async function setNursingRemindersEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(NURSING_REMINDERS_PREF_KEY, enabled ? '1' : '0');
}
