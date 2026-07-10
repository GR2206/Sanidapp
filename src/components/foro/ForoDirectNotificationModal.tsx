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

import { StaffMemberSelect } from '@/components/foro/StaffMemberSelect';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { resolveMessage } from '@/i18n/resolveMessage';
import { createForoPost } from '@/services/firebase/foroService';
import {
  formatStaffMemberName,
  subscribeSanatorioStaff,
} from '@/services/firebase/sanatorioStaffService';
import { palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import type { SanatorioStaffMember } from '@/types/foro';

interface ForoDirectNotificationModalProps {
  visible: boolean;
  sanatorioId: string;
  authorUid: string;
  authorName: string;
  onClose: () => void;
  onSaved: () => void;
}

export function ForoDirectNotificationModal({
  visible,
  sanatorioId,
  authorUid,
  authorName,
  onClose,
  onSaved,
}: ForoDirectNotificationModalProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { t, locale } = useLocale();
  const [staff, setStaff] = useState<SanatorioStaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [targetUid, setTargetUid] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible || !sanatorioId) {
      return;
    }

    setLoadingStaff(true);
    const unsubscribe = subscribeSanatorioStaff(
      sanatorioId,
      (nextStaff) => {
        setStaff(nextStaff);
        setLoadingStaff(false);
      },
      () => {
        setStaff([]);
        setLoadingStaff(false);
      },
    );

    return unsubscribe;
  }, [visible, sanatorioId]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setTargetUid('');
    setTitle('');
    setBody('');
  }, [visible]);

  const handleClose = () => {
    setTargetUid('');
    setTitle('');
    setBody('');
    onClose();
  };

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const member = staff.find((item) => item.uid === targetUid);

    if (!member) {
      Alert.alert(t('foro.direct.staffRequired'), t('foro.direct.staffRequiredMsg'));
      return;
    }

    if (!trimmedTitle) {
      Alert.alert(t('foro.direct.titleRequired'), t('foro.direct.titleRequiredMsg'));
      return;
    }

    setSaving(true);
    try {
      await createForoPost({
        sanatorioId,
        type: 'directa',
        title: trimmedTitle,
        body: trimmedBody,
        targetUid: member.uid,
        targetName: formatStaffMemberName(member),
        authorUid,
        authorName,
      });
      handleClose();
      onSaved();
      Alert.alert(
        t('foro.direct.sent'),
        t('foro.direct.sentMsgTo', { name: formatStaffMemberName(member) }),
      );
    } catch (cause) {
      Alert.alert(
        t('foro.direct.sendFailed'),
        resolveMessage((cause as Error).message, locale),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={[styles.container, { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.header}>
          <Pressable onPress={handleClose} hitSlop={8} style={({ pressed }) => [pressed && styles.pressed]}>
            <MaterialCommunityIcons name="close" size={24} color={colors.textAccent} />
          </Pressable>
          <Typography variant="subtitle">{t('foro.direct.title')}</Typography>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Typography variant="body" color={palette.textSecondary}>
            {t('foro.direct.introPush')}
          </Typography>

          {loadingStaff ? (
            <ActivityIndicator color={colors.button} style={styles.loader} />
          ) : (
            <StaffMemberSelect
              staff={staff}
              value={targetUid}
              onChange={(uid) => setTargetUid(uid)}
              label={t('foro.direct.recipient')}
              placeholder={t('foro.direct.pickStaff')}
            />
          )}

          <TextField
            label={t('foro.editor.title')}
            value={title}
            onChangeText={setTitle}
            placeholder={t('foro.direct.example')}
            autoCapitalize="sentences"
          />

          <TextField
            label={t('foro.editor.messageOptional')}
            value={body}
            onChangeText={setBody}
            placeholder={t('foro.editor.bodyPlaceholderDirect')}
            multiline
            numberOfLines={4}
            style={styles.bodyField}
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={saving ? t('common.sending') : t('foro.direct.sendDirect')}
            onPress={() => void handleSave()}
            disabled={saving || loadingStaff || staff.length === 0}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  loader: {
    marginVertical: spacing.md,
  },
  bodyField: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  footer: {
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
});
