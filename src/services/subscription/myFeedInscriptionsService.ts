import { collection, getDocs, query, where } from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { getFirestoreDb } from '@/services/firebase/firebaseApp';
import type { FeedKind } from '@/types/feed';

export type MyFeedInscriptionKey = `${string}:${string}`;

export async function listMyApprovedFeedInscriptionKeys(
  uid: string,
): Promise<Set<MyFeedInscriptionKey>> {
  const db = getFirestoreDb();
  const keys = new Set<MyFeedInscriptionKey>();
  if (!db || !uid) return keys;

  const snap = await getDocs(
    query(collection(db, ...FIRESTORE_PATHS.feedInscriptions()), where('uid', '==', uid)),
  );

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    if (data.status !== 'approved') continue;
    const kind = String(data.kind || '').trim();
    const itemId = String(data.itemId || '').trim();
    if (kind && itemId) {
      keys.add(`${kind}:${itemId}`);
    }
  }

  return keys;
}

export function inscriptionKey(kind: FeedKind | string, itemId: string): MyFeedInscriptionKey {
  return `${kind}:${itemId}`;
}
