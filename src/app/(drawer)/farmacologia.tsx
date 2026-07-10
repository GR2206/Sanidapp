import { router, type Href, useFocusEffect } from 'expo-router';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {

  ActivityIndicator,

  Pressable,

  RefreshControl,

  SectionList,

  TextInput,

  View,

} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';



import { ScreenContainer } from '@/components/layout/ScreenContainer';

import { FreePlanUpgradeFooter } from '@/components/subscription/FreePlanUpgradeFooter';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';

import { Typography } from '@/components/ui/Typography';

import { ROUTES } from '@/constants/routes';

import { useLocale } from '@/contexts/LocaleContext';

import { useAppTheme } from '@/hooks/useAppTheme';

import { usePremiumAccess } from '@/hooks/usePremiumAccess';

import { useCatalogListStyles } from '@/hooks/useCatalogListStyles';

import { useScreenInsets } from '@/hooks/useScreenInsets';

import { loadAllDrugMeta } from '@/services/content/drugService';
import { markContentSectionSeen } from '@/services/storage/contentUpdatesStorage';

import type { DrugMeta } from '@/types/drug';

import { groupDrugsByLetter } from '@/utils/groupDrugsByLetter';

import { hapticLight } from '@/utils/haptics';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';



export default function FarmacologiaScreen() {

  const [drugs, setDrugs] = useState<DrugMeta[]>([]);

  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const { contentPaddingBottom } = useScreenInsets();

  const { colors } = useAppTheme();

  const { isPremium, canAccessDrug, canBrowseSection } = usePremiumAccess();
  const { locale, t } = useLocale();

  const styles = useCatalogListStyles();

  const sectionLocked = !canBrowseSection('farmacologia');



  const refresh = useCallback(async () => {

    const data = await loadAllDrugMeta(undefined, locale);

    setDrugs(data);

  }, [locale]);

  useFocusEffect(
    useCallback(() => {
      void markContentSectionSeen('farmacologia');
    }, []),
  );

  useEffect(() => {

    refresh().finally(() => setLoading(false));

  }, [refresh]);



  const onRefresh = useCallback(async () => {

    setRefreshing(true);

    try {

      await refresh();

    } finally {

      setRefreshing(false);

    }

  }, [refresh]);



  const filtered = useMemo(() => {

    const term = query.trim().toLowerCase();

    const base = isPremium ? drugs : drugs.filter((drug) => canAccessDrug(drug.id));

    if (!term) return base;

    return base.filter((drug) => drug.name.toLowerCase().includes(term));

  }, [canAccessDrug, drugs, isPremium, query]);



  const sections = useMemo(() => groupDrugsByLetter(filtered, locale), [filtered, locale]);



  if (loading) {

    return (

      <ScreenContainer centered>

        <ActivityIndicator color={colors.button} />

      </ScreenContainer>

    );

  }



  if (sectionLocked) {

    return (

      <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>

        <PremiumUpgradePanel sectionLabel={t('content.pharmacology')} />

      </ScreenContainer>

    );

  }



  return (

    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>

      <View style={styles.searchWrap}>

        <MaterialCommunityIcons name="magnify" size={18} color={palette.textMuted} />

        <TextInput

          value={query}

          onChangeText={setQuery}

          placeholder={isPremium ? t('catalog.searchDrug') : t('catalog.searchPathologySamples')}

          placeholderTextColor={palette.textMuted}

          style={styles.searchInput}

          clearButtonMode="while-editing"

        />

      </View>

      {!isPremium ? (
        <Typography variant="caption" color={palette.textSecondary} style={{ marginBottom: spacing.sm }}>
          {t('catalog.freeDrugHint')}
        </Typography>
      ) : null}

      <SectionList

        sections={sections}

        keyExtractor={(item) => item.id}

        style={styles.list}

        stickySectionHeadersEnabled={false}

        refreshControl={

          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.button} />

        }

        contentContainerStyle={[styles.listContent, { paddingBottom: contentPaddingBottom }]}

        ListFooterComponent={!isPremium ? <FreePlanUpgradeFooter /> : null}

        ListEmptyComponent={

          <Typography variant="body" color={palette.textSecondary} style={styles.empty}>

            {query.trim() ? t('common.noResults') : t('catalog.noDrugs')}

          </Typography>

        }

        renderSectionHeader={({ section: { title } }) => (

          <Typography variant="subtitle" style={styles.letterHeader}>

            {title}

          </Typography>

        )}

        renderItem={({ item }) => (

          <Pressable

            onPress={() => {

              hapticLight();

              router.push(ROUTES.drug(item.id) as Href);

            }}

            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>

            <Typography variant="body" style={styles.rowName}>

              {item.name}

            </Typography>

          </Pressable>

        )}

      />

    </ScreenContainer>

  );

}


