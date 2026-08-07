import { doc, getDoc } from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { getFirestoreDb } from '@/services/firebase/firebaseApp';

export type PublicAppStats = {
  registeredUsers: number;
};

/**
 * Lee el contador público de usuarios registrados.
 * No requiere sesión: consulta `apps/sanidapp/config/publicStats`.
 */
export async function loadPublicAppStats(): Promise<PublicAppStats | null> {
  const db = getFirestoreDb();
  if (!db) return null;

  try {
    const snap = await getDoc(doc(db, ...FIRESTORE_PATHS.publicStats()));
    if (!snap.exists()) {
      // Primera vez: el CF sincroniza el conteo real.
      const { getFirebaseFunctions } = await import('@/services/firebase/firebaseApp');
      const functions = getFirebaseFunctions();
      if (!functions) return null;
      const { httpsCallable } = await import('firebase/functions');
      const sync = httpsCallable(functions, 'syncPublicAppStats');
      const result = await sync({});
      const data = result.data as { registeredUsers?: number };
      const count = Number(data.registeredUsers ?? 0);
      return Number.isFinite(count) ? { registeredUsers: count } : null;
    }

    const count = Number(snap.data()?.registeredUsers ?? 0);
    return Number.isFinite(count) && count >= 0 ? { registeredUsers: count } : null;
  } catch {
    return null;
  }
}
