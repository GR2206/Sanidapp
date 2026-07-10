import { useLocale } from '@/contexts/LocaleContext';
import { useSoundPreferences } from '@/contexts/SoundPreferencesContext';
import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight, hapticToggle } from '@/utils/haptics';
import { Pressable, StyleSheet, View } from 'react-native';
import type { ScrollView } from 'react-native';
import { type RefObject } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { InstitutionTokenRedeemForm } from '@/components/subscription/InstitutionTokenRedeemForm';
import { PremiumIapPurchaseSection } from '@/components/subscription/PremiumIapPurchaseSection';
import { LanguagePicker } from '@/components/ui/LanguagePicker';
import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';

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
  const { scale, canDecrease, canIncrease, decrease, increase } = useTextScale();
  const { appearanceMode, accessTier: accessTierLabel, premiumSource } = useAppLabels();
  const { colors, isDark, mode, cycleMode, hasBranding, sanatorio } = useDashboardTheme();

  const appearanceIcon =
    mode === 'auto' ? 'theme-light-dark' : isDark ? 'weather-night' : 'white-balance-sunny';
  const hasInstitution = Boolean(profile?.sanatorioId);
  const isPersonalPremium = isPremium && profile?.premiumSource === 'iap' && !hasInstitution;
  const textPercent = Math.round(scale * 100);

  return (
    <View style={styles.section}>
      <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
        {t('settings.title')}
      </Typography>

      <View
        style={[
          styles.card,
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
      </View>

      {firebaseEnabled && profile ? (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          <View style={styles.tierRow}>
            <MaterialCommunityIcons
              name={isPremium ? 'star-circle' : 'account-outline'}
              size={22}
              color={isPremium ? colors.accent : colors.textMuted}
            />
            <View style={styles.rowText}>
              <Typography variant="bodyMedium" style={{ color: colors.text }}>
                {accessTierLabel(accessTier)}
              </Typography>
              {isPremium && profile.premiumSource ? (
                <Typography variant="caption" style={{ color: colors.textMuted }}>
                  {premiumSource(profile.premiumSource)}
                </Typography>
              ) : (
                <Typography variant="caption" style={{ color: colors.textMuted }}>
                  {isPersonalPremium
                    ? t('subscription.catalogFullNoSanatorio')
                    : hasInstitution
                      ? t('subscription.licenseViaSanatorio')
                      : t('subscription.adultIncludedPremium')}
                </Typography>
              )}
            </View>
          </View>
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
        </View>
      ) : null}

      <SpringPressable
        onPress={() => {
          hapticLight();
          void cycleMode();
        }}
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <MaterialCommunityIcons name={appearanceIcon} size={22} color={colors.accent} />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('appearance.settingsLine', { mode: appearanceMode(mode) })}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('appearance.settingsDetail')}
          </Typography>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
      </SpringPressable>

      <SpringPressable
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
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
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
      </SpringPressable>

      <View
        style={[
          styles.row,
          styles.textSizeRow,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <MaterialCommunityIcons name="format-size" size={22} color={colors.accent} />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('settings.textSize')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('settings.textSizeHint')}
          </Typography>
        </View>
        <View style={styles.textSizeControls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('settings.textSizeDecrease')}
            disabled={!canDecrease}
            onPress={() => {
              hapticLight();
              void decrease();
            }}
            style={[
              styles.textSizeButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: canDecrease ? 1 : 0.4,
              },
            ]}>
            <Typography variant="bodyMedium" style={{ color: colors.text, fontSize: 15 }}>
              A−
            </Typography>
          </Pressable>
          <Typography variant="caption" style={[styles.textSizeValue, { color: colors.textSecondary }]}>
            {t('settings.textSizeValue', { percent: textPercent })}
          </Typography>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('settings.textSizeIncrease')}
            disabled={!canIncrease}
            onPress={() => {
              hapticLight();
              void increase();
            }}
            style={[
              styles.textSizeButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: canIncrease ? 1 : 0.4,
              },
            ]}>
            <Typography variant="bodyMedium" style={{ color: colors.text, fontSize: 18 }}>
              A+
            </Typography>
          </Pressable>
        </View>
      </View>

      <LanguagePicker variant="row" />

      <SpringPressable
        onPress={() => {
          hapticLight();
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={[
          styles.row,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <MaterialCommunityIcons name="menu" size={22} color={colors.accent} />
        <View style={styles.rowText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('home.fullMenu')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {t('home.fullMenuHint')}
          </Typography>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
      </SpringPressable>

      {firebaseEnabled && profile ? (
        <SpringPressable
          onPress={() => {
            hapticLight();
            void logout();
          }}
          style={[
            styles.row,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          <MaterialCommunityIcons name="logout" size={22} color="#C62828" />
          <View style={styles.rowText}>
            <Typography variant="bodyMedium" style={{ color: '#C62828' }}>
              {t('settings.logout')}
            </Typography>
          </View>
        </SpringPressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  card: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
  },
  textSizeRow: {
    flexWrap: 'wrap',
  },
  textSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  textSizeButton: {
    minWidth: 40,
    minHeight: 36,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  textSizeValue: {
    minWidth: 44,
    textAlign: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
    minWidth: 120,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
});
