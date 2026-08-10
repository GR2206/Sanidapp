import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius } from '@/theme/spacing';
import { contrastingInk } from '@/utils/color';
import { hapticLight } from '@/utils/haptics';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  /** Color de fondo/borde (por defecto palette.accent). */
  accentColor?: string;
  /** Ícono / marca a la izquierda del texto (mismo botón). */
  leading?: ReactNode;
}

export function Button({
  label,
  variant = 'primary',
  accentColor,
  leading,
  style,
  disabled,
  onPressIn,
  ...rest
}: ButtonProps) {
  const { colors } = useAppTheme();
  const { s } = useTextScale();
  const resolvedAccent =
    accentColor ?? (variant === 'secondary' ? colors.buttonAlt : colors.button);
  const toneStyle = { backgroundColor: resolvedAccent, borderColor: resolvedAccent };
  const labelColor = contrastingInk(resolvedAccent);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={(event) => {
        if (!disabled) {
          hapticLight();
        }
        onPressIn?.(event);
      }}
      style={({ pressed }) => [
        styles.base,
        {
          paddingVertical: s(12),
          paddingHorizontal: s(22),
          minHeight: s(44),
        },
        toneStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}
      {...rest}>
      <View style={styles.content}>
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <Typography
          variant="bodyMedium"
          color={labelColor}
          style={[styles.label, leading ? styles.labelWithLeading : null]}>
          {label}
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pressed: {
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    letterSpacing: 0.4,
  },
  labelWithLeading: {
    flexShrink: 1,
  },
});
