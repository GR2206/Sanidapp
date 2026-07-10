import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  /** Color de fondo/borde (por defecto palette.accent). */
  accentColor?: string;
}

export function Button({
  label,
  variant = 'primary',
  accentColor,
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
      <Typography variant="bodyMedium" color={palette.white} style={styles.label}>
        {label}
      </Typography>
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
  pressed: {
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    letterSpacing: 0.4,
  },
});
