import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';
import {
  AudioSession,
  LiveKitRoom,
  VideoTrack,
  isTrackReference,
  registerGlobals,
  useLocalParticipant,
  useRoomContext,
  useTracks,
  type TrackReferenceOrPlaceholder,
} from '@livekit/react-native';
import { Track } from 'livekit-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Typography } from '@/components/ui/Typography';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { resolveMessage } from '@/i18n/resolveMessage';
import { buildMeetingJoinLink } from '@/services/meeting/meetingDeepLink';
import { saveMeetingRecordingFromUrl } from '@/services/meeting/localMeetingRecordings';
import {
  endMeetingRoom,
  leaveMeetingRoom,
  startMeetingRecording,
  stopMeetingRecording,
} from '@/services/meeting/meetingService';
import {
  lookupUserByPublicId,
  sendMeetingInvite,
  type PublicUserLookup,
} from '@/services/meeting/publicUserService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { MeetingJoinResult } from '@/types/meeting';

registerGlobals();

type MeetingLiveKitRoomProps = {
  session: MeetingJoinResult;
  onLeave: () => void;
};

type ParticipantMeta = {
  avatarUrl?: string;
  displayName?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
};

function parseParticipantMeta(raw?: string | null): ParticipantMeta {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as ParticipantMeta;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function ControlBar({
  isHost,
  roomId,
  sessionTitle,
  joinCode,
  endsAtMs,
  onLeave,
}: {
  isHost: boolean;
  roomId: string;
  sessionTitle: string;
  joinCode: string;
  endsAtMs: number;
  onLeave: () => void;
}) {
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const { localParticipant, isMicrophoneEnabled, isCameraEnabled } = useLocalParticipant();
  const room = useRoomContext();
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((endsAtMs - Date.now()) / 1000)),
  );
  const expiredHandledRef = useRef(false);
  const [recording, setRecording] = useState(false);
  const [recordingBusy, setRecordingBusy] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteId, setInviteId] = useState('');
  const [inviteLookup, setInviteLookup] = useState<PublicUserLookup | null>(null);
  const [inviteBusy, setInviteBusy] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, Math.floor((endsAtMs - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left > 0 || expiredHandledRef.current) return;
      expiredHandledRef.current = true;
      clearInterval(id);
      void (async () => {
        try {
          if (isHost) await endMeetingRoom(roomId);
          else await leaveMeetingRoom(roomId);
        } catch {
          // leave anyway
        }
        await room.disconnect();
        onLeave();
      })();
    }, 1000);
    return () => clearInterval(id);
  }, [endsAtMs, isHost, onLeave, room, roomId]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  const toggleRecording = useCallback(async () => {
    if (!isHost || recordingBusy) return;
    setRecordingBusy(true);
    hapticLight();
    try {
      if (!recording) {
        await startMeetingRecording(roomId);
        setRecording(true);
        Alert.alert(t('meeting.recordingTitle'), t('meeting.recordingStartedHint'));
      } else {
        const result = await stopMeetingRecording(roomId);
        await saveMeetingRecordingFromUrl({
          downloadUrl: result.downloadUrl,
          title: result.title || sessionTitle,
          roomId: result.roomId || roomId,
          joinCode: result.joinCode || joinCode,
          durationMs: result.durationMs,
          filenameHint: result.filename,
        });
        setRecording(false);
        Alert.alert(t('meeting.recordingTitle'), t('meeting.recordingSavedHint'));
      }
    } catch (cause) {
      Alert.alert(
        t('meeting.recordingTitle'),
        resolveMessage(
          cause instanceof Error ? cause.message : t('meeting.errors.generic'),
          locale,
        ),
      );
    } finally {
      setRecordingBusy(false);
    }
  }, [isHost, joinCode, locale, recording, recordingBusy, roomId, sessionTitle, t]);

  const searchInviteTarget = useCallback(async () => {
    const id = inviteId.trim().toUpperCase();
    if (id.length < 4) return;
    setInviteBusy(true);
    setInviteLookup(null);
    try {
      hapticLight();
      setInviteLookup(await lookupUserByPublicId(id));
    } catch (cause) {
      Alert.alert(
        t('meeting.errorTitle'),
        resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
      );
    } finally {
      setInviteBusy(false);
    }
  }, [inviteId, locale, t]);

  const sendInviteFromCall = useCallback(async () => {
    if (!inviteLookup || inviteLookup.isSelf) return;
    setInviteBusy(true);
    try {
      hapticLight();
      const result = await sendMeetingInvite({
        targetPublicId: inviteLookup.publicId,
        joinCode,
        roomTitle: sessionTitle,
        roomId,
        link: buildMeetingJoinLink(joinCode),
      });
      Alert.alert(
        t('meeting.errorTitle'),
        t('meeting.inviteSent', { name: result.targetDisplayName || inviteLookup.displayName }),
      );
      setInviteOpen(false);
      setInviteId('');
      setInviteLookup(null);
    } catch (cause) {
      Alert.alert(
        t('meeting.errorTitle'),
        resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
      );
    } finally {
      setInviteBusy(false);
    }
  }, [inviteLookup, joinCode, locale, roomId, sessionTitle, t]);

  return (
    <View style={[styles.controls, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
      <Typography variant="caption" color={colors.textMuted} style={styles.timer}>
        {t('meeting.timeLeft', { time: `${mm}:${ss}` })}
        {recording ? ` · ${t('meeting.recordingLive')}` : ''}
      </Typography>
      <View style={styles.controlRow}>
        <Pressable
          onPress={() => {
            hapticLight();
            setInviteOpen(true);
          }}
          style={[
            styles.controlBtn,
            { backgroundColor: FREE_QUICK_ACCESS_TONES.adulto.gradient[0] },
          ]}>
          <MaterialCommunityIcons
            name="account-plus-outline"
            size={22}
            color={FREE_QUICK_ACCESS_TONES.adulto.icon}
          />
          <Typography variant="caption" style={{ fontWeight: '700' }}>
            {t('meeting.inviteSend')}
          </Typography>
        </Pressable>

        <Pressable
          onPress={() => {
            hapticLight();
            void localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
          }}
          style={[
            styles.controlBtn,
            {
              backgroundColor: isMicrophoneEnabled
                ? FREE_QUICK_ACCESS_TONES.cursos.gradient[0]
                : '#FEE2E2',
            },
          ]}>
          <MaterialCommunityIcons
            name={isMicrophoneEnabled ? 'microphone' : 'microphone-off'}
            size={22}
            color={isMicrophoneEnabled ? FREE_QUICK_ACCESS_TONES.cursos.icon : '#B91C1C'}
          />
          <Typography variant="caption" style={{ fontWeight: '700' }}>
            {isMicrophoneEnabled ? t('meeting.micOn') : t('meeting.micOff')}
          </Typography>
        </Pressable>

        <Pressable
          onPress={() => {
            hapticLight();
            void localParticipant.setCameraEnabled(!isCameraEnabled);
          }}
          style={[
            styles.controlBtn,
            {
              backgroundColor: isCameraEnabled
                ? FREE_QUICK_ACCESS_TONES.neonatologia.gradient[0]
                : '#FEE2E2',
            },
          ]}>
          <MaterialCommunityIcons
            name={isCameraEnabled ? 'video' : 'video-off'}
            size={22}
            color={isCameraEnabled ? FREE_QUICK_ACCESS_TONES.neonatologia.icon : '#B91C1C'}
          />
          <Typography variant="caption" style={{ fontWeight: '700' }}>
            {isCameraEnabled ? t('meeting.camOn') : t('meeting.camOff')}
          </Typography>
        </Pressable>

        {isHost ? (
          <Pressable
            onPress={() => void toggleRecording()}
            disabled={recordingBusy}
            style={[
              styles.controlBtn,
              { backgroundColor: recording ? '#FEE2E2' : FREE_QUICK_ACCESS_TONES.congresos.gradient[0] },
            ]}>
            <MaterialCommunityIcons
              name={recording ? 'stop-circle-outline' : 'record-circle-outline'}
              size={22}
              color={recording ? '#B91C1C' : FREE_QUICK_ACCESS_TONES.congresos.icon}
            />
            <Typography
              variant="caption"
              style={{ fontWeight: '700', color: recording ? '#B91C1C' : undefined }}>
              {recordingBusy
                ? t('meeting.recordingWorking')
                : recording
                  ? t('meeting.recordingStop')
                  : t('meeting.recordingStart')}
            </Typography>
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => {
            hapticLight();
            void (async () => {
              try {
                if (isHost) await endMeetingRoom(roomId);
                else await leaveMeetingRoom(roomId);
              } catch {
                // leave anyway
              }
              await room.disconnect();
              onLeave();
            })();
          }}
          style={[styles.controlBtn, { backgroundColor: '#FEE2E2' }]}>
          <MaterialCommunityIcons name="phone-hangup" size={22} color="#B91C1C" />
          <Typography variant="caption" style={{ fontWeight: '700', color: '#B91C1C' }}>
            {isHost ? t('meeting.end') : t('meeting.leave')}
          </Typography>
        </Pressable>
      </View>

      <Modal
        visible={inviteOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setInviteOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setInviteOpen(false)}>
          <Pressable
            style={[styles.modalCard, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={(e) => e.stopPropagation()}>
            <Typography variant="subtitle" style={{ fontWeight: '700' }}>
              {t('meeting.inviteTitle')}
            </Typography>
            <Typography variant="caption" color={colors.textMuted}>
              {t('meeting.inviteHint')}
            </Typography>
            <TextInput
              value={inviteId}
              onChangeText={(value) => {
                setInviteId(value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8));
                setInviteLookup(null);
              }}
              autoCapitalize="characters"
              placeholder={t('meeting.inviteIdPlaceholder')}
              placeholderTextColor={colors.textMuted}
              style={[
                styles.modalInput,
                { color: colors.text, borderColor: colors.border, backgroundColor: colors.backgroundSoft },
              ]}
            />
            <Pressable
              onPress={() => void searchInviteTarget()}
              disabled={inviteBusy || inviteId.length < 4}
              style={[styles.modalBtn, { backgroundColor: FREE_QUICK_ACCESS_TONES.cursos.gradient[0] }]}>
              <Typography variant="bodyMedium" style={{ fontWeight: '700' }}>
                {inviteBusy ? t('meeting.working') : t('meeting.inviteSearch')}
              </Typography>
            </Pressable>
            {inviteLookup ? (
              <View style={styles.modalLookup}>
                <UserAvatar
                  size={40}
                  avatarUrl={inviteLookup.avatarUrl}
                  nombre={inviteLookup.displayName}
                  accentColor={colors.button}
                  surfaceColor={colors.backgroundSoft}
                  borderColor={colors.border}
                />
                <View style={{ flex: 1 }}>
                  <Typography variant="bodyMedium" style={{ fontWeight: '700' }}>
                    {inviteLookup.displayName}
                  </Typography>
                  <Typography variant="caption" color={colors.textMuted}>
                    {inviteLookup.publicId}
                    {inviteLookup.isSelf ? ` · ${t('meeting.inviteSelf')}` : ''}
                  </Typography>
                </View>
              </View>
            ) : null}
            {inviteLookup && !inviteLookup.isSelf ? (
              <Pressable
                onPress={() => void sendInviteFromCall()}
                disabled={inviteBusy}
                style={[styles.modalBtn, { backgroundColor: colors.button }]}>
                <Typography variant="bodyMedium" style={{ fontWeight: '700', color: '#fff' }}>
                  {inviteBusy ? t('meeting.inviteWorking') : t('meeting.inviteSend')}
                </Typography>
              </Pressable>
            ) : null}
            <Pressable onPress={() => setInviteOpen(false)} style={styles.modalCancel}>
              <Typography variant="caption" color={colors.textMuted}>
                {t('meeting.recordingsCancel')}
              </Typography>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function RoomGrid() {
  const { colors, fonts } = useAppTheme();
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], {
    onlySubscribed: false,
  });

  const renderItem: ListRenderItem<TrackReferenceOrPlaceholder> = useCallback(
    ({ item }) => {
      const meta = parseParticipantMeta(item.participant?.metadata);
      const name =
        meta.displayName ||
        item.participant?.name ||
        item.participant?.identity ||
        '—';
      const hasLiveVideo =
        isTrackReference(item) &&
        Boolean(item.publication) &&
        !item.publication.isMuted &&
        item.publication.track != null;

      return (
        <View style={[styles.tile, { backgroundColor: colors.backgroundSoft, borderColor: colors.border }]}>
          {hasLiveVideo ? (
            <VideoTrack trackRef={item} style={styles.video} />
          ) : (
            <View style={styles.placeholder}>
              <UserAvatar
                size={72}
                avatarUrl={meta.avatarUrl}
                nombre={meta.nombre || name}
                apellido={meta.apellido}
                email={meta.email}
                accentColor={colors.button}
                surfaceColor={colors.background}
                borderColor={colors.border}
                fontFamily={fonts.semiBold}
              />
            </View>
          )}
          <Typography
            variant="caption"
            numberOfLines={1}
            style={[styles.tileName, { color: '#fff', fontFamily: fonts.semiBold }]}>
            {name}
          </Typography>
        </View>
      );
    },
    [colors.background, colors.backgroundSoft, colors.border, colors.button, fonts.semiBold],
  );

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item, index) =>
        `${item.participant?.identity ?? 'p'}-${item.source ?? index}`
      }
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.grid}
      ListEmptyComponent={
        <View style={styles.empty}>
          <ActivityIndicator color={colors.button} />
        </View>
      }
    />
  );
}

