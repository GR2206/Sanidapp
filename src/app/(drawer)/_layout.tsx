import { Drawer } from 'expo-router/drawer';
import { useWindowDimensions } from 'react-native';

import { AuthGate } from '@/components/auth/AuthGate';
import { DrawerContent } from '@/components/layout/DrawerContent';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { TABLET_SHORT_SIDE } from '@/hooks/useResponsiveLayout';
import { hexToRgba } from '@/utils/color';

function DrawerNavigator() {
  const { width, height } = useWindowDimensions();
  const { hasBranding, sanatorio, navigation, colors, theme } = useAppTheme();
  const { t } = useLocale();
  const isTablet = Math.min(width, height) >= TABLET_SHORT_SIDE;
  const drawerWidth = isTablet ? 320 : Math.min(300, Math.round(width * 0.82));
  const homeTitle = hasBranding ? (sanatorio?.shortName ?? t('drawer.index')) : 'Sanidapp';

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: navigation.headerStyle,
        headerTintColor: navigation.headerTintColor,
        headerTitleStyle: {
          fontFamily: navigation.headerTitleFontFamily,
          color: navigation.headerTitleColor,
        },
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: navigation.drawerBackground,
          width: drawerWidth,
        },
        sceneStyle: { backgroundColor: navigation.contentBackground },
        overlayColor: hasBranding
          ? hexToRgba(theme.neutralChrome ? theme.accent : colors.button, 0.18)
          : 'rgba(26, 26, 26, 0.35)',
      }}>
      <Drawer.Screen
        name="index"
        options={{
          title: homeTitle,
          drawerLabel: t('drawer.index'),
          headerShown: false,
          sceneStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Drawer.Screen
        name="cursos"
        options={{ title: t('drawer.cursos'), drawerLabel: t('drawer.cursos') }}
      />
      <Drawer.Screen
        name="congresos"
        options={{ title: t('drawer.congresos'), drawerLabel: t('drawer.congresos') }}
      />
      <Drawer.Screen
        name="patologias"
        options={{ title: t('drawer.patologias'), drawerLabel: t('drawer.patologias') }}
      />
      <Drawer.Screen
        name="farmacologia"
        options={{
          title: t('content.pharmacology'),
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="contacto"
        options={{ title: t('drawer.contacto'), drawerLabel: t('drawer.contacto') }}
      />
      <Drawer.Screen name="foro" options={{ title: t('drawer.foro'), drawerLabel: t('drawer.foro') }} />
      <Drawer.Screen
        name="qr-print"
        options={{ title: t('drawer.qrPrint'), drawerLabel: t('drawer.qrPrint') }}
      />
    </Drawer>
  );
}

export default function DrawerLayout() {
  return (
    <AuthGate>
      <DrawerNavigator />
    </AuthGate>
  );
}
