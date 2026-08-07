import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';
import { useAppTheme } from '@/hooks/useAppTheme';
import { FREE_QUICK_ACCESS_TONES } from '@/theme/freeCategoryPills';
import { radius, spacing } from '@/theme/spacing';
import { isValidCbuCvuFormat, normalizeCbuCvu } from '@/utils/cbuCvu';
import { hapticLight } from '@/utils/haptics';

export type FeedPayeeBankData = {
  payeeNombre: string;
  payeeApellido: string;
  payeeCbuCvu: string;
};

interface FeedPaymentBankModalProps {
  visible: boolean;
  initial?: Partial<FeedPayeeBankData> | null;
  onConfirm: (data: FeedPayeeBankData) => void;
  onCancel: () => void;
}

/** Paso 2: titular + CBU/CVU obligatorio para cobro en app. */
export function FeedPaymentBankModal({
  visible,
  initial,
  onConfirm,
  onCancel,
}: FeedPaymentBankModalProps) {
  const { colors, fonts } = useAppTheme();
  const { t } = useLocale();
  const accent = FREE_QUICK_ACCESS_TONES.neonatologia;

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cbuCvu, setCbuCvu] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    setNombre(initial?.payeeNombre ?? '');
    setApellido(initial?.payeeApellido ?? '');
    setCbuCvu(initial?.payeeCbuCvu ?? '');
    setError(null);
  }, [visible, initial?.payeeApellido, initial?.payeeCbuCvu, initial?.payeeNombre]);

  function handleConfirm() {
    const payeeNombre = nombre.trim();
    const payeeApellido = apellido.trim();
    const payeeCbuCvu = normalizeCbuCvu(cbuCvu);

    if (!payeeNombre || !payeeApellido) {
      setError(t('feedPaymentBank.nameRequired'));
      return;
    }
    if (!isValidCbuCvuFormat(payeeCbuCvu)) {
      setError(t('feedPaymentBank.cbuInvalid'));
      return;
    }

    hapticLight();
    onConfirm({ payeeNombre, payeeApellido, payeeCbuCvu });
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
          ]}>
          <Typography
            variant="subtitle"
            style={{ color: accent.label, fontFamily: fonts.semiBold }}>
            {t('feedPaymentBank.title')}
          </Typography>
          <Typography variant="caption" style={{ color: colors.textMuted, marginBottom: spacing.xs }}>
            {t('feedPaymentBank.subtitle')}
          </Typography>

          <TextField
            label={t('feedPaymentBank.nombre')}
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
          />
          <TextField
            label={t('feedPaymentBank.apellido')}
            value={apellido}
            onChangeText={setApellido}
            autoCapitalize="words"
          />
          <TextField
            label={t('feedPaymentBank.cbuCvu')}
            value={cbuCvu}
            onChangeText={(value) => setCbuCvu(normalizeCbuCvu(value).slice(0, 22))}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder="0000000000000000000000"
          />

          {error ? (
            <Typography variant="caption" style={{ color: '#B91C1C' }}>
              {error}
            </Typography>
          ) : null}

          <View style={styles.actions}>
            <Button
              label={t('feedPaymentBank.confirm')}
              onPress={handleConfirm}
              accentColor={colors.button}
            />
            <Button
              label={t('common.cancel')}
              onPress={onCancel}
              accentColor={colors.textMuted}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
