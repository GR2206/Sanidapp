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

/** El contenido empaquetado en la app prevalece sobre GitHub. */
function mergePathologyIndex(remote: PathologyIndex | null): PathologyIndex {
  const localById = new Map(LOCAL_PATHOLOGY_INDEX.pathologies.map((item) => [item.id, item]));
  const remoteItems = remote?.pathologies ?? [];
  const mergedIds = new Set<string>();
  const pathologies: PathologyMeta[] = [];

  for (const meta of remoteItems) {
    mergedIds.add(meta.id);
    pathologies.push(localById.get(meta.id) ?? meta);
  }

  for (const meta of LOCAL_PATHOLOGY_INDEX.pathologies) {
    if (!mergedIds.has(meta.id)) {
      pathologies.push(meta);
    }
  }

  return {
    ...LOCAL_PATHOLOGY_INDEX,
    ...(remote ?? {}),
    pathologies,
  };
}

export async function loadPathologyIndex(
  branchId: string = DEFAULT_BRANCH_ID,
): Promise<PathologyIndex> {
  try {
    const remote = await fetchGitHubJson<PathologyIndex>(getPathologyIndexPath(branchId));
    return mergePathologyIndex(remote);
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
  const local = LOCAL_PATHOLOGIES[pathologyId];
  if (local) {
    return resolvePathologyLocale(local, locale);
  }

  const meta =
    LOCAL_PATHOLOGY_INDEX.pathologies.find((item) => item.id === pathologyId) ?? null;
  if (!meta) {
    return null;
  }

  try {
    const remote = await fetchGitHubJson<Pathology>(getPathologyPath(meta));
    return resolvePathologyLocale(remote, locale);
  } catch {
    return null;
  }
}

export function getLocalizedPathologyCount(locale: AppLocale): number {
  if (locale === 'es') {
    return Object.keys(LOCAL_PATHOLOGIES).length;
  }

  return Object.values(LOCAL_PATHOLOGY_LOCALES[locale] ?? {}).filter(
    (pathology) => pathology.translationReviewed,
  ).length;
}
