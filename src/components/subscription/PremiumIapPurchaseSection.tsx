import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { PREMIUM_IAP_PRODUCT_ID } from '@/constants/iap';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { usePremiumPurchase } from '@/hooks/usePremiumPurchase';
import { resolveMessage } from '@/i18n/resolveMessage';
import { spacing } from '@/theme/spacing';

interface PremiumIapPurchaseSectionProps {
  accentColor?: string;
}

export function PremiumIapPurchaseSection({ accentColor }: PremiumIapPurchaseSectionProps) {
  const { profile } = useAuth();
  const { locale, t } = useLocale();
  const { colors } = useAppTheme();
  const {
    iapSupported,
    product,
    loadingProduct,
    purchasing,
    error,
    purchasePremium,
    reloadProduct,
  } = usePremiumPurchase();

  const resolvedAccent = accentColor ?? colors.button;
  const resolvedAlt = colors.buttonAlt;
  const resolvedError = error ? resolveMessage(error, locale) : null;

  async function handlePurchase() {
    try {
      await purchasePremium();
    } catch {
      // El hook ya guarda el mensaje en `error`.
    }
  }

  if (!profile) {
    return (
      <View style={[styles.card, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
        <Typography variant="bodyMedium" style={{ color: colors.text }}>
          {t('subscription.loginToBuy')}
        </Typography>
        <Typography variant="caption" style={{ color: colors.textMuted }}>
          {t('subscription.createIndividualAccountDetail')}
        </Typography>
      </View>
    );
  }

  if (!iapSupported) {
    return (
      <View style={[styles.card, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
        <Typography variant="bodyMedium" style={{ color: colors.text }}>
          {t('subscription.googlePlayPurchase')}
        </Typography>
        <Typography variant="caption" style={{ color: colors.textMuted }}>
          {t('subscription.installFromTestTrack')}
        </Typography>
      </View>
    );
  }

  const purchaseLabel = purchasing
    ? t('subscription.processing')
    : product?.displayPrice
      ? t('subscription.buyPremium', { price: product.displayPrice })
      : t('subscription.buyPremiumShort');

  return (
    <View style={styles.container}>
      <Typography variant="bodyMedium" style={{ color: colors.text }}>
        {t('subscription.googlePlayPlan')}
      </Typography>
      <Typography variant="caption" style={{ color: colors.textMuted }}>
        {t('subscription.iapCatalogDetail')}
      </Typography>

      {loadingProduct ? (
        <ActivityIndicator color={resolvedAccent} style={styles.loader} />
      ) : (
        <>
          {product ? (
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              {product.title} · {product.displayPrice}
            </Typography>
          ) : (
            <Typography variant="caption" style={{ color: colors.textMuted }}>
              {t('subscription.iapPriceHint', { productId: PREMIUM_IAP_PRODUCT_ID })}
            </Typography>
          )}

          <Button
            label={purchaseLabel}
            onPress={() => void handlePurchase()}
            accentColor={resolvedAccent}
            disabled={loadingProduct || purchasing}
          />

          {!product ? (
            <Button
              label={t('subscription.refreshPrice')}
              variant="secondary"
              onPress={() => void reloadProduct()}
              accentColor={resolvedAlt}
              disabled={loadingProduct || purchasing}
            />
          ) : null}
        </>
      )}

      {resolvedError ? (
        <Typography variant="caption" style={styles.errorText}>
          {resolvedError}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    gap: spacing.sm,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
  },
  loader: {
    marginVertical: spacing.sm,
  },
  errorText: {
    color: '#B3261E',
  },
});
