import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { FREE_QUICK_ACCESS_TONES, type FreeQuickAccessTone } from '@/theme/freeCategoryPills';
import { spacing } from '@/theme/spacing';
import { contrastingInk } from '@/utils/color';
import { hapticLight } from '@/utils/haptics';

const PEDIATRIC_KG = [3, 5, 8, 10, 12, 15, 20, 25, 30] as const;
const STANDARD_KG = [40, 50, 60, 70, 80, 90] as const;

interface WeightQuickChipsProps {
  value: string;
  onSelect: (kg: string) => void;
}

function ChipRow({
  title,
  values,
  selectedKg,
  onSelect,
  tone,
}: {
  title: string;
  values: readonly number[];
  selectedKg: number | null;
  onSelect: (kg: string) => void;
  tone: FreeQuickAccessTone;
}) {
  const { colors, fonts } = useAppTheme();

  return (
    <View style={styles.group}>
      <Typography
        variant="caption"
        style={{ color: tone.label, fontFamily: fonts.semiBold, letterSpacing: 0.4 }}>
        {title}
      </Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        keyboardShouldPersistTaps="handled">
        {values.map((kg) => {
          const selected = selectedKg === kg;
          return (
            <Pressable
              key={kg}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => {
                hapticLight();
                onSelect(String(kg));
              }}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? tone.icon : tone.gradient[0],
                  borderColor: selected ? tone.icon : tone.gradient[1],
                },
              ]}>
              <Typography
                variant="bodyMedium"
                color={selected ? contrastingInk(tone.icon) : tone.label}
                style={styles.chipLabel}>
                {`${kg} kg`}
              </Typography>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/** Atajos táctiles de peso — pediátrico y estándar (app free). */
export function WeightQuickChips({ value, onSelect }: WeightQuickChipsProps) {
  const { t } = useLocale();
  const parsed = Number.parseFloat(value.replace(',', '.'));
  const selectedKg = Number.isFinite(parsed) ? parsed : null;

  return (
    <View style={styles.wrap}>
      <ChipRow
        title={t('calculations.weightChipsPediatric')}
        values={PEDIATRIC_KG}
        selectedKg={selectedKg}
        onSelect={onSelect}
        tone={FREE_QUICK_ACCESS_TONES.pediatrico}
      />
      <ChipRow
        title={t('calculations.weightChipsStandard')}
        values={STANDARD_KG}
        selectedKg={selectedKg}
        onSelect={onSelect}
        tone={FREE_QUICK_ACCESS_TONES.adulto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  group: {
    gap: 4,
  },
  chipRow: {
    gap: 6,
    paddingVertical: 2,
  },
  chip: {
    minHeight: 34,
    minWidth: 48,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
