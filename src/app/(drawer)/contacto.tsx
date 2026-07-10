import * as Linking from 'expo-linking';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { APP_CONFIG } from '@/constants/config';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

export default function ContactoScreen() {
  const { t } = useLocale();
  const email = APP_CONFIG.contactEmail.trim();

  const openMail = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <ScreenContainer safe style={styles.screen}>
      <View style={styles.content}>
        <Typography variant="body" color={palette.textSecondary}>
          {t('contact.intro')}
        </Typography>

        <View style={styles.card}>
          {email ? (
            <>
              <Typography variant="label">{t('contact.emailLabel')}</Typography>
              <Typography variant="bodyMedium">{email}</Typography>
              <Button label={t('contact.sendEmail')} onPress={openMail} style={styles.button} />
            </>
          ) : (
            <>
              <Typography variant="bodyMedium">{t('common.comingSoon')}</Typography>
              <Typography variant="caption" style={styles.pending}>
                {t('contact.comingSoonDetail')}
              </Typography>
            </>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pending: {
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.md,
  },
});
