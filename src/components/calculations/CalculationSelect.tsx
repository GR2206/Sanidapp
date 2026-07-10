import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export type CalculationSelectOption = {
  value: string;
  label: string;
};

interface CalculationSelectProps {
  label: string;
  value: string | null;
  options: CalculationSelectOption[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  allowClear?: boolean;
}

export function CalculationSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  allowClear = true,
}: CalculationSelectProps) {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => options.find((item) => item.value === value) ?? null,
    [options, value],
  );

  return (
    <View style={styles.wrap}>
      <Typography variant="label" style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Typography>

      <Pressable
        onPress={() => {
          hapticLight();
          setOpen(true);
        }}
        style={[
          styles.trigger,
          { borderColor: colors.border, backgroundColor: colors.backgroundSoft },
        ]}>
        <Typography
          variant="bodyMedium"
          style={[
            styles.triggerText,
            { color: selected ? colors.text : colors.textMuted },
          ]}
          numberOfLines={2}>
          {selected?.label ?? placeholder ?? t('common.select')}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={22} color={colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: colors.background, borderColor: colors.border },
            ]}
            onPress={(event) => event.stopPropagation()}>
            <Typography variant="bodyMedium" style={[styles.sheetTitle, { color: colors.textAccent }]}>
              {label}
            </Typography>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {allowClear ? (
                <Pressable
                  onPress={() => {
                    hapticLight();
                    onChange(null);
                    setOpen(false);
                  }}
                  style={styles.option}>
                  <Typography variant="bodyMedium" style={{ color: colors.textMuted }}>
                    {t('calculations.noneSelected')}
                  </Typography>
                </Pressable>
              ) : null}
              {options.map((item) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => {
                      hapticLight();
                      onChange(item.value);
                      setOpen(false);
                    }}
                    style={[
                      styles.option,
                      isSelected && { backgroundColor: colors.backgroundSoft },
                    ]}>
                    <Typography
                      variant="bodyMedium"
                      style={{ color: isSelected ? colors.textAccent : colors.textSecondary }}>
                      {item.label}
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
  },
  label: {
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  triggerText: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    maxHeight: '70%',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sheetTitle: {
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
});
