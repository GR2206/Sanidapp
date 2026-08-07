import { router, useLocalSearchParams, type Href } from 'expo-router';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { MEETING_LIMITS } from '@/constants/meetingLimits';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  buildMeetingJoinLink,
  consumePendingMeetingJoinCode,
} from '@/services/meeting/meetingDeepLink';
import {
  createMeetingRoom,
  endMeetingRoom,
  isMeetingNativeAvailable,
  joinMeetingRoom,
} from '@/services/meeting/meetingService';
import {
  dismissMeetingInvite,
  lookupUserByPublicId,
  markMeetingInviteAccepted,
  sendMeetingInvite,
  subscribePendingMeetingInvites,
  type MeetingInvite,
  type PublicUserLookup,
} from '@/services/meeting/publicUserService';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { freeElevatedCardStyle } from '@/theme/freeCardStyle';
import { radius, spacing } from '@/theme/spacing';
import { hapticLight } from '@/utils/haptics';
import type { MeetingJoinResult } from '@/types/meeting';

function MeetingCallHost({
  session,
  onLeave,
}: {
  session: MeetingJoinResult;
  onLeave: () => void;
}) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();

  if (!isMeetingNativeAvailable()) {
    return (
      <View style={styles.nativeGate}>
        <Typography variant="subtitle" style={{ fontFamily: fonts.semiBold, textAlign: 'center' }}>
          {t('meeting.nativeRequiredTitle')}
        </Typography>
        <Typography variant="body" color={colors.textMuted} style={{ textAlign: 'center' }}>
          {t('meeting.nativeRequiredBody', { code: session.joinCode })}
        </Typography>
        <Button label={t('meeting.leave')} onPress={onLeave} accentColor={colors.button} />
      </View>
    );
  }

  try {
    // Carga nativa solo fuera de Expo Go (WebRTC).
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { MeetingLiveKitRoom } = require('@/components/meeting/MeetingLiveKitRoom') as {
      MeetingLiveKitRoom: ComponentType<{
        session: MeetingJoinResult;
        onLeave: () => void;
      }>;
    };
    return <MeetingLiveKitRoom session={session} onLeave={onLeave} />;
  } catch {
    return (
      <View style={styles.nativeGate}>
        <Typography variant="body" color={colors.textMuted} style={{ textAlign: 'center' }}>
          {t('meeting.nativeLoadError')}
        </Typography>
        <Button label={t('meeting.leave')} onPress={onLeave} accentColor={colors.button} />
      </View>
    );
  }
}

