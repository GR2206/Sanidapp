import { useMemo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { fontFamily, fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface PathologyMarkdownBodyProps {
  content: string;
  compact?: boolean;
}

function renderInlineMarkdown(text: string, baseStyle: object, strongStyle: object) {
  const tokens = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <Text key={`b-${index}`} style={[baseStyle, strongStyle]}>
          {token.slice(2, -2)}
        </Text>
      );
    }

    return token;
  });
}

function renderParagraph(paragraph: string, textStyle: object, strongStyle: object) {
  const lines = paragraph.split('\n');

  return lines.map((line, lineIndex) => (
    <Text key={`l-${lineIndex}`}>
      {renderInlineMarkdown(line, textStyle, strongStyle)}
      {lineIndex < lines.length - 1 ? '\n' : null}
    </Text>
  ));
}

/** Párrafos justificados (compatible con markdown inline **negrita**). */
export function PathologyMarkdownBody({ content, compact = false }: PathologyMarkdownBodyProps) {
  const { s } = useTextScale();
  const { colors } = useAppTheme();

  const textStyle = useMemo(
    () => ({
      width: '100%' as const,
      color: colors.text,
      fontFamily: fontFamily.regular,
      fontSize: s(compact ? fontSize.xs : fontSize.sm),
      lineHeight: s((compact ? fontSize.xs : fontSize.sm) * (compact ? 1.5 : 1.55)),
      textAlign: 'justify' as const,
      ...Platform.select({
        android: { textBreakStrategy: 'highQuality' as const },
        default: {},
      }),
    }),
    [colors.text, compact, s],
  );

  const strongStyle = useMemo(
    () => ({
      fontFamily: fontFamily.semiBold,
      color: colors.text,
    }),
    [colors.text],
  );

  if (!content.trim()) {
    return null;
  }

  const paragraphs = content
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <View style={styles.wrap}>
      {paragraphs.map((paragraph, index) => (
        <Text
          key={`p-${index}`}
          allowFontScaling={false}
          style={[textStyle, index < paragraphs.length - 1 ? styles.paragraphGap : null]}>
          {renderParagraph(paragraph, textStyle, strongStyle)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignSelf: 'stretch',
  },
  paragraphGap: {
    marginBottom: spacing.md,
  },
});
