import { useLocalSearchParams, useNavigation } from 'expo-router';

import { useEffect, useLayoutEffect, useState } from 'react';

import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';



import { ScreenContainer } from '@/components/layout/ScreenContainer';

import { ProtocolBody } from '@/components/protocol/ProtocolBody';

import { ProtocolPdfButton } from '@/components/protocol/ProtocolPdfButton';

import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';

import { FavoriteToggleButton } from '@/components/ui/FavoriteToggleButton';

import { Typography } from '@/components/ui/Typography';

import { useLocale } from '@/contexts/LocaleContext';

import { useAppTheme } from '@/hooks/useAppTheme';

import { usePremiumAccess } from '@/hooks/usePremiumAccess';

import { useScreenInsets } from '@/hooks/useScreenInsets';

import { useRecordContentView } from '@/hooks/useRecordContentView';

import { loadProtocol } from '@/services/content/manifestService';

import type { Protocol } from '@/types/protocol';

import { protocolCategoryLabel, protocolSubtitle } from '@/utils/protocolLabels';

import { palette } from '@/theme/colors';

import { spacing } from '@/theme/spacing';



export default function ProtocolScreen() {

  const { protocolId } = useLocalSearchParams<{ protocolId: string }>();

  const navigation = useNavigation();

  const { contentPaddingBottom } = useScreenInsets();

  const { colors } = useAppTheme();

  const { locale, t } = useLocale();

  const { canAccessProtocol } = usePremiumAccess();

  const [protocol, setProtocol] = useState<Protocol | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if (!protocolId) return;



    setLoading(true);

    loadProtocol(protocolId, locale)

      .then(setProtocol)

      .finally(() => setLoading(false));

  }, [protocolId, locale]);



  useLayoutEffect(() => {

    if (!protocol) return;



    navigation.setOptions({

      title: protocol.title,

      headerRight: () => (

        <FavoriteToggleButton

          color={colors.header}

          item={{

            id: protocol.id,

            type: 'protocol',

            title: protocol.title,

            subtitle: protocolSubtitle(protocol.category, locale),

          }}

        />

      ),

    });

  }, [colors.header, locale, navigation, protocol]);



  useRecordContentView(

    protocol

      ? {

          id: protocol.id,

          type: 'protocol',

          title: protocol.title,

          subtitle: protocolSubtitle(protocol.category, locale),

        }

      : null,

  );



  if (loading) {

    return (

      <ScreenContainer centered>

        <ActivityIndicator color={palette.accent} />

      </ScreenContainer>

    );

  }



  if (!protocol) {

    return (

      <ScreenContainer centered>

        <Typography variant="body">{t('protocol.notFound')}</Typography>

      </ScreenContainer>

    );

  }



  if (!protocol || !canAccessProtocol(protocol.id, protocol.category)) {

    return (

      <ScreenContainer safe edges={['left', 'right']} style={styles.root}>

        <PremiumUpgradePanel

          sectionLabel={protocolCategoryLabel(protocol?.category ?? 'adulto', locale)}

        />

      </ScreenContainer>

    );

  }



  return (

    <ScreenContainer safe edges={['left', 'right']} style={styles.root}>

      <View style={styles.summary}>

        <Typography variant="label">{t('protocol.executiveSummary')}</Typography>

        <Typography variant="body" style={styles.summaryText}>

          {protocol.executiveSummary}

        </Typography>

      </View>



      <ScrollView

        contentContainerStyle={[styles.scrollContent, { paddingBottom: contentPaddingBottom }]}

        showsVerticalScrollIndicator={false}>

        <Typography variant="section" style={styles.sectionTitle}>

          {t('protocol.fullProtocol')}

        </Typography>

        <ProtocolBody content={protocol.body} />



        <View style={styles.bibliography}>

          <Typography variant="label">{t('protocol.bibliography')}</Typography>

          {protocol.bibliography.map((entry, index) => (

            <Typography key={`${entry.citation}-${index}`} variant="reference" style={styles.reference}>

              {index + 1}. {entry.citation}

            </Typography>

          ))}

        </View>



        <ProtocolPdfButton protocol={protocol} />

      </ScrollView>

    </ScreenContainer>

  );

}



const styles = StyleSheet.create({

  root: {

    paddingHorizontal: 0,

    paddingVertical: 0,

  },

  summary: {

    backgroundColor: palette.white,

    borderBottomWidth: 1,

    borderBottomColor: palette.border,

    paddingHorizontal: spacing.lg,

    paddingVertical: spacing.lg,

    gap: spacing.sm,

  },

  summaryText: {

    color: palette.textSecondary,

  },

  scrollContent: {

    paddingHorizontal: spacing.lg,

    paddingVertical: spacing.lg,

    gap: spacing.md,

  },

  sectionTitle: {

    marginBottom: spacing.xs,

  },

  bibliography: {

    marginTop: spacing.lg,

    paddingTop: spacing.lg,

    borderTopWidth: 1,

    borderTopColor: palette.border,

    gap: spacing.sm,

  },

  reference: {

    paddingLeft: spacing.xs,

  },

});


