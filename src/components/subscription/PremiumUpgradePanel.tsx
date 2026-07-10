import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { InstitutionTokenRedeemForm } from '@/components/subscription/InstitutionTokenRedeemForm';
import { PremiumPurchaseSection } from '@/components/subscription/PremiumPurchaseSection';
import { Typography } from '@/components/ui/Typography';
import { FREE_PLAN_SAMPLE_SUMMARY_KEY } from '@/constants/subscription';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';

interface PremiumUpgradePanelProps {
  sectionLabel: string;
}

export function PremiumUpgradePanel({ sectionLabel }: PremiumUpgradePanelProps) {
  const { profile } = useAuth();
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const freeSections = t(FREE_PLAN_SAMPLE_SUMMARY_KEY);
  const hasInstitution = Boolean(profile?.sanatorioId);

  return (
    <View style={styles.container}>
      <View style={[styles.hero, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="lock-outline" size={40} color={colors.button} />
        <Typography variant="subtitle" style={{ color: colors.text, textAlign: 'center' }}>
          {t('subscription.premiumSection', { section: sectionLabel })}
        </Typography>
        <Typography variant="body" color={colors.textMuted} style={styles.body}>
          {t('subscription.premiumFreeHintInstitution', { summary: freeSections })}
        </Typography>
      </View>

      <PremiumPurchaseSection accentColor={colors.button} />

      {hasInstitution ? (
        <View style={styles.tokenBlock}>
          <Typography variant="caption" color={colors.textMuted}>
            {t('subscription.corporateToken')}
          </Typography>
          <InstitutionTokenRedeemForm accentColor={colors.button} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingTop: spacing.md,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.lg,
  },
  body: {
    textAlign: 'center',
    lineHeight: 22,
  },
  tokenBlock: {
    gap: spacing.sm,
  },
});
