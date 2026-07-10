import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

interface FloatingMenuButtonProps {
  onPress: () => void;
  accentColor?: string;
}

/** Botón hamburguesa en globo flotante para abrir el menú lateral. */
export function FloatingMenuButton({ onPress, accentColor = palette.accent }: FloatingMenuButtonProps) {
  const insets = useSafeAreaInsets();
  const { t } = useLocale();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.anchor, { top: insets.top + spacing.sm, left: insets.left + spacing.sm }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('drawer.openMenu')}
        onPressIn={hapticLight}
        onPress={onPress}
        style={({ pressed }) => [styles.bubble, pressed && styles.pressed]}>
        <Ionicons name="menu" size={22} color={accentColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    zIndex: 20,
  },
  bubble: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    shadowColor: palette.accent,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
});
