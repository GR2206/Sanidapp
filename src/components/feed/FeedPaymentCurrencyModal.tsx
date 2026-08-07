import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { FieldSelect } from '@/components/ui/FieldSelect';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { radius, spacing } from '@/theme/spacing';
import type { FeedPaymentCurrency } from '@/types/feed';
import { hapticLight } from '@/utils/haptics';

interface FeedPaymentCurrencyModalProps {
  visible: boolean;
  initial?: FeedPaymentCurrency;
  onConfirm: (currency: FeedPaymentCurrency) => void;
  onCancel: () => void;
}

/** Elige moneda del cobro in-app: ARS (MP) o EUR/USD (Stripe). */
export function FeedPaymentCurrencyModal({
  visible,
  initial = 'ARS',
  onConfirm,
  onCancel,
}: FeedPaymentCurrencyModalProps) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();
  const accent = FREE_QUICK_ACCESS_TONES.farmacologia;
  const [currency, setCurrency] = useState<FeedPaymentCurrency>(initial);

  useEffect(() => {
    if (!visible) return;
    setCurrency(initial);
  }, [visible, initial]);

  const options = [
    { id: 'ARS', label: t('feedPaymentCurrency.ars') },
    { id: 'EUR', label: t('feedPaymentCurrency.eur') },
    { id: 'USD', label: t('feedPaymentCurrency.usd') },
  ];

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
            {t('feedPaymentCurrency.title')}
          </Typography>
          <Typography variant="caption" color={colors.textMuted}>
            {t('feedPaymentCurrency.subtitle')}
          </Typography>

          <FieldSelect
            label={t('feedPaymentCurrency.label')}
            value={currency}
            options={options}
            onChange={(value) => setCurrency(value as FeedPaymentCurrency)}
          />

          <View style={styles.actions}>
            <Button
              label={t('feedPaymentCurrency.continue')}
              onPress={() => {
                hapticLight();
                onConfirm(currency);
              }}
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
