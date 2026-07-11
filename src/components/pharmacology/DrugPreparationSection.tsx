import { BracketTabRow } from '@/components/pharmacology/BracketButton';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import {
  DRUG_POPULATIONS,
  type DrugDilution,
  type DrugDilutionProfile,
  type DrugPopulation,
} from '@/types/drug';
import { spacing } from '@/theme/spacing';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface DrugPreparationSectionProps {
  dilution: DrugDilution;
}

const FIELD_KEYS = [
  'presentation',
  'reconstitution',
  'diluent',
  'finalConcentration',
  'dose',
  'infusionRate',
  'administration',
  'compatibility',
  'notes',
] as const;

function PreparationRows({
  profile,
  fieldLabel,
  emptyLabel,
}: {
  profile: DrugDilutionProfile;
  fieldLabel: (key: (typeof FIELD_KEYS)[number]) => string;
  emptyLabel: string;
}) {
  const { colors } = useAppTheme();
  const fields = FIELD_KEYS.filter((key) => profile[key]?.trim());

  if (fields.length === 0) {
    return (
      <Typography variant="caption" color={colors.textSecondary}>
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <View style={styles.rows}>
      {fields.map((key, index) => (
        <View
          key={key}
          style={[
            styles.row,
            index < fields.length - 1 && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
              paddingBottom: spacing.sm,
            },
          ]}>
          <Typography
            variant="caption"
            color={colors.textMuted}
            style={styles.rowLabel}>
            {fieldLabel(key)}
          </Typography>
          <Typography variant="body" style={[styles.rowValue, { color: colors.text }]}>
            {profile[key]}
          </Typography>
        </View>
      ))}
    </View>
  );
}

export function DrugPreparationSection({ dilution }: DrugPreparationSectionProps) {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const profiles = useMemo(
    () => DRUG_POPULATIONS.filter((population) => dilution[population]),
    [dilution],
  );
  const [active, setActive] = useState<DrugPopulation>(profiles[0] ?? 'adulto');

  const fieldLabel = (key: (typeof FIELD_KEYS)[number]) => t(`drug.field.${key}`);

  if (profiles.length === 0) {
    return (
      <Typography variant="caption" color={colors.textSecondary}>
        {t('drug.noPreparationData')}
      </Typography>
    );
  }

  const activeProfile = dilution[active];
  const tabItems = profiles.map((population) => ({
    id: population,
    label: t(`drug.population.${population}`),
  }));

  return (
    <View style={styles.wrap}>
      <BracketTabRow items={tabItems} activeId={active} onSelect={(id) => setActive(id as DrugPopulation)} />
      {activeProfile ? (
        <PreparationRows
          profile={activeProfile}
          fieldLabel={fieldLabel}
          emptyLabel={t('drug.noDataForPopulation')}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    width: '100%',
    alignSelf: 'stretch',
  },
  rows: {
    gap: spacing.sm,
    width: '100%',
  },
  row: {
    width: '100%',
    gap: spacing.xs,
  },
  rowLabel: {
    fontSize: 11,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  rowValue: {
    lineHeight: 22,
    fontSize: 14,
  },
});
