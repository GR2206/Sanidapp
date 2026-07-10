import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useTextScale } from '@/contexts/TextScaleContext';
import { radius, spacing } from '@/theme/spacing';
import { fontFamily } from '@/theme/typography';
import { hapticLight } from '@/utils/haptics';

export type CalculationDrugSelectOption = {
  value: string;
  label: string;
};

interface CalculationDrugSelectProps {
  label: string;
  value: string | null;
  options: CalculationDrugSelectOption[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  onOpenMonograph?: (drugId: string) => void;
}

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function CalculationDrugSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
  onOpenMonograph,
}: CalculationDrugSelectProps) {
  const { t } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { s } = useTextScale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = useMemo(
    () => options.find((item) => item.value === value) ?? null,
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const normalized = normalizeSearch(query);
    if (!normalized) return options;
    return options.filter((item) => normalizeSearch(item.label).includes(normalized));
  }, [options, query]);

  function handleOpen() {
    hapticLight();
    setQuery('');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setQuery('');
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Typography variant="label" style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Typography>
        {value && onOpenMonograph ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('calculations.openDrugMonograph')}
            onPress={() => {
              hapticLight();
              onOpenMonograph(value);
            }}
            style={[
              styles.monographButton,
              { backgroundColor: colors.button, borderColor: colors.button },
            ]}>
            <MaterialCommunityIcons name="pill" size={18} color="#FFFFFF" />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        onPress={handleOpen}
        style={[
          styles.trigger,
          { borderColor: colors.border, backgroundColor: colors.backgroundSoft },
        ]}>
        <Typography
          variant="bodyMedium"
          style={[
            styles.triggerText,
            { color: selected ? colors.text : colors.textMuted, fontFamily: fonts.regular },
          ]}
          numberOfLines={2}>
          {selected?.label ?? placeholder ?? t('calculations.selectDrug')}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={22} color={colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={handleClose}>
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: colors.background, borderColor: colors.border },
            ]}
            onPress={(event) => event.stopPropagation()}>
            <Typography
              variant="bodyMedium"
              style={[styles.sheetTitle, { color: colors.textAccent, fontFamily: fonts.semiBold }]}>
              {label}
            </Typography>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={t('calculations.drugSearchPlaceholder')}
              placeholderTextColor={colors.textMuted}
              autoCorrect={false}
              autoCapitalize="none"
              style={[
                styles.searchInput,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.backgroundSoft,
                  color: colors.text,
                  fontFamily: fonts.regular,
                  fontSize: s(15),
                },
              ]}
            />

            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              <Pressable
                onPress={() => {
                  hapticLight();
                  onChange(null);
                  handleClose();
                }}
                style={styles.option}>
                <Typography variant="bodyMedium" style={{ color: colors.textMuted }}>
                  {t('calculations.noneSelected')}
                </Typography>
              </Pressable>

              {filteredOptions.length === 0 ? (
                <View style={styles.empty}>
                  <Typography variant="body" color={colors.textMuted}>
                    {t('common.noResults')}
                  </Typography>
                </View>
              ) : (
                filteredOptions.map((item) => {
                  const isSelected = item.value === value;
                  return (
                    <Pressable
                      key={item.value}
                      onPress={() => {
                        hapticLight();
                        onChange(item.value);
                        handleClose();
                      }}
                      style={[
                        styles.option,
                        isSelected && { backgroundColor: colors.backgroundSoft },
                      ]}>
                      <Typography
                        variant="bodyMedium"
                        style={{
                          color: isSelected ? colors.textAccent : colors.textSecondary,
                          fontFamily: isSelected ? fonts.medium : fonts.regular,
                        }}>
                        {item.label}
                      </Typography>
                    </Pressable>
                  );
                })
              )}
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
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  label: {
    flex: 1,
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  monographButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
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
    padding: spacing.md,
  },
  sheet: {
    maxHeight: '75%',
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  sheetTitle: {
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    fontFamily: fontFamily.regular,
  },
  list: {
    flexGrow: 0,
  },
  option: {
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
  },
  empty: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
