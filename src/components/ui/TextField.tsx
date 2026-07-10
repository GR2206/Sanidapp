import { forwardRef } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useTextScale } from '@/contexts/TextScaleContext';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { fontFamily } from '@/theme/typography';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, style, ...rest },
  ref,
) {
  const { s } = useTextScale();

  return (
    <>
      <Typography variant="label" style={styles.label}>
        {label}
      </Typography>
      <TextInput
        ref={ref}
        allowFontScaling={false}
        placeholderTextColor={palette.textMuted}
        style={[
          styles.input,
          {
            fontSize: s(16),
            paddingVertical: s(10),
            minHeight: s(42),
          },
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
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.white,
    paddingHorizontal: spacing.md,
    fontFamily: fontFamily.regular,
    color: palette.text,
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: palette.accent,
  },
  error: {
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
  },
});
