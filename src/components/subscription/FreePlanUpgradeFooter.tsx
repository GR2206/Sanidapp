import { StyleSheet, View } from 'react-native';

import { PremiumPurchaseSection } from '@/components/subscription/PremiumPurchaseSection';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';

interface FreePlanUpgradeFooterProps {
  message?: string;
}

export function FreePlanUpgradeFooter({ message }: FreePlanUpgradeFooterProps) {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const resolvedMessage = message ?? t('subscription.freeSampleFooter');

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
      ]}>
      <Typography variant="caption" color={colors.textMuted} style={styles.message}>
        {resolvedMessage}
      </Typography>
      <PremiumPurchaseSection accentColor={colors.button} compact />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  message: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
