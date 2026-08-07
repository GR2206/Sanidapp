import { useCallback, useEffect, useState } from 'react';
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
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  listFeedPayouts,
  settleFeedPayout,
  type FeedPayoutItem,
} from '@/services/subscription/feedPayoutService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { formatCbuCvuDisplay } from '@/utils/cbuCvu';
import { hapticLight } from '@/utils/haptics';

type Tab = 'pending' | 'paid';

export function FeedPayoutsScreen() {
  const { isAdmin } = useAuth();
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { contentPaddingBottom } = useScreenInsets();
  const [tab, setTab] = useState<Tab>('pending');
  const [items, setItems] = useState<FeedPayoutItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const elevated = freeElevatedCardStyle(true);
  const accent = FREE_QUICK_ACCESS_TONES.adulto;

  const refresh = useCallback(async () => {
    const next = await listFeedPayouts(tab);
    setItems(next);
  }, [tab]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    refresh()
      .catch((cause) => {
        Alert.alert(
          t('feedPayout.loadError'),
          resolveMessage(cause instanceof Error ? cause.message : t('common.loadError'), locale),
        );
      })
      .finally(() => setLoading(false));
  }, [isAdmin, locale, refresh, t]);

  async function onRefresh() {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }

  async function shareCbu(value: string) {
    if (!value) return;
    hapticLight();
    await Share.share({ message: value });
  }

  function confirmSettle(item: FeedPayoutItem, method: 'manual' | 'mercadopago') {
    Alert.alert(
      t('feedPayout.confirmTitle'),
      t(method === 'manual' ? 'feedPayout.confirmManual' : 'feedPayout.confirmMp', {
        amount: String(item.payeeAmount),
        name: `${item.payeeNombre ?? ''} ${item.payeeApellido ?? ''}`.trim(),
        cbu: formatCbuCvuDisplay(item.payeeCbuCvu ?? ''),
      }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('feedPayout.confirmAction'),
          onPress: () => {
            void (async () => {
              setBusyId(item.id);
              try {
                await settleFeedPayout({ inscriptionId: item.id, method });
                await refresh();
                Alert.alert(t('feedPayout.settled'));
              } catch (cause) {
                Alert.alert(
                  t('feedPayout.settleError'),
                  resolveMessage(
                    cause instanceof Error ? cause.message : t('feedPayout.errors.settleFailed'),
                    locale,
                  ),
                );
              } finally {
                setBusyId(null);
              }
            })();
          },
        },
      ],
    );
  }

  if (!isAdmin) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('feedPayout.forbidden')}</Typography>
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
          {t('feedPayout.title')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          {t('feedPayout.subtitle')}
        </Typography>

        <View style={styles.tabs}>
          {(['pending', 'paid'] as Tab[]).map((value) => {
            const selected = tab === value;
            return (
              <Pressable
                key={value}
                onPress={() => {
                  hapticLight();
                  setTab(value);
                }}
                style={[
                  styles.tab,
                  {
                    backgroundColor: selected ? accent.gradient[0] : colors.backgroundSoft,
                    borderColor: selected ? accent.icon : colors.border,
                  },
                ]}>
                <Typography
                  variant="bodyMedium"
                  style={{
                    color: selected ? accent.label : colors.text,
                    fontFamily: fonts.semiBold,
                  }}>
                  {value === 'pending' ? t('feedPayout.tabPending') : t('feedPayout.tabPaid')}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        {loading ? (
          <ActivityIndicator color={colors.button} />
        ) : items.length === 0 ? (
          <Typography variant="body" color={colors.textMuted}>
            {t('feedPayout.empty')}
          </Typography>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={[styles.card, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
              <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
                {item.itemTitle || item.itemId || item.id}
              </Typography>
              <Typography variant="caption" color={colors.textMuted}>
                {t('feedPayout.payeeLine', {
                  name: `${item.payeeNombre ?? ''} ${item.payeeApellido ?? ''}`.trim(),
                })}
              </Typography>
              <Pressable onPress={() => void shareCbu(item.payeeCbuCvu ?? '')}>
                <Typography variant="caption" style={{ color: accent.icon, fontWeight: '700' }}>
                  {t('feedPayout.cbuLine', {
                    cbu: formatCbuCvuDisplay(item.payeeCbuCvu ?? ''),
                  })}
                </Typography>
              </Pressable>
              <Typography variant="caption" color={colors.textSecondary}>
                {t('feedPayout.amounts', {
                  gross: String(item.amountGross),
                  payee: String(item.payeeAmount),
                  commission: String(item.commissionAmount),
                })}
              </Typography>
              <Typography variant="caption" color={colors.textMuted}>
                {t('feedPayout.concepts', {
                  payee: item.payeeConcept,
                  commission: item.commissionConcept,
                })}
              </Typography>

              {item.payoutStatus === 'pending' ? (
                <View style={styles.actions}>
                  <Button
                    label={
                      busyId === item.id
                        ? t('feedPayout.working')
                        : t('feedPayout.settleManual')
                    }
                    onPress={() => confirmSettle(item, 'manual')}
                    disabled={busyId === item.id}
                    accentColor={colors.button}
                  />
                  <Button
                    label={t('feedPayout.settleMp')}
                    onPress={() => confirmSettle(item, 'mercadopago')}
                    disabled={busyId === item.id}
                    accentColor={FREE_QUICK_ACCESS_TONES.farmacologia.icon}
                  />
                </View>
              ) : (
                <Typography variant="caption" style={{ color: accent.label, fontWeight: '700' }}>
                  {t('feedPayout.paidBadge', {
                    method: item.payoutMethod === 'mercadopago' ? 'Mercado Pago' : 'Manual',
                  })}
                </Typography>
              )}
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
  tabs: { flexDirection: 'row', gap: spacing.xs },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  card: {
    borderRadius: 16,
    padding: spacing.md,
    gap: 6,
  },
  actions: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});
