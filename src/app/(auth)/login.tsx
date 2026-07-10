import { Link, router } from 'expo-router';
import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
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
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const splashBackground = require('../../../assets/images/splash-background.png');

export default function LoginScreen() {
  const { isReady, isAuthenticated, firebaseEnabled, login, resetPassword } = useAuth();
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
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace(ROUTES.home);
    }
  }, [isAuthenticated, isReady]);

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

  async function handleResetPassword() {
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError(t('auth.errors.emailRequiredForReset'));
      return;
    }

    setResetting(true);

    try {
      await resetPassword(email);
      setSuccess(t('auth.resetSuccess', { email: email.trim().toLowerCase() }));
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('auth.login.resetFailed');
      setError(message);
    } finally {
      setResetting(false);
    }
  }

  return (
    <View style={styles.root}>
      <ImageBackground source={splashBackground} style={styles.background} resizeMode="cover">
        <SafeAreaView style={styles.safe}>
          <KeyboardAwareScrollScreen
            scrollRef={scrollRef}
            scrollYRef={scrollYRef}
            centerWhenIdle
            contentContainerStyle={styles.scroll}>
            <LogoMark size={112} showTitle title="SANIDAPP" />

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

              <Pressable
                onPress={() => void handleResetPassword()}
                disabled={!firebaseEnabled || resetting}>
                <Typography variant="caption" style={styles.forgotPassword}>
                  {resetting ? t('auth.login.sendingEmail') : t('auth.login.forgotPassword')}
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

            {!isReady ? <ActivityIndicator color={palette.accent} /> : null}
          </KeyboardAwareScrollScreen>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  background: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  heading: {
    textAlign: 'center',
    color: palette.accent,
    marginBottom: spacing.sm,
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
});
