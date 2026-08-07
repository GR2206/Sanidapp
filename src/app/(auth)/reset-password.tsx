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
import { useLocale } from '@/contexts/LocaleContext';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  completePasswordReset,
  verifyPasswordResetOobCode,
} from '@/services/firebase/authService';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function ResetPasswordScreen() {
  const { locale, t } = useLocale();
  const params = useLocalSearchParams<{ oobCode?: string | string[] }>();
  const oobCodeRaw = params.oobCode;
  const oobCode = (Array.isArray(oobCodeRaw) ? oobCodeRaw[0] : oobCodeRaw)?.trim() ?? '';

  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const passwordFieldRef = useRef<View>(null);
  const confirmFieldRef = useRef<View>(null);

  const [email, setEmail] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(Boolean(oobCode));
  const [codeInvalid, setCodeInvalid] = useState(!oobCode);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!oobCode) {
      setVerifying(false);
      setCodeInvalid(true);
      setError(t('auth.errors.resetCodeMissing'));
      return;
    }
    setVerifying(true);
    setCodeInvalid(false);
    void verifyPasswordResetOobCode(oobCode)
      .then((mail) => {
        if (!cancelled) {
          setEmail(mail);
          setError(null);
          setCodeInvalid(false);
        }
      })
      .catch((cause) => {
        if (!cancelled) {
          setCodeInvalid(true);
          setError(
            cause instanceof Error
              ? resolveMessage(cause.message, locale)
              : t('auth.errors.resetCodeInvalid'),
          );
        }
      })
      .finally(() => {
        if (!cancelled) setVerifying(false);
      });
    return () => {
      cancelled = true;
    };
  }, [oobCode, locale, t]);

  function focusField(fieldRef: RefObject<View | null>) {
    const delay = Platform.OS === 'android' ? 80 : 60;
    setTimeout(() => {
      scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRef);
    }, delay);
  }

  async function handleSubmit() {
    setError(null);
    if (password.length < 6) {
      setError(t('auth.errors.weakPassword'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'));
      return;
    }
    setLoading(true);
    try {
      await completePasswordReset(oobCode, password);
      setDone(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('auth.reset.failed'),
      );
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    Boolean(oobCode) && !verifying && !codeInvalid && Boolean(email) && password.length >= 6 && confirmPassword.length >= 6;

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
              {t('auth.reset.title')}
            </Typography>

            {verifying ? (
              <ActivityIndicator color={palette.accent} />
            ) : done ? (
              <>
                <Typography variant="caption" style={styles.subtitle}>
                  {t('auth.reset.success')}
                </Typography>
                <Button
                  label={t('auth.reset.goLogin')}
                  onPress={() => router.replace(ROUTES.login)}
                />
              </>
            ) : (
              <>
                <Typography variant="caption" style={styles.subtitle}>
                  {email
                    ? t('auth.reset.subtitleWithEmail', { email })
                    : t('auth.reset.subtitle')}
                </Typography>

                {email && !codeInvalid ? (
                  <>
                    <View ref={passwordFieldRef} collapsable={false}>
                      <TextField
                        label={t('auth.reset.newPassword')}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        textContentType="newPassword"
                        autoComplete="password-new"
                        onFocus={() => focusField(passwordFieldRef)}
                      />
                    </View>
                    <View ref={confirmFieldRef} collapsable={false}>
                      <TextField
                        label={t('auth.reset.confirmPassword')}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showPassword}
                        textContentType="newPassword"
                        onFocus={() => focusField(confirmFieldRef)}
                      />
                    </View>
                    <Pressable onPress={() => setShowPassword((v) => !v)}>
                      <Typography variant="caption" style={styles.link}>
                        {showPassword
                          ? t('auth.register.hidePasswords')
                          : t('auth.register.showPasswords')}
                      </Typography>
                    </Pressable>
                  </>
                ) : null}

                {error ? (
                  <Typography variant="caption" color={palette.accent} style={styles.feedback}>
                    {error}
                  </Typography>
                ) : null}

                {email && !codeInvalid ? (
                  <Button
                    label={loading ? t('auth.reset.submitting') : t('auth.reset.submit')}
                    onPress={() => void handleSubmit()}
                    disabled={!canSubmit || loading}
                  />
                ) : (
                  <Button
                    label={t('auth.forgot.backToLogin')}
                    onPress={() => router.replace(ROUTES.login)}
                  />
                )}

                <Pressable onPress={() => router.replace(ROUTES.forgotPassword)}>
                  <Typography variant="caption" style={styles.linkCenter}>
                    {t('auth.reset.requestAgain')}
                  </Typography>
                </Pressable>
              </>
            )}
          </View>
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
  subtitle: { textAlign: 'center', color: palette.textMuted },
  feedback: { textAlign: 'center' },
  link: { textAlign: 'right', color: palette.accent },
  linkCenter: { textAlign: 'center', color: palette.accent, marginTop: spacing.xs },
});
