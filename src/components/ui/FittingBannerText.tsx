import { useEffect, useState } from 'react';
import { StyleSheet, type StyleProp, type TextStyle } from 'react-native';

import { Typography } from '@/components/ui/Typography';

interface FittingBannerTextProps {
  maxFontSize: number;
  minFontScale?: number;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  children: string;
  variant?: 'bodyMedium' | 'caption';
  color?: string;
}

/**
 * Auto-ajusta el texto dentro del banner: parte grande, achica solo si hace falta.
 */
export function FittingBannerText({
  maxFontSize,
  minFontScale = 0.82,
  numberOfLines = 2,
  style,
  children,
  variant = 'bodyMedium',
  color,
}: FittingBannerTextProps) {
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    setFontSize(maxFontSize);
  }, [maxFontSize, children]);

  const lineHeight = Math.round(fontSize * 1.1);

  return (
    <Typography
      variant={variant}
      color={color}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      minimumFontScale={minFontScale}
      style={[
        styles.text,
        style,
        {
          fontSize,
          lineHeight,
        },
      ]}>
      {children}
    </Typography>
  );
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
  },
});
