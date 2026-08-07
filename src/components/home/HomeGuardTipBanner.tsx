import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { loadGuardTipOfDay, type ResolvedGuardTip } from '@/services/content/guardTipService';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';

/**
 * Banner gancho del home free: tip clínico / clima de guardia.
 * No se muestra en skins de sanatorio.
 */
export function HomeGuardTipBanner() {
  const { t, locale } = useLocale();
  const [tip, setTip] = useState<ResolvedGuardTip | null>(null);
  const cardShadow = freeElevatedCardStyle(true);

  useEffect(() => {
    let active = true;
    void loadGuardTipOfDay(locale).then((next) => {
      if (active) {
        setTip(next);
      }
    });
    return () => {
      active = false;
    };
  }, [locale]);

  if (!tip) {
    return null;
  }

  const label = tip.label.trim() || t('home.guardTipLabel');

  return (
    <View style={[styles.wrap, cardShadow, styles.wrapRadius]}>
      <LinearGradient
        colors={['#00B4D8', '#0077B6', '#023E8A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <Typography variant="caption" style={styles.label} numberOfLines={1}>
          {`💡 ${label}`}
        </Typography>
        <Typography variant="bodyMedium" style={styles.text}>
          {`“${tip.text.trim()}”`}
        </Typography>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  wrapRadius: {
    borderRadius: 18,
  },
  gradient: {
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  label: {
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 0.4,
    fontWeight: '600',
  },
  text: {
    color: '#FFFFFF',
    lineHeight: 20,
  },
});
