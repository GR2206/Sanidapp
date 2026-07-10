export async function fetchRemoteJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${url} (${response.status})`);
  }

  return response.json() as Promise<T>;
}
