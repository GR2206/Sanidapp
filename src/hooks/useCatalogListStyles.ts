import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useAppearance } from '@/contexts/AppearanceContext';
import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import {
  livelyPillAt,
  livelySearchFieldStyle,
  livelyToneAt,
} from '@/theme/livelyUi';
import { spacing } from '@/theme/spacing';
import { fontFamily } from '@/theme/typography';

/** Estilos compartidos de listados A–Z con paleta viva (pasteles + elevación). */
export function useCatalogListStyles() {
  const { colors, fonts } = useAppTheme();
  const { isDark } = useAppearance();
  const { s } = useTextScale();
  const searchStyle = livelySearchFieldStyle(isDark, {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.border,
  });

  return useMemo(() => {
    const styles = StyleSheet.create({
      screen: {
        paddingTop: spacing.xs,
      },
      searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        ...searchStyle,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        marginBottom: spacing.sm,
      },
      searchInput: {
        flex: 1,
        fontFamily: fontFamily.regular,
        fontSize: s(14),
        color: colors.text,
        paddingVertical: spacing.xs,
      },
      list: {
        flex: 1,
      },
      listContent: {
        paddingTop: spacing.xs,
        gap: spacing.xs,
      },
      letterHeaderWrap: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
      },
      letterHeader: {
        textAlign: 'left',
        fontFamily: fonts.semiBold,
        fontSize: s(16),
        lineHeight: s(22),
        letterSpacing: 0.6,
      },
      row: {
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        borderRadius: 14,
        marginBottom: 2,
        ...(isDark
          ? {
              backgroundColor: colors.backgroundSoft,
              borderWidth: 1,
              borderColor: colors.border,
            }
          : {
              backgroundColor: '#FFFFFF',
              shadowColor: '#000000',
              shadowOpacity: 0.04,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }),
      },
      rowPressed: {
        opacity: 0.85,
      },
      rowName: {
        textAlign: 'left',
        color: colors.text,
      },
      empty: {
        textAlign: 'center',
        padding: spacing.xl,
        color: colors.textMuted,
      },
    });

    function letterTone(letter: string) {
      const code = letter.toUpperCase().charCodeAt(0);
      const index = Number.isFinite(code) ? Math.max(0, code - 65) : 0;
      const tone = livelyToneAt(index);
      const pill = livelyPillAt(index);
      return {
        wrap: { backgroundColor: pill.backgroundColor },
        text: { color: tone.label },
      };
    }

    return { ...styles, letterTone };
  }, [colors, fonts, isDark, s, searchStyle]);
}
