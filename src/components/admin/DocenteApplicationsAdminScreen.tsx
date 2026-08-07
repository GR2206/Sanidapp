import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
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
  listDocenteApplications,
  reviewDocenteApplication,
} from '@/services/docente/docenteApplicationService';
import type { DocenteApplication } from '@/types/docente';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

type Tab = 'pending' | 'approved' | 'rejected';

export function DocenteApplicationsAdminScreen() {
  const { isAdmin } = useAuth();
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { contentPaddingBottom } = useScreenInsets();
  const [tab, setTab] = useState<Tab>('pending');
  const [items, setItems] = useState<DocenteApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const elevated = freeElevatedCardStyle(true);
  const accent = FREE_QUICK_ACCESS_TONES.farmacologia;

  const refresh = useCallback(async () => {
    const next = await listDocenteApplications(tab);
    setItems(next);
  }, [tab]);

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    refresh()
      .catch((cause) => {
        Alert.alert(
          t('docenteAdmin.loadError'),
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

  function confirmReview(item: DocenteApplication, decision: 'approved' | 'rejected') {
    if (decision === 'rejected') {
      Alert.alert(t('docenteAdmin.rejectTitle'), t('docenteAdmin.rejectConfirmAndroid'), [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('docenteAdmin.rejectAction'),
          style: 'destructive',
          onPress: () => {
            void runReview(item, 'rejected', t('docenteAdmin.rejectDefault'));
          },
        },
      ]);
      return;
    }

    Alert.alert(
      t('docenteAdmin.approveTitle'),
      t('docenteAdmin.approveBody', {
        name: `${item.nombre} ${item.apellido}`.trim(),
      }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('docenteAdmin.approveAction'),
          onPress: () => {
            void runReview(item, 'approved');
          },
        },
      ],
    );
  }

  async function runReview(
    item: DocenteApplication,
    decision: 'approved' | 'rejected',
    rejectReason?: string,
  ) {
    setBusyId(item.id);
    try {
      await reviewDocenteApplication({
        applicationId: item.id,
        decision,
        rejectReason,
      });
      await refresh();
      Alert.alert(
        decision === 'approved' ? t('docenteAdmin.approvedDone') : t('docenteAdmin.rejectedDone'),
      );
    } catch (cause) {
      Alert.alert(
        t('docenteAdmin.reviewError'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('docente.errors.reviewFailed'),
          locale,
        ),
      );
    } finally {
      setBusyId(null);
    }
  }

  if (!isAdmin) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('docenteAdmin.forbidden')}</Typography>
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
          {t('docenteAdmin.title')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          {t('docenteAdmin.subtitle')}
        </Typography>

        <View style={styles.tabs}>
          {(['pending', 'approved', 'rejected'] as Tab[]).map((value) => {
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
                  variant="caption"
                  style={{
                    color: selected ? accent.label : colors.text,
                    fontFamily: fonts.semiBold,
                  }}>
                  {t(`docenteAdmin.tab.${value}`)}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        {loading ? (
          <ActivityIndicator color={colors.button} />
        ) : items.length === 0 ? (
          <Typography variant="body" color={colors.textMuted}>
            {t('docenteAdmin.empty')}
          </Typography>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={[styles.card, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
              <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
                {`${item.nombre} ${item.apellido}`.trim() || item.email}
              </Typography>
              <Typography variant="caption" color={colors.textMuted}>
                {item.email}
              </Typography>
              <Typography variant="caption" color={colors.textSecondary}>
                {t('docenteAdmin.lineUniversidad', { value: item.universidad })}
              </Typography>
              <Typography variant="caption" color={colors.textSecondary}>
                {t('docenteAdmin.lineTitulo', { value: item.tituloAcademico })}
              </Typography>
              <Typography variant="caption" color={colors.textSecondary}>
                {t('docenteAdmin.lineArea', { value: item.areaCursos })}
              </Typography>
              {item.profesion ? (
                <Typography variant="caption" color={colors.textMuted}>
                  {item.profesion}
                </Typography>
              ) : null}

              {item.certificadoUrl ? (
                <Pressable
                  onPress={() => {
                    hapticLight();
                    void Linking.openURL(item.certificadoUrl);
                  }}>
                  <Image
                    source={{ uri: item.certificadoUrl }}
                    style={styles.cert}
                    contentFit="contain"
                  />
                  <Typography variant="caption" style={{ color: accent.icon, fontWeight: '700' }}>
                    {t('docenteAdmin.openCert')}
                  </Typography>
                </Pressable>
              ) : null}

              {item.status === 'pending' ? (
                <View style={styles.actions}>
                  <Button
                    label={
                      busyId === item.id
                        ? t('docenteAdmin.working')
                        : t('docenteAdmin.approveAction')
                    }
                    onPress={() => confirmReview(item, 'approved')}
                    disabled={busyId === item.id}
                    accentColor={colors.button}
                  />
                  <Button
                    label={t('docenteAdmin.rejectAction')}
                    onPress={() => confirmReview(item, 'rejected')}
                    disabled={busyId === item.id}
                    accentColor={FREE_QUICK_ACCESS_TONES.pediatrico.icon}
                  />
                </View>
              ) : (
                <Typography variant="caption" style={{ color: accent.label, fontWeight: '700' }}>
                  {item.status === 'approved'
                    ? t('docenteAdmin.statusApproved')
                    : t('docenteAdmin.statusRejected')}
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
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  card: { borderRadius: 16, padding: spacing.md, gap: 6 },
  cert: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginTop: spacing.xs,
  },
  actions: { gap: spacing.xs, marginTop: spacing.sm },
});
