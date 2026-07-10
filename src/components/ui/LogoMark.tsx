import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography } from '@/components/ui/Typography';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface LogoMarkProps {
  size?: number;
  showTitle?: boolean;
  /** Texto bajo el logo cuando `showTitle` es true. */
  title?: string;
  /** Color del ícono y acento del círculo (por defecto palette.accent). */
  accentColor?: string;
  /** Dentro de banners u otros contenedores en fila (sin centrar ni sombra fuerte). */
  embedded?: boolean;
  /** Marca de agua: círculo blanco amplio, sin borde ni sombra. */
  watermark?: boolean;
}

export function LogoMark({
  size = 96,
  showTitle = false,
  title = 'Sanidapp',
  accentColor = palette.accent,
  embedded = false,
  watermark = false,
}: LogoMarkProps) {
  const circleSize = size;
  const iconSize = size * (watermark ? 0.5 : 0.44);

  return (
    <View style={[styles.wrapper, embedded && styles.wrapperEmbedded, watermark && styles.wrapperWatermark]}>
      <View
        style={[
          styles.circle,
          embedded && !watermark && styles.circleEmbedded,
          watermark && styles.circleWatermark,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}>
        <MaterialCommunityIcons name="stethoscope" size={iconSize} color={accentColor} />
      </View>
      {showTitle ? (
        <Typography
          variant={watermark ? 'bodyMedium' : 'subtitle'}
          style={[styles.title, watermark && styles.titleWatermark]}>
          {title}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacing.md,
  },
  wrapperEmbedded: {
    alignSelf: 'auto',
    gap: 0,
    flexShrink: 0,
  },
  wrapperWatermark: {
    gap: spacing.sm,
  },
  circle: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.text,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  circleEmbedded: {
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  circleWatermark: {
    backgroundColor: palette.white,
    borderWidth: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    overflow: 'hidden',
  },
  title: {
    letterSpacing: 0.3,
  },
  titleWatermark: {
    color: palette.textSecondary,
  },
});
