import type { AppLocale } from './types';
import { es, type TranslationTree } from './locales/es';
import { en } from './locales/en';
import { ptBR } from './locales/pt-BR';

const catalogs: Record<AppLocale, TranslationTree> = {
  es,
  en,
  'pt-BR': ptBR,
};

type InterpolationValues = Record<string, string | number>;

function getNestedValue(tree: TranslationTree, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = tree;

  for (const part of parts) {
    if (current == null || typeof current !== 'object' || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

function interpolate(template: string, values?: InterpolationValues): string {
  if (!values) return template;

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{{${key}}}` : String(value);
  });
}

export function translate(
  locale: AppLocale,
  key: string,
  values?: InterpolationValues,
): string {
  const catalog = catalogs[locale] ?? catalogs.es;
  const fallback = getNestedValue(catalogs.es, key);
  const value = getNestedValue(catalog, key) ?? fallback ?? key;
  return interpolate(value, values);
}

export function getCatalog(locale: AppLocale): TranslationTree {
  return catalogs[locale] ?? catalogs.es;
}
