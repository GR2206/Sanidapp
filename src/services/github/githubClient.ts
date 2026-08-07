import { APP_CONFIG, getGitHubRawUrl } from '@/constants/config';

/** Evita que una red lenta deje colgada la app en el ingreso. */
const GITHUB_FETCH_TIMEOUT_MS = 2500;

export async function fetchGitHubJson<T>(relativePath: string): Promise<T> {
  const root = APP_CONFIG.github.contentRoot;
  const url = getGitHubRawUrl(`${root}/${relativePath}`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITHUB_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${relativePath} (${response.status})`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
