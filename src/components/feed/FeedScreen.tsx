import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ProtocolBody } from '@/components/protocol/ProtocolBody';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppearance } from '@/contexts/AppearanceContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { loadFeed } from '@/services/content/feedService';
import {
  confirmExternalFeedInscription,
  createFeedInscriptionCheckout,
  openFeedInscriptionCheckout,
} from '@/services/subscription/feedInscriptionService';
import {
  inscriptionKey,
  listMyApprovedFeedInscriptionKeys,
  type MyFeedInscriptionKey,
} from '@/services/subscription/myFeedInscriptionsService';
import type { FeedAudience, FeedItem, FeedKind, FeedPage } from '@/types/feed';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { isLowCupos, parseFeedCupos } from '@/utils/feedCupos';
import { isStripeFeedCurrency, parseFeedPriceMoney } from '@/utils/feedPrice';
import { hapticLight } from '@/utils/haptics';
import { resolveMessage } from '@/i18n/resolveMessage';

interface FeedScreenProps {
  kind: FeedKind;
  /** public = mundial; institution = solo el sanatorio del usuario. */
  audience?: FeedAudience;
}

function resolveItemScope(item: FeedItem, audience: FeedAudience, fallbackSanatorioId?: string | null) {
  if (item.scopeType === 'sanatorio' || audience === 'institution') {
    return {
      scopeType: 'sanatorio' as const,
      sanatorioId: item.sanatorioId || fallbackSanatorioId || null,
    };
  }
  return {
    scopeType: 'global' as const,
    sanatorioId: null as string | null,
  };
}

