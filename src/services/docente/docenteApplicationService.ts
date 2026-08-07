import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { getFirebaseFunctions, getFirebaseStorage } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import type { DocenteApplication, DocenteApplicationInput } from '@/types/docente';

export async function uploadDocenteCertificate(params: {
  uid: string;
  localUri: string;
  contentType?: string;
}): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) {
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
  const path = `docente/certificates/${params.uid}/${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType });
  return getDownloadURL(storageRef);
}

export async function submitDocenteApplication(
  input: DocenteApplicationInput,
): Promise<{ applicationId: string }> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'submitDocenteApplication');
  try {
    const result = await call(input);
    const data = result.data as { applicationId: string };
    return { applicationId: data.applicationId };
  } catch (cause) {
    const error = cause as { message?: string };
    throw new Error(error.message ?? 'i18n:docente.errors.submitFailed');
  }
}

export async function getMyDocenteApplication(): Promise<DocenteApplication | null> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'getMyDocenteApplication');
  const result = await call({});
  const data = result.data as { item?: DocenteApplication | null };
  return data.item ?? null;
}

export async function listDocenteApplications(
  status: 'pending' | 'approved' | 'rejected' | 'all' = 'pending',
): Promise<DocenteApplication[]> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'listDocenteApplications');
  const result = await call({ status });
  const data = result.data as { items?: DocenteApplication[] };
  return data.items ?? [];
}

export async function reviewDocenteApplication(params: {
  applicationId: string;
  decision: 'approved' | 'rejected';
  rejectReason?: string;
}): Promise<DocenteApplication> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'reviewDocenteApplication');
  try {
    const result = await call(params);
    const data = result.data as { item: DocenteApplication };
    return data.item;
  } catch (cause) {
    const error = cause as { message?: string };
    throw new Error(error.message ?? 'i18n:docente.errors.reviewFailed');
  }
}
