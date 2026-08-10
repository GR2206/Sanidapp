import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { SoftErrorBoundary } from '@/components/ui/SoftErrorBoundary';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import {
  dismissAppUpdatePrompt,
  openStoreForUpdate,
  resolveAppUpdatePrompt,
  type AppUpdatePrompt,
} from '@/services/appUpdate/appUpdateService';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

function AppUpdateModalInner() {
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const { isReady } = useAuth();
  const [prompt, setPrompt] = useState<AppUpdatePrompt | null>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;
    void resolveAppUpdatePrompt(locale)
      .then((next) => {
        if (!cancelled) setPrompt(next);
      })
      .catch(() => {
        if (!cancelled) setPrompt(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isReady, locale]);

  const onUpdate = useCallback(async () => {
    setOpening(true);
    try {
      hapticLight();
      await openStoreForUpdate();
    } catch {
      // silencioso: el usuario puede reintentar
    } finally {
      setOpening(false);
    }
  }, []);

  const onDismiss = useCallback(async () => {
    if (!prompt || prompt.forceUpdate) return;
    hapticLight();
    await dismissAppUpdatePrompt(prompt.latestVersion);
    setPrompt(null);
  }, [prompt]);

  if (!prompt) {
    return null;
  }

  const storeLabel =
    Platform.OS === 'ios' ? t('appUpdate.openAppStore') : t('appUpdate.openPlayStore');

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={prompt.forceUpdate ? undefined : onDismiss}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.borderStrong },
          ]}>
          <View style={[styles.iconWrap, { backgroundColor: colors.backgroundSoft }]}>
            <MaterialCommunityIcons name="cellphone-arrow-down" size={28} color={colors.button} />
          </View>

          <Typography variant="title" style={{ color: colors.text, textAlign: 'center' }}>
            {t('appUpdate.title')}
          </Typography>

          <Typography
            variant="body"
            style={{ color: colors.textSecondary, textAlign: 'center' }}>
            {prompt.message ?? t('appUpdate.body', { version: prompt.latestVersion })}
          </Typography>

          <Typography variant="caption" style={{ color: colors.textMuted, textAlign: 'center' }}>
            {t('appUpdate.versionLine', {
              current: prompt.currentVersion,
              latest: prompt.latestVersion,
            })}
          </Typography>

          <Button
            label={opening ? t('appUpdate.opening') : t('appUpdate.update')}
            disabled={opening}
            onPress={() => {
              void onUpdate();
            }}
          />

          <Typography variant="caption" style={{ color: colors.textMuted, textAlign: 'center' }}>
            {storeLabel}
          </Typography>

          {!prompt.forceUpdate ? (
            <Pressable accessibilityRole="button" onPress={() => void onDismiss()} hitSlop={8}>
              <Typography
                variant="bodyMedium"
                style={{ color: colors.textSecondary, textAlign: 'center' }}>
                {t('common.notNow')}
              </Typography>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

export function AppUpdateModal() {
  return (
    <SoftErrorBoundary>
      <AppUpdateModalInner />
    </SoftErrorBoundary>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    rowGap: spacing.md,
  },
  iconWrap: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
