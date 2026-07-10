import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import type { Sanatorio } from '@/types/sanatorio';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface SanatorioSelectProps {
  label?: string;
  sanatorios: Sanatorio[];
  value: string;
  onChange: (sanatorioId: string) => void;
  placeholder?: string;
}

export function SanatorioSelect({
  label,
  sanatorios,
  value,
  onChange,
  placeholder,
}: SanatorioSelectProps) {
  const { t } = useLocale();
  const resolvedLabel = label ?? t('auth.fields.sanatorio');
  const resolvedPlaceholder = placeholder ?? t('auth.fields.sanatorioPlaceholder');
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => sanatorios.find((item) => item.id === value) ?? null,
    [sanatorios, value],
  );

  return (
    <View style={styles.wrap}>
      <Typography variant="label" style={styles.label}>
        {resolvedLabel}
      </Typography>

      <Pressable
        onPress={() => {
          hapticLight();
          setOpen(true);
        }}
        style={styles.trigger}>
        <Typography
          variant="bodyMedium"
          style={[styles.triggerText, !selected && styles.placeholder]}
          numberOfLines={2}>
          {selected?.name ?? resolvedPlaceholder}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={22} color={palette.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <Typography variant="bodyMedium" style={styles.sheetTitle}>
              {resolvedLabel}
            </Typography>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {sanatorios.map((item) => {
                const isSelected = item.id === value;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      hapticLight();
                      onChange(item.id);
                      setOpen(false);
                    }}
                    style={[styles.option, isSelected && styles.optionSelected]}>
                    <Typography
                      variant="bodyMedium"
                      style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {item.name}
                    </Typography>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  label: {
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  triggerText: {
    flex: 1,
    color: palette.text,
  },
  placeholder: {
    color: palette.textMuted,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    maxHeight: '70%',
    backgroundColor: palette.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sheetTitle: {
    color: palette.accent,
    textAlign: 'center',
  },
  list: {
    flexGrow: 0,
  },
  option: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  optionSelected: {
    backgroundColor: palette.backgroundSoft,
  },
  optionText: {
    color: palette.textSecondary,
  },
  optionTextSelected: {
    color: palette.accent,
  },
});
