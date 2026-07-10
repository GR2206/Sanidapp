import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';

interface ContentUpdatesBannerProps {
  total: number;
}

export function ContentUpdatesBanner({ total }: ContentUpdatesBannerProps) {
  const { colors } = useDashboardTheme();
  const { t } = useLocale();

  if (total <= 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        },
      ]}>
      <MaterialCommunityIcons name="update" size={18} color="#E53935" />
      <Typography variant="caption" style={{ color: colors.text, flex: 1 }}>
        {t('home.contentUpdates', { count: total })}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
