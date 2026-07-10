import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, View } from 'react-native';

import { palette } from '@/theme/colors';
import { radius } from '@/theme/spacing';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export function QRCodeDisplay({ value, size = 120 }: QRCodeDisplayProps) {
  return (
    <View style={[styles.frame, { width: size + 16, height: size + 16 }]}>
      <QRCode
        value={value}
        size={size}
        color={palette.text}
        backgroundColor={palette.white}
        quietZone={8}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.sm,
  },
});
