import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { brandGradientTriple } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface GradientCalculateButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** CTA de cálculo: gradiente de marca (free cyan o paleta sanatorio). */
export function GradientCalculateButton({
  label,
  onPress,
  disabled = false,
  style,
}: GradientCalculateButtonProps) {
  const { fonts, hasBranding, theme } = useAppTheme();
  const gradient = hasBranding
    ? brandGradientTriple(theme.primary, theme.accent)
    : (['#00B4D8', '#0077B6', '#023E8A'] as [string, string, string]);
  const shadowColor = hasBranding ? theme.primary : '#0077B6';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        hapticLight();
        onPress();
      }}
      style={({ pressed }) => [
        styles.wrap,
        { shadowColor },
        style,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}>
        <View style={styles.content}>
          <Typography style={styles.icon}>⚡️</Typography>
          <Typography
            variant="bodyMedium"
            style={[styles.label, { fontFamily: fonts.semiBold, color: '#FFFFFF' }]}>
            {label}
          </Typography>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: spacing.sm,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    minHeight: 46,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  icon: {
    fontSize: 15,
    lineHeight: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
