import { LOCAL_PATHOLOGIES, LOCAL_PATHOLOGY_INDEX } from '@/services/content/pathologyLocalRegistry';
import { LOCAL_PATHOLOGY_LOCALES } from '@/services/content/pathologyLocaleRegistry';
import { resolvePathologyLocale } from '@/services/content/pathologyLocaleMerge';
import { fetchGitHubJson } from '@/services/github/githubClient';
import type { AppLocale } from '@/i18n/types';
import type { Pathology, PathologyIndex, PathologyMeta } from '@/types/pathology';

const DEFAULT_BRANCH_ID = 'atencion-sanitaria';

function getPathologyIndexPath(branchId: string): string {
  return `branches/${branchId}/patologias/index.json`;
}

function getPathologyPath(meta: PathologyMeta): string {
  return `branches/${meta.branch}/patologias/items/${meta.id}.json`;
}

function localizePathologyMeta(meta: PathologyMeta, locale: AppLocale): PathologyMeta {
  if (locale === 'es') {
    return meta;
  }

  const localized = LOCAL_PATHOLOGY_LOCALES[locale]?.[meta.id];
  if (!localized?.translationReviewed) {
    return meta;
  }

  return {
    ...meta,
    name: localized.name,
  };
}

export async function loadPathologyIndex(branchId: string = DEFAULT_BRANCH_ID): Promise<PathologyIndex> {
  try {
    return await fetchGitHubJson<PathologyIndex>(getPathologyIndexPath(branchId));
  } catch {
    return LOCAL_PATHOLOGY_INDEX;
  }
}

export async function loadAllPathologyMeta(
  branchId: string = DEFAULT_BRANCH_ID,
  locale: AppLocale = 'es',
): Promise<PathologyMeta[]> {
  const index = await loadPathologyIndex(branchId);
  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';

  return [...index.pathologies]
    .map((meta) => localizePathologyMeta(meta, locale))
    .sort((a, b) => a.name.localeCompare(b.name, collator));
}

export async function loadPathologyMeta(
  pathologyId: string,
  locale: AppLocale = 'es',
): Promise<PathologyMeta | null> {
  const allMeta = await loadAllPathologyMeta(DEFAULT_BRANCH_ID, locale);
  return allMeta.find((item) => item.id === pathologyId) ?? null;
}

export async function loadPathology(
  pathologyId: string,
  locale: AppLocale = 'es',
): Promise<Pathology | null> {
  const meta = LOCAL_PATHOLOGY_INDEX.pathologies.find((item) => item.id === pathologyId) ?? null;
  const local = LOCAL_PATHOLOGIES[pathologyId];

  let base: Pathology | null = null;

  if (!meta) {
    base = local ?? null;
  } else {
    try {
      base = await fetchGitHubJson<Pathology>(getPathologyPath(meta));
    } catch {
      base = local ?? null;
    }
  }

  if (!base) {
    return null;
  }

  return resolvePathologyLocale(base, locale);
}

export function getLocalizedPathologyCount(locale: AppLocale): number {
  if (locale === 'es') {
    return Object.keys(LOCAL_PATHOLOGIES).length;
  }

  return Object.values(LOCAL_PATHOLOGY_LOCALES[locale] ?? {}).filter(
    (pathology) => pathology.translationReviewed,
  ).length;
}
