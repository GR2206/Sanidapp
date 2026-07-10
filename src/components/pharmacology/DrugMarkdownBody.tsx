import { useMemo } from 'react';
import Markdown from 'react-native-markdown-display';

import { useTextScale } from '@/contexts/TextScaleContext';
import { drugMarkdownStyles } from '@/utils/drugMarkdown';
import { scaleTextStyles } from '@/utils/scaleTextStyles';

interface DrugMarkdownBodyProps {
  content: string;
}

export function DrugMarkdownBody({ content }: DrugMarkdownBodyProps) {
  const { scale } = useTextScale();
  const styles = useMemo(() => scaleTextStyles(drugMarkdownStyles, scale), [scale]);

  if (!content.trim()) {
    return null;
  }

  return <Markdown style={styles}>{content}</Markdown>;
}
