export type AppLocale = 'es' | 'en' | 'pt-BR';

export interface LocaleOption {
  code: AppLocale;
  label: string;
  flag: string;
}

export const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'es', label: 'Español', flag: '🇦🇷' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
];

export const DEFAULT_LOCALE: AppLocale = 'es';

export const LOCALE_STORAGE_KEY = '@sanidapp/locale';
