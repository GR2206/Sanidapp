import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { contrastingInk } from '@/utils/color';
import { hapticLight } from '@/utils/haptics';

type Op = '+' | '-' | '×' | '÷';

type KeyDef =
  | { label: string; kind: 'digit' | 'dot' | 'clear' | 'back' | 'eq'; value?: string }
  | { label: string; kind: 'op'; value: Op };

function applyOp(left: number, right: number, op: Op): number | null {
  switch (op) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '×':
      return left * right;
    case '÷':
      if (right === 0) return null;
      return left / right;
    default:
      return null;
  }
}

function formatDisplay(value: number): string {
  if (!Number.isFinite(value)) return 'Error';
  const rounded = Number(value.toPrecision(12));
  const asString = String(rounded);
  if (asString.includes('e') || asString.includes('E')) {
    return rounded.toPrecision(8);
  }
  return asString;
}

/**
 * Calculadora básica (+ − × ÷) para no salir de la app.
 */
export function BasicCalculator() {
  const { t } = useLocale();
  const { colors, fonts, isDashboardDark } = useAppTheme();
  const card = freeElevatedCardStyle(!isDashboardDark);

  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op | null>(null);
  const [freshEntry, setFreshEntry] = useState(true);
  const [error, setError] = useState(false);

  const keys: KeyDef[][] = [
    [
      { label: 'C', kind: 'clear' },
      { label: '⌫', kind: 'back' },
      { label: '÷', kind: 'op', value: '÷' },
      { label: '×', kind: 'op', value: '×' },
    ],
    [
      { label: '7', kind: 'digit', value: '7' },
      { label: '8', kind: 'digit', value: '8' },
      { label: '9', kind: 'digit', value: '9' },
      { label: '−', kind: 'op', value: '-' },
    ],
    [
      { label: '4', kind: 'digit', value: '4' },
      { label: '5', kind: 'digit', value: '5' },
      { label: '6', kind: 'digit', value: '6' },
      { label: '+', kind: 'op', value: '+' },
    ],
    [
      { label: '1', kind: 'digit', value: '1' },
      { label: '2', kind: 'digit', value: '2' },
      { label: '3', kind: 'digit', value: '3' },
      { label: '=', kind: 'eq' },
    ],
    [
      { label: '0', kind: 'digit', value: '0' },
      { label: '.', kind: 'dot' },
    ],
  ];

  function resetAll() {
    setDisplay('0');
    setStored(null);
    setPendingOp(null);
    setFreshEntry(true);
    setError(false);
  }

  function pushDigit(digit: string) {
    setError(false);
    setDisplay((current) => {
      if (freshEntry || current === '0' || error) {
        setFreshEntry(false);
        return digit;
      }
      if (current.length >= 14) return current;
      return `${current}${digit}`;
    });
  }

  function pushDot() {
    setError(false);
    setDisplay((current) => {
      if (freshEntry || error) {
        setFreshEntry(false);
        return '0.';
      }
      if (current.includes('.')) return current;
      return `${current}.`;
    });
  }

  function backspace() {
    if (error) {
      resetAll();
      return;
    }
    setDisplay((current) => {
      if (freshEntry) return current;
      if (current.length <= 1) {
        setFreshEntry(true);
        return '0';
      }
      return current.slice(0, -1);
    });
  }

  function commitOp(nextOp: Op) {
    const current = Number.parseFloat(display.replace(',', '.'));
    if (!Number.isFinite(current)) {
      setError(true);
      setDisplay(t('calculations.calculator.error'));
      return;
    }

    if (stored != null && pendingOp && !freshEntry) {
      const next = applyOp(stored, current, pendingOp);
      if (next == null) {
        setError(true);
        setDisplay(t('calculations.calculator.divByZero'));
        setStored(null);
        setPendingOp(null);
        setFreshEntry(true);
        return;
      }
      const shown = formatDisplay(next);
      setDisplay(shown);
      setStored(next);
    } else {
      setStored(current);
    }
    setPendingOp(nextOp);
    setFreshEntry(true);
    setError(false);
  }

  function equals() {
    if (stored == null || !pendingOp) return;
    const current = Number.parseFloat(display.replace(',', '.'));
    if (!Number.isFinite(current)) {
      setError(true);
      setDisplay(t('calculations.calculator.error'));
      return;
    }
    const next = applyOp(stored, current, pendingOp);
    if (next == null) {
      setError(true);
      setDisplay(t('calculations.calculator.divByZero'));
      setStored(null);
      setPendingOp(null);
      setFreshEntry(true);
      return;
    }
    setDisplay(formatDisplay(next));
    setStored(null);
    setPendingOp(null);
    setFreshEntry(true);
    setError(false);
  }

  function onKey(key: KeyDef) {
    hapticLight();
    switch (key.kind) {
      case 'clear':
        resetAll();
        break;
      case 'back':
        backspace();
        break;
      case 'digit':
        if (key.value) pushDigit(key.value);
        break;
      case 'dot':
        pushDot();
        break;
      case 'op':
        commitOp(key.value);
        break;
      case 'eq':
        equals();
        break;
    }
  }

  function keyColors(key: KeyDef): { bg: string; fg: string } {
    if (key.kind === 'eq') {
      return { bg: colors.button, fg: contrastingInk(colors.button) };
    }
    if (key.kind === 'op' || key.kind === 'clear' || key.kind === 'back') {
      return {
        bg: isDashboardDark ? colors.backgroundSoft : '#EEF2F6',
        fg: colors.button,
      };
    }
    return {
      bg: isDashboardDark ? colors.menuBackground : '#FFFFFF',
      fg: colors.text,
    };
  }

  return (
    <View
      style={[
        styles.card,
        card ?? {
          backgroundColor: colors.backgroundSoft,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}>
      <View
        style={[
          styles.display,
          {
            backgroundColor: isDashboardDark ? colors.menuBackground : '#F4F7FA',
            borderColor: colors.borderStrong,
          },
        ]}>
        <Typography
          variant="caption"
          style={{ color: colors.textMuted, alignSelf: 'flex-end' }}
          numberOfLines={1}>
          {pendingOp && stored != null && !error
            ? `${formatDisplay(stored)} ${pendingOp}`
            : ' '}
        </Typography>
        <Typography
          style={[
            styles.displayValue,
            { color: error ? '#C62828' : colors.text, fontFamily: fonts.semiBold },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}>
          {display}
        </Typography>
      </View>

      <View style={styles.pad}>
        {keys.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((key) => {
              const tone = keyColors(key);
              const wideZero = key.kind === 'digit' && key.value === '0';
              return (
                <Pressable
                  key={key.label}
                  accessibilityRole="button"
                  accessibilityLabel={key.label}
                  onPress={() => onKey(key)}
                  style={({ pressed }) => [
                    styles.key,
                    wideZero ? styles.keyWide : null,
                    key.kind === 'eq' ? styles.keyTall : null,
                    {
                      backgroundColor: tone.bg,
                      borderColor: isDashboardDark ? colors.border : 'rgba(0,0,0,0.06)',
                      opacity: pressed ? 0.88 : 1,
                    },
                  ]}>
                  <Typography
                    style={[
                      styles.keyLabel,
                      {
                        color: tone.fg,
                        fontFamily: fonts.semiBold,
                        fontSize: key.kind === 'op' || key.kind === 'eq' ? 22 : 18,
                      },
                    ]}>
                    {key.label}
                  </Typography>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: spacing.sm + 2,
    gap: spacing.sm,
  },
  display: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 72,
    justifyContent: 'center',
    gap: 2,
  },
  displayValue: {
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'right',
  },
  pad: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  key: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWide: {
    flex: 2.08,
  },
  keyTall: {
    minHeight: 48,
  },
  keyLabel: {
    fontWeight: '700',
  },
});
