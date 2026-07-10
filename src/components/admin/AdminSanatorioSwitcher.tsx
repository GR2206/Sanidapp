import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useSanatorioTheme } from '@/contexts/SanatorioThemeContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { getLocalSanatorios } from '@/services/firebase/authService';
import { spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

const ACCOUNT_CHIPS_MAX_HEIGHT = 168;

export function AdminSanatorioSwitcher() {
  const { isAdmin, profile } = useAuth();
  const { previewSanatorioId, setPreviewSanatorioId } = useSanatorioTheme();
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();

  if (!isAdmin) {
    return null;
  }

  const sanatorios = getLocalSanatorios();

  return (
    <View style={[styles.wrap, { borderTopColor: colors.border }]}>
      <Typography
        variant="caption"
        style={[styles.title, { color: colors.menuText, fontFamily: fonts.semiBold }]}>
        {t('admin.preview')}
      </Typography>
      {profile?.uid ? (
        <Typography variant="caption" style={{ color: colors.menuTextMuted, fontSize: 10 }}>
          UID: {profile.uid}
        </Typography>
      ) : null}
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator
        style={styles.chipsScroll}
        contentContainerStyle={styles.chips}>
        <Pressable
          onPress={() => {
            hapticLight();
            void setPreviewSanatorioId(null);
          }}
          style={[
            styles.chip,
            { borderColor: colors.border },
            !previewSanatorioId && {
              backgroundColor: colors.button,
              borderColor: colors.button,
            },
          ]}>
          <Typography
            variant="caption"
            style={[
              styles.chipLabel,
              { fontFamily: fonts.medium },
              !previewSanatorioId ? styles.chipLabelActive : { color: colors.menuText },
            ]}>
            {t('admin.myAccount')}
          </Typography>
        </Pressable>
        {sanatorios.map((item) => {
          const selected = previewSanatorioId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => {
                hapticLight();
                void setPreviewSanatorioId(item.id);
              }}
              style={[
                styles.chip,
                { borderColor: colors.border },
                selected && {
                  backgroundColor: colors.button,
                  borderColor: colors.button,
                },
              ]}>
              <Typography
                variant="caption"
                numberOfLines={1}
                style={[
                  styles.chipLabel,
                  { fontFamily: fonts.medium },
                  selected ? styles.chipLabelActive : { color: colors.menuText },
                ]}>
                {item.shortName}
              </Typography>
            </Pressable>
          );
        })}
      </ScrollView>
      {previewSanatorioId ? (
        <Typography variant="caption" style={{ color: colors.menuTextMuted }}>
          {t('admin.previewActive')}
        </Typography>
      ) : (
        <Typography variant="caption" style={{ color: colors.menuTextMuted }}>
          {t('admin.originalView')}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  title: {
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  chipsScroll: {
    maxHeight: ACCOUNT_CHIPS_MAX_HEIGHT,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    maxWidth: '100%',
  },
  chipLabel: {
    fontSize: 11,
    lineHeight: 14,
  },
  chipLabelActive: {
    color: '#FFFFFF',
  },
});
