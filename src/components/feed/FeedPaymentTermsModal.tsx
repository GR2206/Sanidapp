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

interface FeedPaymentTermsModalProps {
  visible: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

/** Condiciones del servicio de cobro en app (canon 20%). Sin aceptar, no se habilita. */
export function FeedPaymentTermsModal({
  visible,
  onAccept,
  onCancel,
}: FeedPaymentTermsModalProps) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();
  const { height } = useWindowDimensions();
  const [accepted, setAccepted] = useState(false);
  const accent = FREE_QUICK_ACCESS_TONES.pediatrico;
  const scrollMaxHeight = Math.round(height * 0.62);

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
            {t('feedPaymentTerms.benefitsTitle')}
          </Typography>
          <Typography variant="caption" color={colors.textMuted} style={styles.benefitsSubtitle}>
            {t('feedPaymentTerms.benefitsSubtitle')}
          </Typography>

          <ScrollView
            style={[styles.scroll, { maxHeight: scrollMaxHeight }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator>
            {(
              [
                'feedPaymentTerms.b1',
                'feedPaymentTerms.b2',
                'feedPaymentTerms.b3',
                'feedPaymentTerms.b4',
                'feedPaymentTerms.b5',
                'feedPaymentTerms.b6',
              ] as const
            ).map((key, index) => (
              <View key={key} style={styles.benefitRow}>
                <View style={[styles.benefitIndex, { backgroundColor: accent.gradient[0] }]}>
                  <Typography
                    variant="caption"
                    style={{ color: accent.label, fontWeight: '700' }}>
                    {index + 1}
                  </Typography>
                </View>
                <Typography
                  variant="body"
                  style={[styles.benefitText, { color: colors.text, fontFamily: fonts.medium }]}>
                  {t(key)}
                </Typography>
              </View>
            ))}

            <Typography
              variant="bodyMedium"
              style={[styles.legalTitle, { color: accent.label, fontFamily: fonts.semiBold }]}>
              {t('feedPaymentTerms.legalTitle')}
            </Typography>

            {(
              [
                ['feedPaymentTerms.p1', { app: BILLING_OPERATOR.tradeName }],
                ['feedPaymentTerms.p2', { percent: String(BILLING_OPERATOR.commissionPercent) }],
                ['feedPaymentTerms.p2b', { percent: String(BILLING_OPERATOR.commissionPercent) }],
                ['feedPaymentTerms.p3', {}],
                ['feedPaymentTerms.p4', {}],
                ['feedPaymentTerms.p5', { app: BILLING_OPERATOR.tradeName }],
                ['feedPaymentTerms.p6', {}],
                ['feedPaymentTerms.p7', {}],
              ] as const
            ).map(([key, params]) => (
              <Typography
                key={key}
                variant="body"
                style={[styles.paragraph, { color: colors.text }]}>
                {t(key, params)}
              </Typography>
            ))}
            <Typography variant="caption" style={[styles.paragraph, { color: colors.textMuted }]}>
              {t('feedPaymentTerms.acceptanceNote')}
            </Typography>
            <Typography
              variant="caption"
              style={[styles.credit, { color: colors.textMuted }]}>
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
              {t('feedPaymentTerms.checkbox', {
                percent: String(BILLING_OPERATOR.commissionPercent),
              })}
            </Typography>
          </Pressable>

          <View style={styles.actions}>
            <Button
              label={t('feedPaymentTerms.continue')}
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
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  benefitIndex: {
    width: 22,
    height: 22,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  benefitText: {
    flex: 1,
    lineHeight: 19,
  },
  legalTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
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
