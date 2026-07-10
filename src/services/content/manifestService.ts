import localManifest from '../../../content/manifest.json';

import { LOCAL_CATEGORY_INDEXES, LOCAL_PROTOCOLS } from '@/services/content/localRegistry';

import { LOCAL_PROTOCOL_LOCALES } from '@/services/content/protocolLocaleRegistry';

import { resolveProtocolLocale } from '@/services/content/protocolLocaleMerge';

import { fetchGitHubJson } from '@/services/github/githubClient';

import { getProtocolQrPayload } from '@/services/qr/qrEncoder';

import type { AppLocale } from '@/i18n/types';

import type { CategoryId, ContentManifest, Protocol, ProtocolIndex, ProtocolMeta } from '@/types/protocol';



const DEFAULT_BRANCH_ID = 'atencion-sanitaria';



function normalizeProtocolMeta(meta: ProtocolMeta): ProtocolMeta {

  return {

    ...meta,

    qrPayload: getProtocolQrPayload(meta.id, meta.qrPayload),

  };

}



function localizeProtocolMeta(meta: ProtocolMeta, locale: AppLocale): ProtocolMeta {

  if (locale === 'es') {

    return meta;

  }



  const localized = LOCAL_PROTOCOL_LOCALES[locale]?.[meta.id];

  if (!localized) {

    return meta;

  }



  return normalizeProtocolMeta({

    ...meta,

    title: localized.title,

  });

}



function getActiveBranch(manifest: ContentManifest) {

  return (

    manifest.branches.find((branch) => branch.id === manifest.defaultBranch && branch.enabled) ??

    manifest.branches.find((branch) => branch.enabled)

  );

}



export async function loadManifest(): Promise<ContentManifest> {

  try {

    return await fetchGitHubJson<ContentManifest>('manifest.json');

  } catch {

    return localManifest as ContentManifest;

  }

}



export async function loadProtocolIndex(

  categoryId: string,

  branchId: string = DEFAULT_BRANCH_ID,

  locale: AppLocale = 'es',

): Promise<ProtocolIndex> {

  const path = `branches/${branchId}/categories/${categoryId}/index.json`;



  let index: ProtocolIndex;

  try {

    index = await fetchGitHubJson<ProtocolIndex>(path);

  } catch {

    index = LOCAL_CATEGORY_INDEXES[categoryId];

  }



  if (!index || locale === 'es') {

    return index;

  }



  return {

    ...index,

    protocols: index.protocols.map((meta) => localizeProtocolMeta(meta, locale)),

  };

}



export async function loadAllProtocolMeta(locale: AppLocale = 'es'): Promise<ProtocolMeta[]> {

  const manifest = await loadManifest();

  const branch = getActiveBranch(manifest);



  if (!branch) {

    return [];

  }



  const indexes = await Promise.all(

    branch.categories.map((categoryId) => loadProtocolIndex(categoryId, branch.id, locale)),

  );



  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';



  return indexes

    .flatMap((index) => index.protocols.map((meta) => localizeProtocolMeta(meta, locale)))

    .sort((a, b) => a.title.localeCompare(b.title, collator));

}



export async function loadProtocolMeta(

  protocolId: string,

  locale: AppLocale = 'es',

): Promise<ProtocolMeta | null> {

  const allMeta = await loadAllProtocolMeta(locale);

  return allMeta.find((item) => item.id === protocolId) ?? null;

}



export async function loadProtocol(protocolId: string, locale: AppLocale = 'es'): Promise<Protocol | null> {

  const meta = await loadProtocolMeta(protocolId, 'es');

  const local = LOCAL_PROTOCOLS[protocolId];



  let base: Protocol | null = null;



  if (!meta) {

    base = local ?? null;

  } else {

    const path = `branches/${meta.branch}/categories/${meta.category}/protocols/${protocolId}.json`;



    try {

      const remote = await fetchGitHubJson<Protocol>(path);

      base = {

        ...remote,

        qrPayload: getProtocolQrPayload(remote.id, remote.qrPayload),

      };

    } catch {

      base = local ?? null;

    }

  }



  if (!base) {

    return null;

  }



  const localized = resolveProtocolLocale(base, locale);

  return {

    ...localized,

    qrPayload: getProtocolQrPayload(localized.id, localized.qrPayload),

  };

}



export async function loadProtocolsByCategory(

  locale: AppLocale = 'es',

): Promise<{ categoryId: CategoryId; protocols: ProtocolMeta[] }[]> {

  const manifest = await loadManifest();

  const branch = getActiveBranch(manifest);



  if (!branch) {

    return [];

  }



  const collator = locale === 'pt-BR' ? 'pt' : locale === 'en' ? 'en' : 'es';



  const sections = await Promise.all(

    branch.categories.map(async (categoryId) => {

      const index = await loadProtocolIndex(categoryId, branch.id, locale);

      return {

        categoryId: categoryId as CategoryId,

        protocols: index.protocols

          .map((meta) => localizeProtocolMeta(meta, locale))

          .sort((a, b) => a.title.localeCompare(b.title, collator)),

      };

    }),

  );



  return sections.filter((section) => section.protocols.length > 0);

}



/** @deprecated Usar loadAllProtocolMeta para listados ligeros. */

export async function loadAllProtocols(locale: AppLocale = 'es'): Promise<Protocol[]> {

  const metaList = await loadAllProtocolMeta(locale);

  const protocols = await Promise.all(metaList.map((meta) => loadProtocol(meta.id, locale)));



  return protocols.filter((item): item is Protocol => item !== null);

}


