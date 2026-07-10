import { StyleSheet, View } from 'react-native';

import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay';
import { Typography } from '@/components/ui/Typography';
import { getProtocolQrPayload } from '@/services/qr/qrEncoder';
import { getProtocolDisplayDate, type ProtocolMeta } from '@/types/protocol';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface ProtocolQrCardProps {
  protocol: ProtocolMeta;
  qrSize?: number;
}

export function ProtocolQrCard({ protocol, qrSize = 128 }: ProtocolQrCardProps) {
  const qrValue = getProtocolQrPayload(protocol.id, protocol.qrPayload);
  const displayDate = getProtocolDisplayDate(protocol);

  return (
    <View style={styles.card}>
      <QRCodeDisplay value={qrValue} size={qrSize} />

      <Typography variant="bodyMedium" style={styles.title}>
        {protocol.title}
      </Typography>

      <Typography variant="caption" color={palette.textMuted}>
        {displayDate}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  title: {
    textAlign: 'center',
  },
});
