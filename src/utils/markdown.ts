import { StyleSheet } from 'react-native';
import type { MarkdownProps } from 'react-native-markdown-display';

import { palette } from '@/theme/colors';
import { fontFamily, fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const protocolMarkdownStyles: MarkdownProps['style'] = StyleSheet.create({
  body: {
    color: palette.text,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * 1.6,
  },
  heading1: {
    color: palette.text,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * 1.3,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  heading2: {
    color: palette.text,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * 1.35,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  heading3: {
    color: palette.textSecondary,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * 1.4,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: spacing.md,
  },
  bullet_list: {
    marginBottom: spacing.md,
  },
  ordered_list: {
    marginBottom: spacing.md,
  },
  list_item: {
    marginBottom: spacing.xs,
  },
  bullet_list_icon: {
    color: palette.accent,
    marginLeft: spacing.xs,
  },
  ordered_list_icon: {
    color: palette.accent,
    fontFamily: fontFamily.medium,
  },
  strong: {
    fontFamily: fontFamily.semiBold,
    color: palette.text,
  },
  em: {
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: palette.textSecondary,
  },
  link: {
    color: palette.accent,
    textDecorationLine: 'underline',
  },
  blockquote: {
    backgroundColor: palette.backgroundSoft,
    borderLeftColor: palette.accentMuted,
    borderLeftWidth: 3,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  code_inline: {
    fontFamily: fontFamily.medium,
    backgroundColor: palette.backgroundSoft,
    color: palette.text,
    fontSize: fontSize.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: 4,
  },
  fence: {
    backgroundColor: palette.backgroundSoft,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  code_block: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: palette.text,
  },
  hr: {
    backgroundColor: palette.border,
    height: 1,
    marginVertical: spacing.lg,
  },
  table: {
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: palette.backgroundSoft,
  },
  th: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: palette.text,
    padding: spacing.sm,
    borderColor: palette.border,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: palette.border,
  },
  td: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: palette.textSecondary,
    padding: spacing.sm,
    borderColor: palette.border,
  },
});
