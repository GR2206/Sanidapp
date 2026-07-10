import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ProtocolQrCard } from '@/components/qr/ProtocolQrCard';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { exportQrSheetPdf } from '@/services/pdf/qrSheetPdf';
import { loadProtocolsByCategory } from '@/services/content/manifestService';
import { type CategoryId, type ProtocolMeta } from '@/types/protocol';
import { protocolCategoryLabel } from '@/utils/protocolLabels';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type QrPrintSection = {
  categoryId: CategoryId;
  title: string;
  data: ProtocolMeta[];
};

export default function QrPrintScreen() {
  const { locale, t } = useLocale();
  const [sections, setSections] = useState<QrPrintSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const { contentPaddingBottom } = useScreenInsets();

  const loadSections = useCallback(async () => {
    const grouped = await loadProtocolsByCategory(locale);
    setSections(
      grouped.map((section) => ({
        categoryId: section.categoryId,
        title: protocolCategoryLabel(section.categoryId, locale),
        data: section.protocols,
      })),
    );
  }, [locale]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadSections();
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [loadSections]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) {
    return (
      <ScreenContainer centered>
        <ActivityIndicator color={palette.accent} />
      </ScreenContainer>
    );
  }

  const totalProtocols = sections.reduce((sum, section) => sum + section.data.length, 0);

  const handleDownloadSheet = async () => {
    if (pdfBusy || totalProtocols === 0) return;

    setPdfBusy(true);
    try {
      await exportQrSheetPdf(
        sections.map((section) => ({
          title: section.title,
          protocols: section.data,
        })),
        locale,
      );
    } catch {
      Alert.alert(t('qr.pdfFailed'), t('qr.pdfFailedDetail'));
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.container}>
      <View style={styles.header}>
        <Typography variant="body" color={palette.textSecondary}>
          {t('qr.intro')}
        </Typography>
        <Typography variant="caption">
          {t('qr.protocolCount', { count: totalProtocols })}
        </Typography>

        <Button
          label={pdfBusy ? t('qr.generatingPdf') : t('qr.downloadAll')}
          onPress={handleDownloadSheet}
          disabled={pdfBusy || totalProtocols === 0}
          style={styles.downloadButton}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={palette.accent} />}
        contentContainerStyle={[styles.list, { paddingBottom: contentPaddingBottom }]}
        ListEmptyComponent={
          <Typography variant="body" color={palette.textSecondary} style={styles.empty}>
            {t('qr.noProtocols')}
          </Typography>
        }
        renderSectionHeader={({ section }) => (
          <Typography variant="label" style={styles.sectionHeader}>
            {section.title}
          </Typography>
        )}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProtocolQrCard protocol={item} />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  downloadButton: {
    marginTop: spacing.xs,
  },
  list: {
    gap: spacing.sm,
  },
  sectionHeader: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
  empty: {
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
