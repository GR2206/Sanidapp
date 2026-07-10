import type { GistFeedConfig } from '@/types/feed';

/** URL raw de un archivo en GitHub Gist (última revisión). */
export function getGistRawUrl({ user, gistId, filename }: GistFeedConfig): string {
  return `https://gist.githubusercontent.com/${user}/${gistId}/raw/${filename}`;
}

export async function fetchGistJson<T>(config: GistFeedConfig): Promise<T> {
  if (!config.gistId.trim()) {
    throw new Error('Gist no configurado');
  }

  const url = getGistRawUrl(config);
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar gist (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function fetchGistText(config: GistFeedConfig): Promise<string> {
  if (!config.gistId.trim()) {
    throw new Error('Gist no configurado');
  }

  const url = getGistRawUrl(config);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo cargar gist (${response.status})`);
  }

  return response.text();
}
