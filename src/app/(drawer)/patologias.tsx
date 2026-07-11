import { router, type Href } from 'expo-router';

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



import { FreePlanUpgradeFooter } from '@/components/subscription/FreePlanUpgradeFooter';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';

import { ScreenContainer } from '@/components/layout/ScreenContainer';

import { Typography } from '@/components/ui/Typography';

import { ROUTES } from '@/constants/routes';

import { useLocale } from '@/contexts/LocaleContext';

import { useAppTheme } from '@/hooks/useAppTheme';

import { usePremiumAccess } from '@/hooks/usePremiumAccess';

import { useCatalogListStyles } from '@/hooks/useCatalogListStyles';

import { useScreenInsets } from '@/hooks/useScreenInsets';

import { loadAllPathologyMeta } from '@/services/content/pathologyService';

import type { PathologyMeta } from '@/types/pathology';

import { groupByLetter } from '@/utils/groupByLetter';

import { hapticLight } from '@/utils/haptics';
import { playKeySound } from '@/services/audio/uiSoundService';

import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';



export default function PatologiasScreen() {

  const [items, setItems] = useState<PathologyMeta[]>([]);

  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const { contentPaddingBottom } = useScreenInsets();

  const { colors } = useAppTheme();

  const { isPremium, canAccessPathology } = usePremiumAccess();
  const { locale, t } = useLocale();

  const styles = useCatalogListStyles();



  const refresh = useCallback(async () => {

    const data = await loadAllPathologyMeta(undefined, locale);

    setItems(data);

  }, [locale]);



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

    const base = isPremium ? items : items.filter((item) => canAccessPathology(item.id));

    if (!term) return base;

    return base.filter((item) => item.name.toLowerCase().includes(term));

  }, [canAccessPathology, isPremium, items, query]);



  const sections = useMemo(() => groupByLetter(filtered, locale), [filtered, locale]);



  if (loading) {

    return (

      <ScreenContainer centered>

        <ActivityIndicator color={colors.button} />

      </ScreenContainer>

    );

  }



  if (!isPremium && filtered.length === 0) {

    return (

      <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>

        <PremiumUpgradePanel sectionLabel={t('pathology.screenTitle')} />

      </ScreenContainer>

    );

  }



  return (

    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>

      <View style={styles.searchWrap}>

        <MaterialCommunityIcons name="magnify" size={18} color={palette.textMuted} />

        <TextInput

          value={query}

          onChangeText={(value) => {
            playKeySound();
            setQuery(value);
          }}

          placeholder={isPremium ? t('catalog.searchPathology') : t('catalog.searchPathologySamples')}

          placeholderTextColor={palette.textMuted}

          style={styles.searchInput}

          clearButtonMode="while-editing"

        />

      </View>



      {!isPremium ? (

        <Typography
          variant="caption"
          color={palette.textSecondary}
          style={{ marginBottom: spacing.sm, paddingHorizontal: spacing.lg }}>
          {t('catalog.freePathologyHint')}
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

            {query.trim() ? t('common.noResults') : t('catalog.noPathologies')}

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

              router.push(ROUTES.pathology(item.id) as Href);

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


