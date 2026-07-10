import { StyleSheet, type TextStyle } from 'react-native';
import type { MarkdownProps } from 'react-native-markdown-display';

import { scalePx } from '@/contexts/TextScaleContext';

type MarkdownStyle = NonNullable<MarkdownProps['style']>;

/** Escala fontSize/lineHeight de estilos markdown. */
export function scaleTextStyles(
  styles: MarkdownStyle | undefined,
  scale: number,
): MarkdownStyle {
  const next: Record<string, TextStyle> = {};
  for (const [key, value] of Object.entries(styles ?? {})) {
    const flat = (StyleSheet.flatten(value as TextStyle) ?? {}) as TextStyle;
    const style: TextStyle = { ...flat };
    if (typeof style.fontSize === 'number') {
      style.fontSize = scalePx(style.fontSize, scale);
    }
    if (typeof style.lineHeight === 'number') {
      style.lineHeight = scalePx(style.lineHeight, scale);
    }
    next[key] = style;
  }
  return StyleSheet.create(next) as MarkdownStyle;
}
