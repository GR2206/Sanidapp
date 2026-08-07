import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { UpdateBadge } from '@/components/ui/UpdateBadge';
import { DASHBOARD_NAV_ITEMS } from '@/constants/dashboardNavigation';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardNavLabels } from '@/hooks/useDashboardNavLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { FREE_QUICK_ACCESS_TONES, type FreeQuickAccessTone } from '@/theme/freeCategoryPills';
import { brandQuickAccessTone, freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { ContentSection, ContentUpdateBadgeMap } from '@/types/contentUpdates';

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
  lively,
  tone,
}: {
  label: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  route: Href;
  badgeCount?: number;
  locked?: boolean;
  accentColor: string;
  lively: boolean;
  tone: FreeQuickAccessTone | null;
}) {
  const { categoryNavColor } = useDashboardTheme();
  const isLocked = Boolean(locked);

  return (
    <SpringPressable
      onPress={() => {
        hapticLight();
        router.push(route);
      }}
      style={styles.cell}>
      {lively && tone ? (
        <LinearGradient
          colors={tone.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.circle, styles.circleLively, { opacity: isLocked ? 0.72 : 1 }]}>
          <MaterialCommunityIcons name={icon} size={26} color={tone.icon} />
          {isLocked ? (
            <View style={styles.lockBadge}>
              <MaterialCommunityIcons name="lock" size={12} color="#fff" />
            </View>
          ) : badgeCount != null && badgeCount > 0 ? (
            <UpdateBadge count={badgeCount} />
          ) : null}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.circle,
            {
              backgroundColor: accentColor,
              borderColor: accentColor,
              opacity: isLocked ? 0.72 : 1,
            },
          ]}>
          <MaterialCommunityIcons name={icon} size={26} color={categoryNavColor} />
          {isLocked ? (
            <View style={styles.lockBadge}>
              <MaterialCommunityIcons name="lock" size={12} color="#fff" />
            </View>
          ) : badgeCount != null && badgeCount > 0 ? (
            <UpdateBadge count={badgeCount} />
          ) : null}
        </View>
      )}
      <Typography
        variant="caption"
        style={[styles.label, { color: tone && lively ? tone.label : accentColor }]}>
        {label}
      </Typography>
    </SpringPressable>
  );
}

export function HomeCategoryCircles({ badges }: HomeCategoryCirclesProps) {
  const { colors, getCategoryAccent, hasBranding, isDark, fonts } = useDashboardTheme();
  const { canBrowseSection } = usePremiumAccess();
  const { t } = useLocale();
  const { sectionShortLabel } = useDashboardNavLabels();
  const [adulto, pediatrico, neonatologia, farmacologia] = DASHBOARD_NAV_ITEMS;
  const lively = !isDark;
  const freePanel = freeElevatedCardStyle(lively);

  function toneFor(index: number, sectionId: ContentSection): FreeQuickAccessTone | null {
    if (!lively) return null;
    if (hasBranding) {
      return brandQuickAccessTone(getCategoryAccent(index));
    }
    return sectionId in FREE_QUICK_ACCESS_TONES
      ? FREE_QUICK_ACCESS_TONES[sectionId as keyof typeof FREE_QUICK_ACCESS_TONES]
      : brandQuickAccessTone(getCategoryAccent(index));
  }

  function feedTone(kind: 'cursos' | 'congresos'): FreeQuickAccessTone | null {
    if (!lively) return null;
    return FREE_QUICK_ACCESS_TONES[kind];
  }

  const dividerColor = lively ? 'rgba(0,0,0,0.06)' : colors.borderSubtle;

  return (
    <View style={styles.section}>
      <Typography
        variant="label"
        style={[styles.title, { color: FREE_QUICK_ACCESS_TONES.adulto.label, fontFamily: fonts.semiBold }]}>
        {t('home.quickAccess')}
      </Typography>
      <View
        style={[
          styles.panel,
          freePanel ?? {
            backgroundColor: colors.surface,
            borderColor: colors.borderSubtle,
            shadowColor: colors.shadow,
          },
          lively ? styles.panelFree : null,
        ]}>
        <View style={styles.row}>
          <CategoryCell
            icon={adulto.icon}
            route={adulto.route}
            label={sectionShortLabel(adulto.id)}
            badgeCount={badges.adulto}
            locked={!canBrowseSection(adulto.id)}
            accentColor={getCategoryAccent(0)}
            lively={lively}
            tone={toneFor(0, adulto.id)}
          />
          <View style={[styles.verticalDivider, { backgroundColor: dividerColor }]} />
          <CategoryCell
            icon={pediatrico.icon}
            route={pediatrico.route}
            label={sectionShortLabel(pediatrico.id)}
            badgeCount={badges.pediatrico}
            locked={!canBrowseSection(pediatrico.id)}
            accentColor={getCategoryAccent(1)}
            lively={lively}
            tone={toneFor(1, pediatrico.id)}
          />
        </View>
        <View style={[styles.horizontalDivider, { backgroundColor: dividerColor }]} />
        <View style={styles.row}>
          <CategoryCell
            icon={neonatologia.icon}
            route={neonatologia.route}
            label={sectionShortLabel(neonatologia.id)}
            badgeCount={badges.neonatologia}
            locked={!canBrowseSection(neonatologia.id)}
            accentColor={getCategoryAccent(2)}
            lively={lively}
            tone={toneFor(2, neonatologia.id)}
          />
          <View style={[styles.verticalDivider, { backgroundColor: dividerColor }]} />
          <CategoryCell
            icon={farmacologia.icon}
            route={farmacologia.route}
            label={sectionShortLabel(farmacologia.id)}
            badgeCount={badges.farmacologia}
            locked={!canBrowseSection(farmacologia.id)}
            accentColor={getCategoryAccent(3)}
            lively={lively}
            tone={toneFor(3, farmacologia.id)}
          />
        </View>
        <View style={[styles.horizontalDivider, { backgroundColor: dividerColor }]} />
        <View style={styles.row}>
          <CategoryCell
            label={t('home.quickCursos')}
            icon="book-open-page-variant-outline"
            route={ROUTES.cursos}
            accentColor={FREE_QUICK_ACCESS_TONES.cursos.icon}
            lively={lively}
            tone={feedTone('cursos')}
          />
          <View style={[styles.verticalDivider, { backgroundColor: dividerColor }]} />
          <CategoryCell
            label={t('home.quickCongresos')}
            icon="calendar-star"
            route={ROUTES.congresos}
            accentColor={FREE_QUICK_ACCESS_TONES.congresos.icon}
            lively={lively}
            tone={feedTone('congresos')}
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
    borderWidth: 1,
    overflow: 'hidden',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  panelFree: {
    borderRadius: 18,
    overflow: 'visible',
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
    borderWidth: 1,
    position: 'relative',
  },
  circleLively: {
    borderWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
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
