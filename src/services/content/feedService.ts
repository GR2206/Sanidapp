import localGistConfig from '../../../content/gist-config.json';
import localCursos from '../../../content/feeds/cursos.json';
import localCongresos from '../../../content/feeds/congresos.json';
import { fetchGitHubJson } from '@/services/github/githubClient';
import { fetchGistJson } from '@/services/gist/gistClient';
import { loadFirestoreFeedPage } from '@/services/firebase/feedManageService';
import type {
  FeedAudience,
  FeedKind,
  FeedPage,
  FeedPublishScope,
  GistConfig,
  GistFeedConfig,
} from '@/types/feed';

const LOCAL_FEEDS: Record<FeedKind, FeedPage> = {
  cursos: localCursos as FeedPage,
  congresos: localCongresos as FeedPage,
};

const LOCAL_GIST_CONFIG = localGistConfig as GistConfig;

function mergeFeedGistEntry(local: GistFeedConfig, remote?: GistFeedConfig | null): GistFeedConfig {
  if (!remote) {
    return local;
  }

  const gistId = remote.gistId?.trim() ? remote.gistId.trim() : local.gistId;
  return {
    user: remote.user?.trim() || local.user,
    gistId,
    filename: remote.filename?.trim() || local.filename,
  };
}

/** Prefiere Gist remoto; si GitHub tiene gistId vacío, conserva el de la app. */
function mergeGistConfig(remote: GistConfig | null): GistConfig {
  return {
    cursos: mergeFeedGistEntry(LOCAL_GIST_CONFIG.cursos, remote?.cursos),
    congresos: mergeFeedGistEntry(LOCAL_GIST_CONFIG.congresos, remote?.congresos),
  };
}

async function loadGistConfig(): Promise<GistConfig> {
  try {
    const remote = await fetchGitHubJson<GistConfig>('gist-config.json');
    return mergeGistConfig(remote);
  } catch {
    return LOCAL_GIST_CONFIG;
  }
}

async function loadGistFeed(kind: FeedKind): Promise<FeedPage> {
  const config = await loadGistConfig();
  const gistEntry = config[kind];

  if (gistEntry.gistId.trim()) {
    try {
      return await fetchGistJson<FeedPage>(gistEntry);
    } catch {
      return LOCAL_FEEDS[kind];
    }
  }

  return LOCAL_FEEDS[kind];
}

async function loadPublicFeed(kind: FeedKind): Promise<FeedPage> {
  try {
    const globalPage = await loadFirestoreFeedPage({ type: 'global' }, kind);
    if (globalPage.items.length > 0) {
      return globalPage;
    }
  } catch {
    // Gist fallback
  }
  return loadGistFeed(kind);
}

export type LoadFeedOptions = {
  /**
   * public = feed mundial (siempre).
   * institution = solo Firestore del sanatorio indicado.
   * Si no se pasa audience, se infiere: con sanatorioId → institution (legacy).
   */
  audience?: FeedAudience;
  /** Requerido para audience institution. */
  sanatorioId?: string | null;
};

/**
 * Público → Firestore global (+ Gist si vacío).
 * Institución → Firestore del sanatorio (no se mezcla con otros ni con el público).
 */
export async function loadFeed(kind: FeedKind, options: LoadFeedOptions = {}): Promise<FeedPage> {
  const sanatorioId = options.sanatorioId?.trim() || '';
  const audience: FeedAudience =
    options.audience ?? (sanatorioId ? 'institution' : 'public');

  if (audience === 'institution') {
    if (!sanatorioId) {
      return { version: '1.0', title: kind === 'cursos' ? 'Cursos' : 'Congresos', items: [] };
    }
    try {
      return await loadFirestoreFeedPage({ type: 'sanatorio', sanatorioId }, kind);
    } catch {
      return { version: '1.0', title: kind === 'cursos' ? 'Cursos' : 'Congresos', items: [] };
    }
  }

  return loadPublicFeed(kind);
}

export function feedScopeForProfile(params: {
  isAdmin: boolean;
  isSupervisor: boolean;
  canPublishFeeds?: boolean;
  sanatorioId?: string | null;
}): FeedPublishScope | null {
  const sanatorioId = params.sanatorioId?.trim() || '';
  if (params.isSupervisor && sanatorioId) {
    return { type: 'sanatorio', sanatorioId };
  }
  if (params.isAdmin) {
    return sanatorioId ? { type: 'sanatorio', sanatorioId } : { type: 'global' };
  }
  if (params.canPublishFeeds) {
    return { type: 'global' };
  }
  return null;
}
