import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import {
  DrugBibliographySection,
  DrugHeader,
  DrugLabeledSection,
} from '@/components/pharmacology/DrugDetailSections';
import { DrugPreparationSection } from '@/components/pharmacology/DrugPreparationSection';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { FavoriteToggleButton } from '@/components/ui/FavoriteToggleButton';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { useRecordContentView } from '@/hooks/useRecordContentView';
import { loadDrug } from '@/services/content/drugService';
import { isDrugTranslated } from '@/services/content/drugLocaleMerge';
import type { Drug } from '@/types/drug';
import { spacing } from '@/theme/spacing';

export default function DrugScreen() {
  const { drugId } = useLocalSearchParams<{ drugId: string }>();
  const navigation = useNavigation();
  const { contentPaddingBottom } = useScreenInsets();
  const { colors } = useAppTheme();
  const { locale, t } = useLocale();
  const { canAccessDrug } = usePremiumAccess();
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!drugId) return;

    setLoading(true);
    loadDrug(drugId, locale)
      .then(setDrug)
      .finally(() => setLoading(false));
  }, [drugId, locale]);

  useLayoutEffect(() => {
    if (!drug) return;

    navigation.setOptions({
      title: t('drug.screenTitle'),
      headerRight: () => (
        <FavoriteToggleButton
          color={colors.header}
          item={{
            id: drug.id,
            type: 'drug',
            title: drug.name,
            subtitle: t('content.pharmacology'),
          }}
        />
      ),
    });
  }, [colors.header, drug, navigation, t]);

  useRecordContentView(
    drug
      ? {
          id: drug.id,
          type: 'drug',
          title: drug.name,
          subtitle: t('content.pharmacology'),
        }
      : null,
  );

  if (loading) {
    return (
      <ScreenContainer centered>
        <ActivityIndicator color={colors.button} />
      </ScreenContainer>
    );
  }

  if (!drug) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('drug.notFound')}</Typography>
      </ScreenContainer>
    );
  }

  if (!drugId || !canAccessDrug(drugId)) {
    return (
      <ScreenContainer safe edges={['left', 'right']} style={styles.root}>
        <PremiumUpgradePanel sectionLabel={t('content.pharmacology')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: contentPaddingBottom }]}
        showsVerticalScrollIndicator={false}>
        <DrugHeader name={drug.name} />
        {locale !== 'es' && drugId && !isDrugTranslated(drugId, locale) ? (
          <Typography variant="caption" color={colors.textSecondary} style={styles.note}>
            {t('content.spanishOnlyNote')}
          </Typography>
        ) : null}

        <DrugLabeledSection label={t('drug.indication')} content={drug.indications} />

        <DrugLabeledSection label={t('drug.preparation')}>
          <DrugPreparationSection dilution={drug.dilution} />
        </DrugLabeledSection>

        <DrugLabeledSection label={t('drug.stability')} content={drug.stability} />
        <DrugLabeledSection label={t('drug.adverseEffects')} content={drug.adverseEffects} />

        <DrugBibliographySection entries={drug.bibliography} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    gap: spacing.lg,
    width: '100%',
    alignSelf: 'stretch',
  },
  note: {
    textAlign: 'center',
  },
});
