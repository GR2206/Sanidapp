import { router } from 'expo-router';
import * as Linking from 'expo-linking';
import { useRef, useState, type RefObject } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import {
  KeyboardAwareScrollScreen,
  scrollAuthFieldIntoView,
} from '@/components/layout/KeyboardAwareScrollScreen';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { APP_CONFIG } from '@/constants/config';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export default function ContactoScreen() {
  const { t } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { contentPaddingBottom } = useScreenInsets();
  const email = APP_CONFIG.contactEmail.trim();

  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const nameRef = useRef<View>(null);
  const institutionRef = useRef<View>(null);
  const cityRef = useRef<View>(null);
  const notesRef = useRef<View>(null);

  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState<string | undefined>();
  const [institutionError, setInstitutionError] = useState<string | undefined>();

  const fieldStyle = {
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    fontFamily: fonts.regular,
  };

  function focusField(fieldRef: RefObject<View | null>) {
    scrollAuthFieldIntoView(scrollRef, scrollYRef, fieldRef, spacing.xl);
  }

  async function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedInstitution = institution.trim();
    let valid = true;

    if (!trimmedName) {
      setNameError(t('contact.form.nameRequired'));
      valid = false;
    } else {
      setNameError(undefined);
    }

    if (!trimmedInstitution) {
      setInstitutionError(t('contact.form.institutionRequired'));
      valid = false;
    } else {
      setInstitutionError(undefined);
    }

    if (!valid || !email) {
      return;
    }

    const lines = [
      `${t('contact.form.mailName')}: ${trimmedName}`,
      `${t('contact.form.mailInstitution')}: ${trimmedInstitution}`,
      `${t('contact.form.mailCity')}: ${city.trim() || '—'}`,
      `${t('contact.form.mailNotes')}:`,
      notes.trim() || '—',
    ];
    const subject = encodeURIComponent(t('contact.form.mailSubject'));
    const body = encodeURIComponent(lines.join('\n'));
    const url = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(t('contact.form.submit'), t('contact.form.mailOpenError', { email }));
    }
  }

  return (
    <ScreenContainer safe style={styles.screen}>
      <KeyboardAwareScrollScreen
        scrollRef={scrollRef}
        scrollYRef={scrollYRef}
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom }]}>
        <Typography variant="body" color={colors.textSecondary}>
          {t('contact.intro')}
        </Typography>

        <Pressable
          onPress={() => {
            hapticLight();
            router.push('/conocenos');
          }}
          accessibilityRole="link">
          <Typography variant="bodyMedium" color={colors.textAccent} style={styles.link}>
            {t('contact.aboutLink')}
          </Typography>
        </Pressable>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
          ]}>
          <View ref={nameRef} collapsable={false}>
            <TextField
              label={t('contact.form.name')}
              value={name}
              onChangeText={(value) => {
                setName(value);
                if (nameError) setNameError(undefined);
              }}
              placeholder={t('contact.form.namePlaceholder')}
              error={nameError}
              autoCapitalize="words"
              onFocus={() => focusField(nameRef)}
              style={fieldStyle}
            />
          </View>

          <View ref={institutionRef} collapsable={false}>
            <TextField
              label={t('contact.form.institution')}
              value={institution}
              onChangeText={(value) => {
                setInstitution(value);
                if (institutionError) setInstitutionError(undefined);
              }}
              placeholder={t('contact.form.institutionPlaceholder')}
              error={institutionError}
              onFocus={() => focusField(institutionRef)}
              style={fieldStyle}
            />
          </View>

          <View ref={cityRef} collapsable={false}>
            <TextField
              label={t('contact.form.city')}
              value={city}
              onChangeText={setCity}
              placeholder={t('contact.form.cityPlaceholder')}
              onFocus={() => focusField(cityRef)}
              style={fieldStyle}
            />
          </View>

          <View ref={notesRef} collapsable={false}>
            <TextField
              label={t('contact.form.notes')}
              value={notes}
              onChangeText={setNotes}
              placeholder={t('contact.form.notesPlaceholder')}
              multiline
              textAlignVertical="top"
              onFocus={() => focusField(notesRef)}
              style={[fieldStyle, styles.notes]}
            />
          </View>

          <Button
            label={t('contact.form.submit')}
            accentColor={colors.button}
            onPress={() => {
              void handleSubmit();
            }}
            style={styles.button}
          />

          {email ? (
            <Typography variant="caption" color={colors.textMuted} style={styles.fallback}>
              {t('contact.emailFallback', { email })}
            </Typography>
          ) : null}
        </View>
      </KeyboardAwareScrollScreen>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  content: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  link: {
    textDecorationLine: 'underline',
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  notes: {
    minHeight: 96,
    paddingTop: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
  },
  fallback: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
