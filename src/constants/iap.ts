/** ID de la suscripción en Google Play Console. */
export const PREMIUM_IAP_PRODUCT_ID =
  process.env.EXPO_PUBLIC_IAP_PREMIUM_PRODUCT_ID ?? 'sanidapp_premium';

/** Google Play: suscripción recurrente (no producto consumible). */
export const PREMIUM_IAP_PRODUCT_TYPE = 'subs' as const;

export const ANDROID_PACKAGE_NAME = 'com.gr2206.sanidapp';
