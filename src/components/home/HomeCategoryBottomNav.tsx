import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { UpdateBadge } from '@/components/ui/UpdateBadge';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNavigation';
import { useDashboardNavLabels } from '@/hooks/useDashboardNavLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { ContentUpdateBadgeMap } from '@/types/contentUpdates';

interface HomeCategoryBottomNavProps {
  badges: ContentUpdateBadgeMap;
}

export function HomeCategoryBottomNav({ badges }: HomeCategoryBottomNavProps) {
  const { colors, categoryNavColor } = useDashboardTheme();
  const { sectionLabel } = useDashboardNavLabels();

  return (
    <View
      style={[
        styles.wrap,
        {
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
      ]}>
      {DASHBOARD_NAV_ITEMS.map((tab) => (
        <SpringPressable
          key={tab.id}
          accessibilityLabel={sectionLabel(tab.id)}
          onPress={() => {
            hapticLight();
            router.push(tab.route);
          }}
          style={styles.tab}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={tab.icon} size={20} color={categoryNavColor} />
            <UpdateBadge count={badges[tab.id]} />
          </View>
          <Typography variant="caption" style={[styles.tabLabel, { color: categoryNavColor }]}>
            {sectionLabel(tab.id)}
          </Typography>
        </SpringPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: spacing.xs,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
});
