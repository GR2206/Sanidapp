import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ScrollView, StyleSheet, View } from 'react-native';



import { SpringPressable } from '@/components/ui/SpringPressable';

import { Typography } from '@/components/ui/Typography';

import { useDashboardTheme } from '@/hooks/useDashboardTheme';

import { spacing } from '@/theme/spacing';

import { hapticLight } from '@/utils/haptics';

import { navigateToContentItem } from '@/utils/contentNavigation';

import type { ContentItemType } from '@/types/userActivity';



interface ActivityRowItem {

  id: string;

  type: ContentItemType;

  title: string;

  subtitle?: string;

}



interface HomeActivityRowProps {

  title: string;

  items: ActivityRowItem[];

  emptyLabel: string;

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



export function HomeActivityRow({ title, items, emptyLabel }: HomeActivityRowProps) {

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

          <Typography variant="caption" style={{ color: colors.textMuted }}>

            {emptyLabel}

          </Typography>

        </View>

      ) : (

        <ScrollView

          horizontal

          showsHorizontalScrollIndicator={false}

          contentContainerStyle={styles.row}>

          {items.map((item) => (

            <SpringPressable

              key={`${item.type}-${item.id}`}

              onPress={() => {

                hapticLight();

                navigateToContentItem(item.type, item.id);

              }}

              style={[

                styles.chip,

                {

                  borderColor: colors.border,

                  backgroundColor: colors.surface,

                },

              ]}>

              <MaterialCommunityIcons

                name={iconForType(item.type)}

                size={16}

                color={colors.accent}

              />

              <View style={styles.chipText}>

                <Typography

                  variant="bodyMedium"

                  numberOfLines={2}

                  style={[styles.chipTitle, { color: colors.text }]}>

                  {item.title}

                </Typography>

                {item.subtitle ? (

                  <Typography variant="caption" numberOfLines={1} style={{ color: colors.textMuted }}>

                    {item.subtitle}

                  </Typography>

                ) : null}

              </View>

            </SpringPressable>

          ))}

        </ScrollView>

      )}

    </View>

  );

}



const styles = StyleSheet.create({

  section: {

    gap: spacing.xs,

  },

  title: {

    paddingHorizontal: spacing.lg,

    letterSpacing: 0.6,

  },

  row: {

    paddingHorizontal: spacing.lg,

    gap: spacing.sm,

  },

  chip: {

    width: 168,

    minHeight: 72,

    borderRadius: 14,

    borderWidth: 1,

    padding: spacing.sm,

    flexDirection: 'row',

    gap: spacing.xs,

    alignItems: 'flex-start',

  },

  chipText: {

    flex: 1,

    gap: 2,

  },

  chipTitle: {

    fontSize: 13,

    lineHeight: 17,

  },

  empty: {

    marginHorizontal: spacing.lg,

    borderRadius: 12,

    borderWidth: 1,

    borderStyle: 'dashed',

    padding: spacing.md,

  },

});

