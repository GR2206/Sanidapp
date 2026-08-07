import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export type FieldSelectOption = {
  id: string;
  label: string;
};

interface FieldSelectProps {
  label: string;
  value: string;
  options: FieldSelectOption[];
  onChange: (id: string) => void;
  placeholder?: string;
}

/** Menú desplegable simple (estilo campo de formulario). */
export function FieldSelect({ label, value, options, onChange, placeholder }: FieldSelectProps) {
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.id === value);

  return (
    <View style={styles.wrap}>
      <Typography variant="label">{label}</Typography>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          hapticLight();
          setOpen(true);
        }}
        style={({ pressed }) => [
          styles.trigger,
          { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
          pressed && styles.pressed,
        ]}>
        <Typography variant="body" style={{ color: selected ? colors.text : colors.textMuted, flex: 1 }}>
          {selected?.label ?? placeholder ?? '—'}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textAccent} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
            {options.map((option) => {
              const active = option.id === value;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => {
                    hapticLight();
                    onChange(option.id);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    active && { backgroundColor: colors.background },
                    pressed && styles.pressed,
                  ]}>
                  <Typography
                    variant="bodyMedium"
                    style={{ color: active ? colors.textAccent : colors.text }}>
                    {option.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 4,
  },
  trigger: {
    minHeight: 38,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    maxHeight: '70%',
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.9,
  },
});
