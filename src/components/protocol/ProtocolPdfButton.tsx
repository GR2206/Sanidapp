import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { useLocale } from '@/contexts/LocaleContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { exportProtocolPdf } from '@/services/pdf/protocolPdf';
import type { Protocol } from '@/types/protocol';
import { spacing } from '@/theme/spacing';

interface ProtocolPdfButtonProps {
  protocol: Protocol;
}

export function ProtocolPdfButton({ protocol }: ProtocolPdfButtonProps) {
  const [busy, setBusy] = useState(false);
  const { locale, t } = useLocale();
  const { isPremium } = usePremiumAccess();

  if (!isPremium) {
    return null;
  }

  const handlePress = async () => {
    if (busy) return;

    setBusy(true);
    try {
      await exportProtocolPdf(protocol, locale);
    } catch {
      Alert.alert(t('qr.pdfFailed'), t('scanner.pdfShareUnavailable'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <Button
        label={busy ? t('qr.generatingPdf') : t('qr.downloadPdf')}
        variant="secondary"
        onPress={handlePress}
        disabled={busy}
        accessibilityLabel={t('qr.downloadPdfA11y', { title: protocol.title })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.lg,
  },
});
