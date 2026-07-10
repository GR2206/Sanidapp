import type { PremiumSource } from '@/types/subscription';

/** @deprecated Use useAppLabels().accessTier() instead */
export const ACCESS_TIER_LABEL_KEYS = {
  free: 'subscription.tier.free',
  premium: 'subscription.tier.premium',
} as const;

/** @deprecated Use useAppLabels().premiumSource() instead */
export const PREMIUM_SOURCE_LABEL_KEYS: Record<Exclude<PremiumSource, ''>, string> = {
  allowlist: 'subscription.source.allowlist',
  institution_token: 'subscription.source.institution_token',
  iap: 'subscription.source.iap',
  mercadopago: 'subscription.source.mercadopago',
  admin: 'subscription.source.admin',
};
