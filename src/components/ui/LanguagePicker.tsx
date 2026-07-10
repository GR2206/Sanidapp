import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { LOCALE_OPTIONS, type AppLocale } from '@/i18n/types';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface LanguagePickerProps {
  /** `field` = login/registro; `row` = fila en ajustes; `compact` = botón circular en header */
  variant?: 'compact' | 'field' | 'row';
}

export function LanguagePicker({ variant = 'compact' }: LanguagePickerProps) {
  const { locale, setLocale, t } = useLocale();
  const { colors: dashboardColors } = useDashboardTheme();
  const [open, setOpen] = useState(false);

  const current = LOCALE_OPTIONS.find((option) => option.code === locale) ?? LOCALE_OPTIONS[0];
  const isField = variant === 'field';
  const isRow = variant === 'row';
  const surfaceColor = isField ? palette.white : dashboardColors.surface;
  const borderColor = isField ? palette.border : dashboardColors.border;
  const accentColor = isField ? palette.accent : dashboardColors.accent;
  const textColor = isField ? palette.text : dashboardColors.text;
  const mutedColor = isField ? palette.textMuted : dashboardColors.textMuted;

  async function handleSelect(code: AppLocale) {
    hapticLight();
    await setLocale(code);
    setOpen(false);
  }

  return (
    <>
      {isField ? (
        <Typography variant="label" style={styles.fieldLabel}>
          {t('language.title')}
        </Typography>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('language.select')}
        onPress={() => {
          hapticLight();
          setOpen(true);
        }}
        style={({ pressed }) => [
          isField ? styles.fieldTrigger : isRow ? styles.rowTrigger : styles.trigger,
          {
            backgroundColor: surfaceColor,
            borderColor,
          },
          pressed && styles.pressed,
        ]}>
        {isRow ? (
          <>
            <Typography variant="bodyMedium" style={styles.flag}>
              {current.flag}
            </Typography>
            <View style={styles.rowText}>
              <Typography variant="bodyMedium" style={{ color: textColor }}>
                {t('language.title')}
              </Typography>
              <Typography variant="caption" style={{ color: mutedColor }}>
                {current.label}
              </Typography>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={mutedColor} />
          </>
        ) : isField ? (
          <>
            <Typography variant="bodyMedium" style={styles.flag}>
              {current.flag}
            </Typography>
            <Typography variant="body" style={[styles.fieldValue, { color: textColor }]}>
              {current.label}
            </Typography>
            <MaterialCommunityIcons name="chevron-down" size={20} color={accentColor} />
          </>
        ) : (
          <>
            <Typography variant="bodyMedium" style={styles.flag}>
              {current.flag}
            </Typography>
            <MaterialCommunityIcons name="chevron-down" size={16} color={accentColor} />
          </>
        )}
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: isField ? palette.white : dashboardColors.surface,
                borderColor,
              },
            ]}>
            <Typography
              variant="subtitle"
              style={{ color: accentColor, marginBottom: spacing.sm }}>
              {t('language.title')}
            </Typography>
            {LOCALE_OPTIONS.map((option) => {
              const selected = option.code === locale;
              return (
                <Pressable
                  key={option.code}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => void handleSelect(option.code)}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: selected
                        ? isField
                          ? palette.background
                          : dashboardColors.surfaceMuted
                        : 'transparent',
                      borderColor,
                    },
                    pressed && styles.pressed,
                  ]}>
                  <Typography variant="bodyMedium" style={styles.flag}>
                    {option.flag}
                  </Typography>
                  <Typography
                    variant="body"
                    style={{ color: selected ? accentColor : textColor, flex: 1 }}>
                    {option.label}
                  </Typography>
                  {selected ? (
                    <MaterialCommunityIcons name="check" size={20} color={accentColor} />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
  },
  fieldLabel: {
    marginBottom: spacing.xs,
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  fieldTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  rowTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
  },
  flag: {
    fontSize: 18,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  sheet: {
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
});
