import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { navigateToContentItem } from '@/utils/contentNavigation';
import type { RecentContentItem } from '@/types/userActivity';

interface ContinueAttendingCardProps {
  item: RecentContentItem | null;
}

export function ContinueAttendingCard({ item }: ContinueAttendingCardProps) {
  const { colors } = useDashboardTheme();
  const { t } = useLocale();

  if (!item) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
        {t('home.continueAttending')}
      </Typography>
      <SpringPressable
        onPress={() => {
          hapticLight();
          navigateToContentItem(item.type, item.id);
        }}
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}>
        <View style={[styles.iconWrap, { backgroundColor: colors.surfaceMuted }]}>
          <MaterialCommunityIcons name="play-circle-outline" size={28} color={colors.accent} />
        </View>
        <View style={styles.text}>
          <Typography variant="bodyMedium" numberOfLines={2} style={{ color: colors.text }}>
            {item.title}
          </Typography>
          {item.subtitle ? (
            <Typography variant="caption" numberOfLines={1} style={{ color: colors.textMuted }}>
              {item.subtitle}
            </Typography>
          ) : null}
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textMuted} />
      </SpringPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  title: {
    letterSpacing: 0.6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.md,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
