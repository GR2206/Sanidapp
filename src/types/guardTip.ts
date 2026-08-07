import type { AppLocale } from '@/i18n/types';

export type LocalizedText = string | Partial<Record<AppLocale, string>>;

export type GuardTipItem = {
  id: string;
  /** Ej. "Tip de Guardia" / "On-call tip" */
  label?: LocalizedText;
  text: LocalizedText;
};

export type GuardTipPage = {
  version?: string;
  updatedAt?: string;
  tips: GuardTipItem[];
};

export function resolveLocalizedText(
  value: LocalizedText | undefined,
  locale: AppLocale,
  fallback = '',
): string {
  if (value == null) {
    return fallback;
  }
  if (typeof value === 'string') {
    return value.trim() || fallback;
  }

  const direct = value[locale]?.trim();
  if (direct) {
    return direct;
  }

  return (
    value.es?.trim() ||
    value.en?.trim() ||
    value['pt-BR']?.trim() ||
    fallback
  );
}
