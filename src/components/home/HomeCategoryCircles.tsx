import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { UpdateBadge } from '@/components/ui/UpdateBadge';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNavigation';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardNavLabels } from '@/hooks/useDashboardNavLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { ContentUpdateBadgeMap } from '@/types/contentUpdates';

interface HomeCategoryCirclesProps {
  badges: ContentUpdateBadgeMap;
}

function CategoryCell({
  label,
  icon,
  route,
  badgeCount,
  locked,
  accentColor,
}: {
  label: string;
  icon: (typeof DASHBOARD_NAV_ITEMS)[number]['icon'];
  route: (typeof DASHBOARD_NAV_ITEMS)[number]['route'];
  badgeCount: number;
  locked: boolean;
  accentColor: string;
}) {
  const { categoryNavColor } = useDashboardTheme();

  return (
    <SpringPressable
      onPress={() => {
        hapticLight();
        router.push(route);
      }}
      style={styles.cell}>
      <View
        style={[
          styles.circle,
          {
            backgroundColor: accentColor,
            borderColor: accentColor,
            opacity: locked ? 0.72 : 1,
          },
        ]}>
        <MaterialCommunityIcons name={icon} size={26} color={categoryNavColor} />
        {locked ? (
          <View style={styles.lockBadge}>
            <MaterialCommunityIcons name="lock" size={12} color="#fff" />
          </View>
        ) : (
          <UpdateBadge count={badgeCount} />
        )}
      </View>
      <Typography variant="caption" style={[styles.label, { color: accentColor }]}>
        {label}
      </Typography>
    </SpringPressable>
  );
}

export function HomeCategoryCircles({ badges }: HomeCategoryCirclesProps) {
  const { colors, getCategoryAccent } = useDashboardTheme();
  const { canBrowseSection } = usePremiumAccess();
  const { t } = useLocale();
  const { sectionShortLabel } = useDashboardNavLabels();
  const [adulto, pediatrico, neonatologia, farmacologia] = DASHBOARD_NAV_ITEMS;

  return (
    <View style={styles.section}>
      <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
        {t('home.quickAccess')}
      </Typography>
      <View
        style={[
          styles.panel,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderSubtle,
            shadowColor: colors.shadow,
          },
        ]}>
        <View style={styles.row}>
          <CategoryCell
            {...adulto}
            label={sectionShortLabel(adulto.id)}
            badgeCount={badges.adulto}
            locked={!canBrowseSection(adulto.id)}
            accentColor={getCategoryAccent(0)}
          />
          <View style={[styles.verticalDivider, { backgroundColor: colors.borderSubtle }]} />
          <CategoryCell
            {...pediatrico}
            label={sectionShortLabel(pediatrico.id)}
            badgeCount={badges.pediatrico}
            locked={!canBrowseSection(pediatrico.id)}
            accentColor={getCategoryAccent(1)}
          />
        </View>
        <View style={[styles.horizontalDivider, { backgroundColor: colors.borderSubtle }]} />
        <View style={styles.row}>
          <CategoryCell
            {...neonatologia}
            label={sectionShortLabel(neonatologia.id)}
            badgeCount={badges.neonatologia}
            locked={!canBrowseSection(neonatologia.id)}
            accentColor={getCategoryAccent(2)}
          />
          <View style={[styles.verticalDivider, { backgroundColor: colors.borderSubtle }]} />
          <CategoryCell
            {...farmacologia}
            label={sectionShortLabel(farmacologia.id)}
            badgeCount={badges.farmacologia}
            locked={!canBrowseSection(farmacologia.id)}
            accentColor={getCategoryAccent(3)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  title: {
    letterSpacing: 0.8,
  },
  panel: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    position: 'relative',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  lockBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    marginVertical: spacing.sm,
  },
  horizontalDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: spacing.lg,
  },
});
