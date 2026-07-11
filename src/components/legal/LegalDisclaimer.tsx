import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

/** Aviso legal completo, desplegable desde Ajustes. */
export function LegalDisclaimer() {
  const { t } = useLocale();
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.wrap, { borderBottomColor: colors.border }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => {
          hapticLight();
          setOpen((value) => !value);
        }}
        style={styles.trigger}>
        <MaterialCommunityIcons name="scale-balance" size={22} color={colors.button} />
        <View style={styles.triggerText}>
          <Typography variant="bodyMedium" style={{ color: colors.text }}>
            {t('legal.tabTitle')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted }}>
            {open ? t('legal.tabHintOpen') : t('legal.tabHint')}
          </Typography>
        </View>
        <MaterialCommunityIcons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={colors.textMuted}
        />
      </Pressable>

      {open ? (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.borderStrong },
          ]}>
          <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
            {t('legal.title')}
          </Typography>
          <Typography variant="caption" style={[styles.paragraph, { color: colors.textSecondary }]}>
            {t('legal.scientificNature')}
          </Typography>
          <Typography variant="caption" style={[styles.paragraph, { color: colors.textSecondary }]}>
            {t('legal.bibliography')}
          </Typography>
          <Typography variant="caption" style={[styles.paragraph, { color: colors.textSecondary }]}>
            {t('legal.informativeUse')}
          </Typography>
          <Typography
            variant="caption"
            style={[styles.paragraph, { color: colors.textSecondary }]}>
            {t('legal.professionalResponsibility')}
          </Typography>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    paddingBottom: spacing.sm,
    marginBottom: spacing.xs,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  triggerText: {
    flex: 1,
    gap: 2,
    minWidth: 120,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  title: {
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  paragraph: {
    lineHeight: 20,
    textAlign: 'justify',
  },
});
