import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdminSanatorioSwitcher } from '@/components/admin/AdminSanatorioSwitcher';
import { ForoMenuBadge } from '@/components/foro/ForoMenuBadge';
import { GuardAppearanceToggle } from '@/components/home/GuardAppearanceToggle';
import { ShareSanidappFooter } from '@/components/layout/ShareSanidappFooter';
import { LogoMark } from '@/components/ui/LogoMark';
import { SanatorioLogoFrame } from '@/components/ui/SanatorioLogoFrame';
import { SanatorioCircleLogoImage } from '@/components/ui/SanatorioCircleLogoImage';
import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useForoUnread } from '@/contexts/ForoUnreadContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { useFeedManageAccess, useFeedVisibility } from '@/hooks/useFeedVisibility';
import { useResolvedCountryCode } from '@/hooks/useResolvedCountryCode';
import { brandGradientTriple } from '@/theme/freeCardStyle';
import { livelyPillAt, livelyToneAt } from '@/theme/livelyUi';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

const DRAWER_LABEL_KEYS: Record<string, string> = {
  index: 'drawer.index',
  cursos: 'drawer.cursos',
  congresos: 'drawer.congresos',
  'cursos-institucion': 'drawer.cursosInstitucion',
  'congresos-institucion': 'drawer.congresosInstitucion',
  patologias: 'drawer.patologias',
  conocenos: 'drawer.conocenos',
  contacto: 'drawer.contacto',
  foro: 'drawer.foro',
  'qr-print': 'drawer.qrPrint',
  'supervisor-feeds': 'drawer.supervisorFeeds',
  'admin-payouts': 'drawer.adminPayouts',
  'feed-inscriptions': 'drawer.feedInscriptions',
  'docente-apply': 'drawer.docenteApply',
  'docente-applications': 'drawer.docenteApplications',
  reuniones: 'drawer.reuniones',
  'meeting-recordings': 'drawer.meetingRecordings',
};

const DRAWER_ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  index: 'home-outline',
  cursos: 'book-open-page-variant-outline',
  congresos: 'calendar-star',
  'cursos-institucion': 'book-account-outline',
  'congresos-institucion': 'calendar-account',
  patologias: 'heart-pulse',
  conocenos: 'information-outline',
  contacto: 'email-outline',
  foro: 'forum-outline',
  'qr-print': 'qrcode',
  'supervisor-feeds': 'clipboard-edit-outline',
  'admin-payouts': 'cash-multiple',
  'feed-inscriptions': 'account-check-outline',
  'docente-apply': 'school-outline',
  'docente-applications': 'account-tie-outline',
  reuniones: 'video-outline',
  'meeting-recordings': 'folder-play-outline',
};

const EMPHASIZED_MENU_ROUTES = new Set(['patologias']);

const HIDDEN_DRAWER_ROUTES = new Set(['farmacologia']);

const DRAWER_LOGO_WIDTH = 148;
const DRAWER_LOGO_SIZE_SCALE = 0.88;

interface DrawerContentProps {
  state: { routes: { key: string; name: string }[]; index: number };
  navigation: { navigate: (name: string) => void };
}

