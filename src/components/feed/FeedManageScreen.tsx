import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { FieldSelect } from '@/components/ui/FieldSelect';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { FeedExternalPaymentTermsModal } from '@/components/feed/FeedExternalPaymentTermsModal';
import { FeedPaymentBankModal } from '@/components/feed/FeedPaymentBankModal';
import { FeedPaymentCurrencyModal } from '@/components/feed/FeedPaymentCurrencyModal';
import { FeedPaymentStripeModal } from '@/components/feed/FeedPaymentStripeModal';
import { FeedPaymentTermsModal } from '@/components/feed/FeedPaymentTermsModal';
import { formatCbuCvuDisplay, isValidCbuCvuFormat } from '@/utils/cbuCvu';
import { isStripeFeedCurrency, parseFeedPriceMoney } from '@/utils/feedPrice';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useFeedManageAccess } from '@/hooks/useFeedVisibility';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  deleteFeedItem,
  loadFirestoreFeedPage,
  uploadFeedImage,
  upsertFeedItem,
} from '@/services/firebase/feedManageService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import type {
  FeedItem,
  FeedKind,
  FeedModalidad,
  FeedPaymentCurrency,
  FeedPaymentMode,
  FeedPublishScope,
} from '@/types/feed';
import { hapticLight } from '@/utils/haptics';

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  date: '',
  location: '',
  body: '',
  url: '',
  linkLabel: '',
  cupos: '',
  precio: '',
  modalidad: 'online' as FeedModalidad,
  finaliza: '',
  duracion: '',
  speakerPage: '',
  idioma: 'es',
  zonaHoraria: 'America/Argentina/Buenos_Aires',
  paymentMode: 'external' as FeedPaymentMode,
  paymentCurrency: 'ARS' as FeedPaymentCurrency,
  paymentTermsAccepted: false,
  paymentTermsAcceptedAt: '',
  payeeNombre: '',
  payeeApellido: '',
  payeeCbuCvu: '',
  stripeConnectAccountId: '',
  imageUrl: '',
};

function normalizeModalidad(value: string | undefined): FeedModalidad {
  if (value === 'presencial' || value === 'online' || value === 'presencial_online') {
    return value;
  }
  if (value === 'hibrida' || value === 'presencial/online') {
    return 'presencial_online';
  }
  return 'online';
}

