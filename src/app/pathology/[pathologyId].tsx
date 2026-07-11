import { router, useLocalSearchParams, useNavigation, type Href } from 'expo-router';

import { useEffect, useLayoutEffect, useState } from 'react';

import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';



import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import {
  PathologyBibliographySection,
  PathologyBody,
  PathologyClinicalBoxSection,
  PathologyDivider,
  PathologyHeader,
  PathologyRelatedDrugsSection,
} from '@/components/pathology/PathologyDetailSections';
import { FavoriteToggleButton } from '@/components/ui/FavoriteToggleButton';

import { Typography } from '@/components/ui/Typography';

import { ROUTES } from '@/constants/routes';

import { useLocale } from '@/contexts/LocaleContext';

import { useAppTheme } from '@/hooks/useAppTheme';

import { usePremiumAccess } from '@/hooks/usePremiumAccess';

import { useScreenInsets } from '@/hooks/useScreenInsets';

import { useRecordContentView } from '@/hooks/useRecordContentView';

import { loadPathology } from '@/services/content/pathologyService';
import { isPathologyTranslated } from '@/services/content/pathologyLocaleMerge';

import type { Pathology, PathologyClinicalBox } from '@/types/pathology';

import { spacing } from '@/theme/spacing';



function resolveClinicalBoxes(pathology: Pathology): PathologyClinicalBox[] {

  if (pathology.clinicalBoxes && pathology.clinicalBoxes.length > 0) {

    return pathology.clinicalBoxes;

  }

  if (pathology.clinicalBox) {

    return [pathology.clinicalBox];

  }

  return [];

}



export default function PathologyScreen() {

  const { pathologyId } = useLocalSearchParams<{ pathologyId: string }>();

  const navigation = useNavigation();

  const { contentPaddingBottom } = useScreenInsets();

  const { colors } = useAppTheme();

  const { locale, t } = useLocale();

  const { canAccessPathology } = usePremiumAccess();

  const [pathology, setPathology] = useState<Pathology | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if (!pathologyId) return;



    setLoading(true);

    loadPathology(pathologyId, locale)

      .then(setPathology)

      .finally(() => setLoading(false));

  }, [pathologyId, locale]);



  useLayoutEffect(() => {

    if (!pathology) return;



    navigation.setOptions({

      title: t('pathology.screenTitle'),

      headerRight: () => (

        <FavoriteToggleButton

          color={colors.header}

          item={{

            id: pathology.id,

            type: 'pathology',

            title: pathology.name,

            subtitle: t('content.pathology'),

          }}

        />

      ),

    });

  }, [colors.header, navigation, pathology, t]);



  useRecordContentView(

    pathology

      ? {

          id: pathology.id,

          type: 'pathology',

          title: pathology.name,

          subtitle: t('content.pathology'),

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



  if (!pathology) {

    return (

      <ScreenContainer centered>

        <Typography variant="body">{t('pathology.notFound')}</Typography>

      </ScreenContainer>

    );

  }



  if (!pathologyId || !canAccessPathology(pathologyId)) {

    return (

      <ScreenContainer safe edges={['left', 'right']} style={styles.root}>

        <PremiumUpgradePanel sectionLabel={t('pathology.screenTitle')} />

      </ScreenContainer>

    );

  }



  const clinicalBoxes = resolveClinicalBoxes(pathology);



  return (

    <ScreenContainer safe edges={['left', 'right']} style={styles.root}>

      <ScrollView

        contentContainerStyle={[styles.scrollContent, { paddingBottom: contentPaddingBottom }]}

        showsVerticalScrollIndicator={false}>

        <PathologyHeader name={pathology.name} />

        {locale !== 'es' && pathologyId && !isPathologyTranslated(pathologyId, locale) ? (
          <Typography variant="caption" color={colors.textSecondary}>
            {t('content.spanishOnlyNote')}
          </Typography>
        ) : null}

        <PathologyDivider />



        <PathologyBody content={pathology.body} />



        {clinicalBoxes.map((box, index) => (

          <PathologyClinicalBoxSection key={`${box.title}-${index}`} box={box} />

        ))}



        {pathology.relatedDrugs && pathology.relatedDrugs.length > 0 ? (

          <>

            <PathologyDivider />

            <PathologyRelatedDrugsSection

              items={pathology.relatedDrugs}

              onDrugPress={(drugId) => router.push(ROUTES.drug(drugId) as Href)}

            />

          </>

        ) : null}



        <PathologyDivider />



        <PathologyBibliographySection entries={pathology.bibliography} />
      </ScrollView>

    </ScreenContainer>

  );

}



const styles = StyleSheet.create({

  root: {

    paddingVertical: spacing.md,

  },

  scrollContent: {

    paddingHorizontal: spacing.lg,

    paddingTop: spacing.sm,

    gap: spacing.lg,

    width: '100%',

  },

});


