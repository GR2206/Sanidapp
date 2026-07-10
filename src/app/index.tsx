import * as Linking from 'expo-linking';
import { router, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoMark } from '@/components/ui/LogoMark';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { loadManifest } from '@/services/content/manifestService';
import { getProtocolRouteFromUrl } from '@/services/qr/qrDeepLink';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const SPLASH_LOGO_SIZE = Math.round(112 * 1.2);
const splashBackground = require('../../assets/images/splash-background.png');

async function getInitialProtocolRoute(): Promise<string | null> {
  const initialUrl = await Linking.getInitialURL();
  return getProtocolRouteFromUrl(initialUrl);
}

export default function SplashRoute() {
  const { t } = useLocale();
  const [status, setStatus] = useState(() => t('splash.loading'));
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let mounted = true;
    let redirectTimer: ReturnType<typeof setTimeout> | undefined;

    async function bootstrap() {
      try {
        await loadManifest();
        if (!mounted) return;
        setStatus(t('splash.updated'));
      } catch {
        if (!mounted) return;
        setStatus(t('splash.local'));
      }

      const protocolRoute = await getInitialProtocolRoute();
      if (!mounted) return;

      if (protocolRoute) {
        router.replace(protocolRoute as Href);
        return;
      }

      redirectTimer = setTimeout(() => {
        if (mounted) {
          router.replace(ROUTES.login);
        }
      }, 800);
    }

    const startTimer = setTimeout(bootstrap, 400);

    return () => {
      mounted = false;
      clearTimeout(startTimer);
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [t]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={splashBackground}
        style={styles.background}
        imageStyle={styles.backgroundImage}
        resizeMode="cover">
        <View
          style={[
            styles.container,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}>
          <LogoMark size={SPLASH_LOGO_SIZE} showTitle title="SANIDAPP" />
          <ActivityIndicator color={palette.accent} style={styles.loader} />
          <Typography variant="caption" style={styles.status}>
            {status}
          </Typography>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  loader: {
    marginTop: spacing.sm,
  },
  status: {
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
