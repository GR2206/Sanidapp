import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ForoDirectNotificationModal } from '@/components/foro/ForoDirectNotificationModal';
import { ForoPostEditorModal } from '@/components/foro/ForoPostEditorModal';
import { ProtocolBody } from '@/components/protocol/ProtocolBody';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useForoUnread } from '@/contexts/ForoUnreadContext';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useForo, useForoAccess } from '@/hooks/useForo';
import { useScreenInsets } from '@/hooks/useScreenInsets';
import { resolveMessage } from '@/i18n/resolveMessage';
import type { AppLocale } from '@/i18n/types';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import type { ForoPost, ForoPostType } from '@/types/foro';
import { addForoPostToDeviceCalendar } from '@/services/calendar/deviceCalendarService';
import { deleteForoPosts } from '@/services/firebase/foroService';
import {
  canAddForoPostToCalendar,
  formatForoEventDateLabel,
} from '@/utils/foroCalendar';

const INTL_BY_LOCALE: Record<AppLocale, string> = {
  es: 'es-AR',
  en: 'en-US',
  'pt-BR': 'pt-BR',
};

function formatDateLabel(iso: string, locale: AppLocale): string {
  if (!iso) {
    return '';
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleString(INTL_BY_LOCALE[locale], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ForoPostCard({
  post,
  highlighted,
  canManage,
  sanatorioName,
  onEdit,
  selected,
  onToggleSelect,
}: {
  post: ForoPost;
  highlighted?: boolean;
  canManage: boolean;
  sanatorioName?: string | null;
  onEdit: (post: ForoPost) => void;
  selected?: boolean;
  onToggleSelect?: (postId: string) => void;
}) {
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const { foroPostType } = useAppLabels();
  const showCalendar = canAddForoPostToCalendar(post);
  const eventDateLabel = post.eventDate
    ? formatForoEventDateLabel(post.eventDate) || post.eventDate
    : '';
  const showSelection = canManage && Boolean(onToggleSelect);

  const handleOpenCalendar = () => {
    void addForoPostToDeviceCalendar(post, sanatorioName)
      .then(() => {
        Alert.alert(t('foro.calendarSaved'), t('foro.calendarSavedDetail'));
      })
      .catch((cause) => {
        Alert.alert(
          t('foro.calendarTitle'),
          resolveMessage(cause instanceof Error ? cause.message : t('foro.calendarFailed'), locale),
        );
      });
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: selected ? colors.button : highlighted ? colors.button : colors.border,
          backgroundColor: selected
            ? colors.backgroundSoft
            : highlighted
              ? colors.backgroundSoft
              : palette.white,
        },
      ]}>
      {showSelection ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: Boolean(selected) }}
          accessibilityLabel={`${selected ? t('foro.unmark') : t('foro.mark')} ${post.title}`}
          onPress={() => onToggleSelect?.(post.id)}
          hitSlop={8}
          style={({ pressed }) => [styles.selectControl, pressed && styles.cardPressed]}>
          <MaterialCommunityIcons
            name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={selected ? colors.button : colors.textAccent}
          />
        </Pressable>
      ) : null}

      <Pressable
        onPress={canManage ? () => onEdit(post) : showCalendar ? handleOpenCalendar : undefined}
        style={({ pressed }) => [
          styles.cardContent,
          pressed && (canManage || showCalendar) && styles.cardPressed,
        ]}>
        <View style={styles.cardHeader}>
          <View style={[styles.typeBadge, { backgroundColor: colors.backgroundSoft }]}>
            <Typography variant="caption" style={{ color: colors.button }}>
              {foroPostType(post.type) ?? t('foro.publication')}
            </Typography>
          </View>
          {canManage ? (
            <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.textAccent} />
          ) : null}
        </View>
        <Typography variant="bodyMedium">{post.title}</Typography>
        {post.type === 'directa' && post.targetName ? (
          <Typography variant="caption" style={{ color: colors.button }}>
            {t('foro.forTarget', { name: post.targetName })}
          </Typography>
        ) : null}
        {post.eventDate ? (
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              if (showCalendar) {
                handleOpenCalendar();
              }
            }}
            disabled={!showCalendar}
            style={({ pressed }) => [
              styles.eventDateRow,
              showCalendar && { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
              pressed && showCalendar && styles.cardPressed,
            ]}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={18}
              color={showCalendar ? colors.button : palette.textMuted}
            />
            <View style={styles.eventDateText}>
              <Typography
                variant="caption"
                style={{ color: showCalendar ? colors.button : palette.textMuted }}>
                {eventDateLabel}
              </Typography>
              {showCalendar ? (
                <Typography variant="caption" color={palette.textMuted}>
                  {t('foro.tapToSaveCalendar')}
                </Typography>
              ) : null}
            </View>
            {showCalendar ? (
              <MaterialCommunityIcons name="open-in-new" size={16} color={colors.textAccent} />
            ) : null}
          </Pressable>
        ) : null}
        <View style={styles.cardBody}>
          <ProtocolBody content={post.body} />
        </View>
        <Typography variant="caption" color={palette.textMuted}>
          {post.authorName}
          {post.createdAt ? ` · ${formatDateLabel(post.createdAt, locale)}` : ''}
        </Typography>
      </Pressable>
    </View>
  );
}

