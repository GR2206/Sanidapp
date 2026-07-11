import { Image } from 'expo-image';
import { type ReactNode } from 'react';
import { ImageBackground, StyleSheet, useWindowDimensions, View } from 'react-native';

import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { useLocale } from '@/contexts/LocaleContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';

const homeBackground = require('../../../assets/images/home-background.png');

interface DashboardBackgroundProps {
  children: ReactNode;
}

export function DashboardBackground({ children }: DashboardBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const { colors, hasBranding, logoSource } = useDashboardTheme();
  const { theme } = useSanatorioTheme();
  const { t } = useLocale();
  const watermarkSize = Math.round(Math.min(width, height) * 0.7);
  const watermarkCoverScale = theme.dashboardWatermarkCoverScale;
  const watermarkCircle = theme.dashboardWatermarkCircle;
  const watermarkUsesScaledCover = watermarkCoverScale !== 1;
  const watermarkLogoInset = theme.dashboardWatermarkLogoInset ?? 0.88;
  const watermarkFrameBackground = theme.dashboardLogoBlendBackground
    ? theme.background
    : watermarkCircle
      ? '#FFFFFF'
      : undefined;

  if (!hasBranding) {
    return (
      <ImageBackground
        source={homeBackground}
        style={styles.fill}
        imageStyle={styles.backgroundImage}
        resizeMode="cover">
        <View
          pointerEvents="none"
          style={[styles.overlay, { backgroundColor: colors.imageOverlay }]}
        />
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.fill, { backgroundColor: colors.pageBackground }]}>
      <View pointerEvents="none" style={[styles.overlay, { backgroundColor: colors.imageOverlay }]} />
      {logoSource ? (
        <View pointerEvents="none" style={styles.watermarkWrap}>
          <View
            style={[
              styles.watermarkFrame,
              {
                width: watermarkSize,
                height: watermarkSize,
                borderRadius: watermarkCircle ? watermarkSize / 2 : 0,
                opacity: colors.watermarkOpacity,
                backgroundColor: watermarkFrameBackground,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              source={logoSource}
              style={
                watermarkUsesScaledCover
                  ? [
                      styles.watermarkImage,
                      { transform: [{ scale: watermarkCoverScale }] },
                    ]
                  : {
                      width: `${Math.round(watermarkLogoInset * 100)}%`,
                      height: `${Math.round(watermarkLogoInset * 100)}%`,
                    }
              }
              contentFit={watermarkUsesScaledCover ? 'cover' : 'contain'}
              accessibilityLabel={t('drawer.sanatoriumWatermark')}
            />
          </View>
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  watermarkWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  watermarkFrame: {
    overflow: 'hidden',
    opacity: 1,
  },
  watermarkImage: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
});