export function FeedManageScreen() {
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { profile } = useAuth();
  const { canManage, scope: defaultScope, sanatorioName, canChooseScope, organizerSanatorioId, organizerSanatorioName } =
    useFeedManageAccess();
  const { contentPaddingBottom } = useScreenInsets();
  const elevated = freeElevatedCardStyle(true);

  const [kind, setKind] = useState<FeedKind>('cursos');
  const [publishAudience, setPublishAudience] = useState<'institution' | 'public'>(
    defaultScope?.type === 'global' ? 'public' : 'institution',
  );
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [localImageUri, setLocalImageUri] = useState<string | null>(null);
  const [paymentTermsOpen, setPaymentTermsOpen] = useState(false);
  const [externalPaymentTermsOpen, setExternalPaymentTermsOpen] = useState(false);
  const [paymentCurrencyOpen, setPaymentCurrencyOpen] = useState(false);
  const [paymentBankOpen, setPaymentBankOpen] = useState(false);
  const [paymentStripeOpen, setPaymentStripeOpen] = useState(false);

  const accent = FREE_QUICK_ACCESS_TONES.farmacologia;

  const scope: FeedPublishScope | null = useMemo(() => {
    if (!canManage) return null;
    if (publishAudience === 'institution' && organizerSanatorioId) {
      return { type: 'sanatorio', sanatorioId: organizerSanatorioId };
    }
    if (publishAudience === 'public' || defaultScope?.type === 'global') {
      return { type: 'global' };
    }
    return defaultScope;
  }, [canManage, defaultScope, organizerSanatorioId, publishAudience]);

  useEffect(() => {
    if (!canChooseScope) {
      setPublishAudience(defaultScope?.type === 'global' ? 'public' : 'institution');
    }
  }, [canChooseScope, defaultScope?.type]);

  const audienceOptions = useMemo(
    () => [
      { id: 'institution', label: t('feedManage.audienceInstitution') },
      { id: 'public', label: t('feedManage.audiencePublic') },
    ],
    [t],
  );

  const modalidadOptions = useMemo(
    () => [
      { id: 'presencial', label: t('feedManage.modalidad.presencial') },
      { id: 'online', label: t('feedManage.modalidad.online') },
      { id: 'presencial_online', label: t('feedManage.modalidad.presencial_online') },
    ],
    [t],
  );

  const idiomaOptions = useMemo(
    () => [
      { id: 'es', label: t('feedManage.idioma.es') },
      { id: 'en', label: t('feedManage.idioma.en') },
      { id: 'pt', label: t('feedManage.idioma.pt') },
      { id: 'es-en', label: t('feedManage.idioma.bilingual') },
    ],
    [t],
  );

  const timezoneOptions = useMemo(
    () => [
      { id: 'America/Argentina/Buenos_Aires', label: t('feedManage.tz.ar') },
      { id: 'America/Sao_Paulo', label: t('feedManage.tz.br') },
      { id: 'America/Mexico_City', label: t('feedManage.tz.mx') },
      { id: 'America/New_York', label: t('feedManage.tz.usEast') },
      { id: 'Europe/Madrid', label: t('feedManage.tz.es') },
      { id: 'UTC', label: t('feedManage.tz.utc') },
    ],
    [t],
  );

  const paymentOptions = useMemo(
    () => [
      { id: 'external', label: t('feedManage.payment.external') },
      { id: 'in_app', label: t('feedManage.payment.inApp') },
    ],
    [t],
  );

  const refresh = useCallback(async () => {
    if (!scope) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const page = await loadFirestoreFeedPage(scope, kind);
      setItems(page.items);
    } catch (cause) {
      Alert.alert(
        t('feedManage.loadError'),
        resolveMessage(cause instanceof Error ? cause.message : t('common.loadError'), locale),
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [kind, locale, scope, t]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const scopeLabel = useMemo(() => {
    if (!scope) return '';
    if (scope.type === 'global') {
      return organizerSanatorioId
        ? t('feedManage.scopeGlobalFromSanatorio', {
            name: organizerSanatorioName || organizerSanatorioId,
          })
        : t('feedManage.scopeGlobal');
    }
    return t('feedManage.scopeSanatorio', {
      name: sanatorioName || scope.sanatorioId,
    });
  }, [organizerSanatorioId, organizerSanatorioName, sanatorioName, scope, t]);

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setLocalImageUri(null);
  }

  function startEdit(item: FeedItem) {
    setEditingId(item.id);
    setForm({
      title: item.title ?? '',
      subtitle: item.subtitle ?? '',
      date: item.date ?? '',
      location: item.location ?? '',
      body: item.body ?? '',
      url: item.url ?? '',
      linkLabel: item.linkLabel ?? '',
      cupos: item.cupos ?? '',
      precio: item.precio ?? '',
      modalidad: normalizeModalidad(item.modalidad),
      finaliza: item.finaliza ?? '',
      duracion: item.duracion ?? '',
      speakerPage: item.speakerPage ?? '',
      idioma: item.idioma ?? 'es',
      zonaHoraria: item.zonaHoraria ?? 'America/Argentina/Buenos_Aires',
      paymentMode: item.paymentMode === 'in_app' ? 'in_app' : 'external',
      paymentCurrency:
        item.paymentCurrency === 'EUR' || item.paymentCurrency === 'USD' ? item.paymentCurrency : 'ARS',
      paymentTermsAccepted: Boolean(item.paymentTermsAcceptedAt) || item.paymentMode === 'in_app',
      paymentTermsAcceptedAt: item.paymentTermsAcceptedAt ?? '',
      payeeNombre: item.payeeNombre ?? '',
      payeeApellido: item.payeeApellido ?? '',
      payeeCbuCvu: item.payeeCbuCvu ?? '',
      stripeConnectAccountId: item.stripeConnectAccountId ?? '',
      imageUrl: item.imageUrl ?? '',
    });
    setLocalImageUri(null);
  }

  async function pickImage() {
    hapticLight();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('feedManage.imagePermissionTitle'), t('feedManage.imagePermissionBody'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.85,
    });

    if (result.canceled || !result.assets[0]?.uri) {
      return;
    }

    const asset = result.assets[0];
    const mime = asset.mimeType ?? '';
    if (mime && !mime.includes('jpeg') && !mime.includes('jpg') && !mime.includes('png')) {
      Alert.alert(t('feedManage.imageTypeTitle'), t('feedManage.imageTypeBody'));
      return;
    }

    setLocalImageUri(asset.uri);
  }

  async function handleSave() {
    if (!scope || !profile?.uid) return;
    if (!form.title.trim()) {
      Alert.alert(t('feedManage.titleRequired'));
      return;
    }

    const wantsInApp = form.paymentMode === 'in_app' && form.paymentTermsAccepted;
    const wantsExternal = form.paymentMode === 'external';
    const priceAmount = parseFeedPriceMoney(
      form.precio,
      wantsInApp && isStripeFeedCurrency(form.paymentCurrency) ? form.paymentCurrency : 'ARS',
    );
    const externalPaid = wantsExternal && priceAmount != null && priceAmount > 0;

    if (externalPaid && !form.paymentTermsAccepted) {
      Alert.alert(t('feedExternalPaymentTerms.incomplete'));
      setExternalPaymentTermsOpen(true);
      return;
    }
    if (externalPaid && !form.url.trim()) {
      Alert.alert(t('feedExternalPaymentTerms.urlRequired'));
      return;
    }

    const wantsStripe = wantsInApp && isStripeFeedCurrency(form.paymentCurrency);
    if (wantsInApp && wantsStripe) {
      if (!form.stripeConnectAccountId.trim() || !form.payeeNombre.trim() || !form.payeeApellido.trim()) {
        Alert.alert(t('feedPaymentStripe.incomplete'));
        setPaymentStripeOpen(true);
        return;
      }
    } else if (
      wantsInApp &&
      (!form.payeeNombre.trim() ||
        !form.payeeApellido.trim() ||
        !isValidCbuCvuFormat(form.payeeCbuCvu))
    ) {
      Alert.alert(t('feedPaymentBank.incomplete'));
      setPaymentBankOpen(true);
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.imageUrl.trim();
      if (localImageUri) {
        imageUrl = await uploadFeedImage({
          scope,
          kind,
          localUri: localImageUri,
          contentType: localImageUri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg',
        });
      }

      await upsertFeedItem(
        scope,
        kind,
        {
          id: editingId ?? undefined,
          title: form.title,
          subtitle: form.subtitle,
          date: form.date,
          location: form.location,
          body: form.body,
          url: form.url,
          linkLabel: form.linkLabel,
          cupos: form.cupos,
          precio: form.precio,
          modalidad: form.modalidad,
          finaliza: form.finaliza,
          duracion: form.duracion,
          speakerPage: form.speakerPage,
          idioma: form.idioma,
          zonaHoraria: form.zonaHoraria,
          paymentMode: wantsInApp ? 'in_app' : 'external',
          paymentCurrency: wantsInApp ? form.paymentCurrency : undefined,
          payeeNombre: wantsInApp ? form.payeeNombre.trim() : undefined,
          payeeApellido: wantsInApp ? form.payeeApellido.trim() : undefined,
          payeeCbuCvu: wantsInApp && !wantsStripe ? form.payeeCbuCvu.trim() : undefined,
          stripeConnectAccountId: wantsInApp && wantsStripe ? form.stripeConnectAccountId.trim() : undefined,
          paymentTermsAcceptedAt:
            wantsInApp || externalPaid
              ? form.paymentTermsAcceptedAt || new Date().toISOString()
              : undefined,
          imageUrl,
          organizerSanatorioId:
            scope.type === 'global' ? organizerSanatorioId || undefined : undefined,
          organizerSanatorioName:
            scope.type === 'global' ? organizerSanatorioName || undefined : undefined,
        },
        profile.uid,
      );

      resetForm();
      await refresh();
      Alert.alert(t('feedManage.saved'));
    } catch (cause) {
      Alert.alert(
        t('feedManage.saveError'),
        resolveMessage(cause instanceof Error ? cause.message : t('common.loadError'), locale),
      );
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(item: FeedItem) {
    if (!scope) return;
    Alert.alert(t('feedManage.deleteTitle'), t('feedManage.deleteBody', { title: item.title }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: () => {
          void (async () => {
            try {
              await deleteFeedItem(scope, kind, item.id);
              if (editingId === item.id) resetForm();
              await refresh();
            } catch (cause) {
              Alert.alert(
                t('feedManage.saveError'),
                resolveMessage(
                  cause instanceof Error ? cause.message : t('common.loadError'),
                  locale,
                ),
              );
            }
          })();
        },
      },
    ]);
  }

  if (!canManage || !scope) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('feedManage.forbidden')}</Typography>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Typography
          variant="label"
          style={{ color: accent.label, fontFamily: fonts.semiBold, letterSpacing: 0.5 }}>
          {scopeLabel}
        </Typography>

        {canChooseScope ? (
          <FieldSelect
            label={t('feedManage.audienceLabel')}
            value={publishAudience}
            options={audienceOptions}
            onChange={(value) => {
              setPublishAudience(value === 'public' ? 'public' : 'institution');
              resetForm();
            }}
          />
        ) : null}

        <Typography variant="caption" color={colors.textMuted} style={styles.hint}>
          {publishAudience === 'public' || scope.type === 'global'
            ? t('feedManage.hintPublic')
            : t('feedManage.hintInstitution')}
        </Typography>

        <View style={styles.kindRow}>
          {(['cursos', 'congresos'] as FeedKind[]).map((tab) => {
            const selected = kind === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => {
                  hapticLight();
                  setKind(tab);
                  resetForm();
                }}
                style={[
                  styles.kindChip,
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
                  {tab === 'cursos' ? t('drawer.cursos') : t('drawer.congresos')}
                </Typography>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.formCard, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
          <Typography
            variant="subtitle"
            style={{ color: FREE_QUICK_ACCESS_TONES.adulto.label, fontFamily: fonts.semiBold }}>
            {editingId ? t('feedManage.editItem') : t('feedManage.newItem')}
          </Typography>

          <TextField
            label={t('feedManage.fields.title')}
            value={form.title}
            onChangeText={(title) => setForm((prev) => ({ ...prev, title }))}
          />
          <TextField
            label={t('feedManage.fields.subtitle')}
            value={form.subtitle}
            onChangeText={(subtitle) => setForm((prev) => ({ ...prev, subtitle }))}
          />
          <TextField
            label={t('feedManage.fields.date')}
            value={form.date}
            onChangeText={(date) => setForm((prev) => ({ ...prev, date }))}
            placeholder="2026-08-15"
          />
          <TextField
            label={t('feedManage.fields.finaliza')}
            value={form.finaliza}
            onChangeText={(finaliza) => setForm((prev) => ({ ...prev, finaliza }))}
          />
          <TextField
            label={t('feedManage.fields.duracion')}
            value={form.duracion}
            onChangeText={(duracion) => setForm((prev) => ({ ...prev, duracion }))}
          />
          <TextField
            label={t('feedManage.fields.location')}
            value={form.location}
            onChangeText={(location) => setForm((prev) => ({ ...prev, location }))}
          />
          <TextField
            label={t('feedManage.fields.speakerPage')}
            value={form.speakerPage}
            onChangeText={(speakerPage) => setForm((prev) => ({ ...prev, speakerPage }))}
            autoCapitalize="none"
          />
          <TextField
            label={t('feedManage.fields.cupos')}
            value={form.cupos}
            onChangeText={(cupos) => setForm((prev) => ({ ...prev, cupos }))}
          />
          <TextField
            label={t('feedManage.fields.precio')}
            value={form.precio}
            onChangeText={(precio) => setForm((prev) => ({ ...prev, precio }))}
          />

          <FieldSelect
            label={t('feedManage.fields.modalidad')}
            value={form.modalidad}
            options={modalidadOptions}
            onChange={(modalidad) =>
              setForm((prev) => ({ ...prev, modalidad: modalidad as FeedModalidad }))
            }
          />
          <FieldSelect
            label={t('feedManage.fields.idioma')}
            value={form.idioma}
            options={idiomaOptions}
            onChange={(idioma) => setForm((prev) => ({ ...prev, idioma }))}
          />
          <FieldSelect
            label={t('feedManage.fields.zonaHoraria')}
            value={form.zonaHoraria}
            options={timezoneOptions}
            onChange={(zonaHoraria) => setForm((prev) => ({ ...prev, zonaHoraria }))}
          />

          {canManage ? (
            <FieldSelect
              label={t('feedManage.fields.paymentMode')}
              value={form.paymentMode}
              options={paymentOptions}
              onChange={(paymentMode) => {
                if (paymentMode === 'in_app') {
                  setPaymentTermsOpen(true);
                  return;
                }
                setExternalPaymentTermsOpen(true);
              }}
            />
          ) : null}

          {form.paymentMode === 'in_app' && form.payeeCbuCvu ? (
            <Pressable
              onPress={() => {
                hapticLight();
                setPaymentBankOpen(true);
              }}
              style={[
                styles.payeeCard,
                { backgroundColor: FREE_QUICK_ACCESS_TONES.neonatologia.gradient[0] },
              ]}>
              <Typography
                variant="caption"
                style={{
                  color: FREE_QUICK_ACCESS_TONES.neonatologia.label,
                  fontFamily: fonts.semiBold,
                }}>
                {t('feedPaymentBank.payeeSummary', {
                  nombre: form.payeeNombre,
                  apellido: form.payeeApellido,
                  cbu: formatCbuCvuDisplay(form.payeeCbuCvu),
                })}
              </Typography>
            </Pressable>
          ) : null}

          {form.paymentMode === 'in_app' && form.stripeConnectAccountId ? (
            <Pressable
              onPress={() => {
                hapticLight();
                setPaymentStripeOpen(true);
              }}
              style={[
                styles.payeeCard,
                { backgroundColor: FREE_QUICK_ACCESS_TONES.farmacologia.gradient[0] },
              ]}>
              <Typography
                variant="caption"
                style={{
                  color: FREE_QUICK_ACCESS_TONES.farmacologia.label,
                  fontFamily: fonts.semiBold,
                }}>
                {t('feedPaymentStripe.payeeSummary', {
                  currency: form.paymentCurrency,
                  account: form.stripeConnectAccountId.slice(0, 14),
                })}
              </Typography>
            </Pressable>
          ) : null}

          <TextField
            label={t('feedManage.fields.body')}
            value={form.body}
            onChangeText={(body) => setForm((prev) => ({ ...prev, body }))}
            multiline
            style={styles.multiline}
          />
          <TextField
            label={t('feedManage.fields.url')}
            value={form.url}
            onChangeText={(url) => setForm((prev) => ({ ...prev, url }))}
            autoCapitalize="none"
            keyboardType="url"
          />
          <TextField
            label={t('feedManage.fields.linkLabel')}
            value={form.linkLabel}
            onChangeText={(linkLabel) => setForm((prev) => ({ ...prev, linkLabel }))}
          />

          <Pressable
            onPress={() => void pickImage()}
            style={[
              styles.imagePicker,
              {
                borderColor: FREE_QUICK_ACCESS_TONES.pediatrico.icon,
                backgroundColor: FREE_QUICK_ACCESS_TONES.pediatrico.gradient[0],
              },
            ]}>
            {localImageUri || form.imageUrl ? (
              <Image
                source={{ uri: localImageUri || form.imageUrl }}
                style={styles.imagePreview}
                contentFit="cover"
              />
            ) : (
              <Typography
                variant="bodyMedium"
                style={{
                  color: FREE_QUICK_ACCESS_TONES.pediatrico.label,
                  fontFamily: fonts.semiBold,
                  textAlign: 'center',
                }}>
                {t('feedManage.addImage')}
              </Typography>
            )}
          </Pressable>

          <View style={styles.actions}>
            <Button
              label={saving ? t('feedManage.saving') : t('feedManage.save')}
              onPress={() => void handleSave()}
              disabled={saving}
              accentColor={colors.button}
            />
            {editingId ? (
              <Button
                label={t('feedManage.cancelEdit')}
                onPress={resetForm}
                accentColor={colors.textMuted}
              />
            ) : null}
          </View>
        </View>

        <Typography
          variant="label"
          style={{ color: FREE_QUICK_ACCESS_TONES.neonatologia.label, fontFamily: fonts.semiBold }}>
          {t('feedManage.published')}
        </Typography>

        {loading ? (
          <ActivityIndicator color={colors.button} />
        ) : items.length === 0 ? (
          <Typography variant="body" color={colors.textMuted}>
            {t('feedManage.emptyList')}
          </Typography>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={[styles.listCard, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
              <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
                {item.title}
              </Typography>
              {item.date ? (
                <Typography variant="caption" color={colors.textMuted}>
                  {item.date}
                </Typography>
              ) : null}
              <View style={styles.listActions}>
                <Pressable onPress={() => startEdit(item)}>
                  <Typography variant="caption" style={{ color: accent.icon, fontWeight: '700' }}>
                    {t('common.edit')}
                  </Typography>
                </Pressable>
                <Pressable onPress={() => handleDelete(item)}>
                  <Typography variant="caption" style={{ color: '#B91C1C', fontWeight: '700' }}>
                    {t('common.delete')}
                  </Typography>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <FeedPaymentTermsModal
        visible={paymentTermsOpen}
        onCancel={() => setPaymentTermsOpen(false)}
        onAccept={() => {
          setForm((prev) => ({
            ...prev,
            paymentMode: 'in_app',
            paymentTermsAccepted: true,
            paymentTermsAcceptedAt: new Date().toISOString(),
          }));
          setPaymentTermsOpen(false);
          setPaymentCurrencyOpen(true);
        }}
      />

      <FeedExternalPaymentTermsModal
        visible={externalPaymentTermsOpen}
        onCancel={() => setExternalPaymentTermsOpen(false)}
        onAccept={() => {
          setForm((prev) => ({
            ...prev,
            paymentMode: 'external',
            paymentCurrency: 'ARS',
            paymentTermsAccepted: true,
            paymentTermsAcceptedAt: new Date().toISOString(),
            payeeNombre: '',
            payeeApellido: '',
            payeeCbuCvu: '',
            stripeConnectAccountId: '',
          }));
          setExternalPaymentTermsOpen(false);
        }}
      />

      <FeedPaymentCurrencyModal
        visible={paymentCurrencyOpen}
        initial={form.paymentCurrency}
        onCancel={() => {
          setPaymentCurrencyOpen(false);
          if (!form.payeeCbuCvu && !form.stripeConnectAccountId) {
            setForm((prev) => ({
              ...prev,
              paymentMode: 'external',
              paymentTermsAccepted: false,
              paymentTermsAcceptedAt: '',
            }));
          }
        }}
        onConfirm={(currency) => {
          setForm((prev) => ({
            ...prev,
            paymentCurrency: currency,
            payeeCbuCvu: currency === 'ARS' ? prev.payeeCbuCvu : '',
            stripeConnectAccountId: currency === 'ARS' ? '' : prev.stripeConnectAccountId,
          }));
          setPaymentCurrencyOpen(false);
          if (currency === 'ARS') {
            setPaymentBankOpen(true);
          } else {
            setPaymentStripeOpen(true);
          }
        }}
      />

      <FeedPaymentBankModal
        visible={paymentBankOpen}
        initial={{
          payeeNombre: form.payeeNombre,
          payeeApellido: form.payeeApellido,
          payeeCbuCvu: form.payeeCbuCvu,
        }}
        onCancel={() => {
          setPaymentBankOpen(false);
          if (!form.payeeCbuCvu) {
            setForm((prev) => ({
              ...prev,
              paymentMode: 'external',
              paymentTermsAccepted: false,
              paymentTermsAcceptedAt: '',
            }));
          }
        }}
        onConfirm={(data) => {
          setForm((prev) => ({
            ...prev,
            paymentMode: 'in_app',
            paymentCurrency: 'ARS',
            paymentTermsAccepted: true,
            paymentTermsAcceptedAt: prev.paymentTermsAcceptedAt || new Date().toISOString(),
            payeeNombre: data.payeeNombre,
            payeeApellido: data.payeeApellido,
            payeeCbuCvu: data.payeeCbuCvu,
            stripeConnectAccountId: '',
          }));
          setPaymentBankOpen(false);
        }}
      />

      <FeedPaymentStripeModal
        visible={paymentStripeOpen}
        onCancel={() => {
          setPaymentStripeOpen(false);
          if (!form.stripeConnectAccountId) {
            setForm((prev) => ({
              ...prev,
              paymentMode: 'external',
              paymentTermsAccepted: false,
              paymentTermsAcceptedAt: '',
            }));
          }
        }}
        onConfirm={(data) => {
          setForm((prev) => ({
            ...prev,
            paymentMode: 'in_app',
            paymentCurrency: prev.paymentCurrency === 'USD' ? 'USD' : 'EUR',
            paymentTermsAccepted: true,
            paymentTermsAcceptedAt: prev.paymentTermsAcceptedAt || new Date().toISOString(),
            payeeNombre: data.payeeNombre,
            payeeApellido: data.payeeApellido,
            payeeCbuCvu: '',
            stripeConnectAccountId: data.stripeConnectAccountId,
          }));
          setPaymentStripeOpen(false);
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  hint: {
    lineHeight: 20,
  },
  kindRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  kindChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  formCard: {
    borderRadius: 18,
    padding: spacing.md,
    gap: spacing.sm,
  },
  multiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  imagePicker: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 16,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: spacing.md,
  },
  imagePreview: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  listCard: {
    borderRadius: 14,
    padding: spacing.md,
    gap: 4,
  },
  listActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  payeeCard: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
