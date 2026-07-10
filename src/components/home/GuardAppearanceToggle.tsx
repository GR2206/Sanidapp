import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

export function GuardAppearanceToggle() {
  const { isDark, mode, cycleMode } = useDashboardTheme();
  const { t } = useLocale();
  const { appearanceMode } = useAppLabels();
  const { colors, hasBranding } = useAppTheme();
  const rowText = hasBranding ? colors.menuText : colors.text;
  const rowTextMuted = hasBranding ? colors.menuTextMuted : colors.textMuted;
  const rowBorder = colors.border;
  const rowBackground = colors.backgroundSoft;
  const rowAccent = colors.button;

  const iconName =
    mode === 'auto' ? 'theme-light-dark' : isDark ? 'weather-night' : 'white-balance-sunny';

  return (
    <Pressable
      onPress={() => {
        hapticLight();
        void cycleMode();
      }}
      style={({ pressed }) => [
        styles.row,
        {
          borderColor: rowBorder,
          backgroundColor: rowBackground,
        },
        pressed && styles.pressed,
      ]}>
      <MaterialCommunityIcons name={iconName} size={20} color={rowAccent} />
      <View style={styles.text}>
        <Typography variant="bodyMedium" style={{ color: rowText, fontSize: 14 }}>
          {t('appearance.settingsLine', { mode: appearanceMode(mode) })}
        </Typography>
        <Typography variant="caption" style={{ color: rowTextMuted, fontSize: 11 }}>
          {t('appearance.hint')}
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.9,
  },
});