function ForoSection({
  title,
  posts,
  emptyMessage,
  highlighted,
  canManage,
  sanatorioName,
  onEdit,
  selectedPostIds,
  onToggleSelect,
  onToggleSelectAll,
}: {
  title: string;
  posts: ForoPost[];
  emptyMessage: string;
  highlighted?: boolean;
  canManage: boolean;
  sanatorioName?: string | null;
  onEdit: (post: ForoPost) => void;
  selectedPostIds?: Set<string>;
  onToggleSelect?: (postId: string) => void;
  onToggleSelectAll?: (postIds: string[]) => void;
}) {
  const { colors } = useAppTheme();
  const { t } = useLocale();
  const allSelected =
    posts.length > 0 && posts.every((post) => selectedPostIds?.has(post.id));

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleBlock}>
        <Typography variant="subtitle">{title}</Typography>
        {canManage && posts.length > 0 && onToggleSelectAll ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={allSelected ? t('foro.unmarkAll') : t('foro.markAll')}
            onPress={() => onToggleSelectAll(posts.map((post) => post.id))}
            style={({ pressed }) => [styles.selectAllLink, pressed && styles.cardPressed]}>
            <Typography variant="caption" style={{ color: colors.button }}>
              {allSelected ? t('foro.unmarkAll') : t('foro.markAll')}
            </Typography>
          </Pressable>
        ) : null}
      </View>
      {posts.length === 0 ? (
        <Typography variant="body" color={palette.textMuted}>
          {emptyMessage}
        </Typography>
      ) : (
        posts.map((post) => (
          <ForoPostCard
            key={post.id}
            post={post}
            highlighted={highlighted}
            canManage={canManage}
            sanatorioName={sanatorioName}
            onEdit={onEdit}
            selected={selectedPostIds?.has(post.id)}
            onToggleSelect={onToggleSelect}
          />
        ))
      )}
    </View>
  );
}