function InviteByIdBlock({
  joinCode,
  roomTitle,
  roomId,
  accentColor,
}: {
  joinCode: string;
  roomTitle: string;
  roomId?: string;
  accentColor: string;
}) {
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const [targetId, setTargetId] = useState('');
  const [lookup, setLookup] = useState<PublicUserLookup | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSearch = useCallback(async () => {
    const id = targetId.trim().toUpperCase();
    if (id.length < 4) return;
    setBusy(true);
    setLookup(null);
    try {
      hapticLight();
      const result = await lookupUserByPublicId(id);
      setLookup(result);
    } catch (cause) {
      Alert.alert(
        t('meeting.errorTitle'),
        resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
      );
    } finally {
      setBusy(false);
    }
  }, [locale, t, targetId]);

  const handleInvite = useCallback(async () => {
    if (!lookup || lookup.isSelf) return;
    const code = joinCode.trim().toUpperCase();
    if (code.length < 4) {
      Alert.alert(t('meeting.errorTitle'), t('meeting.inviteNeedCode'));
      return;
    }
    setBusy(true);
    try {
      hapticLight();
      const result = await sendMeetingInvite({
        targetPublicId: lookup.publicId,
        joinCode: code,
        roomTitle: roomTitle || 'Sala Sanidapp',
        roomId,
        link: buildMeetingJoinLink(code),
      });
      Alert.alert(
        t('meeting.errorTitle'),
        t('meeting.inviteSent', { name: result.targetDisplayName || lookup.displayName }),
      );
      setTargetId('');
      setLookup(null);
    } catch (cause) {
      Alert.alert(
        t('meeting.errorTitle'),
        resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
      );
    } finally {
      setBusy(false);
    }
  }, [joinCode, locale, lookup, roomId, roomTitle, t]);

  return (
    <View style={styles.inviteBlock}>
      <Typography variant="label" style={{ fontFamily: fonts.semiBold, color: accentColor }}>
        {t('meeting.inviteTitle')}
      </Typography>
      <Typography variant="caption" color={colors.textMuted}>
        {t('meeting.inviteHint')}
      </Typography>
      <TextField
        label={t('meeting.inviteIdLabel')}
        value={targetId}
        onChangeText={(value) => {
          setTargetId(value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8));
          setLookup(null);
        }}
        autoCapitalize="characters"
        placeholder={t('meeting.inviteIdPlaceholder')}
      />
      <Button
        label={busy ? t('meeting.working') : t('meeting.inviteSearch')}
        onPress={() => void handleSearch()}
        disabled={busy || targetId.length < 4}
        accentColor={accentColor}
      />
      {lookup ? (
        <View style={styles.lookupRow}>
          <UserAvatar
            size={40}
            avatarUrl={lookup.avatarUrl}
            nombre={lookup.displayName}
            accentColor={accentColor}
            surfaceColor={colors.backgroundSoft}
            borderColor={colors.border}
            fontFamily={fonts.semiBold}
          />
          <View style={styles.lookupCopy}>
            <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
              {lookup.displayName}
            </Typography>
            <Typography variant="caption" color={colors.textMuted}>
              {lookup.publicId}
              {lookup.isSelf ? ` · ${t('meeting.inviteSelf')}` : ''}
            </Typography>
          </View>
        </View>
      ) : null}
      {lookup && !lookup.isSelf ? (
        <Button
          label={busy ? t('meeting.inviteWorking') : t('meeting.inviteSend')}
          onPress={() => void handleInvite()}
          disabled={busy || joinCode.trim().length < 4}
          accentColor={colors.button}
        />
      ) : null}
    </View>
  );
}

