import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface PremiumPurchaseSectionProps {
  accentColor?: string;
  compact?: boolean;
}

export function PremiumPurchaseSection({ accentColor, compact }: PremiumPurchaseSectionProps) {
  const { t } = useLocale();

  return (
    <View style={[styles.container, compact && styles.compact]}>
      {!compact ? (
        <>
          <Typography variant="bodyMedium">{t('subscription.buyPremiumShort')}</Typography>
          <Typography variant="caption" color={palette.textMuted}>
            {t('subscription.studentsIndependent')}
          </Typography>
        </>
      ) : null}
      <Button
        label={t('stack.premiumPlan')}
        onPress={() => router.push(ROUTES.upgrade)}
        accentColor={accentColor ?? palette.accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  compact: {
    gap: spacing.xs,
  },
});
