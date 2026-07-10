import { APP_CONFIG, getGitHubRawUrl } from '@/constants/config';

export async function fetchGitHubJson<T>(relativePath: string): Promise<T> {
  const root = APP_CONFIG.github.contentRoot;
  const url = getGitHubRawUrl(`${root}/${relativePath}`);

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${relativePath} (${response.status})`);
  }

  return response.json() as Promise<T>;
}
