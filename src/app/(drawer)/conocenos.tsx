import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { livelyPillAt, livelyToneAt } from '@/theme/livelyUi';
import { spacing } from '@/theme/spacing';

const ABOUT_SECTIONS = [
  { titleKey: 'about.sections.purposeTitle', bodyKey: 'about.sections.purposeBody' },
  { titleKey: 'about.sections.protocolsTitle', bodyKey: 'about.sections.protocolsBody' },
  { titleKey: 'about.sections.pharmacologyTitle', bodyKey: 'about.sections.pharmacologyBody' },
  { titleKey: 'about.sections.pathologiesTitle', bodyKey: 'about.sections.pathologiesBody' },
  { titleKey: 'about.sections.calculationsTitle', bodyKey: 'about.sections.calculationsBody' },
  { titleKey: 'about.sections.premiumTitle', bodyKey: 'about.sections.premiumBody' },
  { titleKey: 'about.sections.institutionTitle', bodyKey: 'about.sections.institutionBody' },
  { titleKey: 'about.sections.languagesTitle', bodyKey: 'about.sections.languagesBody' },
  { titleKey: 'about.sections.updatesTitle', bodyKey: 'about.sections.updatesBody' },
] as const;

export default function ConocenosScreen() {
  const { t } = useLocale();
  const { colors, fonts } = useAppTheme();
  const { contentPaddingBottom } = useScreenInsets();

  return (
    <ScreenContainer safe style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom }]}
        showsVerticalScrollIndicator={false}>
        <Typography variant="body" color={colors.textSecondary} style={styles.intro}>
          {t('about.intro')}
        </Typography>

        {ABOUT_SECTIONS.map((section, index) => {
          const tone = livelyToneAt(index);
          const pill = livelyPillAt(index);
          return (
            <View
              key={section.titleKey}
              style={[
                styles.section,
                index < ABOUT_SECTIONS.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.border,
                },
              ]}>
              <View style={[styles.sectionTitlePill, { backgroundColor: pill.backgroundColor }]}>
                <Typography
                  variant="label"
                  style={[styles.sectionTitle, { color: tone.label, fontFamily: fonts.semiBold }]}>
                  {t(section.titleKey)}
                </Typography>
              </View>
              <Typography variant="body" color={colors.textSecondary} style={styles.sectionBody}>
                {t(section.bodyKey)}
              </Typography>
            </View>
          );
        })}

        <View style={[styles.cta, { borderTopColor: colors.border }]}>
          <View
            style={[
              styles.sectionTitlePill,
              { backgroundColor: livelyPillAt(ABOUT_SECTIONS.length).backgroundColor },
            ]}>
            <Typography
              variant="label"
              style={[
                styles.sectionTitle,
                {
                  color: livelyToneAt(ABOUT_SECTIONS.length).label,
                  fontFamily: fonts.semiBold,
                },
              ]}>
              {t('about.ctaTitle')}
            </Typography>
          </View>
          <Typography variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            {t('about.ctaBody')}
          </Typography>
          <Button
            label={t('about.ctaButton')}
            accentColor={colors.button}
            onPress={() => router.push('/contacto')}
            style={styles.ctaButton}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  intro: {
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  section: {
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  sectionTitlePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  sectionTitle: {
    textAlign: 'left',
    textTransform: 'none',
    letterSpacing: 0.4,
  },
  sectionBody: {
    textAlign: 'left',
    lineHeight: 22,
  },
  cta: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
  },
  ctaButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
});
