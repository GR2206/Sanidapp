import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { PREMIUM_IAP_PRODUCT_ID, PREMIUM_IAP_PRODUCT_TYPE } from '@/constants/iap';
import { i18nError } from '@/i18n/resolveMessage';

export interface PremiumProduct {
  title: string;
  displayPrice: string;
}

export interface PremiumPurchaseResult {
  productId: string;
  purchaseToken: string;
  purchase: unknown;
}

interface SubscriptionOfferSelection {
  sku: string;
  offerToken: string;
}

let cachedOffer: SubscriptionOfferSelection | null = null;

export function isAndroidIapSupported(): boolean {
  if (Platform.OS !== 'android') {
    return false;
  }

  // Expo Go / store client ship without native Billing Library.
  if (Constants.appOwnership === 'expo') {
    return false;
  }

  if (Constants.executionEnvironment === 'storeClient') {
    return false;
  }

  return true;
}

let connectionReady = false;

async function loadIapModule() {
  if (!isAndroidIapSupported()) {
    throw i18nError('subscription.errors.iapRequiresAndroidBuild');
  }

  return import('react-native-iap');
}

function pickSubscriptionOffer(product: Record<string, unknown>): SubscriptionOfferSelection | null {
  const sku = String(product.id ?? product.productId ?? PREMIUM_IAP_PRODUCT_ID);

  const offers = product.subscriptionOffers;
  if (Array.isArray(offers) && offers.length > 0) {
    for (const raw of offers) {
      const offer = raw as Record<string, unknown>;
      const offerToken =
        (typeof offer.offerToken === 'string' && offer.offerToken) ||
        (typeof offer.offerTokenAndroid === 'string' && offer.offerTokenAndroid) ||
        '';
      if (offerToken) {
        return { sku, offerToken };
      }
    }
  }

  const legacyOffers = product.subscriptionOfferDetailsAndroid;
  if (Array.isArray(legacyOffers) && legacyOffers.length > 0) {
    for (const raw of legacyOffers) {
      const offer = raw as Record<string, unknown>;
      if (typeof offer.offerToken === 'string' && offer.offerToken.length > 0) {
        return { sku, offerToken: offer.offerToken };
      }
    }
  }

  return null;
}

function resolveDisplayPrice(product: Record<string, unknown>): string {
  if (typeof product.displayPrice === 'string' && product.displayPrice.trim()) {
    return product.displayPrice;
  }

  const legacyOffers = product.subscriptionOfferDetailsAndroid;
  if (Array.isArray(legacyOffers) && legacyOffers.length > 0) {
    const phases = (legacyOffers[0] as { pricingPhases?: { pricingPhaseList?: Array<{ formattedPrice?: string }> } })
      .pricingPhases?.pricingPhaseList;
    const formatted = phases?.find((phase) => phase.formattedPrice)?.formattedPrice;
    if (formatted) {
      return formatted;
    }
  }

  const offers = product.subscriptionOffers;
  if (Array.isArray(offers) && offers.length > 0) {
    const displayPrice = (offers[0] as { displayPrice?: string }).displayPrice;
    if (typeof displayPrice === 'string' && displayPrice.trim()) {
      return displayPrice;
    }
  }

  return '';
}

export async function ensureIapConnection(): Promise<void> {
  if (!isAndroidIapSupported()) {
    throw i18nError('subscription.errors.iapRequiresAndroidBuild');
  }

  if (connectionReady) {
    return;
  }

  const { initConnection } = await loadIapModule();
  await initConnection();
  connectionReady = true;
}

export async function loadPremiumProduct(): Promise<PremiumProduct | null> {
  await ensureIapConnection();
  const { fetchProducts } = await loadIapModule();
  const products = await fetchProducts({
    skus: [PREMIUM_IAP_PRODUCT_ID],
    type: PREMIUM_IAP_PRODUCT_TYPE,
  });

  const product = products?.[0] as Record<string, unknown> | undefined;
  if (!product) {
    cachedOffer = null;
    return null;
  }

  cachedOffer = pickSubscriptionOffer(product);

  return {
    title: String(product.title ?? product.nameAndroid ?? 'Plan PREMIUM'),
    displayPrice: resolveDisplayPrice(product),
  };
}

export async function requestPremiumPurchase(): Promise<PremiumPurchaseResult> {
  await ensureIapConnection();

  if (!cachedOffer) {
    await loadPremiumProduct();
  }

  if (!cachedOffer) {
    throw i18nError('subscription.errors.iapOfferUnavailable');
  }

  const { purchaseErrorListener, purchaseUpdatedListener, requestPurchase } = await loadIapModule();

  return new Promise((resolve, reject) => {
    const updateSubscription = purchaseUpdatedListener(async (purchase) => {
      cleanup();

      try {
        const androidPurchase = purchase as {
          purchaseToken?: string | null;
          productId?: string;
          id?: string;
        };
        const purchaseToken = androidPurchase.purchaseToken ?? '';
        const productId = androidPurchase.productId ?? androidPurchase.id ?? PREMIUM_IAP_PRODUCT_ID;

        if (!purchaseToken) {
          reject(i18nError('subscription.errors.iapInvalidPurchaseToken'));
          return;
        }

        resolve({ productId, purchaseToken, purchase });
      } catch (cause) {
        reject(cause instanceof Error ? cause : i18nError('subscription.errors.iapPurchaseFailed'));
      }
    });

    const errorSubscription = purchaseErrorListener((error) => {
      cleanup();
      const code = String((error as { code?: string }).code ?? '');
      const message = String(error.message ?? '');
      const cancelled =
        code.includes('UserCancelled') ||
        code.includes('user-cancelled') ||
        /cancel/i.test(message);

      reject(
        cancelled
          ? i18nError('subscription.errors.iapPurchaseCancelled')
          : new Error(message || 'i18n:subscription.errors.iapPurchaseFailed'),
      );
    });

    function cleanup() {
      updateSubscription.remove();
      errorSubscription.remove();
    }

    void requestPurchase({
      type: PREMIUM_IAP_PRODUCT_TYPE,
      request: {
        google: {
          skus: [cachedOffer!.sku],
          subscriptionOffers: [
            {
              sku: cachedOffer!.sku,
              offerToken: cachedOffer!.offerToken,
            },
          ],
        },
      },
    }).catch((cause) => {
      cleanup();
      reject(cause instanceof Error ? cause : i18nError('subscription.errors.iapPurchaseStartFailed'));
    });
  });
}

export async function finalizePremiumPurchase(purchase: unknown): Promise<void> {
  const { finishTransaction } = await loadIapModule();
  await finishTransaction({
    purchase: purchase as import('react-native-iap').Purchase,
    isConsumable: false,
  });
}
