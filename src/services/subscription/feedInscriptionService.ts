import * as WebBrowser from 'expo-web-browser';

import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import type { FeedKind } from '@/types/feed';
import type { UserProfile } from '@/types/auth';

export interface FeedInscriptionCheckoutResult {
  preferenceId?: string;
  checkoutUrl?: string;
  unitPrice?: number;
  currency?: string;
  commissionPercent?: number;
  commissionAmount?: number;
  payeeAmount?: number;
  /** Inscripción gratuita del personal del sanatorio organizador (público). */
  freeEnrolled?: boolean;
}

export async function createFeedInscriptionCheckout(params: {
  profile: UserProfile;
  kind: FeedKind;
  itemId: string;
  scopeType: 'global' | 'sanatorio';
  sanatorioId?: string | null;
}): Promise<FeedInscriptionCheckoutResult> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const createCheckout = httpsCallable(functions, 'createFeedInscriptionCheckout');

  try {
    const result = await createCheckout({
      kind: params.kind,
      itemId: params.itemId,
      scopeType: params.scopeType,
      sanatorioId: params.sanatorioId ?? undefined,
      name: params.profile.nombre,
      surname: params.profile.apellido,
      email: params.profile.email,
    });
    return result.data as FeedInscriptionCheckoutResult;
  } catch (cause) {
    const error = cause as { code?: string; message?: string };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError('subscription.errors.mpUnavailable');
    }
    throw new Error(error.message ?? 'i18n:feedInscription.errors.startFailed');
  }
}

export async function openFeedInscriptionCheckout(
  checkoutUrl: string,
): Promise<'dismiss' | 'success'> {
  const result = await WebBrowser.openAuthSessionAsync(
    checkoutUrl,
    'https://sanidapp-b67d7.web.app/feed/inscription/success',
  );
  return result.type === 'success' ? 'success' : 'dismiss';
}

/** Alumno declara pago externo → entra al roster (canon 20% pendiente del organizador). */
export async function confirmExternalFeedInscription(params: {
  profile: UserProfile;
  kind: FeedKind;
  itemId: string;
  scopeType: 'global' | 'sanatorio';
  sanatorioId?: string | null;
}): Promise<FeedInscriptionCheckoutResult & { enrolled?: boolean }> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const confirm = httpsCallable(functions, 'confirmExternalFeedInscription');

  try {
    const result = await confirm({
      kind: params.kind,
      itemId: params.itemId,
      scopeType: params.scopeType,
      sanatorioId: params.sanatorioId ?? undefined,
      name: params.profile.nombre,
      surname: params.profile.apellido,
      email: params.profile.email,
    });
    return result.data as FeedInscriptionCheckoutResult & { enrolled?: boolean };
  } catch (cause) {
    const error = cause as { code?: string; message?: string };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError('subscription.errors.mpUnavailable');
    }
    throw new Error(error.message ?? 'i18n:feedInscription.errors.startFailed');
  }
}
