import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  limit,
  type Unsubscribe,
} from 'firebase/firestore';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { getFirestoreDb, getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';

export type PublicUserLookup = {
  publicId: string;
  displayName: string;
  avatarUrl: string;
  isSelf: boolean;
};

export type MeetingInvite = {
  id: string;
  fromUid: string;
  fromName: string;
  fromPublicId: string;
  joinCode: string;
  roomTitle: string;
  roomId: string;
  link: string;
  status: 'pending' | 'accepted' | 'dismissed';
  createdAtMs: number;
};

async function callFn<T>(name: string, data: Record<string, unknown> = {}): Promise<T> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const fn = httpsCallable(functions, name);
  try {
    const result = await fn(data);
    return result.data as T;
  } catch (cause) {
    const error = cause as { message?: string; details?: unknown };
    const details = typeof error.details === 'string' ? error.details : undefined;
    throw new Error(details || error.message || 'i18n:meeting.errors.generic');
  }
}

export async function ensureMyPublicId(): Promise<string> {
  const result = await callFn<{ publicId: string }>('ensureMyPublicId');
  return String(result.publicId || '').trim().toUpperCase();
}

export async function lookupUserByPublicId(publicId: string): Promise<PublicUserLookup> {
  return callFn<PublicUserLookup>('lookupUserByPublicId', {
    publicId: publicId.trim().toUpperCase(),
  });
}

export async function sendMeetingInvite(input: {
  targetPublicId: string;
  joinCode: string;
  roomTitle: string;
  roomId?: string;
  link?: string;
}): Promise<{ inviteId: string; targetDisplayName: string }> {
  return callFn('sendMeetingInvite', {
    targetPublicId: input.targetPublicId.trim().toUpperCase(),
    joinCode: input.joinCode.trim().toUpperCase(),
    roomTitle: input.roomTitle,
    roomId: input.roomId || '',
    link: input.link || '',
  });
}

export async function dismissMeetingInvite(inviteId: string): Promise<void> {
  await callFn('dismissMeetingInvite', { inviteId });
}

export async function markMeetingInviteAccepted(uid: string, inviteId: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;
  await updateDoc(doc(db, ...FIRESTORE_PATHS.meetingInvite(uid, inviteId)), {
    status: 'accepted',
    updatedAt: new Date().toISOString(),
    respondedAt: new Date().toISOString(),
  });
}

export function subscribePendingMeetingInvites(
  uid: string,
  onChange: (items: MeetingInvite[]) => void,
): Unsubscribe {
  const db = getFirestoreDb();
  if (!db) {
    onChange([]);
    return () => undefined;
  }

  const q = query(
    collection(db, ...FIRESTORE_PATHS.meetingInvites(uid)),
    where('status', '==', 'pending'),
    limit(30),
  );

  return onSnapshot(
    q,
    (snap) => {
      const items: MeetingInvite[] = snap.docs
        .map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            fromUid: String(data.fromUid || ''),
            fromName: String(data.fromName || ''),
            fromPublicId: String(data.fromPublicId || ''),
            joinCode: String(data.joinCode || '').toUpperCase(),
            roomTitle: String(data.roomTitle || 'Sala Sanidapp'),
            roomId: String(data.roomId || ''),
            link: String(data.link || ''),
            status: (data.status as MeetingInvite['status']) || 'pending',
            createdAtMs: Number(data.createdAtMs) || Date.now(),
          };
        })
        .sort((a, b) => b.createdAtMs - a.createdAtMs);
      onChange(items);
    },
    () => onChange([]),
  );
}
