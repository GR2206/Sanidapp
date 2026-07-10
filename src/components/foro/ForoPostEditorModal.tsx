import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ForoEventDateTimeFields } from '@/components/foro/ForoEventDateTimeFields';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppLabels } from '@/hooks/useAppLabels';
import { useAppTheme } from '@/hooks/useAppTheme';
import { resolveMessage } from '@/i18n/resolveMessage';
import {
  createForoPost,
  deleteForoPost,
  updateForoPost,
} from '@/services/firebase/foroService';
import { palette } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import type { ForoPost, ForoPostType } from '@/types/foro';
import { parseForoEventDate, serializeForoEventDate } from '@/utils/foroCalendar';

const POST_TYPES: ForoPostType[] = ['notificacion', 'evento', 'planificacion'];

interface ForoPostEditorModalProps {
  visible: boolean;
  sanatorioId: string;
  authorUid: string;
  authorName: string;
  post?: ForoPost | null;
  initialType?: ForoPostType;
  onClose: () => void;
  onSaved: () => void;
}

export function ForoPostEditorModal({
  visible,
  sanatorioId,
  authorUid,
  authorName,
  post,
  initialType = 'notificacion',
  onClose,
  onSaved,
}: ForoPostEditorModalProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const { foroPostType } = useAppLabels();
  const [type, setType] = useState<ForoPostType>(post?.type ?? initialType);
  const [title, setTitle] = useState(post?.title ?? '');
  const [body, setBody] = useState(post?.body ?? '');
  const [eventAt, setEventAt] = useState<Date | null>(parseForoEventDate(post?.eventDate));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setType(post?.type ?? initialType);
    setTitle(post?.title ?? '');
    setBody(post?.body ?? '');
    setEventAt(parseForoEventDate(post?.eventDate));
  }, [visible, post, initialType]);

  const resetForm = () => {
    setType(post?.type ?? initialType);
    setTitle(post?.title ?? '');
    setBody(post?.body ?? '');
    setEventAt(parseForoEventDate(post?.eventDate));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isDirectPost = post?.type === 'directa';
  const editorTypes: ForoPostType[] = isDirectPost
    ? ['directa']
    : POST_TYPES;

  const handleSave = async () => {
    if (!title.trim() || (!isDirectPost && !body.trim())) {
      Alert.alert(t('foro.editor.fillRequired'));
      return;
    }

    setSaving(true);
    try {
      if (post) {
        await updateForoPost(sanatorioId, post.id, {
          type,
          title,
          body,
          eventDate: serializeForoEventDate(eventAt),
        });
      } else {
        await createForoPost({
          sanatorioId,
          type,
          title,
          body,
          eventDate: serializeForoEventDate(eventAt),
          authorUid,
          authorName,
        });
      }

      onSaved();
      handleClose();
    } catch (cause) {
      Alert.alert(t('foro.saveFailed'), resolveMessage((cause as Error).message, locale));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!post) {
      return;
    }

    Alert.alert(t('foro.editor.deleteTitle'), t('foro.editor.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          setSaving(true);
          try {
            await deleteForoPost(sanatorioId, post.id);
            onSaved();
            handleClose();
          } catch (cause) {
            Alert.alert(
              t('foro.deleteFailed'),
              resolveMessage((cause as Error).message, locale),
            );
          } finally {
            setSaving(false);
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={[styles.root, { paddingTop: insets.top + spacing.sm, backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Typography variant="subtitle">
            {isDirectPost
              ? t('foro.editor.editDirect')
              : post
                ? t('foro.editor.editPost')
                : t('foro.newPost')}
          </Typography>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('common.close')}
            onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={24} color={colors.textAccent} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.form}>
          {isDirectPost && post?.targetName ? (
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.editor.recipientLabel', { name: post.targetName })}
            </Typography>
          ) : (
            <>
              <Typography variant="label">{t('foro.editor.type')}</Typography>
              <View style={styles.typeRow}>
                {editorTypes.map((item) => {
                  const selected = type === item;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setType(item)}
                      style={[
                        styles.typeChip,
                        { borderColor: colors.border },
                        selected && { backgroundColor: colors.backgroundSoft, borderColor: colors.button },
                      ]}>
                      <Typography
                        variant="caption"
                        style={{ color: selected ? colors.button : colors.textAccent }}>
                        {foroPostType(item)}
                      </Typography>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          <TextField
            label={t('foro.editor.title')}
            value={title}
            onChangeText={setTitle}
            placeholder={t('foro.editor.titlePlaceholder')}
          />
          <TextField
            label={
              type === 'notificacion'
                ? t('foro.editor.messageForStaff')
                : isDirectPost
                  ? t('foro.editor.messageOptional')
                  : t('foro.editor.detail')
            }
            value={body}
            onChangeText={setBody}
            placeholder={
              isDirectPost
                ? t('foro.editor.bodyPlaceholderDirect')
                : type === 'notificacion'
                  ? t('foro.editor.bodyPlaceholder')
                  : t('foro.editor.bodyPlaceholderEvent')
            }
            multiline
            style={styles.bodyInput}
          />
          {type !== 'notificacion' && !isDirectPost ? (
            <ForoEventDateTimeFields value={eventAt} onChange={setEventAt} />
          ) : null}

          {type === 'notificacion' ? (
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.editor.notificationHighlight')}
            </Typography>
          ) : null}
          {isDirectPost ? (
            <Typography variant="caption" color={palette.textMuted}>
              {t('foro.editor.onlyTargetSees', {
                name: post?.targetName ?? t('foro.direct.pickPerson'),
              })}
            </Typography>
          ) : null}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          {post ? (
            <Button
              label={t('common.delete')}
              onPress={handleDelete}
              disabled={saving}
              accentColor={palette.accent}
              style={styles.deleteButton}
            />
          ) : null}
          <Button
            label={
              saving
                ? t('common.saving')
                : post
                  ? t('foro.editor.saveChanges')
                  : t('common.publish')
            }
            onPress={() => void handleSave()}
            disabled={saving}
            style={styles.saveButton}
          />
          {saving ? <ActivityIndicator style={styles.loader} color={colors.button} /> : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  form: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeChip: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  deleteButton: {
    backgroundColor: palette.textMuted,
    borderColor: palette.textMuted,
  },
  saveButton: {
    marginTop: spacing.xs,
  },
  loader: {
    marginTop: spacing.sm,
  },
});
