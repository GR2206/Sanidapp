import { useMemo } from 'react';
import Markdown from 'react-native-markdown-display';

import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { drugMarkdownStyles } from '@/utils/drugMarkdown';
import { scaleTextStyles } from '@/utils/scaleTextStyles';
import { withThemeMarkdownColors } from '@/utils/withThemeMarkdownColors';

interface DrugMarkdownBodyProps {
  content: string;
}

export function DrugMarkdownBody({ content }: DrugMarkdownBodyProps) {
  const { scale } = useTextScale();
  const { colors } = useAppTheme();
  const styles = useMemo(
    () => scaleTextStyles(withThemeMarkdownColors(drugMarkdownStyles, colors), scale),
    [colors, scale],
  );

  if (!content.trim()) {
    return null;
  }

  return <Markdown style={styles}>{content}</Markdown>;
}
