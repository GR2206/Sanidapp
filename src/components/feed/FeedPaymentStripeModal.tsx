import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { FieldSelect } from '@/components/ui/FieldSelect';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  getStripeConnectStatus,
  openStripeConnectOnboarding,
  startStripeConnectOnboarding,
} from '@/services/subscription/stripeConnectService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export type FeedStripePayeeData = {
  payeeNombre: string;
  payeeApellido: string;
  stripeConnectAccountId: string;
  stripeConnectCountry: string;
};

interface FeedPaymentStripeModalProps {
  visible: boolean;
  onConfirm: (data: FeedStripePayeeData) => void;
  onCancel: () => void;
}

const COUNTRY_OPTIONS = [
  { id: 'ES', label: 'España (ES)' },
  { id: 'PT', label: 'Portugal (PT)' },
  { id: 'US', label: 'Estados Unidos (US)' },
  { id: 'MX', label: 'México (MX)' },
  { id: 'IT', label: 'Italia (IT)' },
  { id: 'FR', label: 'Francia (FR)' },
  { id: 'DE', label: 'Alemania (DE)' },
  { id: 'GB', label: 'Reino Unido (GB)' },
  { id: 'BR', label: 'Brasil (BR)' },
  { id: 'CL', label: 'Chile (CL)' },
  { id: 'CO', label: 'Colombia (CO)' },
  { id: 'UY', label: 'Uruguay (UY)' },
];

/** Onboarding Stripe Connect Express para cobros EUR/USD. */
export function FeedPaymentStripeModal({
  visible,
  onConfirm,
  onCancel,
}: FeedPaymentStripeModalProps) {
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { profile, refreshProfile } = useAuth();
  const accent = FREE_QUICK_ACCESS_TONES.neonatologia;

  const defaultCountry = useMemo(() => {
    const fromProfile = String(profile?.stripeConnectCountry || profile?.countryCode || '')
      .trim()
      .toUpperCase();
    if (COUNTRY_OPTIONS.some((o) => o.id === fromProfile)) return fromProfile;
    return 'ES';
  }, [profile?.countryCode, profile?.stripeConnectCountry]);

  const [country, setCountry] = useState(defaultCountry);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readyAccountId, setReadyAccountId] = useState<string | null>(
    profile?.stripeConnectChargesEnabled ? profile.stripeConnectAccountId || null : null,
  );

  useEffect(() => {
    if (!visible) return;
    setCountry(defaultCountry);
    setError(null);
    setBusy(true);
    void (async () => {
      try {
        const status = await getStripeConnectStatus();
        if (status.chargesEnabled && status.accountId) {
          setReadyAccountId(status.accountId);
          if (status.country) setCountry(status.country);
        } else {
          setReadyAccountId(null);
        }
      } catch {
        setReadyAccountId(
          profile?.stripeConnectChargesEnabled ? profile.stripeConnectAccountId || null : null,
        );
      } finally {
        setBusy(false);
      }
    })();
  }, [visible, defaultCountry, profile?.stripeConnectAccountId, profile?.stripeConnectChargesEnabled]);

  async function handleConnect() {
    setBusy(true);
    setError(null);
    try {
      hapticLight();
      const result = await startStripeConnectOnboarding(country);
      if (result.alreadyReady && result.accountId) {
        setReadyAccountId(result.accountId);
        await refreshProfile();
        return;
      }
      if (!result.onboardingUrl) {
        throw new Error(t('feedPaymentStripe.onboardError'));
      }
      await openStripeConnectOnboarding(result.onboardingUrl);
      const status = await getStripeConnectStatus();
      if (status.chargesEnabled && status.accountId) {
        setReadyAccountId(status.accountId);
        await refreshProfile();
      } else {
        setError(t('feedPaymentStripe.pendingKyc'));
      }
    } catch (cause) {
      setError(
        resolveMessage(
          cause instanceof Error ? cause.message : t('feedPaymentStripe.onboardError'),
          locale,
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  function handleConfirm() {
    if (!readyAccountId) {
      setError(t('feedPaymentStripe.notReady'));
      return;
    }
    const payeeNombre = String(profile?.nombre ?? '').trim();
    const payeeApellido = String(profile?.apellido ?? '').trim();
    if (!payeeNombre || !payeeApellido) {
      setError(t('feedPaymentStripe.nameRequired'));
      return;
    }
    hapticLight();
    onConfirm({
      payeeNombre,
      payeeApellido,
      stripeConnectAccountId: readyAccountId,
      stripeConnectCountry: country,
    });
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
          ]}>
          <Typography
            variant="subtitle"
            style={{ color: accent.label, fontFamily: fonts.semiBold }}>
            {t('feedPaymentStripe.title')}
          </Typography>
          <Typography variant="caption" color={colors.textMuted}>
            {t('feedPaymentStripe.subtitle')}
          </Typography>

          <FieldSelect
            label={t('feedPaymentStripe.country')}
            value={country}
            options={COUNTRY_OPTIONS}
            onChange={setCountry}
          />

          {busy ? <ActivityIndicator color={colors.button} /> : null}

          {readyAccountId ? (
            <Typography variant="caption" style={{ color: accent.label, fontFamily: fonts.semiBold }}>
              {t('feedPaymentStripe.ready', { account: readyAccountId.slice(0, 12) })}
            </Typography>
          ) : (
            <Button
              label={busy ? t('feedPaymentStripe.working') : t('feedPaymentStripe.connect')}
              onPress={() => void handleConnect()}
              disabled={busy}
              accentColor={colors.button}
            />
          )}

          {error ? (
            <Typography variant="caption" style={{ color: '#B91C1C' }}>
              {error}
            </Typography>
          ) : null}

          <View style={styles.actions}>
            <Button
              label={t('feedPaymentStripe.confirm')}
              onPress={handleConfirm}
              disabled={!readyAccountId || busy}
              accentColor={colors.button}
            />
            <Button
              label={t('common.cancel')}
              onPress={onCancel}
              accentColor={colors.textMuted}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
