import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'sanidapp:foro:lastSeen';

function storageKey(uid: string, sanatorioId: string): string {
  return `${STORAGE_PREFIX}:${uid}:${sanatorioId}`;
}

export async function loadForoLastSeenAt(uid: string, sanatorioId: string): Promise<string | null> {
  return AsyncStorage.getItem(storageKey(uid, sanatorioId));
}

export async function saveForoLastSeenAt(
  uid: string,
  sanatorioId: string,
  iso: string,
): Promise<void> {
  await AsyncStorage.setItem(storageKey(uid, sanatorioId), iso);
}
