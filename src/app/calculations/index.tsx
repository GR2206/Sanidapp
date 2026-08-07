import { router, useLocalSearchParams, useNavigation, type Href } from 'expo-router';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CalculationDrugSelect } from '@/components/calculations/CalculationDrugSelect';
import { CalculationResultCard } from '@/components/calculations/CalculationResultCard';
import { CalculationSelect } from '@/components/calculations/CalculationSelect';
import { GoteoCalculationForm } from '@/components/calculations/GoteoCalculationForm';
import { RuleOfThreeTools } from '@/components/calculations/RuleOfThreeTools';
import { LiveDoseResultCard } from '@/components/calculations/LiveDoseResultCard';
import { GradientCalculateButton } from '@/components/calculations/GradientCalculateButton';
import { WeightQuickChips } from '@/components/calculations/WeightQuickChips';
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
import { radius, spacing } from '@/theme/spacing';
import { livelyCalcTabTone } from '@/theme/livelyUi';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { hapticLight } from '@/utils/haptics';
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
import {
  enrichSchemesWithMonographIndications,
  pickMonographDoseText,
} from '@/utils/doseIndicationHints';
import { LOCAL_DRUGS } from '@/services/content/drugLocalRegistry';

type CalculationResults = {
  doseLabel: string | null;
  doseRows: { dose: string; indication?: string }[];
  bsaValue: string;
  bmiValue: string | null;
};

type ActiveCalc = 'dose' | 'goteo' | 'regla';

