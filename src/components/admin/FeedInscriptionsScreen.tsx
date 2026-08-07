import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useFeedManageAccess } from '@/hooks/useFeedVisibility';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  formatInscriptionShareText,
  groupInscriptionsByCourse,
  listFeedInscriptions,
  type FeedInscriptionRosterItem,
} from '@/services/subscription/feedInscriptionRosterService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export function FeedInscriptionsScreen() {
  const { isAdmin } = useAuth();
  const { canManage } = useFeedManageAccess();
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { contentPaddingBottom } = useScreenInsets();
  const [items, setItems] = useState<FeedInscriptionRosterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const elevated = freeElevatedCardStyle(true);
  const accent = FREE_QUICK_ACCESS_TONES.pediatrico;
  const canAccess = isAdmin || canManage;

  const groups = useMemo(() => groupInscriptionsByCourse(items), [items]);

  const refresh = useCallback(async () => {
    const next = await listFeedInscriptions();
    setItems(next);
  }, []);

  useEffect(() => {
    if (!canAccess) return;
    setLoading(true);
    refresh()
      .catch((cause) => {
        Alert.alert(
          t('feedRoster.loadError'),
          resolveMessage(cause instanceof Error ? cause.message : t('common.loadError'), locale),
        );
      })
      .finally(() => setLoading(false));
  }, [canAccess, locale, refresh, t]);

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }

  async function shareGroup(group: ReturnType<typeof groupInscriptionsByCourse>[number]) {
    hapticLight();
    const message = formatInscriptionShareText({
      courseTitle: group.title,
      attendees: group.attendees,
      headerLabel: t('feedRoster.shareHeader'),
      emptyLabel: t('feedRoster.emptyCourse'),
    });
    await Share.share({ message, title: group.title });
  }

  async function shareAll() {
    hapticLight();
    if (groups.length === 0) {
      Alert.alert(t('feedRoster.empty'));
      return;
    }
    const blocks = groups.map((group) =>
      formatInscriptionShareText({
        courseTitle: group.title,
        attendees: group.attendees,
        headerLabel: t('feedRoster.shareHeader'),
        emptyLabel: t('feedRoster.emptyCourse'),
      }),
    );
    await Share.share({
      message: blocks.join('\n\n————\n\n'),
      title: t('feedRoster.title'),
    });
  }

  if (!canAccess) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('feedRoster.forbidden')}</Typography>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void onRefresh()} />
        }>
        <Typography
          variant="label"
          style={{ color: accent.label, fontFamily: fonts.semiBold, letterSpacing: 0.5 }}>
          {t('feedRoster.title')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          {t('feedRoster.subtitle')}
        </Typography>

        <Button
          label={t('feedRoster.shareAll')}
          onPress={() => void shareAll()}
          disabled={groups.length === 0}
          accentColor={accent.icon}
        />

        {loading ? (
          <ActivityIndicator color={colors.button} />
        ) : groups.length === 0 ? (
          <Typography variant="body" color={colors.textMuted}>
            {t('feedRoster.empty')}
          </Typography>
        ) : (
          groups.map((group) => (
            <View
              key={group.key}
              style={[styles.card, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTitles}>
                  <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
                    {group.title}
                  </Typography>
                  <Typography variant="caption" color={colors.textMuted}>
                    {t('feedRoster.count', { count: String(group.attendees.length) })}
                    {group.kind === 'congresos'
                      ? ` · ${t('drawer.congresos')}`
                      : ` · ${t('drawer.cursos')}`}
                  </Typography>
                </View>
                <Pressable
                  onPress={() => void shareGroup(group)}
                  style={[styles.shareChip, { borderColor: accent.icon }]}>
                  <Typography variant="caption" style={{ color: accent.icon, fontWeight: '700' }}>
                    {t('feedRoster.share')}
                  </Typography>
                </Pressable>
              </View>

              {group.attendees.map((person) => {
                const name =
                  `${person.payerNombre ?? ''} ${person.payerApellido ?? ''}`.trim() || '—';
                return (
                  <View key={person.id} style={styles.row}>
                    <Typography variant="bodyMedium">{name}</Typography>
                    <Typography variant="caption" color={colors.textSecondary}>
                      {person.payerEmail || '—'}
                    </Typography>
                    <Typography variant="caption" color={colors.textMuted}>
                      {t('feedRoster.paidLine', {
                        amount: String(person.amountGross),
                        currency: person.currency,
                      })}
                    </Typography>
                  </View>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingVertical: spacing.sm },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.md },
  card: {
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  cardTitles: {
    flex: 1,
    gap: 2,
  },
  shareChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  row: {
    gap: 2,
    paddingTop: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
});
