import type { UserProfile, UserRole } from '@/types/auth';
import type { AccessTier, PremiumSource, UserSubscriptionFields } from '@/types/subscription';
import { DEFAULT_SUBSCRIPTION } from '@/types/subscription';

export function normalizePremiumSource(value: unknown): PremiumSource {
  const source = String(value ?? '');
  if (
    source === 'allowlist' ||
    source === 'institution_token' ||
    source === 'iap' ||
    source === 'mercadopago' ||
    source === 'admin'
  ) {
    return source;
  }

  return '';
}

export function normalizeAccessTier(value: unknown): AccessTier {
  return value === 'premium' ? 'premium' : 'free';
}

export function subscriptionFromFirestore(data: Record<string, unknown>): UserSubscriptionFields {
  return {
    accessTier: normalizeAccessTier(data.accessTier),
    institutionToken: String(data.institutionToken ?? ''),
    premiumSource: normalizePremiumSource(data.premiumSource),
    premiumGrantedAt: data.premiumGrantedAt ? String(data.premiumGrantedAt) : null,
  };
}

export function isAdminRole(role: UserRole): boolean {
  return role === 'admin';
}

export function hasPremiumAccess(profile: Pick<UserProfile, 'role' | 'accessTier'> | null): boolean {
  if (!profile) {
    return false;
  }

  if (isAdminRole(profile.role)) {
    return true;
  }

  return profile.accessTier === 'premium';
}

export function resolveAccessTierForRole(
  role: UserRole,
  subscription: UserSubscriptionFields,
): AccessTier {
  if (isAdminRole(role)) {
    return 'premium';
  }

  return subscription.accessTier;
}

export function buildAllowlistPremiumGrant(): UserSubscriptionFields {
  return {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'allowlist',
    premiumGrantedAt: new Date().toISOString(),
  };
}

export function buildInstitutionTokenPremiumGrant(token: string): UserSubscriptionFields {
  return {
    accessTier: 'premium',
    institutionToken: token.trim(),
    premiumSource: 'institution_token',
    premiumGrantedAt: new Date().toISOString(),
  };
}

export function buildIapPremiumGrant(): UserSubscriptionFields {
  return {
    accessTier: 'premium',
    institutionToken: '',
    premiumSource: 'iap',
    premiumGrantedAt: new Date().toISOString(),
  };
}

export function mergeSubscriptionIntoProfile(
  profile: UserProfile,
  subscription: Partial<UserSubscriptionFields>,
): UserProfile {
  return {
    ...profile,
    accessTier: subscription.accessTier ?? profile.accessTier,
    institutionToken: subscription.institutionToken ?? profile.institutionToken,
    premiumSource: subscription.premiumSource ?? profile.premiumSource,
    premiumGrantedAt: subscription.premiumGrantedAt ?? profile.premiumGrantedAt,
  };
}

export function applyDefaultSubscription(
  subscription?: Partial<UserSubscriptionFields>,
): UserSubscriptionFields {
  return {
    ...DEFAULT_SUBSCRIPTION,
    ...subscription,
  };
}
