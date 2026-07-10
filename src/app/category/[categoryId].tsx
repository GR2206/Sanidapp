import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { FreePlanUpgradeFooter } from '@/components/subscription/FreePlanUpgradeFooter';
import { PremiumUpgradePanel } from '@/components/subscription/PremiumUpgradePanel';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { loadProtocolIndex } from '@/services/content/manifestService';
import { markContentSectionSeen } from '@/services/storage/contentUpdatesStorage';
import type { AppLocale } from '@/i18n/types';
import {
  type CategoryId,
  type ProtocolDivision,
  type ProtocolMeta,
} from '@/types/protocol';
import { protocolCategoryLabel, protocolDivisionLabel } from '@/utils/protocolLabels';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

type ProtocolSection = {
  title: string;
  data: ProtocolMeta[];
};

function groupProtocols(protocols: ProtocolMeta[], locale: AppLocale): ProtocolSection[] {
  const hasDivisions = protocols.some((p) => p.division);
  if (!hasDivisions) {
    return [{ title: '', data: protocols }];
  }

  const order: ProtocolDivision[] = ['intensiva', 'baja-complejidad'];
  return order
    .map((division) => ({
      title: protocolDivisionLabel(division, locale),
      data: protocols.filter((p) => p.division === division),
    }))
    .filter((section) => section.data.length > 0);
}

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: CategoryId }>();
  const navigation = useNavigation();
  const { contentPaddingBottom } = useScreenInsets();
  const { colors } = useAppTheme();
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
  const sections = useMemo(() => groupProtocols(visibleProtocols, locale), [locale, visibleProtocols]);

  useFocusEffect(
    useCallback(() => {
      if (categoryId === 'adulto' || categoryId === 'pediatrico' || categoryId === 'neonatologia') {
        void markContentSectionSeen(categoryId);
      }
    }, [categoryId]),
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingTop: spacing.sm,
        },
        list: {
          paddingTop: spacing.md,
        },
        headerBlock: {
          gap: spacing.xs,
          marginBottom: spacing.sm,
        },
        sectionTitle: {
          marginTop: spacing.sm,
          marginBottom: spacing.xs,
          color: colors.header,
        },
        sectionGap: {
          height: spacing.sm,
        },
        separator: {
          height: spacing.sm,
        },
        item: {
          backgroundColor: palette.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.md,
          padding: spacing.md,
          gap: spacing.xs,
        },
        itemPressed: {
          backgroundColor: colors.backgroundSoft,
        },
        updatedLabel: {
          fontSize: 11,
          lineHeight: 14,
          textTransform: 'lowercase',
        },
      }),
    [colors],
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
      <ScreenContainer safe edges={['left', 'right']} style={styles.container}>
        <PremiumUpgradePanel sectionLabel={label} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.container}>
      <Button label={t('catalog.scanQr')} onPress={() => router.push(ROUTES.scanner)} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: contentPaddingBottom }]}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          !isPremium && !sectionFullyOpen ? <FreePlanUpgradeFooter /> : null
        }
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Typography variant="label">{label}</Typography>
            {categoryId === 'neonatologia' ? (
              <Typography variant="caption" color={palette.textSecondary}>
                {t('catalog.neonatalRange')}
              </Typography>
            ) : null}
            {!isPremium && !sectionFullyOpen ? (
              <Typography variant="caption" color={palette.textSecondary}>
                {t('catalog.freeProtocolHint')}
              </Typography>
            ) : null}
          </View>
        }
        renderSectionHeader={({ section: { title } }) =>
          title ? (
            <Typography variant="bodyMedium" style={styles.sectionTitle}>
              {title}
            </Typography>
          ) : null
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              hapticLight();
              router.push(ROUTES.protocol(item.id));
            }}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
            <Typography variant="bodyMedium">{item.title}</Typography>
            <Typography variant="caption" color={palette.textMuted} style={styles.updatedLabel}>
              {t('common.updated', { year: '2026' })}
            </Typography>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
      />
    </ScreenContainer>
  );
}
