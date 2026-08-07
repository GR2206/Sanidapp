import { forwardRef } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useTextScale } from '@/contexts/TextScaleContext';
import { playKeySound } from '@/services/audio/uiSoundService';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { fontFamily } from '@/theme/typography';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  /** ~15% más chico: labels e inputs (p. ej. Cálculos). */
  compact?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, style, onChangeText, compact = false, ...rest },
  ref,
) {
  const { s } = useTextScale();
  const baseFont = compact ? 12 : 14;
  const basePadV = compact ? 6 : 8;
  const baseMinH = compact ? 32 : 38;

  return (
    <>
      {label.trim() ? (
        <Typography
          variant="label"
          style={[styles.label, compact ? styles.labelCompact : null]}>
          {label}
        </Typography>
      ) : null}
      <TextInput
        ref={ref}
        allowFontScaling={false}
        placeholderTextColor={palette.textMuted}
        onChangeText={(value) => {
          playKeySound();
          onChangeText?.(value);
        }}
        style={[
          styles.input,
          {
            fontSize: s(baseFont),
            paddingVertical: s(basePadV),
            minHeight: s(baseMinH),
          },
          compact ? styles.inputCompact : null,
          error ? styles.inputError : null,
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Typography variant="caption" color={palette.accent} style={styles.error}>
          {error}
        </Typography>
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
    textTransform: 'none',
    letterSpacing: 0.2,
  },
  labelCompact: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    fontFamily: fontFamily.regular,
    color: palette.text,
    marginBottom: spacing.md,
  },
  inputCompact: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm + 2,
  },
  inputError: {
    borderColor: palette.accent,
  },
  error: {
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
  },
});
