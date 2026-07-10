import { BracketTabRow } from '@/components/pharmacology/BracketButton';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import {
  DRUG_POPULATIONS,
  type DrugDilution,
  type DrugDilutionProfile,
  type DrugPopulation,
} from '@/types/drug';
import { palette } from '@/theme/colors';
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
  const fields = FIELD_KEYS.filter((key) => profile[key]?.trim());

  if (fields.length === 0) {
    return (
      <Typography variant="caption" color={palette.textSecondary}>
        {emptyLabel}
      </Typography>
    );
  }

  return (
    <View style={styles.rows}>
      {fields.map((key) => (
        <View key={key} style={styles.row}>
          <Typography variant="caption" color={palette.textMuted} style={styles.rowLabel}>
            {fieldLabel(key)}
          </Typography>
          <Typography variant="caption" style={styles.rowValue}>
            {profile[key]}
          </Typography>
        </View>
      ))}
    </View>
  );
}

export function DrugPreparationSection({ dilution }: DrugPreparationSectionProps) {
  const { t } = useLocale();
  const profiles = useMemo(
    () => DRUG_POPULATIONS.filter((population) => dilution[population]),
    [dilution],
  );
  const [active, setActive] = useState<DrugPopulation>(profiles[0] ?? 'adulto');

  const fieldLabel = (key: (typeof FIELD_KEYS)[number]) => t(`drug.field.${key}`);

  if (profiles.length === 0) {
    return (
      <Typography variant="caption" color={palette.textSecondary}>
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
    paddingTop: spacing.xs,
  },
  rows: {
    gap: spacing.md,
    paddingLeft: spacing.xs,
    borderLeftWidth: 2,
    borderLeftColor: palette.border,
    paddingVertical: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  rowLabel: {
    width: 108,
    flexShrink: 0,
    fontSize: 11,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  rowValue: {
    flex: 1,
    color: palette.text,
    lineHeight: 20,
  },
});
