import { StyleSheet, View } from 'react-native';

import { UpdateBadge } from '@/components/ui/UpdateBadge';
import { spacing } from '@/theme/spacing';

interface ForoMenuBadgeProps {
  count: number;
}

export function ForoMenuBadge({ count }: ForoMenuBadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <UpdateBadge count={count} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    width: 22,
    height: 22,
    marginLeft: spacing.sm,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
