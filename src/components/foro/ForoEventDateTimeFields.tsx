import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { AppLocale } from '@/i18n/types';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface ForoEventDateTimeFieldsProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const INTL_BY_LOCALE: Record<AppLocale, string> = {
  es: 'es-AR',
  en: 'en-US',
  'pt-BR': 'pt-BR',
};

function formatDateLabel(value: Date | null, locale: AppLocale, pickDateLabel: string): string {
  if (!value) {
    return pickDateLabel;
  }

  return value.toLocaleDateString(INTL_BY_LOCALE[locale], {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function formatTimeLabel(value: Date | null, locale: AppLocale, pickTimeLabel: string): string {
  if (!value) {
    return pickTimeLabel;
  }

  return value.toLocaleTimeString(INTL_BY_LOCALE[locale], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ForoEventDateTimeFields({ value, onChange }: ForoEventDateTimeFieldsProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const [pickerMode, setPickerMode] = useState<'date' | 'time' | null>(null);
  const [draft, setDraft] = useState<Date>(value ?? new Date());
  const intlLocale = INTL_BY_LOCALE[locale];

  useEffect(() => {
    if (pickerMode) {
      setDraft(value ?? new Date());
    }
  }, [pickerMode, value]);

  const applySelection = (selected: Date) => {
    if (pickerMode === 'date') {
      const next = value ? new Date(value) : new Date();
      next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
      if (!value) {
        next.setHours(9, 0, 0, 0);
      }
      onChange(next);
      return;
    }

    if (pickerMode === 'time') {
      const base = value ?? new Date();
      const next = new Date(base);
      next.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      onChange(next);
    }
  };

  const handlePickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (event.type === 'dismissed') {
      setPickerMode(null);
      return;
    }

    if (!selected) {
      return;
    }

    if (Platform.OS === 'android') {
      applySelection(selected);
      setPickerMode(null);
      return;
    }

    setDraft(selected);
  };

  const confirmIosPicker = () => {
    applySelection(draft);
    setPickerMode(null);
  };

  return (
    <View style={styles.wrap}>
      <Typography variant="label">{t('foro.event.dateTime')}</Typography>

      <View style={styles.row}>
        <Pressable
          onPress={() => setPickerMode('date')}
          style={({ pressed }) => [
            styles.field,
            { borderColor: colors.border, backgroundColor: colors.backgroundSoft },
            pressed && styles.fieldPressed,
          ]}>
          <MaterialCommunityIcons name="calendar-month-outline" size={20} color={colors.button} />
          <View style={styles.fieldText}>
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.event.day')}
            </Typography>
            <Typography variant="bodyMedium" style={{ color: colors.textAccent }}>
              {formatDateLabel(value, locale, t('foro.event.pickDate'))}
            </Typography>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setPickerMode('time')}
          disabled={!value}
          style={({ pressed }) => [
            styles.field,
            { borderColor: colors.border, backgroundColor: colors.backgroundSoft },
            !value && styles.fieldDisabled,
            pressed && value && styles.fieldPressed,
          ]}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={20}
            color={value ? colors.button : palette.textMuted}
          />
          <View style={styles.fieldText}>
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.event.time')}
            </Typography>
            <Typography
              variant="bodyMedium"
              style={{ color: value ? colors.textAccent : palette.textMuted }}>
              {formatTimeLabel(value, locale, t('foro.event.pickTime'))}
            </Typography>
          </View>
        </Pressable>
      </View>

      {value ? (
        <Pressable onPress={() => onChange(null)}>
          <Typography variant="caption" style={{ color: colors.button }}>
            {t('foro.event.clearDateTime')}
          </Typography>
        </Pressable>
      ) : null}

      <Typography variant="caption" color={palette.textMuted}>
        {t('foro.event.calendarHint')}
      </Typography>

      {pickerMode && Platform.OS === 'android' ? (
        <DateTimePicker
          value={draft}
          mode={pickerMode}
          display="default"
          onChange={handlePickerChange}
          locale={intlLocale}
        />
      ) : null}

      {pickerMode && Platform.OS === 'ios' ? (
        <Modal transparent animationType="slide" visible onRequestClose={() => setPickerMode(null)}>
          <Pressable style={styles.backdrop} onPress={() => setPickerMode(null)} />
          <View
            style={[
              styles.iosSheet,
              { backgroundColor: colors.background, paddingBottom: insets.bottom + spacing.md },
            ]}>
            <View style={styles.iosHeader}>
              <Typography variant="subtitle">
                {pickerMode === 'date' ? t('foro.event.chooseDate') : t('foro.event.chooseTime')}
              </Typography>
              <Pressable onPress={() => setPickerMode(null)}>
                <Typography variant="bodyMedium" style={{ color: colors.button }}>
                  {t('common.cancel')}
                </Typography>
              </Pressable>
            </View>
            <DateTimePicker
              value={draft}
              mode={pickerMode}
              display="spinner"
              onChange={handlePickerChange}
              locale={intlLocale}
              style={styles.iosPicker}
            />
            <Button label={t('common.done')} onPress={confirmIosPicker} />
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 72,
  },
  fieldPressed: {
    opacity: 0.92,
  },
  fieldDisabled: {
    opacity: 0.55,
  },
  fieldText: {
    flex: 1,
    gap: 2,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  iosSheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  iosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iosPicker: {
    alignSelf: 'center',
  },
});
