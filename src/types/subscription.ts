export type AccessTier = 'free' | 'premium';

export type PremiumSource =
  | ''
  | 'allowlist'
  | 'institution_token'
  | 'iap'
  | 'mercadopago'
  | 'admin';

export interface UserSubscriptionFields {
  accessTier: AccessTier;
  institutionToken: string;
  premiumSource: PremiumSource;
  premiumGrantedAt: string | null;
}

export const DEFAULT_SUBSCRIPTION: UserSubscriptionFields = {
  accessTier: 'free',
  institutionToken: '',
  premiumSource: '',
  premiumGrantedAt: null,
};
