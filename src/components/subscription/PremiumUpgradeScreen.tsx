import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PremiumIapPurchaseSection } from '@/components/subscription/PremiumIapPurchaseSection';
import { KeyboardAwareScrollScreen } from '@/components/layout/KeyboardAwareScrollScreen';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { FREE_PLAN_SAMPLE_SUMMARY_KEY } from '@/constants/subscription';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';

/**
 * Pantalla de compra premium personal.
 * No ofrece vincular sanatorio: eso solo ocurre si el usuario ingresa un token
 * institucional más adelante (p. ej. desde Ajustes).
 */
export function PremiumUpgradeScreen() {
  const { profile, isPremium } = useAuth();
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const hasInstitution = Boolean(profile?.sanatorioId);
  const isPersonalPremium =
    isPremium &&
    (profile?.premiumSource === 'iap' || profile?.premiumSource === 'mercadopago') &&
    !hasInstitution;
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const freePlanSummary = t(FREE_PLAN_SAMPLE_SUMMARY_KEY);

  if (isPremium && !isPersonalPremium) {
    return (
      <ScreenContainer centered>
        <Typography variant="bodyMedium">{t('subscription.premiumActive')}</Typography>
        {hasInstitution ? (
          <Typography variant="caption" color={colors.textMuted}>
            {t('subscription.premiumActiveInstitution', {
              sanatorio: profile?.sanatorioName || t('subscription.yourSanatorio'),
            })}
          </Typography>
        ) : null}
      </ScreenContainer>
    );
  }

  if (isPersonalPremium) {
    return (
      <ScreenContainer safe edges={['left', 'right']} style={styles.root}>
        <KeyboardAwareScrollScreen
          scrollRef={scrollRef}
          scrollYRef={scrollYRef}
          contentContainerStyle={styles.container}>
          <Typography variant="subtitle" style={{ color: colors.text }}>
            {t('subscription.premiumPlanActive')}
          </Typography>
          <Typography variant="body" style={{ color: colors.textMuted }}>
            {t('subscription.personalCatalogDetail')}
          </Typography>
          <Typography variant="caption" color={colors.textMuted}>
            {t('subscription.linkLater')}
          </Typography>
        </KeyboardAwareScrollScreen>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.root}>
      <KeyboardAwareScrollScreen
        scrollRef={scrollRef}
        scrollYRef={scrollYRef}
        contentContainerStyle={styles.container}>
        <Typography variant="subtitle" style={{ color: colors.text }}>
          {t('subscription.unlockAll')}
        </Typography>
        <Typography variant="body" color={colors.textMuted}>
          {t('subscription.unlockDetail')}
        </Typography>

        <View style={[styles.freeHint, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
          <Typography variant="caption" color={colors.textMuted}>
            {t('subscription.freePlanCurrent', { summary: freePlanSummary })}
          </Typography>
        </View>

        <PremiumIapPurchaseSection accentColor={colors.button} />
      </KeyboardAwareScrollScreen>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    gap: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  freeHint: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
  },
});
