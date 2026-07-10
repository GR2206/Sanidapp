export const APP_CONFIG = {
  name: 'Sanidapp',
  deepLinkScheme: 'sanidapp',
  /** Correo de contacto; completar cuando esté disponible. */
  contactEmail: 'listafacilgr@gmail.com',
  github: {
    owner: 'GR2206',
    repo: 'Sanidapp',
    branch: 'main',
    contentRoot: 'content',
  },
  /**
   * Banners del inicio. Dejar `gistRawUrl` vacío hasta publicar el gist.
   * Formato: https://gist.githubusercontent.com/GR2206/9f93d73f6e68678b00712d24f412bcce/raw/7e29e227cd8ea8ec074d463316a2445ea4603c86/banners-sanidapp.json
   */
  banners: {
    gistRawUrl: 'https://gist.githubusercontent.com/GR2206/9f93d73f6e68678b00712d24f412bcce/raw/7e29e227cd8ea8ec074d463316a2445ea4603c86/banners-sanidapp.json',
  },
} as const;

export function getGitHubRawUrl(relativePath: string): string {
  const { owner, repo, branch } = APP_CONFIG.github;
  const normalized = relativePath.replace(/^\/+/, '');
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${normalized}`;
}
