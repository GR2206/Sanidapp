import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { formatStaffMemberName } from '@/services/firebase/sanatorioStaffService';
import type { SanatorioStaffMember } from '@/types/foro';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface StaffMemberSelectProps {
  label?: string;
  staff: SanatorioStaffMember[];
  value: string;
  onChange: (uid: string, member: SanatorioStaffMember) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function StaffMemberSelect({
  label,
  staff,
  value,
  onChange,
  placeholder,
  disabled = false,
}: StaffMemberSelectProps) {
  const { t } = useLocale();
  const resolvedLabel = label ?? t('foro.direct.staffRequired');
  const resolvedPlaceholder = placeholder ?? t('foro.direct.pickPerson');
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => staff.find((item) => item.uid === value) ?? null,
    [staff, value],
  );

  return (
    <View style={styles.wrap}>
      <Typography variant="label" style={styles.label}>
        {resolvedLabel}
      </Typography>

      <Pressable
        disabled={disabled || staff.length === 0}
        onPress={() => {
          hapticLight();
          setOpen(true);
        }}
        style={[styles.trigger, (disabled || staff.length === 0) && styles.triggerDisabled]}>
        <Typography
          variant="bodyMedium"
          style={[styles.triggerText, !selected && styles.placeholder]}
          numberOfLines={2}>
          {selected
            ? formatStaffMemberName(selected)
            : staff.length === 0
              ? t('foro.direct.noStaffRegistered')
              : resolvedPlaceholder}
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
              {staff.map((item) => {
                const isSelected = item.uid === value;
                const name = formatStaffMemberName(item);
                return (
                  <Pressable
                    key={item.uid}
                    onPress={() => {
                      hapticLight();
                      onChange(item.uid, item);
                      setOpen(false);
                    }}
                    style={[styles.option, isSelected && styles.optionSelected]}>
                    <Typography
                      variant="bodyMedium"
                      style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {name}
                    </Typography>
                    {item.profesion ? (
                      <Typography variant="caption" color={palette.textMuted}>
                        {item.profesion}
                      </Typography>
                    ) : null}
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
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  triggerDisabled: {
    opacity: 0.6,
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
    gap: 2,
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
