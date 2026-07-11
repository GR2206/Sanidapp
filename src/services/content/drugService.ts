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

/** El contenido empaquetado en la app prevalece sobre GitHub (nombres y textos al día). */
function mergeDrugIndex(remote: DrugIndex | null): DrugIndex {
  const localById = new Map(LOCAL_DRUG_INDEX.drugs.map((item) => [item.id, item]));
  const remoteDrugs = remote?.drugs ?? [];
  const mergedIds = new Set<string>();
  const drugs: DrugMeta[] = [];

  for (const meta of remoteDrugs) {
    mergedIds.add(meta.id);
    drugs.push(localById.get(meta.id) ?? meta);
  }

  for (const meta of LOCAL_DRUG_INDEX.drugs) {
    if (!mergedIds.has(meta.id)) {
      drugs.push(meta);
    }
  }

  return {
    ...LOCAL_DRUG_INDEX,
    ...(remote ?? {}),
    drugs,
  };
}

export async function loadDrugIndex(branchId: string = DEFAULT_BRANCH_ID): Promise<DrugIndex> {
  try {
    const remote = await fetchGitHubJson<DrugIndex>(getDrugIndexPath(branchId));
    return mergeDrugIndex(remote);
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
  const local = LOCAL_DRUGS[drugId];
  if (local) {
    return resolveDrugLocale(local, locale);
  }

  const meta = await loadDrugMeta(drugId, 'es');
  if (!meta) {
    return null;
  }

  try {
    const remote = await fetchGitHubJson<Drug>(getDrugPath(meta));
    return resolveDrugLocale(remote, locale);
  } catch {
    return null;
  }
}

export function getLocalizedDrugCount(locale: AppLocale): number {
  if (locale === 'es') {
    return Object.keys(LOCAL_DRUGS).length;
  }

  return Object.values(LOCAL_DRUG_LOCALES[locale] ?? {}).filter((drug) => drug.translationReviewed)
    .length;
}
