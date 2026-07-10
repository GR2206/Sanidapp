import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type Timestamp,
} from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { i18nError } from '@/i18n/resolveMessage';
import { getFirestoreDb } from '@/services/firebase/firebaseApp';
import type { CreateForoPostInput, ForoPost, UpdateForoPostInput } from '@/types/foro';

function timestampToIso(value: unknown): string {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as Timestamp).toDate().toISOString();
  }

  return typeof value === 'string' ? value : '';
}

function postFromSnapshot(id: string, data: DocumentData): ForoPost {
  return {
    id,
    sanatorioId: String(data.sanatorioId ?? ''),
    type: data.type as ForoPost['type'],
    title: String(data.title ?? ''),
    body: String(data.body ?? ''),
    eventDate: data.eventDate ? String(data.eventDate) : null,
    targetUid: data.targetUid ? String(data.targetUid) : null,
    targetName: data.targetName ? String(data.targetName) : null,
    authorUid: String(data.authorUid ?? ''),
    authorName: String(data.authorName ?? ''),
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export function subscribeForoPosts(
  sanatorioId: string,
  listener: (posts: ForoPost[]) => void,
  onError?: (error: Error) => void,
): () => void {
  const db = getFirestoreDb();
  if (!db) {
    listener([]);
    return () => undefined;
  }

  const postsQuery = query(
    collection(db, ...FIRESTORE_PATHS.foroPosts(sanatorioId)),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(
    postsQuery,
    (snapshot) => {
      listener(snapshot.docs.map((item) => postFromSnapshot(item.id, item.data())));
    },
    (error) => {
      onError?.(error);
      listener([]);
    },
  );
}

export async function createForoPost(input: CreateForoPostInput): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  await addDoc(collection(db, ...FIRESTORE_PATHS.foroPosts(input.sanatorioId)), {
    sanatorioId: input.sanatorioId,
    type: input.type,
    title: input.title.trim(),
    body: input.body.trim(),
    eventDate: input.eventDate?.trim() || null,
    targetUid: input.targetUid?.trim() || null,
    targetName: input.targetName?.trim() || null,
    authorUid: input.authorUid,
    authorName: input.authorName.trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateForoPost(
  sanatorioId: string,
  postId: string,
  input: UpdateForoPostInput,
): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (input.type !== undefined) {
    payload.type = input.type;
  }
  if (input.title !== undefined) {
    payload.title = input.title.trim();
  }
  if (input.body !== undefined) {
    payload.body = input.body.trim();
  }
  if (input.eventDate !== undefined) {
    payload.eventDate = input.eventDate?.trim() || null;
  }

  await updateDoc(doc(db, ...FIRESTORE_PATHS.foroPost(sanatorioId, postId)), payload);
}

export async function deleteForoPost(sanatorioId: string, postId: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  await deleteDoc(doc(db, ...FIRESTORE_PATHS.foroPost(sanatorioId, postId)));
}

export async function deleteForoPosts(sanatorioId: string, postIds: string[]): Promise<void> {
  if (postIds.length === 0) {
    return;
  }

  await Promise.all(postIds.map((postId) => deleteForoPost(sanatorioId, postId)));
}
