import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import {
  filterSanatoriosByRegion,
  listLocalRegions,
  type SanatorioRegionOption,
} from '@/services/sanatorios/localSanatorioCatalog';
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
  /** Oculta la leyenda de región (p. ej. en Ajustes). */
  hideRegionHint?: boolean;
}

type PickerKind = 'region' | 'sanatorio' | null;

export function SanatorioSelect({
  label,
  sanatorios,
  value,
  onChange,
  placeholder,
  hideRegionHint = false,
}: SanatorioSelectProps) {
  const { t } = useLocale();
  const resolvedLabel = label ?? t('auth.fields.sanatorio');
  const resolvedPlaceholder = placeholder ?? t('auth.fields.sanatorioPlaceholder');
  const regionLabel = t('auth.fields.region');
  const regionPlaceholder = t('auth.fields.regionPlaceholder');

  const regions = useMemo(() => listLocalRegions(), []);
  const selected = useMemo(
    () => sanatorios.find((item) => item.id === value) ?? null,
    [sanatorios, value],
  );

  const [regionId, setRegionId] = useState<string | null>(selected?.regionId ?? null);
  const [open, setOpen] = useState<PickerKind>(null);

  useEffect(() => {
    if (selected?.regionId) {
      setRegionId(selected.regionId);
    }
  }, [selected?.regionId]);

  const selectedRegion: SanatorioRegionOption | null = useMemo(() => {
    if (!regionId) return null;
    return regions.find((item) => item.regionId === regionId) ?? null;
  }, [regionId, regions]);

  const regionSanatorios = useMemo(
    () => filterSanatoriosByRegion(sanatorios, regionId),
    [regionId, sanatorios],
  );

  function resolveRegionTitle(option: SanatorioRegionOption) {
    const key = `sanatorios.regions.${option.regionId}`;
    const translated = t(key);
    return translated === key ? option.regionLabel : translated;
  }

  function handleSelectRegion(nextRegionId: string) {
    hapticLight();
    setRegionId(nextRegionId);
    if (value) {
      const stillValid = sanatorios.some(
        (item) => item.id === value && item.regionId === nextRegionId,
      );
      if (!stillValid) {
        onChange('');
      }
    }
    setOpen(null);
  }

  function handleSelectSanatorio(sanatorioId: string) {
    hapticLight();
    onChange(sanatorioId);
    setOpen(null);
  }

  return (
    <View style={styles.wrap}>
      <Typography variant="label" style={styles.label}>
        {regionLabel}
      </Typography>
      <Pressable
        onPress={() => {
          hapticLight();
          setOpen('region');
        }}
        style={styles.trigger}>
        <Typography
          variant="bodyMedium"
          style={[styles.triggerText, !selectedRegion && styles.placeholder]}
          numberOfLines={2}>
          {selectedRegion ? resolveRegionTitle(selectedRegion) : regionPlaceholder}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={22} color={palette.textMuted} />
      </Pressable>

      <Typography variant="label" style={[styles.label, styles.sanatorioLabel]}>
        {resolvedLabel}
      </Typography>
      <Pressable
        disabled={!regionId}
        onPress={() => {
          if (!regionId) return;
          hapticLight();
          setOpen('sanatorio');
        }}
        style={[styles.trigger, !regionId && styles.triggerDisabled]}>
        <Typography
          variant="bodyMedium"
          style={[
            styles.triggerText,
            (!selected || !regionId) && styles.placeholder,
          ]}
          numberOfLines={2}>
          {!regionId
            ? t('auth.fields.sanatorioNeedsRegion')
            : (selected?.name ?? resolvedPlaceholder)}
        </Typography>
        <MaterialCommunityIcons name="chevron-down" size={22} color={palette.textMuted} />
      </Pressable>

      {!hideRegionHint && !regionId ? (
        <Typography variant="caption" style={styles.hint}>
          {t('auth.fields.regionHint')}
        </Typography>
      ) : null}

      {regionId && regionSanatorios.length === 0 ? (
        <Typography variant="caption" style={styles.hint}>
          {t('auth.fields.regionEmptyContact')}
        </Typography>
      ) : null}

      <Modal
        visible={open != null}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(null)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(null)}>
          <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
            <Typography variant="bodyMedium" style={styles.sheetTitle}>
              {open === 'region' ? regionLabel : resolvedLabel}
            </Typography>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {open === 'region'
                ? regions.map((option) => {
                    const isSelected = option.regionId === regionId;
                    return (
                      <Pressable
                        key={option.regionId}
                        onPress={() => handleSelectRegion(option.regionId)}
                        style={[styles.option, isSelected && styles.optionSelected]}>
                        <Typography
                          variant="bodyMedium"
                          style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                          {resolveRegionTitle(option)}
                        </Typography>
                        <Typography variant="caption" style={styles.cityText}>
                          {t('auth.fields.regionHospitalCount', { count: option.count })}
                        </Typography>
                      </Pressable>
                    );
                  })
                : regionSanatorios.map((item) => {
                    const isSelected = item.id === value;
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => handleSelectSanatorio(item.id)}
                        style={[styles.option, isSelected && styles.optionSelected]}>
                        <Typography
                          variant="bodyMedium"
                          style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                          {item.name}
                        </Typography>
                        {item.city ? (
                          <Typography variant="caption" style={styles.cityText}>
                            {item.city}
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
    marginBottom: spacing.md,
  },
  label: {
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  sanatorioLabel: {
    marginTop: spacing.sm,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  triggerDisabled: {
    opacity: 0.55,
  },
  triggerText: {
    flex: 1,
    color: palette.text,
  },
  placeholder: {
    color: palette.textMuted,
  },
  hint: {
    color: palette.textMuted,
    marginTop: 2,
  },
  emptyLink: {
    color: palette.accent,
    marginTop: spacing.xs,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    maxHeight: '70%',
    backgroundColor: palette.surface,
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
  cityText: {
    color: palette.textMuted,
  },
});
