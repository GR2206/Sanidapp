import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SectionList, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { FreePlanUpgradeFooter } from '@/components/subscription/FreePlanUpgradeFooter';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useCatalogListStyles } from '@/hooks/useCatalogListStyles';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { loadProtocolIndex } from '@/services/content/manifestService';
import { markContentSectionSeen } from '@/services/storage/contentUpdatesStorage';
import {
  type CategoryId,
  type ProtocolMeta,
} from '@/types/protocol';
import { protocolCategoryLabel } from '@/utils/protocolLabels';
import { groupByLetter } from '@/utils/groupByLetter';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

type ProtocolListItem = ProtocolMeta & { name: string };

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: CategoryId }>();
  const navigation = useNavigation();
  const { contentPaddingBottom } = useScreenInsets();
  const { colors, fonts } = useAppTheme();
  const styles = useCatalogListStyles();
  const { isPremium, canAccessSection, canBrowseSection, canAccessProtocol } = usePremiumAccess();
  const { locale, t } = useLocale();
  const [protocols, setProtocols] = useState<ProtocolMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const label = protocolCategoryLabel(categoryId, locale);
  const sectionFullyOpen =
    categoryId === 'adulto' || categoryId === 'pediatrico' || categoryId === 'neonatologia'
      ? canAccessSection(categoryId)
      : true;
  const sectionLocked =
    categoryId === 'adulto' || categoryId === 'pediatrico' || categoryId === 'neonatologia'
      ? !canBrowseSection(categoryId)
      : false;
  const visibleProtocols = useMemo(() => {
    if (sectionFullyOpen) {
      return protocols;
    }

    return protocols.filter((item) => canAccessProtocol(item.id, categoryId));
  }, [canAccessProtocol, categoryId, protocols, sectionFullyOpen]);

  const sections = useMemo(
    () =>
      groupByLetter<ProtocolListItem>(
        visibleProtocols.map((item) => ({ ...item, name: item.title })),
        locale,
      ),
    [locale, visibleProtocols],
  );

  useFocusEffect(
    useCallback(() => {
      if (categoryId === 'adulto' || categoryId === 'pediatrico' || categoryId === 'neonatologia') {
        void markContentSectionSeen(categoryId);
      }
    }, [categoryId]),
  );

  useEffect(() => {
    navigation.setOptions({
      title: t('protocol.listTitle', { category: label }),
    });
  }, [label, locale, navigation, t]);

  useEffect(() => {
    if (!categoryId) return;

    loadProtocolIndex(categoryId, undefined, locale)
      .then((index) => setProtocols(index.protocols))
      .finally(() => setLoading(false));
  }, [categoryId, locale]);

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
        <PremiumUpgradePanel sectionLabel={label} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <View style={{ marginBottom: spacing.sm }}>
        <Button label={t('catalog.scanQr')} onPress={() => router.push(ROUTES.scanner)} />
      </View>

      <SectionList
        style={styles.list}
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: contentPaddingBottom }]}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          !isPremium && !sectionFullyOpen ? <FreePlanUpgradeFooter /> : null
        }
        ListHeaderComponent={
          <View style={{ gap: spacing.xs, marginBottom: spacing.sm }}>
            <Typography
              variant="label"
              style={{ color: colors.textSecondary, fontFamily: fonts?.semiBold, letterSpacing: 0.7 }}>
              {label}
            </Typography>
            {categoryId === 'neonatologia' ? (
              <Typography variant="caption" color={colors.textSecondary}>
                {t('catalog.neonatalRange')}
              </Typography>
            ) : null}
            {!isPremium && !sectionFullyOpen ? (
              <Typography variant="caption" color={colors.textSecondary}>
                {t('catalog.freeProtocolHint')}
              </Typography>
            ) : null}
          </View>
        }
        renderSectionHeader={({ section: { title } }) => {
          const tone = styles.letterTone(title);
          return (
            <View style={[styles.letterHeaderWrap, tone.wrap]}>
              <Typography variant="bodyMedium" style={[styles.letterHeader, tone.text]}>
                {title}
              </Typography>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              hapticLight();
              router.push(ROUTES.protocol(item.id));
            }}
            style={({ pressed }) => [
              styles.row,
              { paddingVertical: spacing.sm + 4 },
              pressed && styles.rowPressed,
            ]}>
            <Typography variant="body" style={styles.rowName}>
              {item.title}
            </Typography>
          </Pressable>
        )}
        ListEmptyComponent={
          <Typography variant="body" style={styles.empty}>
            {t('common.noResults')}
          </Typography>
        }
      />
    </ScreenContainer>
  );
}
