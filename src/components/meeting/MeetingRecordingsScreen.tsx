import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import {
  deleteLocalMeetingRecording,
  listLocalMeetingRecordings,
  type LocalMeetingRecording,
} from '@/services/meeting/localMeetingRecordings';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';

function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.round(ms / 1000));
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function MeetingRecordingsScreen() {
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { contentPaddingBottom } = useScreenInsets();
  const elevated = freeElevatedCardStyle(true);
  const tone = FREE_QUICK_ACCESS_TONES.congresos;
  const [items, setItems] = useState<LocalMeetingRecording[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const list = await listLocalMeetingRecordings();
    setItems(list);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const onDelete = useCallback(
    (item: LocalMeetingRecording) => {
      Alert.alert(t('meeting.recordingsDeleteTitle'), t('meeting.recordingsDeleteBody'), [
        { text: t('meeting.recordingsCancel'), style: 'cancel' },
        {
          text: t('meeting.recordingsDeleteAction'),
          style: 'destructive',
          onPress: () => {
            void (async () => {
              hapticLight();
              await deleteLocalMeetingRecording(item.id);
              if (playingId === item.id) setPlayingId(null);
              await reload();
            })();
          },
        },
      ]);
    },
    [playingId, reload, t],
  );

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']} style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: contentPaddingBottom + spacing.lg }]}
        ListHeaderComponent={
          <View style={[styles.hero, elevated, { backgroundColor: tone.gradient[0] }]}>
            <Typography variant="subtitle" style={{ color: tone.label, fontFamily: fonts.semiBold }}>
              {t('meeting.recordingsTitle')}
            </Typography>
            <Typography variant="caption" style={{ color: tone.label }}>
              {t('meeting.recordingsSubtitle')}
            </Typography>
          </View>
        }
        ListEmptyComponent={
          <Typography variant="body" color={colors.textMuted} style={{ textAlign: 'center', marginTop: spacing.lg }}>
            {t('meeting.recordingsEmpty')}
          </Typography>
        }
        renderItem={({ item }) => {
          const dateLabel = new Date(item.createdAtMs).toLocaleString(locale);
          const isPlaying = playingId === item.id;
          return (
            <View
              style={[
                styles.card,
                elevated ?? { backgroundColor: colors.backgroundSoft, borderColor: colors.border, borderWidth: 1 },
              ]}>
              <Typography variant="label" style={{ fontFamily: fonts.semiBold }}>
                {item.title}
              </Typography>
              <Typography variant="caption" color={colors.textMuted}>
                {dateLabel}
                {item.durationMs > 0 ? ` · ${formatDuration(item.durationMs)}` : ''}
                {item.joinCode ? ` · ${item.joinCode}` : ''}
              </Typography>

              {isPlaying ? (
                <Video
                  style={styles.video}
                  source={{ uri: item.fileUri }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                />
              ) : null}

              <View style={styles.row}>
                <Pressable
                  onPress={() => {
                    hapticLight();
                    setPlayingId(isPlaying ? null : item.id);
                  }}
                  style={[styles.actionBtn, { backgroundColor: tone.gradient[0] }]}>
                  <MaterialCommunityIcons
                    name={isPlaying ? 'eye-off-outline' : 'play-circle-outline'}
                    size={20}
                    color={tone.icon}
                  />
                  <Typography variant="caption" style={{ fontWeight: '700', color: tone.label }}>
                    {isPlaying ? t('meeting.recordingsHide') : t('meeting.recordingsPlay')}
                  </Typography>
                </Pressable>
                <Button
                  label={t('meeting.recordingsDeleteAction')}
                  onPress={() => onDelete(item)}
                  accentColor="#B91C1C"
                />
              </View>
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingVertical: spacing.sm },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 4,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: radius.md,
    backgroundColor: '#000',
  },
  row: {
    gap: spacing.sm,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
});
