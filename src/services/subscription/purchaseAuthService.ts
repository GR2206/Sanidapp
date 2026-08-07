import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import {
  buildIapPremiumGrant,
  mergeSubscriptionIntoProfile,
} from '@/services/subscription/subscriptionService';
import type { UserProfile } from '@/types/auth';

export interface VerifyPlayPurchaseInput {
  productId: string;
  purchaseToken: string;
}

export async function verifyPlayPurchaseForUser(
  profile: UserProfile,
  input: VerifyPlayPurchaseInput,
): Promise<UserProfile> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const verify = httpsCallable<
    VerifyPlayPurchaseInput,
    { accessTier: string; premiumSource: string }
  >(functions, 'verifyPlayPurchase');

  try {
    const result = await verify(input);
    if (result.data.accessTier !== 'premium') {
      throw i18nError('subscription.errors.purchaseNotPremium');
    }

    return mergeSubscriptionIntoProfile(profile, buildIapPremiumGrant());
  } catch (cause) {
    const error = cause as { code?: string; message?: string; details?: unknown };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError('subscription.errors.purchaseVerifyUnavailable');
    }

    const message = String(error.message ?? '').trim();
    // Firebase a veces manda solo "INTERNAL" / "PERMISSION_DENIED" en mayúsculas.
    if (!message || /^[A-Z_]+$/.test(message)) {
      throw i18nError('subscription.errors.purchaseValidationFailed');
    }

    throw new Error(message);
  }
}
