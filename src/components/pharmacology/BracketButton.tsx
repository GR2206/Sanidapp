import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

interface BracketButtonProps {
  label: string;
  selected?: boolean;
  compact?: boolean;
  fill?: boolean;
  onPress?: () => void;
}

/** Botón estándar azul para monografías (mismo estilo que la app, sin corchetes). */
export function BracketButton({
  label,
  selected = false,
  compact = false,
  fill = false,
  onPress,
}: BracketButtonProps) {
  const { colors, hasBranding } = useAppTheme();
  const interactive = Boolean(onPress);

  const fillColor = selected
    ? colors.button
    : hasBranding
      ? hexToRgba(colors.button, 0.52)
      : colors.buttonMuted;
  const borderColor = selected
    ? colors.button
    : hasBranding
      ? hexToRgba(colors.button, 0.68)
      : colors.buttonMuted;

  return (
    <Pressable
      accessibilityRole={interactive ? 'button' : 'text'}
      accessibilityState={interactive ? { selected } : undefined}
      disabled={!interactive}
      onPressIn={() => {
        if (interactive) {
          hapticLight();
        }
      }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        compact ? styles.compact : styles.regular,
        fill && styles.fill,
        {
          backgroundColor: fillColor,
          borderColor,
        },
        interactive && pressed && styles.pressed,
      ]}>
      <Typography
        variant={compact ? 'caption' : 'bodyMedium'}
        color={palette.white}
        numberOfLines={1}
        adjustsFontSizeToFit={compact}
        minimumFontScale={0.8}
        style={styles.label}>
        {label}
      </Typography>
    </Pressable>
  );
}

interface BracketTabRowProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** Pestañas Adulto / Pediátrico / Neonatal — siempre en una fila */
export function BracketTabRow({ items, activeId, onSelect }: BracketTabRowProps) {
  return (
    <View style={styles.tabRow}>
      {items.map((item) => (
        <View key={item.id} style={styles.tabSlot}>
          <BracketButton
            label={item.label}
            compact
            fill
            selected={item.id === activeId}
            onPress={() => onSelect(item.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regular: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  compact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  fill: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    width: '100%',
  },
  tabSlot: {
    flex: 1,
    minWidth: 0,
  },
});
