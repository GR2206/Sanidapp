import * as WebBrowser from 'expo-web-browser';

import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import type { UserProfile } from '@/types/auth';

const MP_SUCCESS_REDIRECT = 'https://sanidapp-b67d7.web.app/premium/success';

export interface MercadoPagoCheckoutResult {
  preferenceId: string;
  checkoutUrl: string;
  unitPrice: number;
  currency: string;
}

export async function createMercadoPagoCheckoutForUser(
  profile: UserProfile,
): Promise<MercadoPagoCheckoutResult> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const createCheckout = httpsCallable<
    { name?: string; surname?: string; email?: string },
    MercadoPagoCheckoutResult
  >(functions, 'createMercadoPagoCheckout');

  try {
    const result = await createCheckout({
      name: profile.nombre,
      surname: profile.apellido,
      email: profile.email,
    });
    return result.data;
  } catch (cause) {
    const error = cause as { code?: string; message?: string };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError('subscription.errors.mpUnavailable');
    }
    throw new Error(error.message ?? 'i18n:subscription.errors.mpStartFailed');
  }
}

/** Abre Checkout Pro; cierra al volver a la URL HTTPS de éxito (Hosting → deep link). */
export async function openMercadoPagoCheckout(checkoutUrl: string): Promise<'dismiss' | 'success'> {
  const result = await WebBrowser.openAuthSessionAsync(checkoutUrl, MP_SUCCESS_REDIRECT);
  if (result.type === 'success') {
    return 'success';
  }
  return 'dismiss';
}
