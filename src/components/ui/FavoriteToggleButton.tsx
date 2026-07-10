import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useLocale } from '@/contexts/LocaleContext';
import {
  isFavorite,
  toggleFavorite,
  type RecordContentViewInput,
} from '@/services/storage/userActivityStorage';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { hapticLight, hapticSuccess } from '@/utils/haptics';

interface FavoriteToggleButtonProps {
  item: RecordContentViewInput;
  color?: string;
}

export function FavoriteToggleButton({ item, color = palette.accent }: FavoriteToggleButtonProps) {
  const { t } = useLocale();
  const [active, setActive] = useState(false);

  useEffect(() => {
    void isFavorite(item.id, item.type).then(setActive);
  }, [item.id, item.type]);

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={active ? t('favorites.remove') : t('favorites.add')}
        onPress={() => {
          void toggleFavorite(item).then((next) => {
            const nowActive = next.some(
              (entry) => entry.id === item.id && entry.type === item.type,
            );
            setActive(nowActive);
            if (nowActive) {
              hapticSuccess();
            } else {
              hapticLight();
            }
          });
        }}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        hitSlop={8}>
        <MaterialCommunityIcons
          name={active ? 'star' : 'star-outline'}
          size={24}
          color={active ? '#E6A817' : color}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginRight: spacing.sm,
  },
  button: {
    padding: spacing.xs,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
});
