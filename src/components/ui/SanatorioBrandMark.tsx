import { Image } from 'expo-image';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import type { ImageSourcePropType } from 'react-native';

import { SanatorioLogoFrame } from '@/components/ui/SanatorioLogoFrame';
import { SanatorioCircleLogoImage } from '@/components/ui/SanatorioCircleLogoImage';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { hexToRgba } from '@/utils/color';
import { spacing } from '@/theme/spacing';

const HOME_LOGO_SIZE_SCALE = 0.8;

interface SanatorioBrandMarkProps {
  logoSource: ImageSourcePropType;
  accessibilityLabel: string;
  maxWidthRatio?: number;
}

export function SanatorioBrandMark({
  logoSource,
  accessibilityLabel,
  maxWidthRatio = 0.82,
}: SanatorioBrandMarkProps) {
  const { width } = useWindowDimensions();
  const { theme } = useSanatorioTheme();
  const isCircular = theme.logoShape === 'circle';
  const logoWidth = Math.round(
    Math.min(width * (isCircular ? 0.56 : maxWidthRatio), isCircular ? 220 : 300) *
      HOME_LOGO_SIZE_SCALE *
      theme.homeLogoScale,
  );
  const logoHeight = Math.round(logoWidth * (isCircular ? 1 : theme.logoAspectRatio));

  return (
    <View style={styles.wrapper}>
      {isCircular ? (
        <View
          style={[
            styles.circleFrame,
            {
              width: logoWidth,
              height: logoHeight,
              borderRadius: logoWidth / 2,
              borderColor: hexToRgba(theme.primary, 0.26),
              shadowColor: theme.primary,
            },
          ]}>
          <SanatorioCircleLogoImage
            source={logoSource}
            frameSize={logoWidth}
            accessibilityLabel={accessibilityLabel}
          />
        </View>
      ) : (
        <SanatorioLogoFrame>
          <Image
            source={logoSource}
            style={{ width: logoWidth, height: logoHeight }}
            contentFit="contain"
            accessibilityLabel={accessibilityLabel}
          />
        </SanatorioLogoFrame>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
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
});
