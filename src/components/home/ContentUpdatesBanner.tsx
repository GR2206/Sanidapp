import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';

interface ContentUpdatesBannerProps {
  total: number;
}

export function ContentUpdatesBanner({ total }: ContentUpdatesBannerProps) {
  const { colors, isDark, fonts } = useDashboardTheme();
  const { t } = useLocale();
  const tone = FREE_QUICK_ACCESS_TONES.pediatrico;
  const elevated = freeElevatedCardStyle(!isDark);

  if (total <= 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.banner,
        elevated ?? {
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
          borderWidth: 1,
        },
        !isDark ? { backgroundColor: tone.gradient[0] } : null,
      ]}>
      <MaterialCommunityIcons name="update" size={18} color={tone.icon} />
      <Typography
        variant="caption"
        style={{ color: tone.label, flex: 1, fontFamily: fonts.semiBold }}>
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
    borderRadius: 14,
  },
});
