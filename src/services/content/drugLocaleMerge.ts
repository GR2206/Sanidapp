import type { Drug } from '@/types/drug';
import type { AppLocale } from '@/i18n/types';
import { LOCAL_DRUG_LOCALES } from '@/services/content/drugLocaleRegistry';

function isReviewedDrugLocale(drug: Drug | undefined): drug is Drug {
  return Boolean(drug?.translationReviewed);
}

export function resolveDrugLocale(drug: Drug, locale: AppLocale): Drug {
  if (locale === 'es') {
    return drug;
  }

  const localized = LOCAL_DRUG_LOCALES[locale]?.[drug.id];
  if (!isReviewedDrugLocale(localized)) {
    return drug;
  }

  return localized;
}

export function isDrugTranslated(drugId: string, locale: AppLocale): boolean {
  if (locale === 'es') return true;
  const localized = LOCAL_DRUG_LOCALES[locale]?.[drugId];
  return isReviewedDrugLocale(localized);
}
