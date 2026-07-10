import type { AppLocale } from '@/i18n/types';

export function collatorLocale(locale: AppLocale): string {
  if (locale === 'pt-BR') return 'pt';
  return locale;
}

export function htmlLang(locale: AppLocale): string {
  return locale;
}
