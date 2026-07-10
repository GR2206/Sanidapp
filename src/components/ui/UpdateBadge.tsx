import { StyleSheet, Text, View } from 'react-native';

interface UpdateBadgeProps {
  count: number;
}

export function UpdateBadge({ count }: UpdateBadgeProps) {
  if (count <= 0) {
    return null;
  }

  const label = count > 9 ? '9+' : String(count);

  return (
    <View style={styles.badge}>
      {count > 1 ? <Text style={styles.label}>{label}</Text> : <View style={styles.dot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E53935',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 11,
  },
});
