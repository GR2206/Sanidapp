import { StyleSheet, View } from 'react-native';

import { AppWatermark } from '@/components/layout/AppWatermark';
import { QRScannerView } from '@/components/qr/QRScannerView';
import { palette } from '@/theme/colors';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <AppWatermark />
      <QRScannerView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.text,
    position: 'relative',
  },
});
