import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { CategoryTypePill } from '@/components/home/CategoryTypePill';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { brandSoftFill, freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import { navigateToContentItem } from '@/utils/contentNavigation';
import type { ContentItemType } from '@/types/userActivity';

interface ActivityListItem {
  id: string;
  type: ContentItemType;
  title: string;
  subtitle?: string;
}

interface DashboardActivityListProps {
  title: string;
  items: ActivityListItem[];
  emptyLabel: string;
  emptyIcon: 'star-outline' | 'history';
}

function iconForType(type: ContentItemType) {
  switch (type) {
    case 'drug':
      return 'pill';
    case 'pathology':
      return 'stethoscope';
    default:
      return 'file-document-outline';
  }
}

export function DashboardActivityList({
  title,
  items,
  emptyLabel,
  emptyIcon,
}: DashboardActivityListProps) {
  const { colors, isDark, fonts } = useDashboardTheme();
  const freeCard = freeElevatedCardStyle(!isDark);
  const iconBg = freeCard ? brandSoftFill(colors.accent, 0.9) : colors.surfaceMuted;
  const titleTone =
    title.toLowerCase().includes('favor') || title.toLowerCase().includes('favour')
      ? FREE_QUICK_ACCESS_TONES.farmacologia
      : FREE_QUICK_ACCESS_TONES.neonatologia;

  return (
    <View style={styles.section}>
      <Typography
        variant="label"
        style={[styles.title, { color: titleTone.label, fontFamily: fonts.semiBold }]}>
        {title}
      </Typography>
      {items.length === 0 ? (
        <View
          style={[
            styles.empty,
            freeCard ?? { borderColor: colors.border, backgroundColor: colors.surface },
            freeCard ? styles.emptyFree : null,
          ]}>
          <MaterialCommunityIcons name={emptyIcon} size={32} color={colors.textMuted} />
          <Typography variant="body" style={{ color: colors.textMuted, textAlign: 'center' }}>
            {emptyLabel}
          </Typography>
        </View>
      ) : (
        <View
          style={[
            styles.list,
            freeCard
              ? [freeCard, styles.listFree]
              : { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          {items.map((item, index) => (
            <SpringPressable
              key={`${item.type}-${item.id}`}
              onPress={() => {
                hapticLight();
                navigateToContentItem(item.type, item.id);
              }}
              style={[
                styles.row,
                index < items.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: freeCard ? 'rgba(0,0,0,0.06)' : colors.border,
                },
              ]}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: iconBg,
                  },
                ]}>
                <MaterialCommunityIcons
                  name={iconForType(item.type)}
                  size={18}
                  color={colors.accent}
                />
              </View>
              <View style={styles.text}>
                <Typography variant="bodyMedium" style={{ color: colors.text }}>
                  {item.title}
                </Typography>
                {item.subtitle || item.type ? (
                  <CategoryTypePill type={item.type} subtitle={item.subtitle} />
                ) : null}
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
            </SpringPressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    letterSpacing: 0.8,
  },
  empty: {
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: spacing.xl,
  },
  emptyFree: {
    borderStyle: 'solid',
  },
  list: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  listFree: {
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
