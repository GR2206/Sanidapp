import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';

export type CalculationResultRow = {
  dose: string;
  indication?: string;
};

interface CalculationResultCardProps {
  label: string;
  value?: string;
  lines?: string[];
  /** Lista dosis | tratamiento (alineada en columnas). */
  rows?: CalculationResultRow[];
}

export function CalculationResultCard({
  label,
  value,
  lines,
  rows,
}: CalculationResultCardProps) {
  const { colors } = useAppTheme();
  const simpleLines = lines?.length ? lines : value ? [value] : [];
  const hasStructuredRows = Boolean(rows?.length);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
      ]}>
      <Typography variant="caption" color={colors.textMuted} style={styles.label}>
        {label}
      </Typography>

      {hasStructuredRows
        ? rows!.map((row, index) => (
            <View
              key={`${row.dose}-${row.indication ?? index}`}
              style={[
                styles.row,
                index < rows!.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.border,
                },
              ]}>
              <Typography
                variant="bodyMedium"
                style={[styles.doseCol, { color: colors.text }]}
                numberOfLines={2}>
                {row.dose}
              </Typography>
              {row.indication ? (
                <Typography
                  variant="caption"
                  style={[styles.indicationCol, { color: colors.textSecondary }]}
                  numberOfLines={3}>
                  {row.indication}
                </Typography>
              ) : null}
            </View>
          ))
        : simpleLines.map((line) => (
            <Typography key={line} variant="bodyMedium" style={{ color: colors.text }}>
              {line}
            </Typography>
          ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 4,
    gap: 1,
  },
  label: {
    marginBottom: 1,
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    paddingVertical: 2,
  },
  doseCol: {
    flex: 0.42,
    minWidth: 80,
    fontSize: 13,
  },
  indicationCol: {
    flex: 0.58,
    lineHeight: 14,
    fontSize: 11,
  },
});
