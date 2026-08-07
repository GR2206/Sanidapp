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
  const drawerWidth = isTablet ? 280 : Math.min(260, Math.round(width * 0.72));
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
        name="reuniones"
        options={{ title: t('drawer.reuniones'), drawerLabel: t('drawer.reuniones') }}
      />
      <Drawer.Screen
        name="meeting-recordings"
        options={{
          title: t('drawer.meetingRecordings'),
          drawerLabel: t('drawer.meetingRecordings'),
        }}
      />
      <Drawer.Screen
        name="cursos-institucion"
        options={{
          title: t('drawer.cursosInstitucion'),
          drawerLabel: t('drawer.cursosInstitucion'),
        }}
      />
      <Drawer.Screen
        name="congresos-institucion"
        options={{
          title: t('drawer.congresosInstitucion'),
          drawerLabel: t('drawer.congresosInstitucion'),
        }}
      />
      <Drawer.Screen
        name="supervisor-feeds"
        options={{
          title: t('drawer.supervisorFeeds'),
          drawerLabel: t('drawer.supervisorFeeds'),
        }}
      />
      <Drawer.Screen
        name="admin-payouts"
        options={{
          title: t('drawer.adminPayouts'),
          drawerLabel: t('drawer.adminPayouts'),
        }}
      />
      <Drawer.Screen
        name="feed-inscriptions"
        options={{
          title: t('drawer.feedInscriptions'),
          drawerLabel: t('drawer.feedInscriptions'),
        }}
      />
      <Drawer.Screen
        name="docente-apply"
        options={{
          title: t('drawer.docenteApply'),
          drawerLabel: t('drawer.docenteApply'),
        }}
      />
      <Drawer.Screen
        name="docente-applications"
        options={{
          title: t('drawer.docenteApplications'),
          drawerLabel: t('drawer.docenteApplications'),
        }}
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
        name="conocenos"
        options={{ title: t('drawer.conocenos'), drawerLabel: t('drawer.conocenos') }}
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
