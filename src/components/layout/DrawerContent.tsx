import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdminSanatorioSwitcher } from '@/components/admin/AdminSanatorioSwitcher';
import { ForoMenuBadge } from '@/components/foro/ForoMenuBadge';
import { GuardAppearanceToggle } from '@/components/home/GuardAppearanceToggle';
import { LogoMark } from '@/components/ui/LogoMark';
import { SanatorioLogoFrame } from '@/components/ui/SanatorioLogoFrame';
import { SanatorioCircleLogoImage } from '@/components/ui/SanatorioCircleLogoImage';
import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useForoUnread } from '@/contexts/ForoUnreadContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

const DRAWER_LABEL_KEYS: Record<string, string> = {
  index: 'drawer.index',
  cursos: 'drawer.cursos',
  congresos: 'drawer.congresos',
  patologias: 'drawer.patologias',
  contacto: 'drawer.contacto',
  foro: 'drawer.foro',
  'qr-print': 'drawer.qrPrint',
};

const EMPHASIZED_MENU_ROUTES = new Set(['patologias']);

const HIDDEN_DRAWER_ROUTES = new Set(['farmacologia']);

const DRAWER_LOGO_WIDTH = 160;
const DRAWER_LOGO_SIZE_SCALE = 0.8;

interface DrawerContentProps {
  state: { routes: { key: string; name: string }[]; index: number };
  navigation: { navigate: (name: string) => void };
}

export function DrawerContent({ state, navigation }: DrawerContentProps) {
  const insets = useSafeAreaInsets();
  const { isAdmin } = useAuth();
  const { t } = useLocale();
  const { unreadCount: foroUnreadCount } = useForoUnread();
  const { hasBranding, sanatorio, logoSource, colors, fonts, theme } = useAppTheme();
  const { previewSanatorioId } = useSanatorioTheme();
  const isCircularLogo = theme.logoShape === 'circle';
  const logoRingColor = theme.neutralChrome
    ? hexToRgba(theme.accent, 0.22)
    : hexToRgba(theme.primary, 0.26);
  const logoShadowColor = theme.neutralChrome ? theme.accent : theme.primary;
  const drawerLogoWidth = Math.round(DRAWER_LOGO_WIDTH * DRAWER_LOGO_SIZE_SCALE);
  const drawerLogoHeight = Math.round(
    drawerLogoWidth * (isCircularLogo ? 1 : theme.logoAspectRatio),
  );
  const visibleRoutes = state.routes.filter((route) => {
    if (HIDDEN_DRAWER_ROUTES.has(route.name)) {
      return false;
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
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          {hasBranding && logoSource ? (
            <View style={styles.logoCenter}>
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
          ) : (
            <LogoMark size={72} accentColor={colors.textAccent} />
          )}
          <Typography
            variant="caption"
            style={[
              styles.tagline,
              { color: colors.menuText, fontFamily: fonts.semiBold },
            ]}>
            {hasBranding
              ? t('drawer.taglineBranded', { sanatorio: sanatorio?.name ?? 'sanatorio' })
              : t('drawer.taglineDefault')}
          </Typography>
        </View>

        <View style={styles.menu}>
          {visibleRoutes.map((route, routeIdx) => {
              const index = state.routes.findIndex((r) => r.key === route.key);
              const focused = state.index === index;
              const emphasized = EMPHASIZED_MENU_ROUTES.has(route.name);
              const label = emphasized
                ? t('drawer.patologiasEmphasis')
                : t(DRAWER_LABEL_KEYS[route.name] ?? route.name);
              const itemSeparatorStyle =
                routeIdx < visibleRoutes.length - 1
                  ? {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: hexToRgba(colors.menuText, 0.18),
                    }
                  : null;

              if (emphasized) {
                return (
                  <Text
                    key={route.key}
                    onPress={() => {
                      hapticLight();
                      navigation.navigate(route.name);
                    }}
                    style={[
                      styles.menuItem,
                      styles.menuItemEmphasized,
                      itemSeparatorStyle,
                      { color: colors.menuText, fontFamily: fonts.bold },
                      focused ? { backgroundColor: colors.backgroundSoft, color: colors.menuText } : null,
                    ]}>
                    {label}
                  </Text>
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
    paddingTop: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    gap: spacing.sm,
    alignItems: 'center',
    width: '100%',
  },
  logoCenter: {
    width: '100%',
    alignItems: 'center',
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
  },
  menu: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    gap: 0,
  },
  menuItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
  },
  menuItemPressed: {
    opacity: 0.92,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLabel: {
    flex: 1,
  },
  menuItemEmphasized: {
    fontSize: 15,
    letterSpacing: 0.8,
  },
});
