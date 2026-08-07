import { useMemo, useState } from 'react';
import { StyleSheet, View, type TextStyle } from 'react-native';

import { CalculationResultCard } from '@/components/calculations/CalculationResultCard';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';
import {
  calculateDripRateGttPerMin,
  DRIP_FACTOR_ADULT,
  DRIP_FACTOR_PEDIATRIC,
  formatClinicalNumber,
  parsePositiveNumber,
} from '@/utils/clinicalCalculations';

type GoteoFieldStyle = TextStyle;

type GoteoRowProps = {
  title: string;
  dripFactor: number;
  volume: string;
  minutes: string;
  onVolumeChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
  fieldStyle: GoteoFieldStyle;
  featuredResult?: boolean;
};

function GoteoRow({
  title,
  dripFactor,
  volume,
  minutes,
  onVolumeChange,
  onMinutesChange,
  fieldStyle,
  featuredResult = false,
}: GoteoRowProps) {
  const { t } = useLocale();
  const { colors } = useAppTheme();

  const resultLabel = useMemo(() => {
    const volumeMl = parsePositiveNumber(volume);
    const mins = parsePositiveNumber(minutes);
    if (volumeMl == null || mins == null) {
      return null;
    }
    const rate = calculateDripRateGttPerMin(volumeMl, mins, dripFactor);
    if (rate == null) {
      return null;
    }
    return t('calculations.goteo.resultUnit', {
      value: formatClinicalNumber(rate, 1),
    });
  }, [dripFactor, minutes, t, volume]);

  return (
    <View
      style={[
        styles.rowCard,
        {
          borderColor: featuredResult ? 'transparent' : colors.border,
          backgroundColor: featuredResult ? '#FFFFFF' : colors.backgroundSoft,
        },
        featuredResult && styles.rowCardFree,
      ]}>
      <Typography variant="bodyMedium" color={colors.text}>
        {title}
      </Typography>

      <Typography variant="caption" color={colors.textMuted}>
        {`${t('calculations.goteo.factor')}: ${dripFactor}`}
      </Typography>

      <View>
        <TextField
          label={t('calculations.goteo.volume')}
          value={volume}
          onChangeText={onVolumeChange}
          keyboardType="decimal-pad"
          placeholder={t('calculations.goteo.volumePlaceholder')}
          compact
          style={fieldStyle}
        />
      </View>

      <View>
        <TextField
          label={t('calculations.goteo.minutes')}
          value={minutes}
          onChangeText={onMinutesChange}
          keyboardType="decimal-pad"
          placeholder={t('calculations.goteo.minutesPlaceholder')}
          compact
          style={fieldStyle}
        />
      </View>

      {featuredResult && resultLabel ? (
        <View style={styles.featuredResult}>
          <Typography variant="caption" style={styles.featuredKicker}>
            {t('calculations.goteo.result')}
          </Typography>
          <Typography style={styles.featuredValue}>{resultLabel}</Typography>
        </View>
      ) : (
        <CalculationResultCard
          label={t('calculations.goteo.result')}
          value={resultLabel ?? '—'}
        />
      )}
    </View>
  );
}

/** Dos filas independientes: adulto (factor 20) y pediátrico (factor 60). */
export function GoteoCalculationForm() {
  const { t } = useLocale();
  const { colors, fonts } = useAppTheme();
  const touchFriendly = true;
  const [adultVolume, setAdultVolume] = useState('');
  const [adultMinutes, setAdultMinutes] = useState('');
  const [pedVolume, setPedVolume] = useState('');
  const [pedMinutes, setPedMinutes] = useState('');

  const fieldStyle: GoteoFieldStyle = touchFriendly
    ? {
        borderColor: colors.border,
        backgroundColor: '#FFFFFF',
        color: colors.text,
        fontFamily: fonts.regular,
        paddingVertical: 12,
        paddingHorizontal: 12,
        minHeight: 44,
        marginBottom: 8,
        fontSize: 17,
        borderRadius: 12,
      }
    : {
        borderColor: colors.border,
        backgroundColor: colors.backgroundSoft,
        color: colors.text,
        fontFamily: fonts.regular,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minHeight: 32,
        marginBottom: 6,
        fontSize: 14,
      };

  return (
    <View style={styles.wrap}>
      <Typography variant="caption" color={colors.textMuted}>
        {t('calculations.goteo.hint')}
      </Typography>

      <GoteoRow
        title={t('calculations.goteo.adult')}
        dripFactor={DRIP_FACTOR_ADULT}
        volume={adultVolume}
        minutes={adultMinutes}
        onVolumeChange={setAdultVolume}
        onMinutesChange={setAdultMinutes}
        fieldStyle={fieldStyle}
        featuredResult={touchFriendly}
      />

      <GoteoRow
        title={t('calculations.goteo.pediatric')}
        dripFactor={DRIP_FACTOR_PEDIATRIC}
        volume={pedVolume}
        minutes={pedMinutes}
        onVolumeChange={setPedVolume}
        onMinutesChange={setPedMinutes}
        fieldStyle={fieldStyle}
        featuredResult={touchFriendly}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  rowCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
    padding: spacing.sm + 2,
    gap: spacing.sm,
  },
  rowCardFree: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  featuredResult: {
    backgroundColor: '#059669',
    borderRadius: 14,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.sm + 2,
    gap: 2,
  },
  featuredKicker: {
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  featuredValue: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
});
