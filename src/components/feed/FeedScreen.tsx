import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ProtocolBody } from '@/components/protocol/ProtocolBody';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { loadFeed } from '@/services/content/feedService';
import type { FeedItem, FeedKind, FeedPage } from '@/types/feed';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface FeedScreenProps {
  kind: FeedKind;
}

function FeedItemCard({ item }: { item: FeedItem }) {
  const { colors } = useAppTheme();
  const { t } = useLocale();
  const openUrl = async () => {
    if (item.url) {
      await WebBrowser.openBrowserAsync(item.url);
    }
  };

  return (
    <Pressable
      onPress={item.url ? openUrl : undefined}
      style={({ pressed }) => [
        styles.card,
        { borderColor: colors.border },
        pressed && item.url && { backgroundColor: colors.backgroundSoft },
      ]}>
      <Typography variant="bodyMedium">{item.title}</Typography>
      {item.subtitle ? (
        <Typography variant="body" color={palette.textSecondary}>
          {item.subtitle}
        </Typography>
      ) : null}
      {item.date || item.location ? (
        <Typography variant="caption" color={palette.textMuted}>
          {[item.date, item.location].filter(Boolean).join(' · ')}
        </Typography>
      ) : null}
      {item.body ? (
        <View style={styles.cardBody}>
          <ProtocolBody content={item.body} />
        </View>
      ) : null}
      {item.url ? (
        <Typography variant="caption" color={colors.textAccent}>
          {t('common.seeMore')}
        </Typography>
      ) : null}
    </Pressable>
  );
}

export function FeedScreen({ kind }: FeedScreenProps) {
  const [feed, setFeed] = useState<FeedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { contentPaddingBottom } = useScreenInsets();
  const { colors } = useAppTheme();
  const { t } = useLocale();

  const refresh = useCallback(async () => {
    const data = await loadFeed(kind);
    setFeed(data);
  }, [kind]);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  }, [refresh]);

  if (loading) {
    return (
      <ScreenContainer centered>
        <ActivityIndicator color={colors.button} />
      </ScreenContainer>
    );
  }

  if (!feed) {
    return (
      <ScreenContainer centered>
        <Typography variant="body">{t('common.loadError')}</Typography>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe edges={['left', 'right']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.button} />
        }>
        {feed.items.length > 0 ? (
          <View style={styles.list}>
            {feed.items.map((item) => (
              <FeedItemCard key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <View style={[styles.empty, { borderColor: colors.border }]}>
            <Typography variant="bodyMedium">{t('common.comingSoon')}</Typography>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  scroll: {
    gap: spacing.md,
  },
  empty: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  cardBody: {
    marginTop: spacing.xs,
  },
});
