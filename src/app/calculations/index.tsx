import { router, useNavigation, type Href } from 'expo-router';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { CalculationDrugSelect } from '@/components/calculations/CalculationDrugSelect';
import { CalculationResultCard } from '@/components/calculations/CalculationResultCard';
import { CalculationSelect } from '@/components/calculations/CalculationSelect';
import {
  KeyboardAwareScrollScreen,
  scrollAuthFieldIntoView,
} from '@/components/layout/KeyboardAwareScrollScreen';
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
  calculateBodyMassIndex,
  calculateBodySurfaceAreaM2,
  calculateEttDepthCm,
  ETT_SIZES_MM,
  formatClinicalNumber,
  formatEttSize,
  parseHeightCm,
  parseWeightKg,
  recommendEttSizeByWeightKg,
} from '@/utils/clinicalCalculations';

type CalculationResults = {
  doseLabel: string | null;
  doseRows: { dose: string; indication?: string }[];
  bsaValue: string;
  bmiValue: string | null;
};

export default function CalculationsScreen() {
  const navigation = useNavigation();
  const { t, locale } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { isPremium } = usePremiumAccess();
  const { contentPaddingBottom } = useScreenInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const weightFieldRef = useRef<View>(null);
  const heightFieldRef = useRef<View>(null);

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [drugOptions, setDrugOptions] = useState<CalculationDrugOption[]>([]);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightError, setWeightError] = useState<string | undefined>();
  const [drugId, setDrugId] = useState<string | null>(null);
  const [ettSize, setEttSize] = useState<string | null>(null);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [recommendedEtt, setRecommendedEtt] = useState<string | null>(null);

  const displayedEttDepth = useMemo(() => {
    if (!recommendedEtt || !ettSize) return null;
    const selectedEtt = Number.parseFloat(ettSize);
    if (!Number.isFinite(selectedEtt)) return null;
    return t('calculations.ettDepthValue', {
      value: formatClinicalNumber(calculateEttDepthCm(selectedEtt), 1),
    });
  }, [ettSize, recommendedEtt, t]);

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

  function focusField(fieldRef: RefObject<View | null>) {
    scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRef, spacing.xl);
  }

  function handleOpenDrugMonograph(selectedDrugId: string) {
    router.push(ROUTES.drug(selectedDrugId) as Href);
  }

  function handleCalculate() {
    const weightKg = parseWeightKg(weight);
    if (!weightKg) {
      setWeightError(t('calculations.weightRequired'));
      setResults(null);
      setRecommendedEtt(null);
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

    const bsa = calculateBodySurfaceAreaM2(weightKg);
    const heightCm = parseHeightCm(height);
    const bmi = heightCm ? calculateBodyMassIndex(weightKg, heightCm) : null;
    const recommended = recommendEttSizeByWeightKg(weightKg);

    setRecommendedEtt(`${formatEttSize(recommended)} mm`);
    setResults({
      doseLabel,
      doseRows,
      bsaValue: t('calculations.bsaUnit', { value: formatClinicalNumber(bsa, 3) }),
      bmiValue: bmi
        ? t('calculations.bmiUnit', { value: formatClinicalNumber(bmi, 1) })
        : null,
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
        scrollRef={scrollRef}
        scrollYRef={scrollYRef}
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom }]}>
        {loadingOptions ? (
          <ActivityIndicator color={colors.button} style={styles.loader} />
        ) : (
          <View style={styles.form}>
            <View ref={weightFieldRef} collapsable={false}>
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
                onFocus={() => focusField(weightFieldRef)}
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.backgroundSoft,
                  color: colors.text,
                  fontFamily: fonts.regular,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  minHeight: 32,
                  marginBottom: 6,
                  fontSize: 14,
                }}
              />
            </View>

            <View ref={heightFieldRef} collapsable={false}>
              <TextField
                label={t('calculations.height')}
                value={height}
                onChangeText={setHeight}
                keyboardType="decimal-pad"
                placeholder={t('calculations.heightPlaceholder')}
                onFocus={() => focusField(heightFieldRef)}
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.backgroundSoft,
                  color: colors.text,
                  fontFamily: fonts.regular,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  minHeight: 32,
                  marginBottom: 2,
                  fontSize: 14,
                }}
              />
              <Typography variant="caption" color={colors.textMuted} style={styles.heightHint}>
                {t('calculations.heightHint')}
              </Typography>
            </View>

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

            <CalculationResultCard label={t('calculations.bsa')} value={results.bsaValue} />

            <CalculationResultCard
              label={t('calculations.bmi')}
              value={results.bmiValue ?? t('calculations.bmiNeedsHeight')}
            />

            <View style={styles.criticalSection}>
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
                    value={recommendedEtt ?? '—'}
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
    gap: spacing.sm,
  },
  premiumWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  loader: {
    marginVertical: spacing.md,
  },
  form: {
    gap: spacing.xs,
  },
  heightHint: {
    marginBottom: spacing.xs,
  },
  calculateButton: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
  },
  results: {
    gap: Math.round(spacing.sm * 1.3),
  },
  criticalSection: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: spacing.xs,
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