function FeedItemCard({
  item,
  kind,
  audience,
  viewerSanatorioId,
  enrolled,
  onEnrolled,
}: {
  item: FeedItem;
  kind: FeedKind;
  audience: FeedAudience;
  viewerSanatorioId?: string | null;
  enrolled: boolean;
  onEnrolled: (itemId: string) => void;
}) {
  const { colors, fonts } = useAppTheme();
  const { isDark } = useAppearance();
  const { t, locale } = useLocale();
  const { profile, firebaseEnabled } = useAuth();
  const [paying, setPaying] = useState(false);
  const linkUrl = item.url?.trim() || item.speakerPage?.trim() || '';
  const hasLink = Boolean(linkUrl);
  const currency =
    item.paymentCurrency === 'EUR' || item.paymentCurrency === 'USD' ? item.paymentCurrency : 'ARS';
  const priceAmount = parseFeedPriceMoney(item.precio, currency);
  const cupos = parseFeedCupos(item.cupos);
  const soldOut = cupos != null && cupos.remaining <= 0;
  const showLowCupos = isLowCupos(cupos?.remaining);
  const isPriceFree = priceAmount === 0;
  /**
   * Cobro in-app (canon 20%): hay precio y el supervisor eligió «en app».
   * ARS → CBU; EUR/USD → Stripe Connect.
   */
  const canPayInApp =
    !enrolled &&
    !soldOut &&
    !isPriceFree &&
    item.paymentMode === 'in_app' &&
    priceAmount != null &&
    priceAmount > 0 &&
    Boolean(profile) &&
    firebaseEnabled &&
    (isStripeFeedCurrency(currency)
      ? Boolean(item.stripeConnectAccountId)
      : Boolean(item.payeeCbuCvu));
  /**
   * Cobro externo pago: el alumno paga afuera y luego confirma en la app
   * para entrar al roster (Sanidapp no retiene el dinero del link).
   */
  const canPayExternal =
    !enrolled &&
    !soldOut &&
    !isPriceFree &&
    item.paymentMode === 'external' &&
    priceAmount != null &&
    priceAmount > 0 &&
    hasLink &&
    Boolean(profile) &&
    firebaseEnabled;
  /** Gratis únicamente si el cajón precio dice Gratis / 0. */
  const canEnrollFree =
    !enrolled && !soldOut && isPriceFree && Boolean(profile) && firebaseEnabled;
  const elevated = freeElevatedCardStyle(!isDark);
  const accent = FREE_QUICK_ACCESS_TONES.neonatologia;
  const alertTone = FREE_QUICK_ACCESS_TONES.pediatrico;
  const modalidadLabel =
    item.modalidad === 'presencial_online' || item.modalidad === 'hibrida'
      ? t('feedManage.modalidad.presencial_online')
      : item.modalidad === 'presencial'
        ? t('feedManage.modalidad.presencial')
        : item.modalidad === 'online'
          ? t('feedManage.modalidad.online')
          : item.modalidad;
  const meta = [item.date, item.location, modalidadLabel].filter(Boolean).join(' · ');
  const paymentNotice = isPriceFree
    ? {
        title: t('feed.paymentMethodTitle'),
        body: t('feed.paymentMethodFree'),
        tone: accent,
      }
    : item.paymentMode === 'in_app'
      ? {
          title: t('feed.paymentMethodTitle'),
          body: isStripeFeedCurrency(currency)
            ? t('feed.paymentMethodInAppStripe', { currency })
            : t('feed.paymentMethodInApp'),
          tone: accent,
        }
      : item.paymentMode === 'external' && priceAmount != null && priceAmount > 0
        ? {
            title: t('feed.paymentMethodTitle'),
            body: t('feed.paymentMethodExternal'),
            tone: alertTone,
          }
        : null;

  const details = [
    item.idioma ? `${t('feed.idioma')}: ${item.idioma}` : null,
    item.zonaHoraria ? `${t('feed.zonaHoraria')}: ${item.zonaHoraria}` : null,
    item.duracion ? `${t('feed.duracion')}: ${item.duracion}` : null,
    item.finaliza ? `${t('feed.finaliza')}: ${item.finaliza}` : null,
    item.cupos ? `${t('feed.cupos')}: ${item.cupos}` : null,
    item.precio ? `${t('feed.precio')}: ${item.precio}` : null,
    item.speakerPage ? `${t('feed.speakerPage')}: ${item.speakerPage}` : null,
    // El medio de pago va en el recuadro dedicado (más visible).
  ].filter(Boolean);
  const linkText = item.linkLabel?.trim() || t('common.seeMore');

  async function openUrl() {
    if (!linkUrl) return;
    hapticLight();
    const href = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`;
    await WebBrowser.openBrowserAsync(href);
  }

  async function handleExternalPayAndConfirm() {
    if (!profile || !linkUrl) return;
    setPaying(true);
    try {
      hapticLight();
      const href = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`;
      await WebBrowser.openBrowserAsync(href);
      Alert.alert(
        t('feedInscription.externalConfirmTitle'),
        t('feedInscription.externalConfirmBody'),
        [
          { text: t('feedInscription.externalNotYet'), style: 'cancel' },
          {
            text: t('feedInscription.externalConfirmAction'),
            onPress: () => void confirmExternalEnrollment(),
          },
        ],
      );
    } finally {
      setPaying(false);
    }
  }

  async function confirmExternalEnrollment() {
    if (!profile) return;
    setPaying(true);
    try {
      hapticLight();
      const scope = resolveItemScope(item, audience, viewerSanatorioId);
      await confirmExternalFeedInscription({
        profile,
        kind,
        itemId: item.id,
        scopeType: scope.scopeType,
        sanatorioId: scope.sanatorioId,
      });
      onEnrolled(item.id);
      Alert.alert(t('feedInscription.enrolledTitle'), t('feedInscription.enrolledBody'));
    } catch (cause) {
      Alert.alert(
        t('feedInscription.payError'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('feedInscription.errors.startFailed'),
          locale,
        ),
      );
    } finally {
      setPaying(false);
    }
  }

  async function handleCheckout(asFree: boolean) {
    if (!profile) return;
    setPaying(true);
    try {
      hapticLight();
      const scope = resolveItemScope(item, audience, viewerSanatorioId);
      const checkout = await createFeedInscriptionCheckout({
        profile,
        kind,
        itemId: item.id,
        scopeType: scope.scopeType,
        sanatorioId: scope.sanatorioId,
      });
      if (checkout.freeEnrolled) {
        onEnrolled(item.id);
        Alert.alert(t('feedInscription.enrolledTitle'), t('feedInscription.freeEnrolledBody'));
        return;
      }
      if (!checkout.checkoutUrl) {
        throw new Error(t('feedInscription.errors.startFailed'));
      }
      const result = await openFeedInscriptionCheckout(checkout.checkoutUrl);
      if (result === 'success') {
        onEnrolled(item.id);
        Alert.alert(t('feedInscription.enrolledTitle'), t('feedInscription.enrolledBody'));
      }
    } catch (cause) {
      Alert.alert(
        t('feedInscription.payError'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('feedInscription.errors.startFailed'),
          locale,
        ),
      );
    } finally {
      setPaying(false);
    }
  }

  return (
    <Pressable
      onPress={hasLink && !canPayInApp && !canPayExternal && !canEnrollFree && !enrolled ? openUrl : undefined}
      disabled={!hasLink || canPayInApp || canPayExternal || canEnrollFree || enrolled}
      style={({ pressed }) => [
        styles.card,
        elevated ?? { borderColor: colors.border, backgroundColor: colors.backgroundSoft, borderWidth: 1 },
        pressed && hasLink && !canPayInApp && !canPayExternal && !canEnrollFree && !enrolled && { opacity: 0.92 },
      ]}>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.cardImage}
          contentFit="cover"
          transition={200}
        />
      ) : null}

      <View style={styles.cardContent}>
        <Typography variant="bodyMedium" color={colors.text} style={{ fontFamily: fonts.semiBold }}>
          {item.title}
        </Typography>

        {item.caption ? (
          <View style={[styles.captionPill, { backgroundColor: accent.gradient[0] }]}>
            <Typography variant="caption" style={{ color: accent.label, fontWeight: '600' }}>
              {item.caption}
            </Typography>
          </View>
        ) : null}

        {showLowCupos && !enrolled && !soldOut ? (
          <View style={[styles.alertBanner, { backgroundColor: alertTone.gradient[0] }]}>
            <Typography variant="caption" style={{ color: alertTone.label, fontWeight: '700' }}>
              {t('feed.lowCuposAlert', { count: String(cupos?.remaining ?? 5) })}
            </Typography>
          </View>
        ) : null}

        {enrolled ? (
          <View style={[styles.alertBanner, { backgroundColor: accent.gradient[0] }]}>
            <Typography variant="caption" style={{ color: accent.label, fontWeight: '700' }}>
              {t('feedInscription.enrolledBadge')}
            </Typography>
          </View>
        ) : null}

        {soldOut && !enrolled ? (
          <View style={[styles.alertBanner, { backgroundColor: colors.backgroundSoft }]}>
            <Typography variant="caption" style={{ color: colors.textMuted, fontWeight: '700' }}>
              {t('feed.soldOut')}
            </Typography>
          </View>
        ) : null}

        {item.subtitle ? (
          <Typography variant="body" color={colors.textSecondary}>
            {item.subtitle}
          </Typography>
        ) : null}

        {meta ? (
          <Typography variant="caption" color={colors.textMuted}>
            {meta}
          </Typography>
        ) : null}

        {paymentNotice ? (
          <View
            style={[
              styles.paymentMethodBox,
              {
                backgroundColor: paymentNotice.tone.gradient[0],
                borderColor: paymentNotice.tone.icon,
              },
            ]}>
            <Typography
              variant="caption"
              style={{
                color: paymentNotice.tone.label,
                fontFamily: fonts.semiBold,
                fontWeight: '700',
              }}>
              {paymentNotice.title}
            </Typography>
            <Typography
              variant="caption"
              style={{ color: paymentNotice.tone.label, lineHeight: 18 }}>
              {paymentNotice.body}
            </Typography>
          </View>
        ) : null}

        {details.map((line) => (
          <Typography key={line} variant="caption" color={colors.textSecondary}>
            {line}
          </Typography>
        ))}

        {item.body ? (
          <View style={styles.cardBody}>
            <ProtocolBody content={item.body} />
          </View>
        ) : null}

        {hasLink ? (
          <Typography variant="caption" style={[styles.link, { color: accent.icon }]}>
            {linkText} →
          </Typography>
        ) : null}

        {canEnrollFree ? (
          <Button
            label={paying ? t('feedInscription.enrolling') : t('feedInscription.enrollFreeButton')}
            onPress={() => void handleCheckout(true)}
            disabled={paying}
            accentColor={colors.button}
            style={styles.payButton}
          />
        ) : null}

        {canPayExternal ? (
          <View style={styles.externalActions}>
            <Button
              label={
                paying
                  ? t('feedInscription.paying')
                  : t('feedInscription.externalPayButton', {
                      price: String(priceAmount),
                      currency,
                    })
              }
              onPress={() => void handleExternalPayAndConfirm()}
              disabled={paying}
              accentColor={colors.button}
              style={styles.payButton}
            />
            <Button
              label={t('feedInscription.externalAlreadyPaid')}
              onPress={() => void confirmExternalEnrollment()}
              disabled={paying}
              accentColor={colors.textMuted}
              style={styles.payButton}
            />
          </View>
        ) : null}

        {canPayInApp ? (
          <Button
            label={
              paying
                ? t('feedInscription.paying')
                : t('feedInscription.payButton', {
                    price: String(priceAmount),
                    currency,
                  })
            }
            onPress={() => void handleCheckout(false)}
            disabled={paying}
            accentColor={colors.button}
            style={styles.payButton}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

export function FeedScreen({ kind, audience = 'public' }: FeedScreenProps) {
  const [feed, setFeed] = useState<FeedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [enrolledKeys, setEnrolledKeys] = useState<Set<MyFeedInscriptionKey>>(new Set());
  const { contentPaddingBottom } = useScreenInsets();
  const { colors } = useAppTheme();
  const { t } = useLocale();
  const { profile, firebaseEnabled, isAdmin } = useAuth();
  const { previewSanatorioId } = useSanatorioTheme();

  const viewerSanatorioId =
    (isAdmin ? previewSanatorioId : null)?.trim() || profile?.sanatorioId?.trim() || null;

  const emptyKey =
    audience === 'institution'
      ? kind === 'cursos'
        ? 'feed.cursosInstitutionEmpty'
        : 'feed.congresosInstitutionEmpty'
      : kind === 'cursos'
        ? 'feed.cursosEmpty'
        : 'feed.congresosEmpty';

  const refreshEnrollments = useCallback(async () => {
    if (!profile?.uid || !firebaseEnabled) {
      setEnrolledKeys(new Set());
      return;
    }
    try {
      const keys = await listMyApprovedFeedInscriptionKeys(profile.uid);
      setEnrolledKeys(keys);
    } catch {
      // Si falla la query, no bloqueamos el feed.
    }
  }, [firebaseEnabled, profile?.uid]);

  const refresh = useCallback(async () => {
    const data = await loadFeed(kind, {
      audience,
      sanatorioId: audience === 'institution' ? viewerSanatorioId : null,
    });
    setFeed(data);
    await refreshEnrollments();
  }, [audience, kind, refreshEnrollments, viewerSanatorioId]);

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

  function markEnrolled(itemId: string) {
    setEnrolledKeys((prev) => {
      const next = new Set(prev);
      next.add(inscriptionKey(kind, itemId));
      return next;
    });
    void refresh();
  }

  if (loading) {
    return (
      <ScreenContainer centered>
        <ActivityIndicator color={colors.button} />
      </ScreenContainer>
    );
  }

  if (!feed) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('common.loadError')}</Typography>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.button} />
        }>
        {feed.items.length > 0 ? (
          <View style={styles.list}>
            {feed.items.map((item) => (
              <FeedItemCard
                key={item.id}
                item={item}
                kind={kind}
                audience={audience}
                viewerSanatorioId={viewerSanatorioId}
                enrolled={enrolledKeys.has(inscriptionKey(kind, item.id))}
                onEnrolled={markEnrolled}
              />
            ))}
          </View>
        ) : (
          <View style={[styles.empty, { borderColor: colors.border, backgroundColor: colors.backgroundSoft }]}>
            <Typography variant="bodyMedium" color={colors.text}>
              {t(emptyKey)}
            </Typography>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  scroll: {
    gap: spacing.md,
  },
  empty: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  list: {
    gap: spacing.md,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: palette.backgroundSoft,
  },
  cardContent: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  captionPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  alertBanner: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cardBody: {
    marginTop: spacing.xs,
  },
  link: {
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  payButton: {
    marginTop: spacing.sm,
    alignSelf: 'stretch',
  },
  externalActions: {
    gap: spacing.xs,
    marginTop: spacing.xs,
    alignSelf: 'stretch',
  },
  paymentMethodBox: {
    alignSelf: 'stretch',
    marginTop: spacing.xs,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
});
