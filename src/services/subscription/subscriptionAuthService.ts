import { getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import {
  buildAllowlistPremiumGrant,
  buildInstitutionTokenPremiumGrant,
  mergeSubscriptionIntoProfile,
} from '@/services/subscription/subscriptionService';
import type { UserProfile } from '@/types/auth';

async function callHttpsFunction<TRequest, TResponse>(
  name: string,
  data: TRequest,
  unavailableKey: string,
): Promise<TResponse> {
  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const callable = httpsCallable<TRequest, TResponse>(functions, name);

  try {
    const result = await callable(data);
    return result.data;
  } catch (cause) {
    const error = cause as { code?: string; message?: string };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError(unavailableKey);
    }

    throw new Error(error.message ?? 'i18n:subscription.errors.operationFailed');
  }
}

export async function syncAllowlistPremiumForUser(
  profile: UserProfile,
): Promise<UserProfile> {
  if (profile.accessTier === 'premium' || !profile.sanatorioId) {
    return profile;
  }

  const result = await callHttpsFunction<
    Record<string, never>,
    { synced: boolean; accessTier: string; premiumSource: string }
  >(
    'syncAllowlistPremium',
    {},
    'subscription.errors.allowlistSyncUnavailable',
  );

  if (!result.synced || result.accessTier !== 'premium') {
    return profile;
  }

  return mergeSubscriptionIntoProfile(profile, buildAllowlistPremiumGrant());
}

export async function redeemInstitutionTokenForUser(
  profile: UserProfile,
  tokenInput: string,
  sanatorioIdOverride?: string,
): Promise<UserProfile> {
  const token = tokenInput.trim();
  if (!token) {
    throw i18nError('subscription.errors.tokenRequired');
  }

  const sanatorioId = profile.sanatorioId || sanatorioIdOverride?.trim() || '';
  if (!sanatorioId) {
    throw i18nError('subscription.errors.sanatorioAndTokenRequired');
  }

  const functions = getFirebaseFunctions();
  if (!functions) {
    throw i18nError('subscription.errors.firebaseNotConfigured');
  }

  const { httpsCallable } = await import('firebase/functions');
  const redeem = httpsCallable<
    { token: string; sanatorioId: string },
    {
      accessTier: string;
      premiumSource: string;
      institutionToken: string;
      sanatorioId?: string;
      sanatorioName?: string;
    }
  >(functions, 'redeemInstitutionToken');

  try {
    const result = await redeem({ token, sanatorioId });
    const grant = buildInstitutionTokenPremiumGrant(result.data.institutionToken || token);
    return mergeSubscriptionIntoProfile(
      {
        ...profile,
        sanatorioId: result.data.sanatorioId ?? profile.sanatorioId ?? sanatorioId,
        sanatorioName: result.data.sanatorioName ?? profile.sanatorioName,
      },
      grant,
    );
  } catch (cause) {
    const error = cause as { code?: string; message?: string };
    if (error.code === 'functions/not-found' || error.code === 'functions/unavailable') {
      throw i18nError('subscription.errors.tokenRedeemUnavailable');
    }

    throw new Error(error.message ?? 'i18n:subscription.errors.tokenValidationFailed');
  }
}
