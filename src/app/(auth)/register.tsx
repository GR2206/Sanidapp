import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SanatorioSelect } from '@/components/auth/SanatorioSelect';
import {
  KeyboardAwareScrollScreen,
  scrollAuthFieldIntoView,
} from '@/components/layout/KeyboardAwareScrollScreen';
import { Button } from '@/components/ui/Button';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { LogoMark } from '@/components/ui/LogoMark';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { REGISTRATION_TYPES, registrationRequiresSanatorio } from '@/constants/registration';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { resolveMessage } from '@/i18n/resolveMessage';
import { getLocalSanatorios } from '@/services/firebase/authService';
import type { RegistrationType } from '@/types/auth';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

type RegisterFieldId =
  | 'nombre'
  | 'apellido'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'profesion';

export default function RegisterScreen() {
  const { firebaseEnabled, register } = useAuth();
  const { locale, t } = useLocale();
  const { registrationType: registrationTypeLabel } = useAppLabels();
  const sanatorios = getLocalSanatorios();

  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const activeFieldRef = useRef<RegisterFieldId | null>(null);

  const nombreFieldRef = useRef<View>(null);
  const apellidoFieldRef = useRef<View>(null);
  const emailFieldRef = useRef<View>(null);
  const passwordFieldRef = useRef<View>(null);
  const confirmPasswordFieldRef = useRef<View>(null);
  const profesionFieldRef = useRef<View>(null);

  const fieldRefs = {
    nombre: nombreFieldRef,
    apellido: apellidoFieldRef,
    email: emailFieldRef,
    password: passwordFieldRef,
    confirmPassword: confirmPasswordFieldRef,
    profesion: profesionFieldRef,
  } as const;

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profesion, setProfesion] = useState('');
  const [registrationType, setRegistrationType] = useState<RegistrationType>('institutional');
  const [sanatorioId, setSanatorioId] = useState(sanatorios[0]?.id ?? '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showSanatorioPicker = registrationRequiresSanatorio(registrationType);
  const isPremiumSignup = registrationType === 'premium';

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const subscription = Keyboard.addListener(showEvent, () => {
      const fieldId = activeFieldRef.current;
      if (!fieldId) {
        return;
      }

      const delay = Platform.OS === 'android' ? 280 : 140;
      setTimeout(() => {
        scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRefs[fieldId], spacing.xxl);
      }, delay);
    });

    return () => subscription.remove();
  }, []);

  function focusField(fieldId: RegisterFieldId, extraGap: number = spacing.lg) {
    activeFieldRef.current = fieldId;

    const delay = Platform.OS === 'android' ? 80 : 60;
    setTimeout(() => {
      scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRefs[fieldId], extraGap);

      if (fieldId === 'confirmPassword' || fieldId === 'profesion') {
        scrollRef.current?.scrollToEnd({ animated: true });
      }
    }, delay);
  }

  async function handleRegister() {
    setError(null);

    if (password !== confirmPassword) {
      setError(t('auth.errors.passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      await register({
        nombre,
        apellido,
        email,
        password,
        profesion,
        registrationType,
        sanatorioId: showSanatorioPicker ? sanatorioId : '',
      });
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('auth.errors.registerFailed');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    firebaseEnabled &&
    nombre &&
    apellido &&
    email &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword &&
    profesion &&
    (showSanatorioPicker ? Boolean(sanatorioId) : true);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollScreen
        scrollRef={scrollRef}
        scrollYRef={scrollYRef}
        contentContainerStyle={styles.scroll}>
        <LogoMark size={88} showTitle title="SANIDAPP" />

        <View style={styles.form}>
          <Typography variant="subtitle" style={styles.heading}>
            {t('auth.register.title')}
          </Typography>

          <LanguagePicker variant="field" />

          <View style={styles.typeRow}>
            {REGISTRATION_TYPES.map((typeId) => {
              const selected = typeId === registrationType;
              return (
                <Pressable
                  key={typeId}
                  onPress={() => setRegistrationType(typeId)}
                  style={[styles.typeCard, selected && styles.typeCardSelected]}>
                  <Typography
                    variant="caption"
                    style={[styles.typeTitle, selected && styles.typeTitleSelected]}>
                    {registrationTypeLabel(typeId)}
                  </Typography>
                </Pressable>
              );
            })}
          </View>

          {showSanatorioPicker ? (
            <SanatorioSelect sanatorios={sanatorios} value={sanatorioId} onChange={setSanatorioId} />
          ) : null}

          <View ref={nombreFieldRef} collapsable={false}>
            <TextField
              label={t('auth.fields.nombre')}
              value={nombre}
              onChangeText={setNombre}
              onFocus={() => focusField('nombre')}
            />
          </View>

          <View ref={apellidoFieldRef} collapsable={false}>
            <TextField
              label={t('auth.fields.apellido')}
              value={apellido}
              onChangeText={setApellido}
              onFocus={() => focusField('apellido')}
            />
          </View>

          <View ref={emailFieldRef} collapsable={false}>
            <TextField
              label={t('auth.fields.email')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => focusField('email')}
            />
          </View>

          <View ref={passwordFieldRef} collapsable={false}>
            <TextField
              label={t('auth.register.passwordHint')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => focusField('password')}
            />
          </View>

          <View ref={confirmPasswordFieldRef} collapsable={false}>
            <TextField
              label={t('auth.register.confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              onFocus={() => focusField('confirmPassword', spacing.xxxl)}
            />
          </View>

          <Pressable onPress={() => setShowPassword((value) => !value)}>
            <Typography variant="caption" style={styles.togglePassword}>
              {showPassword ? t('auth.register.hidePasswords') : t('auth.register.showPasswords')}
            </Typography>
          </Pressable>

          <View ref={profesionFieldRef} collapsable={false}>
            <TextField
              label={t('auth.fields.profesion')}
              value={profesion}
              onChangeText={setProfesion}
              placeholder={t('auth.register.professionPlaceholder')}
              onFocus={() => focusField('profesion', spacing.xxxl)}
            />
          </View>

          {error ? (
            <Typography variant="caption" color={palette.accent} style={styles.error}>
              {error}
            </Typography>
          ) : null}

          <Button
            label={
              loading
                ? t('auth.register.submitting')
                : isPremiumSignup
                  ? t('auth.register.submitPremium')
                  : t('auth.register.submit')
            }
            onPress={handleRegister}
            disabled={!canSubmit || loading}
          />

          <Pressable onPress={() => router.replace(ROUTES.login)}>
            <Typography variant="bodyMedium" style={styles.loginLink}>
              {t('auth.register.loginLink')}
            </Typography>
          </Pressable>
        </View>
      </KeyboardAwareScrollScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: {
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  form: {
    backgroundColor: palette.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  heading: {
    textAlign: 'center',
    color: palette.accent,
    marginBottom: spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  typeCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    backgroundColor: palette.background,
  },
  typeCardSelected: {
    borderColor: palette.accent,
    backgroundColor: palette.backgroundSoft,
  },
  typeTitle: {
    textAlign: 'center',
    color: palette.text,
    lineHeight: 16,
  },
  typeTitleSelected: {
    color: palette.accent,
  },
  error: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  loginLink: {
    textAlign: 'center',
    color: palette.accent,
    marginTop: spacing.sm,
  },
  togglePassword: {
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    textAlign: 'right',
    color: palette.accent,
  },
});
