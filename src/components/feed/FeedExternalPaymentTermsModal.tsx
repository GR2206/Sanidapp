import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { BILLING_OPERATOR } from '@/constants/billingOperator';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface FeedExternalPaymentTermsModalProps {
  visible: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

/** Condiciones del cobro externo: disertante cobra 100%, canon 20% bruto vía Wallbit. */
export function FeedExternalPaymentTermsModal({
  visible,
  onAccept,
  onCancel,
}: FeedExternalPaymentTermsModalProps) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();
  const { height } = useWindowDimensions();
  const [accepted, setAccepted] = useState(false);
  const accent = FREE_QUICK_ACCESS_TONES.neonatologia;
  const scrollMaxHeight = Math.round(height * 0.62);

  const params = {
    app: BILLING_OPERATOR.tradeName,
    percent: String(BILLING_OPERATOR.commissionPercent),
    days: String(BILLING_OPERATOR.externalSettlementBusinessDays),
    email: BILLING_OPERATOR.contactEmail,
  };

  function handleClose() {
    setAccepted(false);
    onCancel();
  }

  function handleAccept() {
    if (!accepted) return;
    hapticLight();
    setAccepted(false);
    onAccept();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundSoft,
              borderColor: colors.border,
              maxHeight: height * 0.94,
            },
          ]}>
          <Typography
            variant="subtitle"
            style={{ color: accent.label, fontFamily: fonts.semiBold, fontSize: 17 }}>
            {t('feedExternalPaymentTerms.title')}
          </Typography>
          <Typography variant="caption" color={colors.textMuted} style={styles.benefitsSubtitle}>
            {t('feedExternalPaymentTerms.subtitle')}
          </Typography>

          <ScrollView
            style={[styles.scroll, { maxHeight: scrollMaxHeight }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator>
            {(
              [
                'feedExternalPaymentTerms.p1',
                'feedExternalPaymentTerms.p2',
                'feedExternalPaymentTerms.p3',
                'feedExternalPaymentTerms.p4',
                'feedExternalPaymentTerms.p5',
                'feedExternalPaymentTerms.p6',
                'feedExternalPaymentTerms.p7',
                'feedExternalPaymentTerms.p8',
                'feedExternalPaymentTerms.p9',
              ] as const
            ).map((key) => (
              <Typography
                key={key}
                variant="body"
                style={[styles.paragraph, { color: colors.text }]}>
                {t(key, params)}
              </Typography>
            ))}
            <Typography variant="caption" style={[styles.paragraph, { color: colors.textMuted }]}>
              {t('feedExternalPaymentTerms.acceptanceNote')}
            </Typography>
            <Typography variant="caption" style={[styles.credit, { color: colors.textMuted }]}>
              {BILLING_OPERATOR.creditLine}
            </Typography>
          </ScrollView>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: accepted }}
            onPress={() => {
              hapticLight();
              setAccepted((value) => !value);
            }}
            style={styles.checkRow}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: accepted ? accent.icon : colors.border,
                  backgroundColor: accepted ? accent.gradient[0] : 'transparent',
                },
              ]}>
              {accepted ? (
                <Typography variant="caption" style={{ color: accent.label, fontWeight: '700' }}>
                  ✓
                </Typography>
              ) : null}
            </View>
            <Typography variant="bodyMedium" style={{ color: colors.text, flex: 1 }}>
              {t('feedExternalPaymentTerms.checkbox', params)}
            </Typography>
          </Pressable>

          <View style={styles.actions}>
            <Button
              label={t('feedExternalPaymentTerms.continue')}
              onPress={handleAccept}
              disabled={!accepted}
              accentColor={colors.button}
            />
            <Button
              label={t('common.cancel')}
              onPress={handleClose}
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.xs,
    width: '100%',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingBottom: spacing.sm,
  },
  benefitsSubtitle: {
    marginBottom: spacing.xs,
  },
  paragraph: {
    marginBottom: spacing.sm,
    lineHeight: 19,
  },
  credit: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    fontSize: 11,
    textAlign: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  actions: {
    gap: spacing.xs,
  },
});
