import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { SpringPressable } from '@/components/ui/SpringPressable';
import { Typography } from '@/components/ui/Typography';
import { useDashboardTheme } from '@/hooks/useDashboardTheme';
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
  const { colors } = useDashboardTheme();

  return (
    <View style={styles.section}>
      <Typography variant="label" style={[styles.title, { color: colors.textSecondary }]}>
        {title}
      </Typography>
      {items.length === 0 ? (
        <View
          style={[
            styles.empty,
            { borderColor: colors.border, backgroundColor: colors.surface },
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
            { backgroundColor: colors.surface, borderColor: colors.border },
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
                  borderBottomColor: colors.border,
                },
              ]}>
              <View style={[styles.iconWrap, { backgroundColor: colors.surfaceMuted }]}>
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
                {item.subtitle ? (
                  <Typography variant="caption" style={{ color: colors.textMuted }}>
                    {item.subtitle}
                  </Typography>
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
  list: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
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
