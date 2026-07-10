import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { resolveMessage, i18nError } from '@/i18n/resolveMessage';
import {
  finalizePremiumPurchase,
  isAndroidIapSupported,
  loadPremiumProduct,
  requestPremiumPurchase,
  type PremiumProduct,
} from '@/services/subscription/iapService';
import { verifyPlayPurchaseForUser } from '@/services/subscription/purchaseAuthService';

export function usePremiumPurchase() {
  const { profile, isPremium, refreshProfile } = useAuth();
  const { locale, t } = useLocale();
  const [product, setProduct] = useState<PremiumProduct | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iapSupported = isAndroidIapSupported();

  const reloadProduct = useCallback(async () => {
    if (!iapSupported || isPremium) {
      return null;
    }

    setLoadingProduct(true);
    setError(null);

    try {
      const nextProduct = await loadPremiumProduct();
      setProduct(nextProduct);
      return nextProduct;
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('subscription.errors.iapLoadProductFailed');
      setError(message);
      return null;
    } finally {
      setLoadingProduct(false);
    }
  }, [iapSupported, isPremium, locale, t]);

  useEffect(() => {
    if (!iapSupported || isPremium) {
      return;
    }

    void reloadProduct();
  }, [iapSupported, isPremium, reloadProduct]);

  const purchasePremium = useCallback(async () => {
    if (!profile) {
      throw i18nError('subscription.iapLoginRequired');
    }

    if (isPremium) {
      return;
    }

    setError(null);
    setPurchasing(true);

    try {
      let activeProduct = product;
      if (!activeProduct) {
        activeProduct = await reloadProduct();
      }

      if (!activeProduct) {
        throw i18nError('subscription.iapNotFoundDetail');
      }

      const purchaseResult = await requestPremiumPurchase();
      await verifyPlayPurchaseForUser(profile, {
        productId: purchaseResult.productId,
        purchaseToken: purchaseResult.purchaseToken,
      });
      await finalizePremiumPurchase(purchaseResult.purchase);
      await refreshProfile();
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('subscription.errors.iapPurchaseFailed');
      setError(message);
      throw cause;
    } finally {
      setPurchasing(false);
    }
  }, [isPremium, product, profile, refreshProfile, reloadProduct, locale, t]);

  return {
    iapSupported,
    product,
    loadingProduct,
    purchasing,
    error,
    purchasePremium,
    reloadProduct,
  };
}