export function DrawerContent({ state, navigation }: DrawerContentProps) {
  const insets = useSafeAreaInsets();
  const { isAdmin, profile } = useAuth();
  const { t } = useLocale();
  const { unreadCount: foroUnreadCount } = useForoUnread();
  const { hasBranding, sanatorio, logoSource, colors, fonts, theme } = useAppTheme();
  const { previewSanatorioId } = useSanatorioTheme();
  const { countryCode } = useResolvedCountryCode();
  const { canShowFeeds } = useFeedVisibility(countryCode);
  const { canManage: canManageFeeds } = useFeedManageAccess();
  const canShowInstitutionFeeds = Boolean(
    isAdmin ? previewSanatorioId : profile?.sanatorioId,
  );
  const isCircularLogo = theme.logoShape === 'circle';
  const logoRingColor = theme.neutralChrome
    ? hexToRgba(theme.accent, 0.22)
    : hexToRgba(theme.primary, 0.26);
  const logoShadowColor = theme.neutralChrome ? theme.accent : theme.primary;
  const drawerLogoWidth = Math.round(DRAWER_LOGO_WIDTH * DRAWER_LOGO_SIZE_SCALE);
  const drawerLogoHeight = Math.round(
    drawerLogoWidth * (isCircularLogo ? 1 : theme.logoAspectRatio),
  );
  const brandGradient: [string, string, string] = hasBranding
    ? brandGradientTriple(theme.primary, theme.accent)
    : ['#023E8A', '#0077B6', '#012A4A'];

  const visibleRoutes = state.routes.filter((route) => {
    if (HIDDEN_DRAWER_ROUTES.has(route.name)) {
      return false;
    }

    if (route.name === 'cursos' || route.name === 'congresos') {
      return canShowFeeds;
    }

    if (route.name === 'cursos-institucion' || route.name === 'congresos-institucion') {
      return canShowFeeds && canShowInstitutionFeeds;
    }

    if (route.name === 'supervisor-feeds') {
      return canManageFeeds;
    }

    if (route.name === 'admin-payouts') {
      return isAdmin;
    }

    if (route.name === 'feed-inscriptions') {
      return isAdmin || canManageFeeds;
    }

    if (route.name === 'docente-apply') {
      // Visible para usuarios autenticados que aún no son admin/supervisor de sanatorio.
      // Los ya aprobados ven la pantalla de “ya habilitado”.
      return !isAdmin && !canManageFeeds;
    }

    if (route.name === 'docente-applications') {
      return isAdmin;
    }

    if (route.name === 'foro') {
      return isAdmin ? Boolean(previewSanatorioId) : Boolean(sanatorio?.id);
    }

    return true;
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.menuBackground }]}>
      {hasBranding && !theme.transparentMenu ? (
        <View pointerEvents="none" style={[styles.menuTint, { backgroundColor: colors.menuTint }]} />
      ) : null}

      <DrawerContentScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + spacing.lg }]}>
        <LinearGradient
          colors={brandGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.brandHeader, { paddingTop: Math.max(insets.top, spacing.md) + spacing.sm }]}>
          {hasBranding && logoSource ? (
            <View style={styles.logoCenter}>
              <View style={styles.clinicLogoPlate}>
                {isCircularLogo ? (
                  <View
                    style={[
                      styles.circleFrame,
                      {
                        width: drawerLogoWidth,
                        height: drawerLogoHeight,
                        borderRadius: drawerLogoWidth / 2,
                        borderColor: logoRingColor,
                        shadowColor: logoShadowColor,
                      },
                    ]}>
                    <SanatorioCircleLogoImage
                      source={logoSource}
                      frameSize={drawerLogoWidth}
                      accessibilityLabel={t('drawer.sanatorioLogo', {
                        name: sanatorio?.name ?? 'sanatorio',
                      })}
                    />
                  </View>
                ) : (
                  <SanatorioLogoFrame>
                    <Image
                      source={logoSource}
                      style={{ width: drawerLogoWidth, height: drawerLogoHeight }}
                      contentFit="contain"
                      accessibilityLabel={t('drawer.sanatorioLogo', {
                        name: sanatorio?.name ?? 'sanatorio',
                      })}
                    />
                  </SanatorioLogoFrame>
                )}
              </View>
            </View>
          ) : (
            <LogoMark size={88} showTitle title="Sanidapp" onDark />
          )}
          <Typography
            variant="caption"
            style={[
              styles.tagline,
              {
                color: 'rgba(255,255,255,0.92)',
                fontFamily: fonts.semiBold,
              },
            ]}>
            {hasBranding
              ? t('drawer.taglineBranded', { sanatorio: sanatorio?.name ?? 'sanatorio' })
              : t('drawer.taglineDefault')}
          </Typography>
        </LinearGradient>

        <View style={styles.menu}>
          {visibleRoutes.map((route, routeIdx) => {
            const index = state.routes.findIndex((r) => r.key === route.key);
            const focused = state.index === index;
            const emphasized = EMPHASIZED_MENU_ROUTES.has(route.name);
            const label = emphasized
              ? t('drawer.patologiasEmphasis')
              : t(DRAWER_LABEL_KEYS[route.name] ?? route.name);
            const tone = livelyToneAt(routeIdx);
            const pill = livelyPillAt(routeIdx);
            const itemSeparatorStyle =
              routeIdx < visibleRoutes.length - 1
                ? {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: hexToRgba(colors.menuText, 0.18),
                  }
                : null;

            if (emphasized) {
              return (
                <Pressable
                  key={route.key}
                  onPress={() => {
                    hapticLight();
                    navigation.navigate(route.name);
                  }}
                  style={({ pressed }) => [
                    styles.menuItem,
                    itemSeparatorStyle,
                    focused ? { backgroundColor: colors.backgroundSoft } : null,
                    pressed ? styles.menuItemPressed : null,
                  ]}>
                  <View style={styles.menuItemRow}>
                    <View style={[styles.menuIconWrap, { backgroundColor: pill.backgroundColor }]}>
                      <MaterialCommunityIcons
                        name={DRAWER_ICONS[route.name] ?? 'circle-outline'}
                        size={18}
                        color={tone.icon}
                      />
                    </View>
                    <Text
                      style={[
                        styles.menuItemLabel,
                        styles.menuItemEmphasized,
                        { color: tone.label, fontFamily: fonts.bold },
                      ]}>
                      {label}
                    </Text>
                  </View>
                </Pressable>
              );
            }

            return (
              <Pressable
                key={route.key}
                onPress={() => {
                  hapticLight();
                  navigation.navigate(route.name);
                }}
                style={({ pressed }) => [
                  styles.menuItem,
                  itemSeparatorStyle,
                  focused ? { backgroundColor: colors.backgroundSoft } : null,
                  pressed ? styles.menuItemPressed : null,
                ]}>
                <View style={styles.menuItemRow}>
                  <View style={[styles.menuIconWrap, { backgroundColor: pill.backgroundColor }]}>
                    <MaterialCommunityIcons
                      name={DRAWER_ICONS[route.name] ?? 'circle-outline'}
                      size={18}
                      color={tone.icon}
                    />
                  </View>
                  <Typography
                    variant="bodyMedium"
                    style={[
                      styles.menuItemLabel,
                      { color: colors.menuText, fontFamily: fonts.medium },
                    ]}>
                    {label}
                  </Typography>
                  {route.name === 'foro' ? <ForoMenuBadge count={foroUnreadCount} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        <GuardAppearanceToggle />
        <AdminSanatorioSwitcher />
        <ShareSanidappFooter />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  menuTint: {
    ...StyleSheet.absoluteFillObject,
  },
  scroll: {
    backgroundColor: 'transparent',
  },
  container: {
    paddingTop: 0,
  },
  brandHeader: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.xs,
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.xs,
  },
  logoCenter: {
    width: '100%',
    alignItems: 'center',
  },
  clinicLogoPlate: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    maxWidth: '100%',
  },
  circleFrame: {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 9,
  },
  tagline: {
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  menu: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    gap: 0,
  },
  menuItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 10,
  },
  menuItemPressed: {
    opacity: 0.92,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.xs,
  },
  menuIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    marginTop: 1,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 13,
  },
  menuItemEmphasized: {
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
