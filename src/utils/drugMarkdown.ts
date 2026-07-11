import { StyleSheet } from 'react-native';
import type { MarkdownProps } from 'react-native-markdown-display';

import { palette } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

/** Markdown legible para monografías tipo cartilla. */
export const drugMarkdownStyles: MarkdownProps['style'] = StyleSheet.create({
  body: {
    color: palette.text,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * 1.55,
    width: '100%',
  },
  heading2: {
    color: palette.text,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * 1.4,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  heading3: {
    color: palette.textSecondary,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.45,
    marginTop: spacing.xs,
    marginBottom: 2,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: spacing.sm,
    width: '100%',
  },
  bullet_list: {
    marginBottom: spacing.sm,
    width: '100%',
  },
  ordered_list: {
    marginBottom: spacing.sm,
    width: '100%',
  },
  list_item: {
    marginBottom: spacing.xs,
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
    backgroundColor: palette.surface,
    borderLeftColor: palette.accentMuted,
    borderLeftWidth: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
});
