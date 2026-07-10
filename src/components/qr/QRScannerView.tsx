import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { openProtocolFromScan } from '@/services/qr/qrResolver';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

export function QRScannerView() {
  const insets = useSafeAreaInsets();
  const { t } = useLocale();
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const lastScanRef = useRef<string | null>(null);

  const resetScanner = useCallback(() => {
    setError(null);
    setIsLocked(false);
    lastScanRef.current = null;
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetScanner();
    }, [resetScanner]),
  );

  const handleBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      if (isLocked) {
        return;
      }

      if (lastScanRef.current === data) {
        return;
      }

      lastScanRef.current = data;
      setIsLocked(true);

      const protocolId = openProtocolFromScan(data);

      if (!protocolId) {
        setError(t('scanner.unrecognized'));
        setIsLocked(false);
        lastScanRef.current = null;
        return;
      }

      setError(null);
    },
    [isLocked, t],
  );

  const handleScanAgain = () => {
    resetScanner();
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.fallback}>
        <Typography variant="section" style={styles.centeredText}>
          {t('scanner.webUnavailable')}
        </Typography>
        <Typography variant="body" color={palette.textSecondary} style={styles.centeredText}>
          {t('scanner.webDetail')}
        </Typography>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={styles.fallback}>
        <Typography variant="body" color={palette.textSecondary}>
          {t('scanner.requestingCamera')}
        </Typography>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.fallback}>
        <Typography variant="section" style={styles.centeredText}>
          {t('scanner.cameraAccess')}
        </Typography>
        <Typography variant="body" color={palette.textSecondary} style={styles.centeredText}>
          {t('scanner.cameraPermissionDetail')}
        </Typography>
        <Button label={t('scanner.allowCamera')} onPress={requestPermission} style={styles.permissionButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={isLocked ? undefined : handleBarcodeScanned}
      />

      <View style={[styles.overlay, { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('common.back')}
            onPress={() => router.back()}
            style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={palette.white} />
          </Pressable>
          <Typography variant="bodyMedium" color={palette.white} style={styles.instruction}>
            {t('scanner.pointAtQr')}
          </Typography>
          <View style={styles.backSpacer} />
        </View>

        <View style={styles.frameOuter}>
          <View style={styles.frame} />
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Typography variant="body" color={palette.white}>
              {error}
            </Typography>
            <Pressable onPress={handleScanAgain} style={styles.retryLink}>
              <Typography variant="bodyMedium" color={palette.white}>
                {t('common.retry')}
              </Typography>
            </Pressable>
          </View>
        ) : (
          <Typography variant="caption" color={palette.white} style={styles.hint}>
            {t('scanner.autoOpen')}
          </Typography>
        )}
      </View>
    </View>
  );
}

const FRAME_SIZE = 248;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.text,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    backgroundColor: palette.background,
  },
  centeredText: {
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  backSpacer: {
    width: 40,
  },
  instruction: {
    flex: 1,
    textAlign: 'center',
  },
  frameOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: palette.white,
    backgroundColor: 'transparent',
  },
  hint: {
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    opacity: 0.9,
  },
  errorBox: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  retryLink: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
