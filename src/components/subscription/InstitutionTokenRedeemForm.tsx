import { useRef, useState } from 'react';
import { type RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { SanatorioSelect } from '@/components/auth/SanatorioSelect';
import { scrollAuthFieldIntoView } from '@/components/layout/KeyboardAwareScrollScreen';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { useLocale } from '@/contexts/LocaleContext';
import { resolveMessage } from '@/i18n/resolveMessage';
import { getLocalSanatorios } from '@/services/firebase/authService';
import { spacing } from '@/theme/spacing';

interface InstitutionTokenRedeemFormProps {
  accentColor?: string;
  onSuccess?: () => void;
  scrollRef?: RefObject<import('react-native').ScrollView | null>;
  scrollYRef?: RefObject<number>;
  /** Si la cuenta aún no tiene sanatorio, pedir selección en el formulario. */
  allowSanatorioPick?: boolean;
  submitLabel?: string;
  description?: string;
}

export function InstitutionTokenRedeemForm({
  accentColor,
  onSuccess,
  scrollRef,
  scrollYRef,
  allowSanatorioPick = false,
  submitLabel,
  description,
}: InstitutionTokenRedeemFormProps) {
  const { profile, redeemInstitutionToken } = useAuth();
  const { locale, t } = useLocale();
  const sanatorios = getLocalSanatorios();
  const needsSanatorioPick = allowSanatorioPick && !profile?.sanatorioId;
  const [sanatorioId, setSanatorioId] = useState(profile?.sanatorioId ?? sanatorios[0]?.id ?? '');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const tokenFieldRef = useRef<View>(null);

  const resolvedSubmitLabel = submitLabel ?? t('subscription.activateAccess');
  const resolvedDescription = description ?? t('subscription.tokenDescription');

  function focusTokenField() {
    if (scrollRef && scrollYRef) {
      scrollAuthFieldIntoView(scrollRef, scrollYRef, tokenFieldRef, spacing.xxxl);
    }
  }

  async function handleSubmit() {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await redeemInstitutionToken(token, needsSanatorioPick ? sanatorioId : undefined);
      setSuccess(true);
      setToken('');
      onSuccess?.();
    } catch (cause) {
      const message =
        cause instanceof Error
          ? resolveMessage(cause.message, locale)
          : t('subscription.tokenFailed');
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Typography variant="bodyMedium">{t('subscription.institutionToken')}</Typography>
      <Typography variant="caption" color="#666">
        {resolvedDescription}
      </Typography>
      {needsSanatorioPick ? (
        <SanatorioSelect sanatorios={sanatorios} value={sanatorioId} onChange={setSanatorioId} />
      ) : null}
      <View ref={tokenFieldRef} collapsable={false}>
        <TextField
          label={t('subscription.tokenCode')}
          value={token}
          onChangeText={setToken}
          placeholder={t('subscription.tokenPlaceholder')}
          autoCapitalize="characters"
          autoCorrect={false}
          error={error ?? undefined}
          onFocus={focusTokenField}
        />
      </View>
      {success ? (
        <Typography variant="caption" style={styles.success}>
          {t('subscription.tokenSuccess')}
        </Typography>
      ) : null}
      <Button
        label={loading ? t('subscription.validating') : resolvedSubmitLabel}
        onPress={() => void handleSubmit()}
        disabled={loading || !token.trim() || (needsSanatorioPick && !sanatorioId)}
        accentColor={accentColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  success: {
    color: '#2E7D32',
  },
});
