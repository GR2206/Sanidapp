import { StyleSheet, View } from 'react-native';

import { LogoMark } from '@/components/ui/LogoMark';
import { useAppTheme } from '@/hooks/useAppTheme';
import { palette } from '@/theme/colors';

export function AppWatermark() {
  const { colors } = useAppTheme();

  return (
    <View
      style={styles.root}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <View style={styles.mark}>
        <LogoMark
          size={148}
          showTitle
          title="Sanidapp"
          accentColor={colors.textAccent ?? palette.accent}
          watermark
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  mark: {
    opacity: 0.06,
  },
});
