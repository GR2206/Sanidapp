import { StyleSheet, View } from 'react-native';

import { BasicCalculator } from '@/components/calculations/BasicCalculator';
import { RuleOfThreeForm } from '@/components/calculations/RuleOfThreeForm';
import { spacing } from '@/theme/spacing';

/** Solapa: regla de 3 simple + calculadora básica. */
export function RuleOfThreeTools() {
  return (
    <View style={styles.wrap}>
      <RuleOfThreeForm />
      <BasicCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
});
