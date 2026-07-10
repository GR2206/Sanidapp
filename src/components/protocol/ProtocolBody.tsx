import { useMemo } from 'react';
import Markdown from 'react-native-markdown-display';

import { useTextScale } from '@/contexts/TextScaleContext';
import { protocolMarkdownStyles } from '@/utils/markdown';
import { scaleTextStyles } from '@/utils/scaleTextStyles';

interface ProtocolBodyProps {
  content: string;
}

export function ProtocolBody({ content }: ProtocolBodyProps) {
  const { scale } = useTextScale();
  const styles = useMemo(() => scaleTextStyles(protocolMarkdownStyles, scale), [scale]);

  return <Markdown style={styles}>{content}</Markdown>;
}
