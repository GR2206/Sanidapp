import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  KeyboardAwareScrollScreen,
  scrollAuthFieldIntoView,
} from '@/components/layout/KeyboardAwareScrollScreen';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/LogoMark';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { resolveMessage } from '@/i18n/resolveMessage';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function ForgotPasswordScreen() {
  const { firebaseEnabled, resetPassword } = useAuth();
  const { locale, t } = useLocale();
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const emailParam = Array.isArray(params.email) ? params.email[0] : params.email;
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const emailFieldRef = useRef<View>(null);

  const [email, setEmail] = useState(emailParam?.trim() ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (emailParam?.trim()) {
      setEmail(emailParam.trim());
    }
  }, [emailParam]);

  function focusField(fieldRef: RefObject<View | null>) {
    const delay = Platform.OS === 'android' ? 80 : 60;
    setTimeout(() => {
      scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRef);
    }, delay);
  }

  async function handleSubmit() {
    setError(null);
    if (!email.trim()) {
      setError(t('auth.errors.emailRequired'));
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('auth.login.resetFailed'),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAwareScrollScreen
          scrollRef={scrollRef}
          scrollYRef={scrollYRef}
          centerWhenIdle
          contentContainerStyle={styles.scroll}>
          <LogoMark size={72} showTitle title="SANIDAPP" />

          <View style={styles.form}>
            <Typography variant="subtitle" style={styles.heading}>
              {t('auth.forgot.title')}
            </Typography>
            <Typography variant="caption" style={styles.subtitle}>
              {sent ? t('auth.forgot.sentBody', { email: email.trim().toLowerCase() }) : t('auth.forgot.subtitle')}
            </Typography>

            {!sent ? (
              <>
                <View ref={emailFieldRef} collapsable={false}>
                  <TextField
                    label={t('auth.fields.email')}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    onFocus={() => focusField(emailFieldRef)}
                  />
                </View>

                {error ? (
                  <Typography variant="caption" color={palette.accent} style={styles.feedback}>
                    {error}
                  </Typography>
                ) : null}

                <Button
                  label={loading ? t('auth.forgot.submitting') : t('auth.forgot.submit')}
                  onPress={() => void handleSubmit()}
                  disabled={!firebaseEnabled || loading || !email.trim()}
                />
              </>
            ) : (
              <>
                <Typography variant="caption" style={styles.hint}>
                  {t('auth.forgot.sentHint')}
                </Typography>
                <Button
                  label={t('auth.forgot.backToLogin')}
                  onPress={() => router.replace(ROUTES.login)}
                />
                <Pressable
                  onPress={() => {
                    setSent(false);
                    setError(null);
                  }}>
                  <Typography variant="caption" style={styles.link}>
                    {t('auth.forgot.resend')}
                  </Typography>
                </Pressable>
              </>
            )}

            {!sent ? (
              <Pressable onPress={() => router.replace(ROUTES.login)}>
                <Typography variant="bodyMedium" style={styles.link}>
                  {t('auth.forgot.backToLogin')}
                </Typography>
              </Pressable>
            ) : null}
          </View>

          {!firebaseEnabled ? <ActivityIndicator color={palette.accent} /> : null}
        </KeyboardAwareScrollScreen>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background },
  safe: { flex: 1 },
  scroll: { gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: 0 },
  form: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  heading: { textAlign: 'center', color: palette.accent, fontSize: 18 },
  subtitle: { textAlign: 'center', color: palette.textMuted, marginBottom: spacing.xs },
  hint: { textAlign: 'center', color: palette.textSecondary },
  feedback: { textAlign: 'center' },
  link: { textAlign: 'center', color: palette.accent, marginTop: spacing.xs },
});
