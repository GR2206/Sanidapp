import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { type ReactNode, type RefObject, useEffect, useState } from 'react';
import { Alert, Pressable, Share, StyleSheet, View, type ScrollView } from 'react-native';

import { InstitutionTokenRedeemForm } from '@/components/subscription/InstitutionTokenRedeemForm';
import { PremiumIapPurchaseSection } from '@/components/subscription/PremiumIapPurchaseSection';
import { LegalDisclaimer } from '@/components/legal/LegalDisclaimer';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { Typography } from '@/components/ui/Typography';
import { UserAvatar } from '@/components/ui/UserAvatar';
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
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  getNursingRemindersEnabled,
  setNursingRemindersEnabled,
} from '@/services/notifications/nursingReminderPrefs';
import { clearUserAvatar, uploadUserAvatar } from '@/services/user/userAvatarService';
import { brandSoftFill, freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { spacing } from '@/theme/spacing';
import { hapticLight, hapticToggle } from '@/utils/haptics';
import { hexToRgba } from '@/utils/color';

const isExpoGo = Constants.appOwnership === 'expo';

function SettingsGroup({
  title,
  children,
  cardStyle,
  titleColor,
  titleFont,
}: {
  title: string;
  children: ReactNode;
  cardStyle: object;
  titleColor: string;
  titleFont?: string;
}) {
  return (
    <View style={styles.groupWrap}>
      <View style={[styles.groupTitlePill, { backgroundColor: hexToRgba(titleColor, 0.12) }]}>
        <Typography
          variant="caption"
          style={[styles.groupTitle, { color: titleColor, fontFamily: titleFont }]}>
          {title}
        </Typography>
      </View>
      <View style={[styles.groupCard, cardStyle]}>{children}</View>
    </View>
  );
}

function SettingsDivider({ color }: { color: string }) {
  return <View style={[styles.insetDivider, { backgroundColor: color }]} />;
}

export function DashboardSettingsPanel({
  scrollRef,
  scrollYRef,
}: {
  scrollRef?: RefObject<ScrollView | null>;
  scrollYRef?: RefObject<number>;
}) {
  const navigation = useNavigation();
  const { profile, logout, firebaseEnabled, isPremium, accessTier, refreshProfile } = useAuth();
  const { t, locale } = useLocale();
  const { soundsEnabled, toggleSounds } = useSoundPreferences();
  const { scale, setScale, setScaleLive, increase, decrease, canIncrease, canDecrease } =
    useTextScale();
  const { appearanceMode, accessTier: accessTierLabel, premiumSource } = useAppLabels();
  const { colors, isDark, mode, cycleMode, hasBranding, sanatorio, fonts } = useDashboardTheme();
  const [sliderValue, setSliderValue] = useState(scale);
  const [nursingRemindersOn, setNursingRemindersOn] = useState(true);
  const [avatarBusy, setAvatarBusy] = useState(false);

  const lively = !isDark;
  const elevated = freeElevatedCardStyle(lively);
  const cardStyle = elevated ?? {
    backgroundColor: colors.surface,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
    borderRadius: 18,
  };
  const divider = lively ? 'rgba(0,0,0,0.06)' : hexToRgba(colors.text, 0.12);
  const groupTones = [
    FREE_QUICK_ACCESS_TONES.adulto.label,
    FREE_QUICK_ACCESS_TONES.neonatologia.label,
    FREE_QUICK_ACCESS_TONES.farmacologia.label,
    FREE_QUICK_ACCESS_TONES.pediatrico.label,
  ];
  let groupToneIndex = 0;
  const nextGroupTone = () => groupTones[groupToneIndex++ % groupTones.length];
  const iconBg = lively ? brandSoftFill(colors.accent, 0.9) : colors.surfaceMuted;

  useEffect(() => {
    setSliderValue(scale);
  }, [scale]);

  useEffect(() => {
    let active = true;
    void getNursingRemindersEnabled()
      .then((enabled) => {
        if (active) setNursingRemindersOn(enabled);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const appearanceIcon =
    mode === 'auto' ? 'theme-light-dark' : isDark ? 'weather-night' : 'white-balance-sunny';
  const hasInstitution = Boolean(profile?.sanatorioId);
  const isPersonalPremium =
    isPremium &&
    (profile?.premiumSource === 'iap' || profile?.premiumSource === 'mercadopago') &&
    !hasInstitution;
  const textPercent = Math.round(sliderValue * 100);

  async function pickAndUploadAvatar() {
    if (!profile?.uid || !firebaseEnabled || avatarBusy) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('settings.avatar.permission'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets[0]?.uri) return;
    const asset = result.assets[0];
    setAvatarBusy(true);
    try {
      hapticLight();
      await uploadUserAvatar({
        uid: profile.uid,
        localUri: asset.uri,
        contentType: asset.mimeType,
      });
      await refreshProfile();
    } catch (cause) {
      Alert.alert(
        t('settings.avatar.error'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('settings.avatar.errorDetail'),
          locale,
        ),
      );
    } finally {
      setAvatarBusy(false);
    }
  }

  function openAvatarActions() {
    if (!profile?.uid || !firebaseEnabled) return;
    hapticLight();
    const buttons: {
      text: string;
      style?: 'cancel' | 'destructive' | 'default';
      onPress?: () => void;
    }[] = [
      {
        text: t('settings.avatar.change'),
        onPress: () => {
          void pickAndUploadAvatar();
        },
      },
    ];
    if (profile.avatarUrl) {
      buttons.push({
        text: t('settings.avatar.remove'),
        style: 'destructive',
        onPress: () => {
          void (async () => {
            setAvatarBusy(true);
            try {
              await clearUserAvatar(profile.uid);
              await refreshProfile();
            } catch (cause) {
              Alert.alert(
                t('settings.avatar.error'),
                resolveMessage(
                  cause instanceof Error ? cause.message : t('settings.avatar.errorDetail'),
                  locale,
                ),
              );
            } finally {
              setAvatarBusy(false);
            }
          })();
        },
      });
    }
    buttons.push({ text: t('common.cancel'), style: 'cancel' });
    Alert.alert(t('settings.avatar.title'), t('settings.avatar.subtitle'), buttons);
  }

  async function toggleNursingReminders() {
    hapticToggle();
    const next = !nursingRemindersOn;
    setNursingRemindersOn(next);
    try {
      await setNursingRemindersEnabled(next);
      if (isExpoGo) {
        return;
      }
      const {
        syncNursingReminderNotifications,
        cancelNursingReminderNotifications,
      } = await import('@/services/notifications/nursingReminderService');
      if (next) {
        await syncNursingReminderNotifications(locale);
      } else {
        await cancelNursingReminderNotifications();
      }
    } catch (error) {
      console.warn('No se pudo actualizar recordatorios de enfermería:', error);
    }
  }

  return (
    <View style={styles.section}>
      <Typography
        variant="label"
        style={[styles.panelTitle, { color: FREE_QUICK_ACCESS_TONES.adulto.label, fontFamily: fonts.semiBold }]}>
        {t('settings.title')}
      </Typography>

      <SettingsGroup
        title={t('settings.sections.account')}
        cardStyle={cardStyle}
        titleColor={nextGroupTone()}
        titleFont={fonts.semiBold}>
        <View style={styles.profileBody}>
          {firebaseEnabled && profile ? (
            <Pressable
              onPress={openAvatarActions}
              disabled={avatarBusy}
              style={styles.avatarRow}
              accessibilityRole="button"
              accessibilityLabel={t('settings.avatar.title')}>
              <UserAvatar
                size={56}
                avatarUrl={profile.avatarUrl}
                nombre={profile.nombre}
                apellido={profile.apellido}
                email={profile.email}
                accentColor={colors.accent}
                surfaceColor={colors.surface}
                borderColor={colors.border}
                fontFamily={fonts.semiBold}
              />
              <View style={styles.avatarCopy}>
                <Typography variant="bodyMedium" style={{ color: colors.text, fontFamily: fonts.semiBold }}>
                  {avatarBusy ? t('settings.avatar.saving') : t('settings.avatar.changeHint')}
                </Typography>
                <Typography variant="caption" style={{ color: colors.textMuted }}>
                  {t('settings.avatar.formats')}
                </Typography>
              </View>
            </Pressable>
          ) : null}
          {hasBranding && sanatorio ? (
            <>
              <Typography
                variant="bodyMedium"
                style={{ color: colors.text, fontFamily: fonts.semiBold }}>
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
            <View style={styles.publicIdBlock}>
              <Typography variant="caption" style={{ color: colors.textMuted }}>
                {t('settings.publicId.label')}
              </Typography>
              <Typography
                variant="bodyMedium"
                style={{ color: colors.text, fontFamily: fonts.semiBold, letterSpacing: 1.2 }}>
                {profile.publicId || t('settings.publicId.loading')}
              </Typography>
              <Typography variant="caption" style={{ color: colors.textMuted }}>
                {t('settings.publicId.hint')}
              </Typography>
              {profile.publicId ? (
                <Pressable
                  onPress={() => {
                    hapticLight();
                    void Share.share({
                      message: t('settings.publicId.shareMessage', { id: profile.publicId }),
                    }).catch(() => undefined);
                  }}
                  style={[styles.publicIdShare, { backgroundColor: iconBg }]}>
                  <MaterialCommunityIcons name="share-variant" size={16} color={colors.accent} />
                  <Typography
                    variant="caption"
                    style={{ color: colors.accent, fontFamily: fonts.semiBold }}>
                    {t('settings.publicId.share')}
                  </Typography>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          {firebaseEnabled && profile ? (
            <View style={[styles.planChip, { backgroundColor: iconBg }]}>
              <Typography variant="caption" style={{ color: colors.accent, fontFamily: fonts.semiBold }}>
                {accessTierLabel(accessTier)}
                {isPremium && profile.premiumSource
                  ? ` · ${premiumSource(profile.premiumSource)}`
                  : ''}
              </Typography>
            </View>
          ) : null}
        </View>
      </SettingsGroup>

      {firebaseEnabled && profile ? (
        <SettingsGroup
          title={t('settings.sections.subscription')}
          cardStyle={cardStyle}
          titleColor={nextGroupTone()}
          titleFont={fonts.semiBold}>
          <View style={styles.groupInner}>
            {!isPremium && hasInstitution ? (
              <InstitutionTokenRedeemForm
                accentColor={colors.accent}
                scrollRef={scrollRef}
                scrollYRef={scrollYRef}
                description=""
              />
            ) : null}
            {isPersonalPremium ? (
              <InstitutionTokenRedeemForm
                accentColor={colors.accent}
                scrollRef={scrollRef}
                scrollYRef={scrollYRef}
                allowSanatorioPick
                submitLabel={t('subscription.linkSanatorio')}
                description=""
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
        </SettingsGroup>
      ) : null}

      <SettingsGroup
        title={t('settings.sections.preferences')}
        cardStyle={cardStyle}
        titleColor={nextGroupTone()}
        titleFont={fonts.semiBold}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            hapticLight();
            void cycleMode();
          }}
          style={styles.lineRow}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <MaterialCommunityIcons name={appearanceIcon} size={20} color={colors.accent} />
          </View>
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: colors.text }}>
              {t('appearance.settingsLine', { mode: appearanceMode(mode) })}
            </Typography>
          </View>
        </Pressable>

        <SettingsDivider color={divider} />

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
          style={styles.lineRow}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <MaterialCommunityIcons
              name={soundsEnabled ? 'volume-high' : 'volume-off'}
              size={20}
              color={colors.accent}
            />
          </View>
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: colors.text }}>
              {t('settings.sounds')}
            </Typography>
          </View>
          <MaterialCommunityIcons
            name={soundsEnabled ? 'toggle-switch' : 'toggle-switch-off-outline'}
            size={28}
            color={soundsEnabled ? colors.accent : colors.textMuted}
          />
        </Pressable>

        <SettingsDivider color={divider} />

        <Pressable accessibilityRole="button" onPress={() => void toggleNursingReminders()} style={styles.lineRow}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <MaterialCommunityIcons name="bell-ring-outline" size={20} color={colors.accent} />
          </View>
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: colors.text }}>
              {t('nursing.settingsTitle')}
            </Typography>
            {!isExpoGo && nursingRemindersOn ? (
              <Typography variant="caption" style={{ color: colors.textMuted }}>
                {t('nursing.settingsOn')}
              </Typography>
            ) : null}
          </View>
          <MaterialCommunityIcons
            name={nursingRemindersOn ? 'toggle-switch' : 'toggle-switch-off-outline'}
            size={28}
            color={nursingRemindersOn ? colors.accent : colors.textMuted}
          />
        </Pressable>

        <SettingsDivider color={divider} />

        <View style={styles.blockPad}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('settings.textSize')}
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
              maximumTrackTintColor={divider}
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

        <SettingsDivider color={divider} />

        <LanguagePicker variant="line" dividerColor="transparent" />

        <SettingsDivider color={divider} />

        <LegalDisclaimer embedded />
      </SettingsGroup>

      <SettingsGroup
        title={t('settings.sections.session')}
        cardStyle={cardStyle}
        titleColor={nextGroupTone()}
        titleFont={fonts.semiBold}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            hapticLight();
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          style={styles.lineRow}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
            <MaterialCommunityIcons name="menu" size={20} color={colors.accent} />
          </View>
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: colors.text }}>
              {t('home.fullMenu')}
            </Typography>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>

        {firebaseEnabled && profile ? (
          <>
            <SettingsDivider color={divider} />
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                hapticLight();
                void logout();
              }}
              style={styles.lineRow}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: lively
                      ? brandSoftFill('#C62828', 0.9)
                      : hexToRgba('#C62828', 0.18),
                  },
                ]}>
                <MaterialCommunityIcons name="logout" size={20} color="#C62828" />
              </View>
              <View style={styles.rowText}>
                <Typography variant="bodyMedium" style={{ color: '#C62828' }}>
                  {t('settings.logout')}
                </Typography>
              </View>
            </Pressable>
          </>
        ) : null}
      </SettingsGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    width: '100%',
    gap: spacing.md,
  },
  panelTitle: {
    letterSpacing: 0.8,
  },
  groupWrap: {
    gap: spacing.xs,
  },
  groupTitlePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  groupTitle: {
    letterSpacing: 0.6,
    fontSize: 12,
  },
  groupCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  groupInner: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  profileBody: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  avatarCopy: {
    flex: 1,
    gap: 2,
  },
  planChip: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  publicIdBlock: {
    marginTop: spacing.xs,
    gap: 4,
  },
  publicIdShare: {
    alignSelf: 'flex-start',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockPad: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  insetDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.md + 36 + spacing.sm,
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
