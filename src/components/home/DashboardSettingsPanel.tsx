import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { type RefObject, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, type ScrollView } from 'react-native';

import { InstitutionTokenRedeemForm } from '@/components/subscription/InstitutionTokenRedeemForm';
import { PremiumIapPurchaseSection } from '@/components/subscription/PremiumIapPurchaseSection';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useSoundPreferences } from '@/contexts/SoundPreferencesContext';
import {
  TEXT_SCALE_MAX,
  TEXT_SCALE_MIN,
  useTextScale,
} from '@/contexts/TextScaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight, hapticToggle } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

export function DashboardSettingsPanel({
  scrollRef,
  scrollYRef,
}: {
  scrollRef?: RefObject<ScrollView | null>;
  scrollYRef?: RefObject<number>;
}) {
  const navigation = useNavigation();
  const { profile, logout, firebaseEnabled, isPremium, accessTier } = useAuth();
  const { t } = useLocale();
  const { soundsEnabled, toggleSounds } = useSoundPreferences();
  const { scale, setScale, setScaleLive, increase, decrease, canIncrease, canDecrease } =
    useTextScale();
  const { appearanceMode, accessTier: accessTierLabel, premiumSource } = useAppLabels();
  const { colors, isDark, mode, cycleMode, hasBranding, sanatorio } = useDashboardTheme();
  const [sliderValue, setSliderValue] = useState(scale);

  useEffect(() => {
    setSliderValue(scale);
  }, [scale]);

  const appearanceIcon =
    mode === 'auto' ? 'theme-light-dark' : isDark ? 'weather-night' : 'white-balance-sunny';
  const hasInstitution = Boolean(profile?.sanatorioId);
  const isPersonalPremium = isPremium && profile?.premiumSource === 'iap' && !hasInstitution;
  const textPercent = Math.round(sliderValue * 100);
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.28)' : hexToRgba(colors.text, 0.22);

  return (
    <View style={styles.section}>
      <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
        {t('settings.title')}
      </Typography>

      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        {hasBranding && sanatorio ? (
          <>
            <Typography variant="bodyMedium" style={{ color: colors.text }}>
              {sanatorio.name}
            </Typography>
            <Typography variant="caption" style={{ color: colors.textMuted }}>
              {sanatorio.city}
            </Typography>
          </>
        ) : null}
        <Typography variant="bodyMedium" style={{ color: colors.text }}>
          {profile?.nombre} {profile?.apellido}
        </Typography>
        {profile?.email ? (
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {profile.email}
          </Typography>
        ) : (
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('settings.guestMode')}
          </Typography>
        )}
        {profile?.profesion ? (
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {profile.profesion}
          </Typography>
        ) : null}
        {firebaseEnabled && profile ? (
          <Typography variant="caption" style={{ color: colors.textSecondary, marginTop: 2 }}>
            {accessTierLabel(accessTier)}
            {isPremium && profile.premiumSource
              ? ` · ${premiumSource(profile.premiumSource)}`
              : ''}
          </Typography>
        ) : null}
      </View>

      {firebaseEnabled && profile ? (
        <View style={[styles.block, { borderBottomColor: dividerColor }]}>
          {!isPremium && hasInstitution ? (
            <InstitutionTokenRedeemForm
              accentColor={colors.accent}
              scrollRef={scrollRef}
              scrollYRef={scrollYRef}
            />
          ) : null}
          {isPersonalPremium ? (
            <InstitutionTokenRedeemForm
              accentColor={colors.accent}
              scrollRef={scrollRef}
              scrollYRef={scrollYRef}
              allowSanatorioPick
              submitLabel={t('subscription.linkSanatorio')}
              description={t('subscription.linkSanatorioHint')}
            />
          ) : null}
          {!isPremium && !hasInstitution ? (
            <PremiumIapPurchaseSection accentColor={colors.accent} />
          ) : null}
          {isPremium && hasInstitution && !isPersonalPremium ? (
            <Typography variant="caption" style={{ color: colors.textMuted }}>
              {t('subscription.licenseViaSanatorio')}
            </Typography>
          ) : null}
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          hapticLight();
          void cycleMode();
        }}
        style={[styles.lineRow, { borderBottomColor: dividerColor }]}>
        <MaterialCommunityIcons name={appearanceIcon} size={22} color={colors.accent} />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('appearance.settingsLine', { mode: appearanceMode(mode) })}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('appearance.settingsDetail')}
          </Typography>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          if (soundsEnabled) {
            hapticToggle();
            void toggleSounds();
          } else {
            void toggleSounds().then(() => {
              hapticToggle();
            });
          }
        }}
        style={[styles.lineRow, { borderBottomColor: dividerColor }]}>
        <MaterialCommunityIcons
          name={soundsEnabled ? 'volume-high' : 'volume-off'}
          size={22}
          color={colors.accent}
        />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('settings.sounds')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {soundsEnabled ? t('settings.soundsOn') : t('settings.soundsOff')}
          </Typography>
        </View>
        <MaterialCommunityIcons
          name={soundsEnabled ? 'toggle-switch' : 'toggle-switch-off-outline'}
          size={28}
          color={soundsEnabled ? colors.accent : colors.textMuted}
        />
      </Pressable>

      <View style={[styles.block, { borderBottomColor: dividerColor }]}>
        <Typography variant="bodyMedium" style={{ color: colors.text }}>
          {t('settings.textSize')}
        </Typography>
        <Typography variant="caption" style={{ color: colors.textMuted }}>
          {t('settings.textSizeHint')}
        </Typography>
        <View style={styles.sliderRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('settings.textSizeDecrease')}
            disabled={!canDecrease}
            hitSlop={10}
            onPress={() => {
              hapticLight();
              void decrease();
            }}
            style={[styles.scaleLetterHit, { opacity: canDecrease ? 1 : 0.35 }]}>
            <Typography variant="caption" style={{ color: colors.textMuted, fontSize: 13 }}>
              A
            </Typography>
          </Pressable>
          <Slider
            style={styles.slider}
            minimumValue={TEXT_SCALE_MIN}
            maximumValue={TEXT_SCALE_MAX}
            step={0.01}
            value={sliderValue}
            minimumTrackTintColor={colors.accent}
            maximumTrackTintColor={dividerColor}
            thumbTintColor={colors.accent}
            onValueChange={(value) => {
              setSliderValue(value);
              setScaleLive(value);
            }}
            onSlidingComplete={(value) => {
              hapticLight();
              setSliderValue(value);
              void setScale(value);
            }}
            accessibilityLabel={t('settings.textSize')}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('settings.textSizeIncrease')}
            disabled={!canIncrease}
            hitSlop={10}
            onPress={() => {
              hapticLight();
              void increase();
            }}
            style={[styles.scaleLetterHit, { opacity: canIncrease ? 1 : 0.35 }]}>
            <Typography variant="bodyMedium" style={{ color: colors.text, fontSize: 22 }}>
              A
            </Typography>
          </Pressable>
        </View>
        <Typography variant="caption" style={{ color: colors.textSecondary }}>
          {t('settings.textSizeValue', { percent: textPercent })}
        </Typography>
      </View>

      <LanguagePicker variant="line" dividerColor={dividerColor} />

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          hapticLight();
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={[styles.lineRow, { borderBottomColor: dividerColor }]}>
        <MaterialCommunityIcons name="menu" size={22} color={colors.accent} />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('home.fullMenu')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('home.fullMenuHint')}
          </Typography>
        </View>
      </Pressable>

      {firebaseEnabled && profile ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            hapticLight();
            void logout();
          }}
          style={[styles.lineRow, { borderBottomColor: dividerColor }]}>
          <MaterialCommunityIcons name="logout" size={22} color="#C62828" />
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: '#C62828' }}>
              {t('settings.logout')}
            </Typography>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  profileCard: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  block: {
    paddingVertical: spacing.md,
    gap: spacing.xs,
    borderBottomWidth: 1,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  rowText: {
    flex: 1,
    gap: 2,
    minWidth: 120,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  scaleLetterHit: {
    minWidth: 28,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
