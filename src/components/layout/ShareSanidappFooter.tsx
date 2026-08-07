import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Share, StyleSheet, View } from 'react-native';

import { QRCodeDisplay } from '@/components/qr/QRCodeDisplay';
import { Typography } from '@/components/ui/Typography';
import { APP_CONFIG } from '@/constants/config';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

/** Bloque discreto al pie del menú: QR + compartir link de descarga. */
export function ShareSanidappFooter() {
  const { colors, fonts, hasBranding } = useAppTheme();
  const { t } = useLocale();
  const titleColor = hasBranding ? colors.menuText : colors.text;
  const muted = hasBranding ? colors.menuTextMuted : colors.textMuted;
  const downloadUrl = APP_CONFIG.shareDownloadUrl;

  async function handleShare() {
    hapticLight();
    try {
      await Share.share({
        message: t('shareApp.message', { url: downloadUrl, app: APP_CONFIG.name }),
        url: downloadUrl,
        title: t('shareApp.title'),
      });
    } catch {
      // Usuario canceló o el share no está disponible.
    }
  }

  return (
    <View
      style={[
        styles.wrap,
        {
          borderColor: colors.border,
          backgroundColor: colors.backgroundSoft,
        },
      ]}>
      <Typography
        variant="caption"
        style={{ color: titleColor, fontFamily: fonts.semiBold, letterSpacing: 0.4 }}>
        {t('shareApp.title')}
      </Typography>
      <View style={styles.row}>
        <QRCodeDisplay value={downloadUrl} size={72} />
        <View style={styles.copy}>
          <Typography variant="caption" style={{ color: muted, flexShrink: 1 }}>
            {t('shareApp.hint')}
          </Typography>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('shareApp.shareAction')}
            onPress={() => void handleShare()}
            style={({ pressed }) => [
              styles.shareBtn,
              {
                backgroundColor: colors.button,
                opacity: pressed ? 0.88 : 1,
              },
            ]}>
            <MaterialCommunityIcons name="share-variant" size={16} color="#FFFFFF" />
            <Typography variant="caption" style={styles.shareLabel}>
              {t('shareApp.shareAction')}
            </Typography>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  shareBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  shareLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
