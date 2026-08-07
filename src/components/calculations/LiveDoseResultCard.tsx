import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { spacing } from '@/theme/spacing';
import type { CalculationResultRow } from '@/components/calculations/CalculationResultCard';

interface LiveDoseResultCardProps {
  label: string;
  rows: CalculationResultRow[];
}

/** "12 mg · c/8 hs" | "12 mg · q8h" | "12 mg · a cada 8 h" → headline clara */
function formatDoseHeadline(dose: string): string {
  return dose
    .replace(/\s*·\s*c\/(\d+)\s*hs/gi, ' / cada $1 hs')
    .replace(/\s*·\s*q(\d+)\s*h/gi, ' / every $1 h')
    .replace(/\s*·\s*a cada\s*(\d+)\s*h/gi, ' / a cada $1 h')
    .replace(/\s*·\s*/g, ' / ');
}

/**
 * Tarjeta flotante de resultado en vivo (app free / Sanidapp).
 * Verde de seguridad + tipografía grande.
 */
export function LiveDoseResultCard({ label, rows }: LiveDoseResultCardProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Typography variant="caption" style={styles.kicker} numberOfLines={1}>
          {label}
        </Typography>
        {rows.map((row, index) => (
          <View
            key={`${row.dose}-${row.indication ?? index}`}
            style={[styles.block, index < rows.length - 1 && styles.blockDivider]}>
            <Typography style={styles.dose} accessibilityRole="text">
              {formatDoseHeadline(row.dose)}
            </Typography>
            {row.indication ? (
              <Typography variant="caption" style={styles.indication} numberOfLines={3}>
                {row.indication}
              </Typography>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: '#059669',
    borderRadius: 17,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.sm + 2,
    gap: spacing.xs,
    shadowColor: '#047857',
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  kicker: {
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: 0.4,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  block: {
    gap: 3,
  },
  blockDivider: {
    paddingBottom: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.28)',
  },
  dose: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  indication: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    lineHeight: 15,
  },
});
