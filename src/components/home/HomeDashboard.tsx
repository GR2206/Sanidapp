import { useRef, useState } from 'react';

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useSafeAreaInsets } from 'react-native-safe-area-context';



import { ContentUpdatesBanner } from '@/components/home/ContentUpdatesBanner';

import { ContinueAttendingCard } from '@/components/home/ContinueAttendingCard';

import { DashboardActivityList } from '@/components/home/DashboardActivityList';

import { DashboardBackground } from '@/components/home/DashboardBackground';
import { AppWatermark } from '@/components/layout/AppWatermark';

import { DashboardBottomNavigation } from '@/components/home/DashboardBottomNavigation';

import { DashboardFadeIn } from '@/components/home/DashboardFadeIn';

import { DashboardHeader } from '@/components/home/DashboardHeader';

import { DashboardSectionDivider } from '@/components/home/DashboardSectionDivider';

import { DashboardSettingsPanel } from '@/components/home/DashboardSettingsPanel';
import { KeyboardAwareScrollScreen } from '@/components/layout/KeyboardAwareScrollScreen';

import { HomeActivityRow } from '@/components/home/HomeActivityRow';

import { HomeCategoryCircles } from '@/components/home/HomeCategoryCircles';

import { HomeUniversalSearch } from '@/components/home/HomeUniversalSearch';

import { Typography } from '@/components/ui/Typography';

import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';

import { useContentUpdateBadges } from '@/hooks/useContentUpdateBadges';

import { useDashboardTheme } from '@/hooks/useDashboardTheme';

import { useUserActivity } from '@/hooks/useUserActivity';

import { HOME_CONTENT_MAX_WIDTH } from '@/hooks/useResponsiveLayout';

import type { DashboardTab } from '@/types/dashboard';

import { spacing } from '@/theme/spacing';

import { hapticLight } from '@/utils/haptics';



const BOTTOM_NAV_SPACE = 92;

export function HomeDashboard() {
  const { profile } = useAuth();
  const { t } = useLocale();
  const insets = useSafeAreaInsets();
  const { recents, favorites } = useUserActivity();
  const { badges, total } = useContentUpdateBadges();
  const { colors, isDark, cycleMode, hasBranding, sanatorio, fonts } = useDashboardTheme();
  const [activeTab, setActiveTab] = useState<DashboardTab>('inicio');
  const scrollRef = useRef<ScrollView>(null);
  const settingsScrollRef = useRef<ScrollView>(null);
  const settingsScrollYRef = useRef(0);

  const greetingName = profile?.nombre?.trim() || t('home.professional');
  const accountScrollPadding = BOTTOM_NAV_SPACE + Math.max(insets.bottom, spacing.sm) + spacing.xl;



  function handleTabChange(tab: DashboardTab) {

    if (tab === 'inicio' && activeTab === 'inicio') {

      scrollRef.current?.scrollTo({ y: 0, animated: true });

    }

    setActiveTab(tab);

  }



  return (

    <View style={styles.root}>

      <AppWatermark />

      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.dashboardLayer}>
      <DashboardBackground>

        <DashboardHeader />



        {activeTab === 'ajustes' ? (
          <KeyboardAwareScrollScreen
            scrollRef={settingsScrollRef}
            scrollYRef={settingsScrollYRef}
            contentContainerStyle={[styles.accountScrollContent, { paddingBottom: accountScrollPadding }]}>
            <DashboardFadeIn index={0}>
              <DashboardSettingsPanel
                scrollRef={settingsScrollRef}
                scrollYRef={settingsScrollYRef}
              />
            </DashboardFadeIn>
          </KeyboardAwareScrollScreen>
        ) : (

          <ScrollView

            ref={scrollRef}

            style={styles.scroll}

            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: BOTTOM_NAV_SPACE + spacing.lg },
            ]}

            keyboardShouldPersistTaps="handled"

            showsVerticalScrollIndicator={false}>

            {activeTab === 'inicio' ? (

            <>

              <DashboardFadeIn index={0}>

                <Pressable

                  onLongPress={() => {

                    hapticLight();

                    void cycleMode();

                  }}

                  style={styles.hero}>

                  <Typography

                    variant="title"

                    style={[styles.greeting, { color: colors.accent, fontFamily: fonts.semiBold }]}>

                    {t('home.greeting', { name: greetingName })}

                  </Typography>

                  <Typography variant="caption" style={[styles.subtitle, { color: colors.textMuted }]}>

                    {hasBranding && sanatorio

                      ? t('home.subtitleBranded', { sanatorio: sanatorio.name })

                      : t('home.subtitleDefault')}

                  </Typography>

                  <HomeUniversalSearch />

                </Pressable>

              </DashboardFadeIn>



              <DashboardFadeIn index={1}>

                <ContentUpdatesBanner total={total} />

              </DashboardFadeIn>



              <View style={styles.body}>

                <DashboardFadeIn index={2}>

                  <HomeActivityRow

                    title={t('home.recents')}

                    items={recents}

                    emptyLabel={t('home.recentsEmpty')}

                  />

                </DashboardFadeIn>

                <DashboardSectionDivider />

                <DashboardFadeIn index={3}>

                  <HomeActivityRow

                    title={t('home.favorites')}

                    items={favorites}

                    emptyLabel={t('home.favoritesEmpty')}

                  />

                </DashboardFadeIn>

                <DashboardSectionDivider />

                <DashboardFadeIn index={4}>

                  <ContinueAttendingCard item={recents[0] ?? null} />

                </DashboardFadeIn>

                <DashboardSectionDivider />

                <DashboardFadeIn index={5}>

                  <HomeCategoryCircles badges={badges} />

                </DashboardFadeIn>

              </View>

            </>

          ) : null}



          {activeTab === 'historial' ? (

            <DashboardFadeIn index={0}>

              <DashboardActivityList

                title={t('home.historyTab')}

                items={recents}

                emptyIcon="history"

                emptyLabel={t('home.recentsEmpty')}

              />

            </DashboardFadeIn>

          ) : null}

          </ScrollView>

        )}



        <DashboardBottomNavigation

          badges={badges}

          activeTab={activeTab}

          onTabChange={handleTabChange}

        />

      </DashboardBackground>
      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  root: {

    flex: 1,
    position: 'relative',

  },

  dashboardLayer: {
    flex: 1,
    zIndex: 1,
  },

  scroll: {

    flex: 1,

  },

  scrollContent: {

    maxWidth: HOME_CONTENT_MAX_WIDTH,

    width: '100%',

    alignSelf: 'center',

    flexGrow: 1,

  },

  accountScrollContent: {
    maxWidth: HOME_CONTENT_MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    flexGrow: 1,
  },

  hero: {

    paddingHorizontal: spacing.lg,

    paddingBottom: spacing.md,

    gap: spacing.sm,

  },

  greeting: {

    fontSize: 28,

    lineHeight: 34,

  },

  subtitle: {

    marginBottom: spacing.xs,

  },

  body: {

    gap: spacing.sm,

    paddingTop: 0,

  },

});

