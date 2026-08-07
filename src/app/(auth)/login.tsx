import { Link, router } from 'expo-router';
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
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { LogoMark } from '@/components/ui/LogoMark';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { ROUTES } from '@/constants/routes';
import { resolveMessage } from '@/i18n/resolveMessage';
import { resolvePostAuthHref } from '@/services/meeting/meetingDeepLink';
import { loadPublicAppStats } from '@/services/stats/publicAppStatsService';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

function formatUserCount(value: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale === 'pt-BR' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-AR').format(
      value,
    );
  } catch {
    return String(value);
  }
}

export default function LoginScreen() {
  const { isReady, isAuthenticated, firebaseEnabled, login } = useAuth();
  const { locale, t } = useLocale();
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const emailFieldRef = useRef<View>(null);
  const passwordFieldRef = useRef<View>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<number | null>(null);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      void resolvePostAuthHref(ROUTES.home as never).then((href) => {
        router.replace(href);
      });
    }
  }, [isAuthenticated, isReady]);

  useEffect(() => {
    if (!firebaseEnabled) return;
    let cancelled = false;
    void loadPublicAppStats().then((stats) => {
      if (!cancelled && stats && stats.registeredUsers > 0) {
        setRegisteredUsers(stats.registeredUsers);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [firebaseEnabled]);

  function focusField(fieldRef: RefObject<View | null>) {
    const delay = Platform.OS === 'android' ? 80 : 60;
    setTimeout(() => {
      scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRef);
    }, delay);
  }

  async function handleLogin() {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('auth.errors.loginFailed');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function openForgotPassword() {
    const trimmed = email.trim();
    if (trimmed) {
      router.push({ pathname: ROUTES.forgotPassword, params: { email: trimmed } });
      return;
    }
    router.push(ROUTES.forgotPassword);
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAwareScrollScreen
          scrollRef={scrollRef}
          scrollYRef={scrollYRef}
          centerWhenIdle
          contentContainerStyle={styles.scroll}>
          <LogoMark size={88} showTitle title="SANIDAPP" />

          <View style={styles.form}>
            <Typography variant="subtitle" style={styles.heading}>
              {t('auth.login.title')}
            </Typography>

            {!firebaseEnabled ? (
              <Typography variant="caption" style={styles.hint}>
                {t('auth.login.firebasePendingConfigure')}
              </Typography>
            ) : null}

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

            <View ref={passwordFieldRef} collapsable={false}>
              <TextField
                label={t('auth.fields.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                textContentType="password"
                autoComplete="password"
                onFocus={() => focusField(passwordFieldRef)}
              />
            </View>

            <LanguagePicker variant="field" />

            <Pressable onPress={() => setShowPassword((value) => !value)}>
              <Typography variant="caption" style={styles.togglePassword}>
                {showPassword ? t('auth.login.hidePassword') : t('auth.login.showPassword')}
              </Typography>
            </Pressable>

            <Pressable onPress={openForgotPassword} disabled={!firebaseEnabled}>
              <Typography variant="caption" style={styles.forgotPassword}>
                {t('auth.login.forgotPassword')}
              </Typography>
            </Pressable>

            {error ? (
              <Typography variant="caption" color={palette.accent} style={styles.feedback}>
                {error}
              </Typography>
            ) : null}

            {success ? (
              <Typography variant="caption" style={styles.success}>
                {success}
              </Typography>
            ) : null}

            <Button
              label={loading ? t('auth.login.submitting') : t('auth.login.submit')}
              onPress={handleLogin}
              disabled={!firebaseEnabled || loading || !email || !password}
            />

            <Link href={ROUTES.register} asChild>
              <Typography variant="bodyMedium" style={styles.registerLink}>
                {t('auth.login.registerPrompt')}
              </Typography>
            </Link>
          </View>

          {registeredUsers != null ? (
            <View style={styles.statsBlock}>
              <Typography variant="bodyMedium" style={styles.statsCount}>
                {formatUserCount(registeredUsers, locale)}
              </Typography>
              <Typography variant="caption" style={styles.statsLabel}>
                {t('auth.login.usersCountLabel')}
              </Typography>
            </View>
          ) : null}

          {!isReady ? <ActivityIndicator color={palette.accent} /> : null}
        </KeyboardAwareScrollScreen>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background },
  safe: { flex: 1 },
  scroll: {
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
  },
  form: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  heading: {
    textAlign: 'center',
    color: palette.accent,
    marginBottom: spacing.xs,
    fontSize: 18,
  },
  hint: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  feedback: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  success: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: palette.accent,
  },
  registerLink: {
    textAlign: 'center',
    color: palette.accent,
    marginTop: spacing.sm,
  },
  togglePassword: {
    marginTop: -spacing.sm,
    textAlign: 'right',
    color: palette.accent,
  },
  forgotPassword: {
    textAlign: 'right',
    color: palette.accent,
    marginBottom: spacing.sm,
  },
  statsBlock: {
    alignItems: 'center',
    gap: 2,
    marginTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  statsCount: {
    color: palette.accent,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.4,
  },
  statsLabel: {
    textAlign: 'center',
    color: palette.textMuted,
    maxWidth: 300,
    fontSize: 12,
  },
});
