import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { palette } from '@/theme/colors';
import { fontFamily } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export function useCatalogListStyles() {
  const { colors, fonts } = useAppTheme();
  const { s } = useTextScale();

  return useMemo(
    () =>
      StyleSheet.create({
        screen: {
          paddingTop: spacing.xs,
        },
        searchWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          backgroundColor: palette.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 999,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          marginBottom: spacing.sm,
        },
        searchInput: {
          flex: 1,
          fontFamily: fontFamily.regular,
          fontSize: s(14),
          color: palette.text,
          paddingVertical: spacing.xs,
        },
        list: {
          flex: 1,
        },
        listContent: {
          paddingTop: spacing.xs,
        },
        letterHeader: {
          textAlign: 'left',
          color: colors.header,
          fontFamily: fonts.semiBold,
          fontSize: s(22),
          lineHeight: s(28),
          paddingTop: spacing.md,
          paddingBottom: spacing.xs,
        },
        row: {
          paddingVertical: spacing.sm,
          paddingLeft: spacing.sm,
        },
        rowPressed: {
          opacity: 0.7,
        },
        rowName: {
          textAlign: 'left',
          color: palette.text,
        },
        empty: {
          textAlign: 'center',
          padding: spacing.xl,
        },
      }),
    [colors, fonts, s],
  );
}
