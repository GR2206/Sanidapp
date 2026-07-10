import type { AppLocale } from '@/i18n/types';
import { translate } from '@/i18n';

const I18N_PREFIX = 'i18n:';

export function i18nError(key: string): Error {
  return new Error(`${I18N_PREFIX}${key}`);
}

export function resolveMessage(
  message: string,
  locale: AppLocale,
  values?: Record<string, string | number>,
): string {
  if (message.startsWith(I18N_PREFIX)) {
    return translate(locale, message.slice(I18N_PREFIX.length), values);
  }
  return message;
}
