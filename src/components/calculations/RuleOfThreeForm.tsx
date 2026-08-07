import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GradientCalculateButton } from '@/components/calculations/GradientCalculateButton';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import {
  calculateRuleOfThree,
  formatClinicalNumber,
  parsePositiveNumber,
} from '@/utils/clinicalCalculations';

/**
 * Regla de 3: (A × B) / C = X
 * Layout: [A] × [B] / [C] → Calcular | resultado
 */
export function RuleOfThreeForm() {
  const { t } = useLocale();
  const { colors, fonts, isDashboardDark } = useAppTheme();
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const card = freeElevatedCardStyle(!isDashboardDark);

  const fieldStyle = {
    borderColor: colors.border,
    backgroundColor: isDashboardDark ? colors.backgroundSoft : '#FFFFFF',
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 44,
    marginBottom: 0,
    fontSize: 17,
    borderRadius: 12,
    textAlign: 'center' as const,
  };

  function handleCalculate() {
    const aN = parsePositiveNumber(a);
    const bN = parsePositiveNumber(b);
    const cN = parsePositiveNumber(c);
    if (aN == null || bN == null || cN == null) {
      setResult(null);
      return;
    }
    // X = (A × B) / C  — visual del cajón × cajón sobre cajón
    const x = calculateRuleOfThree(cN, aN, bN);
    if (x == null) {
      setResult(null);
      return;
    }
    setResult(formatClinicalNumber(x, 4));
  }

  return (
    <View
      style={[
        styles.card,
        card ?? {
          backgroundColor: colors.backgroundSoft,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}>
      <View style={styles.topRow}>
        <View style={styles.fieldSlot}>
          <TextField label="" value={a} onChangeText={setA} keyboardType="decimal-pad" compact style={fieldStyle} />
        </View>
        <Typography style={[styles.op, { color: colors.text, fontFamily: fonts.semiBold }]}>×</Typography>
        <View style={styles.fieldSlot}>
          <TextField label="" value={b} onChangeText={setB} keyboardType="decimal-pad" compact style={fieldStyle} />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.text }]} />

      <View style={styles.bottomField}>
        <TextField label="" value={c} onChangeText={setC} keyboardType="decimal-pad" compact style={fieldStyle} />
      </View>

      <View style={styles.actionRow}>
        <GradientCalculateButton
          label={t('calculations.calculate')}
          onPress={handleCalculate}
          style={styles.calcButton}
        />
        <View
          style={[
            styles.resultBox,
            {
              backgroundColor: isDashboardDark ? colors.menuBackground : '#FFFFFF',
              borderColor: colors.border,
            },
          ]}>
          <Typography
            style={{
              color: colors.text,
              fontFamily: fonts.semiBold,
              fontSize: 20,
              textAlign: 'center',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {result ?? '—'}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fieldSlot: {
    flex: 1,
  },
  op: {
    fontSize: 22,
    lineHeight: 28,
    paddingBottom: 2,
  },
  divider: {
    height: 2,
    width: '100%',
    borderRadius: 1,
    marginVertical: 2,
  },
  bottomField: {
    alignSelf: 'center',
    width: '48%',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  calcButton: {
    flex: 1,
    marginTop: 0,
  },
  resultBox: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
});
