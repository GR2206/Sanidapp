import { useMemo } from 'react';
import Markdown from 'react-native-markdown-display';

import { useTextScale } from '@/contexts/TextScaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { protocolMarkdownStyles } from '@/utils/markdown';
import { scaleTextStyles } from '@/utils/scaleTextStyles';
import { withThemeMarkdownColors } from '@/utils/withThemeMarkdownColors';

interface ProtocolBodyProps {
  content: string;
}

export function ProtocolBody({ content }: ProtocolBodyProps) {
  const { scale } = useTextScale();
  const { colors } = useAppTheme();
  const styles = useMemo(
    () => scaleTextStyles(withThemeMarkdownColors(protocolMarkdownStyles, colors), scale),
    [colors, scale],
  );

  return <Markdown style={styles}>{content}</Markdown>;
}
