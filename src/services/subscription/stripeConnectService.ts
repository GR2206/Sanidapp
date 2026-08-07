import * as WebBrowser from 'expo-web-browser';

import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';

export type StripeConnectStatus = {
  accountId: string | null;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  country: string | null;
  alreadyReady?: boolean;
  onboardingUrl?: string | null;
};

export async function getStripeConnectStatus(): Promise<StripeConnectStatus> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'getStripeConnectStatus');
  try {
    const result = await call({});
    return result.data as StripeConnectStatus;
  } catch (cause) {
    const error = cause as { message?: string };
    throw new Error(error.message ?? 'i18n:feedPaymentStripe.statusError');
  }
}

export async function startStripeConnectOnboarding(country: string): Promise<StripeConnectStatus> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }
  const { httpsCallable } = await import('firebase/functions');
  const call = httpsCallable(functions, 'createStripeConnectOnboarding');
  try {
    const result = await call({ country });
    return result.data as StripeConnectStatus;
  } catch (cause) {
    const error = cause as { message?: string };
    throw new Error(error.message ?? 'i18n:feedPaymentStripe.onboardError');
  }
}

export async function openStripeConnectOnboarding(url: string): Promise<'dismiss' | 'success'> {
  const result = await WebBrowser.openAuthSessionAsync(
    url,
    'https://sanidapp-b67d7.web.app/feed/inscription/success',
  );
  return result.type === 'success' ? 'success' : 'dismiss';
}
