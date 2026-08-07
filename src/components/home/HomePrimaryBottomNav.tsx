import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { DashboardTab } from '@/types/dashboard';

type PrimaryTabId = DashboardTab | 'calculos' | 'reuniones';

const PRIMARY_TAB_IDS: {
  id: PrimaryTabId;
  labelKey: 'nav.inicio' | 'nav.calculos' | 'nav.reuniones' | 'nav.historial' | 'nav.ajustes';
  icon: 'home-outline' | 'calculator' | 'video-outline' | 'history' | 'cog-outline';
  highlighted?: boolean;
  route?: Href;
}[] = [
  { id: 'inicio', labelKey: 'nav.inicio', icon: 'home-outline' },
  { id: 'calculos', labelKey: 'nav.calculos', icon: 'calculator', highlighted: true, route: ROUTES.calculations },
  {
    id: 'reuniones',
    labelKey: 'nav.reuniones',
    icon: 'video-outline',
    highlighted: true,
    route: ROUTES.reuniones,
  },
  { id: 'historial', labelKey: 'nav.historial', icon: 'history' },
  { id: 'ajustes', labelKey: 'nav.ajustes', icon: 'cog-outline' },
];

interface HomePrimaryBottomNavProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function HomePrimaryBottomNav({ activeTab, onTabChange }: HomePrimaryBottomNavProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useDashboardTheme();
  const { t } = useLocale();
  const meetingTone = FREE_QUICK_ACCESS_TONES.congresos;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.surfaceMuted,
          paddingBottom: Math.max(insets.bottom, spacing.sm),
          shadowColor: colors.shadow,
        },
      ]}>
      <View style={styles.wrap}>
        {PRIMARY_TAB_IDS.map((tab) => {
          const isRouteTab = Boolean(tab.route);
          const active = !isRouteTab && activeTab === tab.id;
          const iconColor = tab.id === 'reuniones' ? meetingTone.icon : colors.accent;
          const labelColor = iconColor;

          return (
            <SpringPressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => {
                hapticLight();
                if (tab.route) {
                  router.push(tab.route);
                  return;
                }
                onTabChange(tab.id as DashboardTab);
              }}
              style={styles.tab}>
              <MaterialCommunityIcons
                name={tab.icon}
                size={tab.highlighted ? 24 : 22}
                color={iconColor}
              />
              <Typography
                variant="caption"
                style={[
                  styles.tabLabel,
                  { color: labelColor },
                  (active || tab.highlighted) && styles.tabLabelActive,
                  tab.highlighted && styles.tabLabelHighlighted,
                ]}>
                {t(tab.labelKey)}
              </Typography>
            </SpringPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -1 },
    elevation: 4,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: spacing.xs,
  },
  tabLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
  tabLabelActive: {
    fontWeight: '600',
  },
  tabLabelHighlighted: {
    fontWeight: '700',
  },
});