export function ForoScreen() {
  const { profile, firebaseEnabled } = useAuth();
  const { markForoAsRead } = useForoUnread();
  const { t, locale } = useLocale();
  const { sanatorioId, sanatorioName, canManageForo, canViewForo } = useForoAccess();
  const { posts, loading, error, refresh } = useForo(sanatorioId);
  const { contentPaddingBottom } = useScreenInsets();
  const { colors } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [directModalOpen, setDirectModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ForoPost | null>(null);
  const [initialType, setInitialType] = useState<ForoPostType>('notificacion');
  const [selectedPostIds, setSelectedPostIds] = useState<Set<string>>(() => new Set());
  const [deletingSelection, setDeletingSelection] = useState(false);

  const selectedCount = selectedPostIds.size;

  useFocusEffect(
    useCallback(() => {
      void markForoAsRead();
    }, [markForoAsRead]),
  );

  useEffect(() => {
    setSelectedPostIds((current) => {
      const validIds = new Set(posts.map((post) => post.id));
      const next = new Set([...current].filter((id) => validIds.has(id)));
      return next.size === current.size ? current : next;
    });
  }, [posts]);

  const notifications = useMemo(
    () => posts.filter((post) => post.type === 'notificacion'),
    [posts],
  );
  const directNotifications = useMemo(
    () => posts.filter((post) => post.type === 'directa'),
    [posts],
  );
  const boardPosts = useMemo(
    () => posts.filter((post) => post.type === 'evento' || post.type === 'planificacion'),
    [posts],
  );

  const authorName = profile ? `${profile.nombre} ${profile.apellido}`.trim() : '';

  const openCreate = (type: ForoPostType) => {
    setEditingPost(null);
    setInitialType(type);
    setEditorOpen(true);
  };

  const openEdit = (post: ForoPost) => {
    setEditingPost(post);
    setEditorOpen(true);
  };

  const togglePostSelection = useCallback((postId: string) => {
    setSelectedPostIds((current) => {
      const next = new Set(current);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  }, []);

  const toggleSectionSelection = useCallback((postIds: string[]) => {
    setSelectedPostIds((current) => {
      const allSelected = postIds.every((postId) => current.has(postId));
      const next = new Set(current);
      if (allSelected) {
        postIds.forEach((postId) => next.delete(postId));
      } else {
        postIds.forEach((postId) => next.add(postId));
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPostIds(new Set());
  }, []);

  const handleDeleteSelected = () => {
    if (!sanatorioId || selectedCount === 0) {
      return;
    }

    Alert.alert(
      t('foro.deleteSelectedTitle'),
      t('foro.deletePostsConfirm', { count: selectedCount }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            setDeletingSelection(true);
            try {
              await deleteForoPosts(sanatorioId, Array.from(selectedPostIds));
              clearSelection();
              refresh();
            } catch (cause) {
              Alert.alert(
                t('foro.deleteFailed'),
                resolveMessage((cause as Error).message, locale),
              );
            } finally {
              setDeletingSelection(false);
            }
          },
        },
      ],
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    refresh();
    setRefreshing(false);
  };

  if (!firebaseEnabled) {
    return (
      <ScreenContainer safe style={styles.screen}>
        <Typography variant="body" color={palette.textSecondary}>
          {t('foro.loginRequired')}
        </Typography>
      </ScreenContainer>
    );
  }

  if (!canViewForo) {
    return (
      <ScreenContainer safe style={styles.screen}>
        <Typography variant="body" color={palette.textSecondary}>
          {t('foro.pickSanatorio')}
        </Typography>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer safe style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom + spacing.xxl }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void handleRefresh()} />}>
        <View style={styles.intro}>
          <Typography variant="body" color={palette.textSecondary}>
            {t('foro.boardIntro', { sanatorio: sanatorioName ?? t('subscription.yourSanatorio') })}
          </Typography>
          {canManageForo ? (
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.supervisorHint')}
            </Typography>
          ) : null}
        </View>

        {loading ? (
          <ActivityIndicator color={colors.button} style={styles.loader} />
        ) : null}

        {error ? (
          <View style={[styles.errorBox, { borderColor: colors.border }]}>
            <Typography variant="body" color={palette.accent}>
              {resolveMessage(error, locale)}
            </Typography>
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.rulesHint')}
            </Typography>
          </View>
        ) : null}

        {canManageForo && selectedCount > 0 ? (
          <View style={[styles.selectionBar, { borderColor: colors.border, backgroundColor: colors.backgroundSoft }]}>
            <Typography variant="caption" style={styles.selectionCount}>
              {selectedCount === 1
                ? t('foro.selectedOne')
                : t('foro.selectedMany', { count: selectedCount })}
            </Typography>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('foro.cancelSelection')}
              onPress={clearSelection}
              disabled={deletingSelection}
              style={({ pressed }) => [styles.selectionAction, pressed && styles.cardPressed]}>
              <Typography variant="caption" style={{ color: colors.textAccent }}>
                {t('common.cancel')}
              </Typography>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('foro.deleteSelectedTitle')}
              onPress={handleDeleteSelected}
              disabled={deletingSelection}
              style={({ pressed }) => [
                styles.deleteChip,
                { backgroundColor: palette.accent },
                pressed && styles.cardPressed,
                deletingSelection && styles.deleteChipDisabled,
              ]}>
              <Typography variant="caption" color={palette.white}>
                {deletingSelection ? '…' : t('common.delete')}
              </Typography>
            </Pressable>
          </View>
        ) : null}

        <ForoSection
          title={t('foro.sectionNotifications')}
          posts={notifications}
          emptyMessage={
            canManageForo ? t('foro.emptyNotificationsManage') : t('foro.emptyNotificationsStaff')
          }
          highlighted
          canManage={canManageForo}
          sanatorioName={sanatorioName}
          onEdit={openEdit}
          selectedPostIds={canManageForo ? selectedPostIds : undefined}
          onToggleSelect={canManageForo ? togglePostSelection : undefined}
          onToggleSelectAll={canManageForo ? toggleSectionSelection : undefined}
        />

        {directNotifications.length > 0 || canManageForo ? (
          <ForoSection
            title={canManageForo ? t('foro.sectionDirect') : t('foro.sectionDirectForYou')}
            posts={directNotifications}
            emptyMessage={
              canManageForo ? t('foro.emptyDirectManage') : t('foro.emptyDirectForYou')
            }
            canManage={canManageForo}
            sanatorioName={sanatorioName}
            onEdit={openEdit}
            selectedPostIds={canManageForo ? selectedPostIds : undefined}
            onToggleSelect={canManageForo ? togglePostSelection : undefined}
            onToggleSelectAll={canManageForo ? toggleSectionSelection : undefined}
          />
        ) : null}

        <ForoSection
          title={t('foro.sectionEvents')}
          posts={boardPosts}
          emptyMessage={canManageForo ? t('foro.emptyEventsManage') : t('foro.emptyEventsStaff')}
          canManage={canManageForo}
          sanatorioName={sanatorioName}
          onEdit={openEdit}
          selectedPostIds={canManageForo ? selectedPostIds : undefined}
          onToggleSelect={canManageForo ? togglePostSelection : undefined}
          onToggleSelectAll={canManageForo ? toggleSectionSelection : undefined}
        />
      </ScrollView>

      {canManageForo ? (
        <View style={styles.actions}>
          <Button
            label={t('foro.sendNotification')}
            onPress={() => openCreate('notificacion')}
            style={styles.actionButton}
          />
          <Button
            label={t('foro.directNotification')}
            variant="secondary"
            onPress={() => setDirectModalOpen(true)}
            style={styles.actionButton}
          />
          <Button
            label={t('foro.newPost')}
            variant="secondary"
            onPress={() => openCreate('evento')}
            style={styles.actionButton}
          />
        </View>
      ) : null}

      {sanatorioId && profile ? (
        <>
          <ForoDirectNotificationModal
            visible={directModalOpen}
            sanatorioId={sanatorioId}
            authorUid={profile.uid}
            authorName={authorName}
            onClose={() => setDirectModalOpen(false)}
            onSaved={refresh}
          />
          <ForoPostEditorModal
          visible={editorOpen}
          sanatorioId={sanatorioId}
          authorUid={profile.uid}
          authorName={authorName}
          post={editingPost}
          initialType={initialType}
          onClose={() => {
            setEditorOpen(false);
            setEditingPost(null);
          }}
          onSaved={refresh}
        />
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacing.sm,
  },
  content: {
    gap: spacing.lg,
  },
  intro: {
    gap: spacing.xs,
  },
  loader: {
    marginVertical: spacing.lg,
  },
  errorBox: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitleBlock: {
    gap: 2,
  },
  selectAllLink: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  selectionCount: {
    flex: 1,
  },
  selectionAction: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  deleteChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    minWidth: 64,
    alignItems: 'center',
  },
  deleteChipDisabled: {
    opacity: 0.6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  selectControl: {
    paddingTop: 2,
  },
  cardContent: {
    flex: 1,
    gap: spacing.sm,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  cardBody: {
    marginTop: spacing.xs,
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  eventDateText: {
    flex: 1,
    gap: 2,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});