function ConnectedRoom({
  session,
  onLeave,
}: {
  session: MeetingJoinResult;
  onLeave: () => void;
}) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Typography variant="subtitle" style={{ fontFamily: fonts.semiBold }}>
          {session.title}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>
          {t('meeting.codeLabel', { code: session.joinCode })}
          {session.isHost ? ` · ${t('meeting.youAreHost')}` : ''}
        </Typography>
      </View>
      <RoomGrid />
      <ControlBar
        isHost={session.isHost}
        roomId={session.roomId}
        sessionTitle={session.title}
        joinCode={session.joinCode}
        endsAtMs={session.endsAtMs}
        onLeave={onLeave}
      />
    </View>
  );
}

/** Sala LiveKit (solo build nativa). */
export function MeetingLiveKitRoom({ session, onLeave }: MeetingLiveKitRoomProps) {
  useEffect(() => {
    void AudioSession.startAudioSession();
    return () => {
      void AudioSession.stopAudioSession();
    };
  }, []);

  const options = useMemo(
    () => ({
      adaptiveStream: { pixelDensity: 'screen' as const },
    }),
    [],
  );

  return (
    <LiveKitRoom
      serverUrl={session.serverUrl}
      token={session.token}
      connect
      audio
      video
      options={options}
      onDisconnected={onLeave}>
      <ConnectedRoom session={session} onLeave={onLeave} />
    </LiveKitRoom>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    gap: 2,
  },
  grid: {
    padding: spacing.sm,
    gap: spacing.sm,
  },
  tile: {
    flex: 1,
    margin: 4,
    minHeight: 160,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  tileName: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    maxWidth: '90%',
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  controls: {
    borderTopWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  timer: {
    textAlign: 'center',
    fontWeight: '700',
  },
  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  controlBtn: {
    flexGrow: 1,
    flexBasis: '22%',
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    letterSpacing: 1,
  },
  modalBtn: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  modalLookup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
});
