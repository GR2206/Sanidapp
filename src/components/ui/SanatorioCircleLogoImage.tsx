import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';

interface SanatorioCircleLogoImageProps {
  source: ImageSourcePropType;
  frameSize: number;
  accessibilityLabel: string;
}

export function SanatorioCircleLogoImage({
  source,
  frameSize,
  accessibilityLabel,
}: SanatorioCircleLogoImageProps) {
  const { theme } = useSanatorioTheme();
  const useContain = theme.circleLogoFit === 'contain';
  const imageSize = useContain
    ? Math.round(frameSize * theme.circleLogoInset)
    : frameSize;
  const coverScale = theme.circleLogoCoverScale;

  return (
    <Image
      source={source}
      style={
        useContain
          ? { width: imageSize, height: imageSize }
          : coverScale > 1
            ? [styles.coverImage, { transform: [{ scale: coverScale }] }]
            : styles.coverImage
      }
      contentFit={useContain ? 'contain' : 'cover'}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: '100%',
  },
});
