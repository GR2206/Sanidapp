import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { freeCategoryPillLabel, freeCategoryPillTone } from '@/utils/freeCategoryPill';
import type { ContentItemType } from '@/types/userActivity';

interface CategoryTypePillProps {
  type: ContentItemType;
  subtitle?: string;
}

/** Badge tipo píldora para Recientes/Favoritos (app free). */
export function CategoryTypePill({ type, subtitle }: CategoryTypePillProps) {
  const { t } = useLocale();
  const tone = freeCategoryPillTone(type, subtitle);
  const label = freeCategoryPillLabel(type, subtitle, t);

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}>
      <Typography variant="caption" style={[styles.label, { color: tone.color }]} numberOfLines={1}>
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    maxWidth: '100%',
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
