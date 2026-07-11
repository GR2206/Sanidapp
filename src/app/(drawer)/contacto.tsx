import * as Linking from 'expo-linking';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { APP_CONFIG } from '@/constants/config';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';

export default function ContactoScreen() {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const email = APP_CONFIG.contactEmail.trim();

  const openMail = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  return (
    <ScreenContainer safe style={styles.screen}>
      <View style={styles.content}>
        <Typography variant="body" color={colors.textSecondary}>
          {t('contact.intro')}
        </Typography>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
          ]}>
          {email ? (
            <>
              <Typography variant="label" color={colors.textMuted}>
                {t('contact.emailLabel')}
              </Typography>
              <Typography variant="bodyMedium" color={colors.text}>
                {email}
              </Typography>
              <Button label={t('contact.sendEmail')} onPress={openMail} style={styles.button} />
            </>
          ) : (
            <>
              <Typography variant="bodyMedium" color={colors.text}>
                {t('common.comingSoon')}
              </Typography>
              <Typography variant="caption" color={colors.textMuted} style={styles.pending}>
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
    borderWidth: 1,
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