export default function CalculationsScreen() {
  const navigation = useNavigation();
  const { tab: tabParam } = useLocalSearchParams<{ tab?: string }>();
  const { t, locale } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { isPremium } = usePremiumAccess();
  const { contentPaddingBottom } = useScreenInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const weightFieldRef = useRef<View>(null);
  const heightFieldRef = useRef<View>(null);
  const liveResults = true;

  const initialTab: ActiveCalc =
    tabParam === 'goteo' || tabParam === 'regla' ? tabParam : 'dose';
  const [activeCalc, setActiveCalc] = useState<ActiveCalc>(initialTab);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [drugOptions, setDrugOptions] = useState<CalculationDrugOption[]>([]);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightError, setWeightError] = useState<string | undefined>();
  const [drugId, setDrugId] = useState<string | null>(null);
  const [ettSize, setEttSize] = useState<string | null>(null);
  const [manualResults, setManualResults] = useState<CalculationResults | null>(null);
  const [manualRecommendedEtt, setManualRecommendedEtt] = useState<string | null>(null);

  const calcTabs = useMemo(
    () =>
      [
        { id: 'dose' as const, label: t('calculations.tabs.dose') },
        { id: 'goteo' as const, label: t('calculations.tabs.goteo') },
        { id: 'regla' as const, label: t('calculations.tabs.regla') },
      ] satisfies { id: ActiveCalc; label: string }[],
    [t],
  );

  useEffect(() => {
    if (tabParam === 'goteo' || tabParam === 'dose' || tabParam === 'regla') {
      setActiveCalc(tabParam);
    }
  }, [tabParam]);

  const liveComputed = useMemo(() => {
    const weightKg = parseWeightKg(weight);
    if (!weightKg) {
      return null;
    }

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
      const monographDose = pickMonographDoseText(LOCAL_DRUGS[selectedDrugId]);
      const schemes = enrichSchemesWithMonographIndications(drugParams.schemes, monographDose);
      doseRows = buildDoseResultRows(weightKg, schemes, (mg, hours) =>
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

    return {
      results: {
        doseLabel,
        doseRows,
        bsaValue: t('calculations.bsaUnit', { value: formatClinicalNumber(bsa, 3) }),
        bmiValue: bmi
          ? t('calculations.bmiUnit', { value: formatClinicalNumber(bmi, 1) })
          : null,
      } satisfies CalculationResults,
      recommendedEtt: `${formatEttSize(recommended)} mm`,
    };
  }, [drugId, drugOptions, height, t, weight]);

  const results = liveResults ? liveComputed?.results ?? null : manualResults;
  const recommendedEtt = liveResults
    ? liveComputed?.recommendedEtt ?? null
    : manualRecommendedEtt;

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

  useEffect(() => {
    if (!liveResults) return;
    const weightKg = parseWeightKg(weight);
    if (weight.trim() && !weightKg) {
      setWeightError(t('calculations.weightRequired'));
    } else {
      setWeightError(undefined);
    }
  }, [liveResults, t, weight]);

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
    if (!liveComputed) {
      setWeightError(t('calculations.weightRequired'));
      setManualResults(null);
      setManualRecommendedEtt(null);
      return;
    }

    setWeightError(undefined);
    if (!liveResults) {
      setManualResults(liveComputed.results);
      setManualRecommendedEtt(liveComputed.recommendedEtt);
    }
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
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              contentPaddingBottom +
              (activeCalc === 'goteo' || activeCalc === 'regla'
                ? spacing.xl + spacing.md
                : spacing.md),
          },
        ]}>
        <View style={styles.tabs}>
          {calcTabs.map((tab) => {
            const selected = tab.id === activeCalc;
            const tone = livelyCalcTabTone(tab.id);
            return (
              <Pressable
                key={tab.id}
                onPress={() => {
                  hapticLight();
                  setActiveCalc(tab.id);
                }}
                style={[
                  styles.tab,
                  {
                    borderColor: selected ? tone.icon : 'transparent',
                    backgroundColor: selected ? tone.gradient[0] : tone.gradient[1],
                    borderWidth: selected ? 1.5 : 0,
                  },
                ]}>
                <Typography
                  variant="caption"
                  color={tone.label}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  style={[styles.tabLabel, { fontFamily: fonts.semiBold }]}>
                  {tab.label}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        {activeCalc === 'goteo' ? (
          <GoteoCalculationForm />
        ) : activeCalc === 'regla' ? (
          <RuleOfThreeTools />
        ) : loadingOptions ? (
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
                compact
                style={
                  liveResults
                    ? {
                        borderColor: colors.border,
                        backgroundColor: '#FFFFFF',
                        color: colors.text,
                        fontFamily: fonts.regular,
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        minHeight: 44,
                        marginBottom: 10,
                        fontSize: 17,
                        borderRadius: 12,
                      }
                    : {
                        borderColor: colors.border,
                        backgroundColor: colors.backgroundSoft,
                        color: colors.text,
                        fontFamily: fonts.regular,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        minHeight: 32,
                        marginBottom: 6,
                        fontSize: 14,
                      }
                }
              />
              {liveResults ? (
                <WeightQuickChips
                  value={weight}
                  onSelect={(kg) => {
                    setWeight(kg);
                    setWeightError(undefined);
                  }}
                />
              ) : null}
            </View>

            <View ref={heightFieldRef} collapsable={false}>
              <TextField
                label={t('calculations.height')}
                value={height}
                onChangeText={setHeight}
                keyboardType="decimal-pad"
                placeholder={t('calculations.heightPlaceholder')}
                onFocus={() => focusField(heightFieldRef)}
                compact
                style={
                  liveResults
                    ? {
                        borderColor: colors.border,
                        backgroundColor: '#FFFFFF',
                        color: colors.text,
                        fontFamily: fonts.regular,
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        minHeight: 44,
                        marginBottom: 6,
                        fontSize: 17,
                        borderRadius: 12,
                      }
                    : {
                        borderColor: colors.border,
                        backgroundColor: colors.backgroundSoft,
                        color: colors.text,
                        fontFamily: fonts.regular,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        minHeight: 32,
                        marginBottom: 2,
                        fontSize: 14,
                      }
                }
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

            {liveResults ? (
              <GradientCalculateButton
                label={t('calculations.calculateDose')}
                onPress={handleCalculate}
              />
            ) : (
              <Button
                label={t('calculations.calculate')}
                accentColor={colors.button}
                onPress={handleCalculate}
                style={styles.calculateButton}
              />
            )}

            {liveResults && results?.doseLabel && results.doseRows.length > 0 ? (
              <LiveDoseResultCard label={results.doseLabel} rows={results.doseRows} />
            ) : null}
          </View>
        )}

        {activeCalc === 'dose' && results ? (
          <View style={styles.results}>
            {!liveResults && results.doseLabel && results.doseRows.length > 0 ? (
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
                style={[
                  styles.sectionTitle,
                  {
                    color: FREE_QUICK_ACCESS_TONES.pediatrico.label,
                    fontFamily: fonts.semiBold,
                  },
                ]}>
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
    gap: spacing.md,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  tabLabel: {
    letterSpacing: 0,
    textAlign: 'center',
    width: '100%',
    fontSize: 13,
  },
  premiumWrap: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  loader: {
    marginVertical: spacing.md,
  },
  form: {
    gap: spacing.sm,
  },
  heightHint: {
    marginBottom: spacing.xs,
    fontSize: 11,
  },
  calculateButton: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
  },
  results: {
    gap: spacing.sm,
    marginTop: spacing.xs,
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
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  rowItem: {
    flex: 1,
  },
});
