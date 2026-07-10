import { translate } from '@/i18n';
import type { AppLocale } from '@/i18n/types';
import type { CategoryId } from '@/types/protocol';

export function protocolCategoryLabel(category: CategoryId, locale: AppLocale = 'es'): string {
  return translate(locale, `protocol.category.${category}`);
}

export function protocolDivisionLabel(
  division: 'intensiva' | 'baja-complejidad',
  locale: AppLocale = 'es',
): string {
  return translate(locale, `protocol.division.${division}`);
}

export function protocolSubtitle(category: CategoryId, locale: AppLocale = 'es'): string {
  return translate(locale, 'protocol.subtitle', {
    category: protocolCategoryLabel(category, locale),
  });
}
