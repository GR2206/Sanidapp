import { StyleSheet } from 'react-native';
import type { MarkdownProps } from 'react-native-markdown-display';

import { palette } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

/** Markdown compacto para monografías (más denso que protocolos). */
export const drugMarkdownStyles: MarkdownProps['style'] = StyleSheet.create({
  body: {
    color: palette.text,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5,
  },
  heading2: {
    color: palette.text,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.4,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  heading3: {
    color: palette.textSecondary,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.4,
    marginTop: spacing.xs,
    marginBottom: 2,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: spacing.sm,
  },
  bullet_list: {
    marginBottom: spacing.xs,
  },
  ordered_list: {
    marginBottom: spacing.xs,
  },
  list_item: {
    marginBottom: 2,
  },
  bullet_list_icon: {
    color: palette.accentMuted,
    marginLeft: spacing.xs,
  },
  strong: {
    fontFamily: fontFamily.semiBold,
    color: palette.text,
  },
  blockquote: {
    backgroundColor: palette.backgroundSoft,
    borderLeftColor: palette.accentMuted,
    borderLeftWidth: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
});
