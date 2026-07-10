import type { Pathology } from '@/types/pathology';
import type { AppLocale } from '@/i18n/types';
import { LOCAL_PATHOLOGY_LOCALES } from '@/services/content/pathologyLocaleRegistry';

function isReviewedPathologyLocale(pathology: Pathology | undefined): pathology is Pathology {
  return Boolean(pathology?.translationReviewed);
}

export function resolvePathologyLocale(pathology: Pathology, locale: AppLocale): Pathology {
  if (locale === 'es') {
    return pathology;
  }

  const localized = LOCAL_PATHOLOGY_LOCALES[locale]?.[pathology.id];
  if (!isReviewedPathologyLocale(localized)) {
    return pathology;
  }

  return localized;
}

export function isPathologyTranslated(pathologyId: string, locale: AppLocale): boolean {
  if (locale === 'es') return true;
  const localized = LOCAL_PATHOLOGY_LOCALES[locale]?.[pathologyId];
  return isReviewedPathologyLocale(localized);
}
