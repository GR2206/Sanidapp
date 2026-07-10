import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';
import { hexToRgba } from '@/utils/color';

interface SanatorioLogoFrameProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Marco redondeado con sombra para logos institucionales (home + drawer).
 * Patrón guía para el branding de cada sanatorio.
 */
export function SanatorioLogoFrame({ children, style }: SanatorioLogoFrameProps) {
  const { hasBranding, theme } = useAppTheme();

  if (!hasBranding) {
    return <View style={[styles.plain, style]}>{children}</View>;
  }

  const ringColor = theme.neutralChrome ? theme.accent : theme.primary;

  return (
    <View
      style={[
        styles.frame,
        {
          borderColor: hexToRgba(ringColor, 0.14),
          backgroundColor: '#FFFFFF',
          shadowColor: ringColor,
        },
        style,
      ]}>
      <View style={styles.innerGlow} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  plain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: spacing.lg + 6,
    paddingVertical: spacing.md + 4,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 10,
    overflow: 'hidden',
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
});
