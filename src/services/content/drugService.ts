import { LOCAL_DRUG_INDEX, LOCAL_DRUGS } from '@/services/content/drugLocalRegistry';
import { LOCAL_DRUG_LOCALES } from '@/services/content/drugLocaleRegistry';
import { resolveDrugLocale } from '@/services/content/drugLocaleMerge';
import { fetchGitHubJson } from '@/services/github/githubClient';
import type { AppLocale } from '@/i18n/types';
import type { Drug, DrugIndex, DrugMeta } from '@/types/drug';

const DEFAULT_BRANCH_ID = 'atencion-sanitaria';

function getDrugIndexPath(branchId: string): string {
  return `branches/${branchId}/farmacologia/index.json`;
}

function getDrugPath(meta: DrugMeta): string {
  return `branches/${meta.branch}/farmacologia/drugs/${meta.id}.json`;
}

function localizeDrugMeta(meta: DrugMeta, locale: AppLocale): DrugMeta {
  if (locale === 'es') {
    return meta;
  }

  const localized = LOCAL_DRUG_LOCALES[locale]?.[meta.id];
  if (!localized?.translationReviewed) {
    return meta;
  }

  return {
    ...meta,
    name: localized.name,
  };
}

export async function loadDrugIndex(branchId: string = DEFAULT_BRANCH_ID): Promise<DrugIndex> {
  try {
    return await fetchGitHubJson<DrugIndex>(getDrugIndexPath(branchId));
  } catch {
    return LOCAL_DRUG_INDEX;
  }
}

export async function loadAllDrugMeta(
  branchId: string = DEFAULT_BRANCH_ID,
  locale: AppLocale = 'es',
): Promise<DrugMeta[]> {
  const index = await loadDrugIndex(branchId);
  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';

  return [...index.drugs]
    .map((meta) => localizeDrugMeta(meta, locale))
    .sort((a, b) => a.name.localeCompare(b.name, collator));
}

export async function loadDrugMeta(
  drugId: string,
  locale: AppLocale = 'es',
): Promise<DrugMeta | null> {
  const allMeta = await loadAllDrugMeta(DEFAULT_BRANCH_ID, locale);
  return allMeta.find((item) => item.id === drugId) ?? null;
}

export async function loadDrug(drugId: string, locale: AppLocale = 'es'): Promise<Drug | null> {
  const meta = await loadDrugMeta(drugId, 'es');
  const local = LOCAL_DRUGS[drugId];

  let base: Drug | null = null;

  if (!meta) {
    base = local ?? null;
  } else {
    try {
      base = await fetchGitHubJson<Drug>(getDrugPath(meta));
    } catch {
      base = local ?? null;
    }
  }

  if (!base) {
    return null;
  }

  return resolveDrugLocale(base, locale);
}

export function getLocalizedDrugCount(locale: AppLocale): number {
  if (locale === 'es') {
    return Object.keys(LOCAL_DRUGS).length;
  }

  return Object.values(LOCAL_DRUG_LOCALES[locale] ?? {}).filter((drug) => drug.translationReviewed)
    .length;
}
