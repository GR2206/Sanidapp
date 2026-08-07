import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { APP_CONFIG } from '@/constants/config';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  getMyDocenteApplication,
  submitDocenteApplication,
  uploadDocenteCertificate,
} from '@/services/docente/docenteApplicationService';
import type { DocenteApplication } from '@/types/docente';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export function DocenteApplyScreen() {
  const { profile, firebaseEnabled, refreshProfile } = useAuth();
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { contentPaddingBottom } = useScreenInsets();
  const accent = FREE_QUICK_ACCESS_TONES.farmacologia;
  const elevated = freeElevatedCardStyle(true);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existing, setExisting] = useState<DocenteApplication | null>(null);
  const [universidad, setUniversidad] = useState('');
  const [tituloAcademico, setTituloAcademico] = useState('');
  const [areaCursos, setAreaCursos] = useState('');
  const [localCertUri, setLocalCertUri] = useState<string | null>(null);
  const [djAccepted, setDjAccepted] = useState(false);

  const reload = useCallback(async () => {
    if (!firebaseEnabled || !profile) {
      setExisting(null);
      return;
    }
    const item = await getMyDocenteApplication();
    setExisting(item);
  }, [firebaseEnabled, profile]);

  useEffect(() => {
    setLoading(true);
    reload()
      .catch(() => setExisting(null))
      .finally(() => setLoading(false));
  }, [reload]);

  async function pickCertificate() {
    hapticLight();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('docente.certPermission'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      allowsEditing: true,
    });
    if (result.canceled || !result.assets[0]?.uri) return;
    const asset = result.assets[0];
    const mime = asset.mimeType ?? '';
    if (mime && mime !== 'image/jpeg' && mime !== 'image/png') {
      Alert.alert(t('docente.certTypeError'));
      return;
    }
    setLocalCertUri(asset.uri);
  }

  async function notifyAdminByEmail(summary: string) {
    const subject = encodeURIComponent(t('docente.mailSubject'));
    const body = encodeURIComponent(summary);
    const url = `mailto:${APP_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    try {
      await Linking.openURL(url);
    } catch {
      // El aviso in-app / push alcanza; el mail es complemento.
    }
  }

  async function handleSubmit() {
    if (!profile) return;
    if (!universidad.trim() || !tituloAcademico.trim() || !areaCursos.trim()) {
      Alert.alert(t('docente.fieldsRequired'));
      return;
    }
    if (!localCertUri) {
      Alert.alert(t('docente.certRequired'));
      return;
    }
    if (!djAccepted) {
      Alert.alert(t('docente.djRequired'));
      return;
    }

    setSubmitting(true);
    try {
      hapticLight();
      const certificadoUrl = await uploadDocenteCertificate({
        uid: profile.uid,
        localUri: localCertUri,
      });
      await submitDocenteApplication({
        universidad: universidad.trim(),
        tituloAcademico: tituloAcademico.trim(),
        areaCursos: areaCursos.trim(),
        certificadoUrl,
        declaracionJurada: true,
      });
      await reload();
      await notifyAdminByEmail(
        [
          t('docente.mailBodyIntro'),
          `${profile.nombre} ${profile.apellido}`,
          profile.email,
          universidad.trim(),
          tituloAcademico.trim(),
          areaCursos.trim(),
          certificadoUrl,
        ].join('\n'),
      );
      Alert.alert(t('docente.submittedTitle'), t('docente.submittedBody'));
    } catch (cause) {
      Alert.alert(
        t('docente.submitError'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('docente.errors.submitFailed'),
          locale,
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!firebaseEnabled || !profile) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('docente.needLogin')}</Typography>
      </ScreenContainer>
    );
  }

  if (profile.canPublishFeeds) {
    return (
      <ScreenContainer centered>
        <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold, textAlign: 'center' }}>
          {t('docente.alreadyApproved')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted} style={{ textAlign: 'center' }}>
          {t('docente.alreadyApprovedHint')}
        </Typography>
      </ScreenContainer>
    );
  }

  if (loading) {
    return (
      <ScreenContainer centered>
        <ActivityIndicator color={colors.button} />
      </ScreenContainer>
    );
  }

  if (existing?.status === 'pending') {
    return (
      <ScreenContainer centered>
        <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold, textAlign: 'center' }}>
          {t('docente.pendingTitle')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted} style={{ textAlign: 'center' }}>
          {t('docente.pendingBody')}
        </Typography>
        <Button
          label={t('docente.refreshStatus')}
          onPress={() => {
            void refreshProfile?.();
            void reload();
          }}
          accentColor={colors.button}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom }]}
        keyboardShouldPersistTaps="handled">
        <Typography
          variant="label"
          style={{ color: accent.label, fontFamily: fonts.semiBold, letterSpacing: 0.5 }}>
          {t('docente.title')}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          {t('docente.subtitle')}
        </Typography>

        {existing?.status === 'rejected' ? (
          <View style={[styles.card, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
            <Typography variant="bodyMedium" style={{ color: accent.label, fontFamily: fonts.semiBold }}>
              {t('docente.rejectedTitle')}
            </Typography>
            <Typography variant="caption" color={colors.textSecondary}>
              {existing.rejectReason || t('docente.rejectedDefault')}
            </Typography>
            <Typography variant="caption" color={colors.textMuted}>
              {t('docente.rejectedRetry')}
            </Typography>
          </View>
        ) : null}

        <View style={[styles.card, elevated ?? { backgroundColor: colors.backgroundSoft }]}>
          <TextField
            label={t('docente.fields.universidad')}
            value={universidad}
            onChangeText={setUniversidad}
            placeholder={t('docente.placeholders.universidad')}
          />
          <TextField
            label={t('docente.fields.titulo')}
            value={tituloAcademico}
            onChangeText={setTituloAcademico}
            placeholder={t('docente.placeholders.titulo')}
          />
          <TextField
            label={t('docente.fields.area')}
            value={areaCursos}
            onChangeText={setAreaCursos}
            placeholder={t('docente.placeholders.area')}
          />

          <Typography variant="caption" color={colors.textSecondary}>
            {t('docente.fields.certificado')}
          </Typography>
          <Button
            label={localCertUri ? t('docente.certChange') : t('docente.certPick')}
            onPress={() => void pickCertificate()}
            accentColor={accent.icon}
          />
          {localCertUri ? (
            <Image source={{ uri: localCertUri }} style={styles.certPreview} contentFit="contain" />
          ) : null}

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: djAccepted }}
            onPress={() => {
              hapticLight();
              setDjAccepted((v) => !v);
            }}
            style={styles.checkRow}>
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: djAccepted ? accent.icon : colors.border,
                  backgroundColor: djAccepted ? accent.gradient[0] : 'transparent',
                },
              ]}>
              {djAccepted ? (
                <Typography variant="caption" style={{ color: accent.label, fontWeight: '700' }}>
                  ✓
                </Typography>
              ) : null}
            </View>
            <Typography variant="body" style={{ color: colors.text, flex: 1 }}>
              {t('docente.djText')}
            </Typography>
          </Pressable>

          <Button
            label={submitting ? t('docente.submitting') : t('docente.submit')}
            onPress={() => void handleSubmit()}
            disabled={submitting}
            accentColor={colors.button}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingVertical: spacing.sm },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.md },
  card: { borderRadius: 16, padding: spacing.md, gap: spacing.sm },
  certPreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
});
