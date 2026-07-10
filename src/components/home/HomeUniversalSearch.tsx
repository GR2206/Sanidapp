import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

import { useState } from 'react';

import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';



import { Typography } from '@/components/ui/Typography';

import { ROUTES } from '@/constants/routes';

import { useLocale } from '@/contexts/LocaleContext';

import { useDashboardTheme } from '@/hooks/useDashboardTheme';

import { useUniversalSearch } from '@/hooks/useUniversalSearch';

import { fontFamily } from '@/theme/typography';

import { spacing } from '@/theme/spacing';

import { hapticLight } from '@/utils/haptics';

import { navigateToContentItem } from '@/utils/contentNavigation';

import type { UniversalSearchResult } from '@/types/userActivity';



interface HomeUniversalSearchProps {

  onResultPress?: () => void;

}



export function HomeUniversalSearch({ onResultPress }: HomeUniversalSearchProps) {

  const [query, setQuery] = useState('');

  const { results, loading } = useUniversalSearch(query);

  const { colors, accentTextFontFamily } = useDashboardTheme();
  const { t } = useLocale();
  const searchPlaceholder = t('search.placeholder');

  const showResults = query.trim().length >= 2;



  function handlePress(item: UniversalSearchResult) {

    hapticLight();

    setQuery('');

    onResultPress?.();

    navigateToContentItem(item.type, item.id);

  }



  function handleOpenScanner() {

    hapticLight();

    router.push(ROUTES.scanner);

  }



  return (

    <View style={styles.wrap}>

      <View

        style={[

          styles.searchBar,

          {

            backgroundColor: colors.surface,

            borderColor: colors.border,

            shadowColor: colors.shadow,

          },

        ]}>

        <MaterialCommunityIcons name="magnify" size={20} color={colors.accent} />

        <TextInput

          value={query}

          onChangeText={setQuery}

          placeholder={searchPlaceholder}

          placeholderTextColor={colors.textMuted}

          accessibilityLabel={searchPlaceholder}

          style={[styles.input, { color: colors.text, fontFamily: accentTextFontFamily }]}

          autoCapitalize="none"

          autoCorrect={false}

          returnKeyType="search"

          clearButtonMode="while-editing"

        />

        <Pressable

          accessibilityRole="button"

          accessibilityLabel={t('common.scanQr')}

          onPress={handleOpenScanner}

          hitSlop={8}

          style={({ pressed }) => [styles.scanInline, pressed && styles.scanInlinePressed]}>

          <MaterialCommunityIcons name="qrcode-scan" size={22} color={colors.accent} />

        </Pressable>

      </View>



      {showResults ? (

        <View

          style={[

            styles.results,

            { backgroundColor: colors.surface, borderColor: colors.border },

          ]}>

          {loading && results.length === 0 ? (

            <Typography variant="caption" style={[styles.hint, { color: colors.textMuted }]}>

              {t('home.catalogLoading')}

            </Typography>

          ) : null}

          {!loading && results.length === 0 ? (

            <Typography variant="caption" style={[styles.hint, { color: colors.textMuted }]}>

              {t('home.noSearchResults', { query: query.trim() })}

            </Typography>

          ) : null}

          {results.map((item) => (

            <Pressable

              key={`${item.type}-${item.id}`}

              onPress={() => handlePress(item)}

              style={({ pressed }) => [

                styles.resultRow,

                { borderBottomColor: colors.border },

                pressed && { backgroundColor: colors.surfaceMuted },

              ]}>

              <MaterialCommunityIcons

                name={

                  item.type === 'drug'

                    ? 'pill'

                    : item.type === 'pathology'

                      ? 'stethoscope'

                      : 'file-document-outline'

                }

                size={18}

                color={colors.accent}

              />

              <View style={styles.resultText}>

                <Typography

                  variant="bodyMedium"

                  numberOfLines={1}

                  style={{ color: colors.text }}>

                  {item.title}

                </Typography>

                <Typography variant="caption" numberOfLines={1} style={{ color: colors.textMuted }}>

                  {item.subtitle}

                </Typography>

              </View>

              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />

            </Pressable>

          ))}

        </View>

      ) : null}

    </View>

  );

}



const styles = StyleSheet.create({

  wrap: {

    gap: spacing.sm,

  },

  searchBar: {

    minHeight: 52,

    flexDirection: 'row',

    alignItems: 'center',

    gap: spacing.xs,

    borderWidth: 1,

    borderRadius: 16,

    paddingLeft: spacing.sm,

    paddingRight: spacing.xs,

    paddingVertical: spacing.xs,

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: { width: 0, height: 4 },

    elevation: 3,

  },

  scanInline: {

    width: 40,

    height: 40,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

  },

  scanInlinePressed: {

    opacity: 0.86,

    transform: [{ scale: 0.97 }],

  },

  input: {

    flex: 1,

    minWidth: 0,

    fontFamily: fontFamily.regular,

    fontSize: 14,

    lineHeight: 18,

    paddingVertical: Platform.OS === 'android' ? 2 : spacing.xs,

    ...(Platform.OS === 'android' ? { includeFontPadding: false, textAlignVertical: 'center' } : null),

  },

  results: {

    borderWidth: 1,

    borderRadius: 14,

    overflow: 'hidden',

  },

  resultRow: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: spacing.sm,

    paddingHorizontal: spacing.md,

    paddingVertical: spacing.sm,

    borderBottomWidth: StyleSheet.hairlineWidth,

  },

  resultText: {

    flex: 1,

    gap: 2,

  },

  hint: {

    padding: spacing.md,

    textAlign: 'center',

  },

});


