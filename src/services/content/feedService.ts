import localGistConfig from '../../../content/gist-config.json';
import localCursos from '../../../content/feeds/cursos.json';
import localCongresos from '../../../content/feeds/congresos.json';
import { fetchGitHubJson } from '@/services/github/githubClient';
import { fetchGistJson } from '@/services/gist/gistClient';
import type { FeedKind, FeedPage, GistConfig } from '@/types/feed';

const LOCAL_FEEDS: Record<FeedKind, FeedPage> = {
  cursos: localCursos as FeedPage,
  congresos: localCongresos as FeedPage,
};

async function loadGistConfig(): Promise<GistConfig> {
  try {
    return await fetchGitHubJson<GistConfig>('gist-config.json');
  } catch {
    return localGistConfig as GistConfig;
  }
}

/** Carga cursos o congresos desde Gist; si no hay gistId, usa JSON empaquetado en la app. */
export async function loadFeed(kind: FeedKind): Promise<FeedPage> {
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
