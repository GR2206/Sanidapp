import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoMark } from '@/components/ui/LogoMark';
import { UpdateBadge } from '@/components/ui/UpdateBadge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useForoUnread } from '@/contexts/ForoUnreadContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

const HEADER_LOGO_SIZE = 44;
const ACTION_SIZE = 40;

export function DashboardHeader() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { unreadCount: foroUnreadCount } = useForoUnread();
  const { profile } = useAuth();
  const { t } = useLocale();
  const { appearanceMode } = useAppLabels();
  const { colors, isDark, mode, cycleMode, hasBranding, sanatorio, logoSource, fonts } =
    useDashboardTheme();
  const { theme } = useSanatorioTheme();
  const headerLogoScale = theme.dashboardHeaderLogoCoverScale;
  const headerUsesScaledCover = headerLogoScale !== 1;
  const headerLogoInset = theme.dashboardHeaderLogoInset ?? 0.88;
  const logoFrameBackground = theme.dashboardLogoBlendBackground
    ? theme.background
    : '#FFFFFF';

  const appearanceIcon =
    mode === 'auto' ? 'theme-light-dark' : isDark ? 'weather-night' : 'white-balance-sunny';

  return (
    <View style={[styles.row, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            foroUnreadCount > 0
              ? t('drawer.openMenuUnread', { count: foroUnreadCount })
              : t('drawer.openMenu')
          }
          onPress={() => {
            hapticLight();
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
            pressed && styles.pressed,
          ]}>
          <View style={styles.iconWrap}>
            <UserAvatar
              size={ACTION_SIZE - 4}
              avatarUrl={profile?.avatarUrl}
              nombre={profile?.nombre}
              apellido={profile?.apellido}
              email={profile?.email}
              accentColor={colors.accent}
              surfaceColor={colors.surface}
              borderColor="transparent"
              fontFamily={fonts.semiBold}
            />
            <UpdateBadge count={foroUnreadCount} />
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('appearance.modeLabel', { mode: appearanceMode(mode) })}
          onPress={() => {
            hapticLight();
            void cycleMode();
          }}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
            pressed && styles.pressed,
          ]}>
          <MaterialCommunityIcons name={appearanceIcon} size={20} color={colors.accent} />
        </Pressable>
      </View>

      <View style={styles.brand}>
        <View style={styles.brandText}>
          <Typography
            variant="subtitle"
            numberOfLines={1}
            style={[
              styles.brandTitle,
              { color: colors.accent, fontFamily: fonts.semiBold, textAlign: 'right' },
            ]}>
            {hasBranding ? (sanatorio?.shortName ?? 'Sanatorio') : 'Sanidapp'}
          </Typography>
          {hasBranding && sanatorio ? (
            <Typography
              variant="caption"
              numberOfLines={1}
              style={{ color: colors.textMuted, textAlign: 'right' }}>
              {sanatorio.name}
            </Typography>
          ) : null}
        </View>
        {hasBranding && logoSource ? (
          <View
            style={[
              styles.logoFrame,
              {
                borderColor: hexToRgba(colors.accent, 0.28),
                backgroundColor: logoFrameBackground,
              },
            ]}>
            <Image
              source={logoSource}
              style={
                headerUsesScaledCover
                  ? [styles.logoImageCover, { transform: [{ scale: headerLogoScale }] }]
                  : {
                      width: `${Math.round(headerLogoInset * 100)}%`,
                      height: `${Math.round(headerLogoInset * 100)}%`,
                    }
              }
              contentFit={headerUsesScaledCover ? 'cover' : 'contain'}
              accessibilityLabel={`Logo ${sanatorio?.name ?? 'sanatorio'}`}
            />
          </View>
        ) : (
          <LogoMark size={40} accentColor={colors.accent} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginLeft: spacing.sm,
    justifyContent: 'flex-end',
  },
  brandText: {
    flexShrink: 1,
    gap: 1,
    alignItems: 'flex-end',
  },
  brandTitle: {
    fontSize: 18,
    lineHeight: 22,
  },
  logoFrame: {
    width: HEADER_LOGO_SIZE,
    height: HEADER_LOGO_SIZE,
    borderRadius: HEADER_LOGO_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImageCover: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconButton: {
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    borderRadius: ACTION_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'visible',
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },
});
