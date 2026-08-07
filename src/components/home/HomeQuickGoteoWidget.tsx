import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { brandGradientTriple, freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

/**
 * Acceso a 1 toque a Calculadora de Goteo — home free y sanatorio.
 */
export function HomeQuickGoteoWidget() {
  const { t } = useLocale();
  const { fonts, hasBranding, theme } = useDashboardTheme();
  const cardShadow = freeElevatedCardStyle(true);
  const gradient = hasBranding
    ? brandGradientTriple(theme.primary, theme.accent)
    : (['#023E8A', '#0077B6', '#00B4D8'] as [string, string, string]);

  return (
    <SpringPressable
      accessibilityRole="button"
      accessibilityLabel={t('home.quickGoteoA11y')}
      onPress={() => {
        hapticLight();
        router.push(`${ROUTES.calculations}?tab=goteo` as Href);
      }}
      style={[styles.wrap, cardShadow, styles.wrapRadius]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}>
        <View style={styles.iconWrap}>
          <Typography style={styles.emoji}>⏱️</Typography>
        </View>
        <View style={styles.text}>
          <Typography
            variant="caption"
            style={[styles.kicker, { fontFamily: fonts.semiBold }]}
            numberOfLines={1}>
            {t('home.quickGoteoKicker')}
          </Typography>
          <Typography
            variant="bodyMedium"
            style={[styles.title, { fontFamily: fonts.semiBold }]}
            numberOfLines={2}>
            {t('home.quickGoteoTitle')}
          </Typography>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color="rgba(255,255,255,0.9)" />
      </LinearGradient>
    </SpringPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  wrapRadius: {
    borderRadius: 18,
  },
  gradient: {
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  emoji: {
    fontSize: 18,
    lineHeight: 22,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  kicker: {
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: 0.3,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    lineHeight: 20,
  },
});
