import { StyleSheet } from 'react-native';
import type { MarkdownProps } from 'react-native-markdown-display';

import type { AppThemeColors } from '@/hooks/useAppTheme';

type MarkdownStyle = NonNullable<MarkdownProps['style']>;

type ThemeableColors = Pick<
  AppThemeColors,
  | 'text'
  | 'textSecondary'
  | 'textMuted'
  | 'textAccent'
  | 'border'
  | 'borderStrong'
  | 'backgroundSoft'
>;

function flattenStyle(value: unknown): Record<string, unknown> {
  if (value == null) {
    return {};
  }
  const flat = StyleSheet.flatten(value as object);
  return flat && typeof flat === 'object' ? { ...(flat as object) } : {};
}

/** Aplica colores del tema activo a estilos markdown estáticos (modo claro/oscuro). */
export function withThemeMarkdownColors(
  styles: MarkdownStyle | null | undefined,
  colors: ThemeableColors,
): Record<string, object> {
  const source = (styles ?? {}) as Record<string, unknown>;
  const keys = new Set([
    ...Object.keys(source),
    'blockquote',
    'code_inline',
    'fence',
    'code_block',
    'hr',
    'table',
    'thead',
    'th',
    'tr',
    'td',
  ]);

  const textByKey: Record<string, string> = {
    body: colors.text,
    heading1: colors.text,
    heading2: colors.text,
    heading3: colors.textSecondary,
    heading4: colors.textSecondary,
    heading5: colors.textSecondary,
    heading6: colors.textSecondary,
    paragraph: colors.text,
    text: colors.text,
    strong: colors.text,
    em: colors.textSecondary,
    bullet_list: colors.text,
    ordered_list: colors.text,
    list_item: colors.text,
    bullet_list_icon: colors.textAccent,
    ordered_list_icon: colors.textAccent,
    link: colors.textAccent,
    blockquote: colors.text,
    code_inline: colors.text,
    fence: colors.text,
    code_block: colors.text,
    table: colors.text,
    th: colors.text,
    td: colors.textSecondary,
  };

  const surfaceByKey: Record<string, Record<string, string>> = {
    blockquote: {
      backgroundColor: colors.backgroundSoft,
      borderLeftColor: colors.textAccent,
    },
    code_inline: {
      backgroundColor: colors.backgroundSoft,
    },
    fence: {
      backgroundColor: colors.backgroundSoft,
      borderColor: colors.border,
    },
    hr: {
      backgroundColor: colors.border,
    },
    table: {
      borderColor: colors.border,
    },
    thead: {
      backgroundColor: colors.backgroundSoft,
    },
    th: {
      borderColor: colors.border,
    },
    tr: {
      borderColor: colors.border,
    },
    td: {
      borderColor: colors.border,
    },
  };

  const next: Record<string, object> = {};

  for (const key of keys) {
    const base = flattenStyle(source[key]);
    const textColor = textByKey[key];
    const surface = surfaceByKey[key];
    if (!textColor && !surface && Object.keys(base).length === 0) {
      continue;
    }
    next[key] = {
      ...base,
      ...(surface ?? {}),
      ...(textColor ? { color: textColor } : {}),
    };
  }

  return next;
}