export function MeetingLobbyScreen() {
  const { colors, fonts } = useAppTheme();
  const { t, locale } = useLocale();
  const { profile } = useAuth();
  const { contentPaddingBottom } = useScreenInsets();
  const elevated = freeElevatedCardStyle(true);
  const tone = FREE_QUICK_ACCESS_TONES.congresos;
  const params = useLocalSearchParams<{ code?: string | string[] }>();
  const autoJoinRef = useRef(false);

  const [title, setTitle] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<MeetingJoinResult | null>(null);
  const [staged, setStaged] = useState<MeetingJoinResult | null>(null);
  const [invites, setInvites] = useState<MeetingInvite[]>([]);

  useEffect(() => {
    if (!profile?.uid) {
      setInvites([]);
      return;
    }
    return subscribePendingMeetingInvites(profile.uid, setInvites);
  }, [profile?.uid]);

  const sharePublicId = useCallback(async () => {
    const id = profile?.publicId?.trim();
    if (!id) return;
    hapticLight();
    await Share.share({
      message: t('settings.publicId.shareMessage', { id }),
    }).catch(() => undefined);
  }, [profile?.publicId, t]);

  const handleCreate = useCallback(async () => {
    if (!profile) return;
    setBusy(true);
    try {
      hapticLight();
      const result = await createMeetingRoom(title);
      setStaged(result);
      const link = buildMeetingJoinLink(result.joinCode);
      await Share.share({
        message: t('meeting.shareMessage', {
          code: result.joinCode,
          title: result.title,
          link,
        }),
      }).catch(() => undefined);
    } catch (cause) {
      Alert.alert(
        t('meeting.errorTitle'),
        resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
      );
    } finally {
      setBusy(false);
    }
  }, [locale, profile, t, title]);

  const handleJoin = useCallback(
    async (codeOverride?: string) => {
      if (!profile) return;
      const code = (codeOverride ?? joinCode).trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (code.length < 4) return;
      setBusy(true);
      try {
        hapticLight();
        const result = await joinMeetingRoom(code);
        setStaged(null);
        setSession(result);
      } catch (cause) {
        Alert.alert(
          t('meeting.errorTitle'),
          resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
        );
      } finally {
        setBusy(false);
      }
    },
    [joinCode, locale, profile, t],
  );

  const enterStaged = useCallback(() => {
    if (!staged) return;
    hapticLight();
    setSession(staged);
    setStaged(null);
  }, [staged]);

  const cancelStaged = useCallback(async () => {
    if (!staged) return;
    setBusy(true);
    try {
      hapticLight();
      if (staged.isHost) {
        await endMeetingRoom(staged.roomId);
      }
    } catch {
      // ignore — igual cerramos la vista
    } finally {
      setStaged(null);
      setBusy(false);
    }
  }, [staged]);

  const acceptInvite = useCallback(
    async (invite: MeetingInvite) => {
      if (!profile?.uid) return;
      setBusy(true);
      try {
        hapticLight();
        await markMeetingInviteAccepted(profile.uid, invite.id).catch(() => undefined);
        await handleJoin(invite.joinCode);
      } finally {
        setBusy(false);
      }
    },
    [handleJoin, profile?.uid],
  );

  const dismissInvite = useCallback(
    async (inviteId: string) => {
      try {
        hapticLight();
        await dismissMeetingInvite(inviteId);
      } catch (cause) {
        Alert.alert(
          t('meeting.errorTitle'),
          resolveMessage(cause instanceof Error ? cause.message : t('meeting.errors.generic'), locale),
        );
      }
    },
    [locale, t],
  );

  useEffect(() => {
    const rawParam = params.code;
    const fromParam = Array.isArray(rawParam) ? rawParam[0] : rawParam;
    const fromPending = consumePendingMeetingJoinCode();
    const incoming = String(fromParam || fromPending || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    if (!incoming || incoming.length < 4) return;
    setJoinCode(incoming);
    if (!profile || autoJoinRef.current) return;
    autoJoinRef.current = true;
    void handleJoin(incoming);
  }, [handleJoin, params.code, profile]);

  if (session) {
    return (
      <ScreenContainer edges={['left', 'right', 'bottom']} style={styles.screen}>
        <MeetingCallHost session={session} onLeave={() => setSession(null)} />
      </ScreenContainer>
    );
  }

  const cardBase =
    elevated ?? { backgroundColor: colors.backgroundSoft, borderColor: colors.border, borderWidth: 1 };

  return (
    <ScreenContainer edges={['left', 'right', 'bottom']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: contentPaddingBottom + spacing.lg }]}>
        <View style={[styles.hero, cardBase, { backgroundColor: tone.gradient[0] }]}>
          <Typography variant="subtitle" style={{ color: tone.label, fontFamily: fonts.semiBold }}>
            {t('meeting.title')}
          </Typography>
          <Typography variant="caption" style={{ color: tone.label, marginTop: spacing.xs }}>
            {t('meeting.limitsLine', {
              freePeople: String(MEETING_LIMITS.free.maxParticipants),
              premiumPeople: String(MEETING_LIMITS.premium.maxParticipants),
            })}
          </Typography>
        </View>

        {profile ? (
          <View style={[styles.card, cardBase]}>
            <Typography variant="label" style={{ fontFamily: fonts.semiBold, color: tone.label }}>
              {t('meeting.myIdTitle')}
            </Typography>
            <Typography variant="caption" color={colors.textMuted}>
              {t('meeting.myIdHint')}
            </Typography>
            <Typography variant="subtitle" style={{ fontFamily: fonts.semiBold, letterSpacing: 1.2 }}>
              {profile.publicId || t('settings.publicId.loading')}
            </Typography>
            {profile.publicId ? (
              <Button
                label={t('meeting.myIdCopy')}
                onPress={() => void sharePublicId()}
                accentColor={tone.icon}
              />
            ) : null}
          </View>
        ) : null}

        {invites.length > 0 ? (
          <View style={[styles.card, cardBase]}>
            <Typography
              variant="label"
              style={{ fontFamily: fonts.semiBold, color: FREE_QUICK_ACCESS_TONES.pediatrico.label }}>
              {t('meeting.invitesPendingTitle')}
            </Typography>
            {invites.map((invite) => (
              <View key={invite.id} style={styles.inviteItem}>
                <Typography variant="bodyMedium" style={{ fontFamily: fonts.semiBold }}>
                  {invite.roomTitle}
                </Typography>
                <Typography variant="caption" color={colors.textMuted}>
                  {t('meeting.invitesFrom', {
                    name: invite.fromName,
                    id: invite.fromPublicId,
                  })}
                </Typography>
                <Typography variant="caption" color={colors.textMuted}>
                  {t('meeting.codeLabel', { code: invite.joinCode })}
                </Typography>
                <View style={styles.inviteActions}>
                  <Pressable
                    onPress={() => void acceptInvite(invite)}
                    disabled={busy}
                    style={[styles.inviteChip, { backgroundColor: FREE_QUICK_ACCESS_TONES.cursos.gradient[0] }]}>
                    <Typography variant="caption" style={{ fontFamily: fonts.semiBold }}>
                      {t('meeting.invitesAccept')}
                    </Typography>
                  </Pressable>
                  <Pressable
                    onPress={() => void dismissInvite(invite.id)}
                    disabled={busy}
                    style={[styles.inviteChip, { backgroundColor: colors.backgroundSoft }]}>
                    <Typography variant="caption" color={colors.textMuted}>
                      {t('meeting.invitesDismiss')}
                    </Typography>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {staged ? (
          <View style={[styles.card, cardBase]}>
            <Typography variant="label" style={{ fontFamily: fonts.semiBold, color: tone.label }}>
              {t('meeting.roomReadyTitle')}
            </Typography>
            <Typography variant="subtitle" style={{ fontFamily: fonts.semiBold }}>
              {staged.title}
            </Typography>
            <Typography variant="body" color={colors.textMuted}>
              {t('meeting.codeLabel', { code: staged.joinCode })}
            </Typography>
            <Button
              label={t('meeting.roomReadyShare')}
              onPress={() => {
                void Share.share({
                  message: t('meeting.shareMessage', {
                    code: staged.joinCode,
                    title: staged.title,
                    link: buildMeetingJoinLink(staged.joinCode),
                  }),
                }).catch(() => undefined);
              }}
              accentColor={tone.icon}
            />
            <InviteByIdBlock
              joinCode={staged.joinCode}
              roomTitle={staged.title}
              roomId={staged.roomId}
              accentColor={FREE_QUICK_ACCESS_TONES.neonatologia.icon}
            />
            <Button
              label={t('meeting.roomReadyEnter')}
              onPress={enterStaged}
              disabled={busy}
              accentColor={colors.button}
            />
            <Button
              label={t('meeting.roomReadyCancel')}
              onPress={() => void cancelStaged()}
              disabled={busy}
              accentColor={colors.textMuted}
            />
          </View>
        ) : (
          <>
            <View style={[styles.card, cardBase]}>
              <Typography variant="label" style={{ fontFamily: fonts.semiBold, color: tone.label }}>
                {t('meeting.createTitle')}
              </Typography>
              <TextField
                label={t('meeting.roomTitle')}
                value={title}
                onChangeText={setTitle}
                placeholder={t('meeting.roomTitlePlaceholder')}
              />
              <Button
                label={busy ? t('meeting.working') : t('meeting.create')}
                onPress={() => void handleCreate()}
                disabled={busy || !profile}
                accentColor={colors.button}
              />
            </View>

            <View style={[styles.card, cardBase]}>
              <Typography
                variant="label"
                style={{ fontFamily: fonts.semiBold, color: FREE_QUICK_ACCESS_TONES.cursos.label }}>
                {t('meeting.joinTitle')}
              </Typography>
              <TextField
                label={t('meeting.joinCode')}
                value={joinCode}
                onChangeText={(value) =>
                  setJoinCode(value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8))
                }
                autoCapitalize="characters"
                placeholder="ABC123"
              />
              <Button
                label={busy ? t('meeting.working') : t('meeting.join')}
                onPress={() => void handleJoin()}
                disabled={busy || !profile || joinCode.length < 4}
                accentColor={FREE_QUICK_ACCESS_TONES.cursos.icon}
              />
            </View>
          </>
        )}

        <Button
          label={t('meeting.recordingsOpen')}
          onPress={() => {
            hapticLight();
            router.push(ROUTES.meetingRecordings as Href);
          }}
          accentColor={tone.icon}
        />

        {busy ? <ActivityIndicator color={colors.button} /> : null}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 4,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  inviteBlock: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  lookupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  lookupCopy: {
    flex: 1,
    gap: 2,
  },
  inviteItem: {
    gap: 4,
    paddingTop: spacing.xs,
  },
  inviteActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  inviteChip: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  nativeGate: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
});
