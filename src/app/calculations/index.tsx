import { router, useNavigation, type Href } from 'expo-router';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { CalculationDrugSelect } from '@/components/calculations/CalculationDrugSelect';
import { CalculationResultCard } from '@/components/calculations/CalculationResultCard';
import { CalculationSelect } from '@/components/calculations/CalculationSelect';
import { KeyboardAwareScrollScreen } from '@/components/layout/KeyboardAwareScrollScreen';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { DRUG_CALCULATION_PARAMS } from '@/constants/calculations/drugCalculationParams';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import {
  loadCalculationDrugOptions,
  type CalculationDrugOption,
} from '@/services/calculations/calculationDrugOptions';
import { spacing } from '@/theme/spacing';
import {
  buildDoseResultRows,
  calculateEttDepthCm,
  calculatePediatricBmiIndex,
  ETT_SIZES_MM,
  formatClinicalNumber,
  formatEttSize,
  parseWeightKg,
  recommendEttSizeByWeightKg,
} from '@/utils/clinicalCalculations';

type CalculationResults = {
  doseLabel: string | null;
  doseRows: { dose: string; indication?: string }[];
  bmiValue: string;
  recommendedEtt: string;
};

export default function CalculationsScreen() {
  const navigation = useNavigation();
  const { t, locale } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { isPremium } = usePremiumAccess();
  const { contentPaddingBottom } = useScreenInsets();

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [drugOptions, setDrugOptions] = useState<CalculationDrugOption[]>([]);

  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState<string | undefined>();
  const [drugId, setDrugId] = useState<string | null>(null);
  const [ettSize, setEttSize] = useState<string | null>(null);
  const [results, setResults] = useState<CalculationResults | null>(null);

  const displayedEttDepth = useMemo(() => {
    if (!results || !ettSize) return null;
    const selectedEtt = Number.parseFloat(ettSize);
    if (!Number.isFinite(selectedEtt)) return null;
    return t('calculations.ettDepthValue', {
      value: formatClinicalNumber(calculateEttDepthCm(selectedEtt), 1),
    });
  }, [ettSize, results, t]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('calculations.title'),
    });
  }, [navigation, t]);

  useEffect(() => {
    let active = true;
    setLoadingOptions(true);

    loadCalculationDrugOptions(locale)
      .then((options) => {
        if (active) {
          setDrugOptions(options);
        }
      })
      .finally(() => {
        if (active) {
          setLoadingOptions(false);
        }
      });

    return () => {
      active = false;
    };
  }, [locale]);

  const ettOptions = useMemo(
    () =>
      ETT_SIZES_MM.map((size) => ({
        value: String(size),
        label: `${formatEttSize(size)} mm`,
      })),
    [],
  );

  function handleOpenDrugMonograph(selectedDrugId: string) {
    router.push(ROUTES.drug(selectedDrugId) as Href);
  }

  function handleCalculate() {
    const weightKg = parseWeightKg(weight);
    if (!weightKg) {
      setWeightError(t('calculations.weightRequired'));
      setResults(null);
      return;
    }

    setWeightError(undefined);

    const selectedDrugId = drugId;
    const drugParams = selectedDrugId ? DRUG_CALCULATION_PARAMS[selectedDrugId] : null;
    const selectedDrugName =
      drugOptions.find((item) => item.id === selectedDrugId)?.label ?? null;

    let doseLabel: string | null = null;
    let doseRows: { dose: string; indication?: string }[] = [];

    if (selectedDrugId && drugParams?.schemes?.length) {
      doseLabel = selectedDrugName
        ? t('calculations.doseForDrug', { drug: selectedDrugName })
        : t('calculations.dose');
      doseRows = buildDoseResultRows(weightKg, drugParams.schemes, (mg, hours) =>
        t('calculations.doseValue', {
          value: formatClinicalNumber(mg),
          hours,
        }),
      );
    } else if (selectedDrugId) {
      doseLabel = selectedDrugName
        ? t('calculations.doseForDrug', { drug: selectedDrugName })
        : t('calculations.dose');
      doseRows = [{ dose: t('calculations.doseUnavailable') }];
    }

    const bmi = calculatePediatricBmiIndex(weightKg);
    const recommended = recommendEttSizeByWeightKg(weightKg);

    setResults({
      doseLabel,
      doseRows,
      bmiValue: formatClinicalNumber(bmi, 3),
      recommendedEtt: `${formatEttSize(recommended)} mm`,
    });
  }

  if (!isPremium) {
    return (
      <ScreenContainer>
        <View style={[styles.premiumWrap, { paddingBottom: contentPaddingBottom }]}>
          <PremiumUpgradePanel sectionLabel={t('calculations.title')} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <KeyboardAwareScrollScreen
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom }]}>
        <Typography
          variant="body"
          color={colors.textMuted}
          style={[styles.intro, { fontFamily: fonts.regular }]}>
          {t('calculations.intro')}
        </Typography>

        {loadingOptions ? (
          <ActivityIndicator color={colors.button} style={styles.loader} />
        ) : (
          <View style={styles.form}>
            <TextField
              label={t('calculations.weight')}
              value={weight}
              onChangeText={(value) => {
                setWeight(value);
                if (weightError) setWeightError(undefined);
              }}
              keyboardType="decimal-pad"
              placeholder={t('calculations.weightPlaceholder')}
              error={weightError}
              style={{
                borderColor: colors.border,
                backgroundColor: colors.backgroundSoft,
                color: colors.text,
                fontFamily: fonts.regular,
                paddingVertical: 8,
                paddingHorizontal: 12,
                minHeight: 40,
              }}
            />

            <CalculationDrugSelect
              label={t('calculations.drug')}
              value={drugId}
              options={drugOptions.map((item) => ({
                value: item.id,
                label: item.label,
              }))}
              onChange={setDrugId}
              placeholder={t('calculations.selectDrug')}
              onOpenMonograph={handleOpenDrugMonograph}
            />

            <Button
              label={t('calculations.calculate')}
              accentColor={colors.button}
              onPress={handleCalculate}
              style={styles.calculateButton}
            />
          </View>
        )}

        {results ? (
          <View style={styles.results}>
            {results.doseLabel && results.doseRows.length > 0 ? (
              <CalculationResultCard label={results.doseLabel} rows={results.doseRows} />
            ) : null}

            <CalculationResultCard label={t('calculations.bmi')} value={results.bmiValue} />

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <Typography
              variant="subtitle"
              style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.semiBold }]}>
              {t('calculations.criticalArea')}
            </Typography>

            <CalculationSelect
              label={t('calculations.ett')}
              value={ettSize}
              options={ettOptions}
              onChange={setEttSize}
              placeholder={t('calculations.selectEtt')}
              allowClear
            />

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <CalculationResultCard
                  label={t('calculations.recommendedEtt')}
                  value={results.recommendedEtt}
                />
              </View>
              {displayedEttDepth ? (
                <View style={styles.rowItem}>
                  <CalculationResultCard
                    label={t('calculations.ettDepth')}
                    value={displayedEttDepth}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </KeyboardAwareScrollScreen>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  premiumWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  intro: {
    lineHeight: 20,
  },
  loader: {
    marginVertical: spacing.md,
  },
  form: {
    gap: spacing.sm,
  },
  calculateButton: {
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },
  results: {
    gap: spacing.sm,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.xs,
  },
  sectionTitle: {
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  rowItem: {
    flex: 1,
  },
});
