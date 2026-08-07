import * as Linking from 'expo-linking';
import { router, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogoMark } from '@/components/ui/LogoMark';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { loadManifest } from '@/services/content/manifestService';
import {
  getMeetingCodeFromUrl,
  getMeetingLobbyHref,
  peekPendingMeetingJoinCode,
  setPendingMeetingJoinCode,
} from '@/services/meeting/meetingDeepLink';
import { getProtocolRouteFromUrl } from '@/services/qr/qrDeepLink';
import { spacing } from '@/theme/spacing';

const SPLASH_LOGO_SIZE = Math.round(112 * 1.2);

async function getInitialDeepLinkRoute(): Promise<Href | null> {
  try {
    const initialUrl = await Promise.race([
      Linking.getInitialURL(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 300)),
    ]);
    const meetingCode = getMeetingCodeFromUrl(initialUrl);
    if (meetingCode) {
      setPendingMeetingJoinCode(meetingCode);
      return getMeetingLobbyHref(meetingCode) as Href;
    }
    const protocolRoute = getProtocolRouteFromUrl(initialUrl);
    return protocolRoute ? (protocolRoute as Href) : null;
  } catch {
    return null;
  }
}

export default function SplashRoute() {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const { isReady, isAuthenticated } = useAuth();
  const [status] = useState(() => t('splash.loading'));
  const navigatedRef = useRef(false);
  const insets = useSafeAreaInsets();
  const deepLinkHrefRef = useRef<Href | null>(null);

  function go(href: Href) {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.replace(href);
  }

  useEffect(() => {
    void loadManifest().catch(() => undefined);

    let cancelled = false;

    void getInitialDeepLinkRoute().then((deepLinkHref) => {
      if (cancelled || navigatedRef.current) return;
      deepLinkHrefRef.current = deepLinkHref;
      // Protocolos pueden abrirse sin sesión; reuniones esperan auth abajo.
      if (deepLinkHref && !peekPendingMeetingJoinCode()) {
        go(deepLinkHref);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- montaje único
  }, []);

  useEffect(() => {
    if (navigatedRef.current) return;

    if (isReady) {
      const pendingMeeting = peekPendingMeetingJoinCode();
      if (isAuthenticated && pendingMeeting) {
        go(getMeetingLobbyHref(pendingMeeting) as Href);
        return;
      }
      if (isAuthenticated && deepLinkHrefRef.current && !pendingMeeting) {
        // Ya navegó a protocolo en el efecto anterior, o nada.
      }
      go(isAuthenticated ? ROUTES.home : ROUTES.login);
      return;
    }

    const fallback = setTimeout(() => {
      go(ROUTES.login);
    }, 800);

    return () => clearTimeout(fallback);
  }, [isReady, isAuthenticated]);

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <LogoMark size={SPLASH_LOGO_SIZE} showTitle title="SANIDAPP" />
      <ActivityIndicator color={colors.button} style={styles.loader} />
      <Typography variant="caption" color={colors.textMuted}>
        {status}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  loader: {
    marginTop: spacing.sm,
  },
});
