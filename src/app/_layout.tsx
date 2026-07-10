import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import {
  Playfair_400Regular,
  Playfair_500Medium,
  Playfair_600SemiBold,
  Playfair_700Bold,
} from '@expo-google-fonts/playfair';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import 'react-native-reanimated';
import { Stack, useRouter, type Href } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppearanceProvider } from '@/contexts/AppearanceContext';
import { LocaleProvider, useLocale } from '@/contexts/LocaleContext';
import { SanatorioThemeProvider } from '@/contexts/SanatorioThemeContext';
import { ForoUnreadAlert, ForoUnreadProvider } from '@/contexts/ForoUnreadContext';
import { SoundPreferencesProvider } from '@/contexts/SoundPreferencesContext';
import { TextScaleProvider } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { getProtocolRouteFromUrl } from '@/services/qr/qrDeepLink';
import { palette } from '@/theme/colors';

SplashScreen.preventAutoHideAsync();

function useProtocolDeepLinks() {
  const router = useRouter();

  useEffect(() => {
    function openProtocolFromUrl(url: string) {
      const route = getProtocolRouteFromUrl(url);

      if (route) {
        router.push(route as Href);
      }
    }

    const subscription = Linking.addEventListener('url', ({ url }) => {
      openProtocolFromUrl(url);
    });

    return () => subscription.remove();
  }, [router]);
}

function ThemedStack() {
  const { navigation } = useAppTheme();
  const { t } = useLocale();

  return (
    <Stack
      screenOptions={{
        headerStyle: navigation.headerStyle,
        headerTintColor: navigation.headerTintColor,
        headerTitleStyle: {
          fontFamily: navigation.headerTitleFontFamily,
          color: navigation.headerTitleColor,
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: navigation.contentBackground },
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="category/[categoryId]"
          options={{ headerShown: true, title: t('stack.protocols') }}
        />
        <Stack.Screen name="scanner/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="protocol/[protocolId]"
          options={{ headerShown: true, title: t('stack.protocol') }}
        />
        <Stack.Screen name="drug/[drugId]" options={{ headerShown: true, title: t('stack.drug') }} />
        <Stack.Screen
          name="pathology/[pathologyId]"
          options={{ headerShown: true, title: t('stack.pathology') }}
        />
        <Stack.Screen
          name="calculations/index"
          options={{ headerShown: true, title: t('calculations.title') }}
        />
        <Stack.Screen name="upgrade" options={{ headerShown: true, title: t('stack.premiumPlan') }} />
      </Stack>
  );
}

function ForoPushWrapper({ children }: { children: ReactNode }) {
  if (Constants.appOwnership === 'expo') {
    return children;
  }

  const { ForoPushNotificationsProvider } =
    require('@/components/notifications/ForoPushNotificationsProvider') as typeof import('@/components/notifications/ForoPushNotificationsProvider');

  return <ForoPushNotificationsProvider>{children}</ForoPushNotificationsProvider>;
}

function RootWithAppearance() {
  const { profile } = useAuth();

  return (
    <AppearanceProvider>
      <SanatorioThemeProvider profile={profile}>
        <ForoUnreadProvider>
          <ForoUnreadAlert />
          <ForoPushWrapper>
            <ThemedStack />
          </ForoPushWrapper>
        </ForoUnreadProvider>
      </SanatorioThemeProvider>
    </AppearanceProvider>
  );
}

function RootNavigator() {
  return <RootWithAppearance />;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Playfair_400Regular,
    Playfair_500Medium,
    Playfair_600SemiBold,
    Playfair_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  useProtocolDeepLinks();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync(palette.background);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LocaleProvider>
          <TextScaleProvider>
            <SoundPreferencesProvider>
              <StatusBar style="dark" translucent={Platform.OS === 'android'} />
              <RootNavigator />
            </SoundPreferencesProvider>
          </TextScaleProvider>
        </LocaleProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
