import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GooglePlayMark } from '@/components/subscription/GooglePlayMark';
import { MercadoPagoMark } from '@/components/subscription/MercadoPagoMark';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { usePremiumPurchase } from '@/hooks/usePremiumPurchase';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  createMercadoPagoCheckoutForUser,
  openMercadoPagoCheckout,
} from '@/services/subscription/mercadoPagoService';
import { spacing } from '@/theme/spacing';

interface PremiumIapPurchaseSectionProps {
  accentColor?: string;
}

export function PremiumIapPurchaseSection({ accentColor }: PremiumIapPurchaseSectionProps) {
  const { profile, refreshProfile } = useAuth();
  const { locale, t } = useLocale();
  const { colors } = useAppTheme();
  const { iapSupported, purchasing, error, purchasePremium } = usePremiumPurchase();

  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const resolvedAccent = accentColor ?? colors.button;
  const resolvedError = (error || localError) ? resolveMessage(error || localError || '', locale) : null;
  const resolvedMpError = mpError ? resolveMessage(mpError, locale) : null;

  const handleGooglePlay = useCallback(async () => {
    setLocalError(null);
    setMpError(null);

    if (!iapSupported) {
      setLocalError(t('subscription.installFromTestTrack'));
      return;
    }

    try {
      await purchasePremium();
    } catch {
      // El hook ya guarda el mensaje en `error`.
    }
  }, [iapSupported, purchasePremium, t]);

  const handleMercadoPago = useCallback(async () => {
    if (!profile) {
      return;
    }

    setMpError(null);
    setLocalError(null);
    setMpLoading(true);

    try {
      const checkout = await createMercadoPagoCheckoutForUser(profile);
      await openMercadoPagoCheckout(checkout.checkoutUrl);
      await refreshProfile();
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('subscription.errors.mpStartFailed');
      setMpError(message);
    } finally {
      setMpLoading(false);
    }
  }, [locale, profile, refreshProfile, t]);

  if (!profile) {
    return (
      <View style={[styles.card, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
        <Typography variant="bodyMedium" style={{ color: colors.text }}>
          {t('subscription.loginToBuy')}
        </Typography>
      </View>
    );
  }

  const googleLabel = purchasing ? t('subscription.processing') : t('subscription.payGooglePlay');
  const mpLabel = mpLoading ? t('subscription.processing') : t('subscription.payMercadoPago');

  return (
    <View style={styles.container}>
      <Typography variant="bodyMedium" style={{ color: colors.text }}>
        {t('subscription.premiumPayOptions')}
      </Typography>
      <Typography variant="caption" style={{ color: colors.textSecondary }}>
        {t('subscription.premiumPurchaseDetail')}
      </Typography>

      <View style={styles.purchaseActions}>
        <Button
          label={googleLabel}
          leading={!purchasing ? <GooglePlayMark size={22} /> : null}
          onPress={() => void handleGooglePlay()}
          accentColor={resolvedAccent}
          disabled={purchasing || mpLoading}
          style={styles.purchaseButton}
        />
        <Button
          label={mpLabel}
          leading={!mpLoading ? <MercadoPagoMark size={24} /> : null}
          onPress={() => void handleMercadoPago()}
          accentColor="#009EE3"
          disabled={purchasing || mpLoading}
          style={styles.purchaseButton}
        />
      </View>

      {resolvedError ? (
        <Typography variant="caption" style={styles.errorText}>
          {resolvedError}
        </Typography>
      ) : null}
      {resolvedMpError ? (
        <Typography variant="caption" style={styles.errorText}>
          {resolvedMpError}
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
  purchaseActions: {
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  purchaseButton: {
    alignSelf: 'center',
    width: '70%',
    minHeight: 36,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  errorText: {
    color: '#B3261E',
  },
});
