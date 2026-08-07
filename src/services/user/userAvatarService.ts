import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { FIRESTORE_PATHS } from '@/constants/firebase';
import { i18nError } from '@/i18n/resolveMessage';
import { getFirebaseStorage, getFirestoreDb } from '@/services/firebase/firebaseApp';

export async function uploadUserAvatar(params: {
  uid: string;
  localUri: string;
  contentType?: string;
}): Promise<string> {
  const storage = getFirebaseStorage();
  const db = getFirestoreDb();
  if (!storage || !db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const response = await fetch(params.localUri);
  const blob = await response.blob();
  const isPng =
    params.contentType === 'image/png' ||
    params.localUri.toLowerCase().includes('.png') ||
    blob.type === 'image/png';
  const ext = isPng ? 'png' : 'jpg';
  const contentType = isPng ? 'image/png' : 'image/jpeg';
  const path = `users/${params.uid}/avatar.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType });
  const avatarUrl = await getDownloadURL(storageRef);

  await setDoc(
    doc(db, ...FIRESTORE_PATHS.usuario(params.uid)),
    {
      avatarUrl,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  return avatarUrl;
}

export async function clearUserAvatar(uid: string): Promise<void> {
  const db = getFirestoreDb();
  if (!db) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  await setDoc(
    doc(db, ...FIRESTORE_PATHS.usuario(uid)),
    {
      avatarUrl: '',
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
