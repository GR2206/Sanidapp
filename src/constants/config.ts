export const APP_CONFIG = {
  name: 'Sanidapp',
  deepLinkScheme: 'sanidapp',
  /** Correo de contacto institucional y soporte. */
  contactEmail: 'grproducciones2026@gmail.com',
  /**
   * Link público para descargar / compartir la app (Play Store).
   * El QR del menú y el sheet de compartir usan esta URL.
   */
  shareDownloadUrl: 'https://play.google.com/store/apps/details?id=com.gr2206.sanidapp',
  /**
   * Tiendas para el cartel «Actualizar».
   * Al publicar una build nueva: subir `content/app-update.json` con `latestVersion`
   * igual a la versión de `app.json` (cuando ya esté en las stores).
   */
  stores: {
    android: 'https://play.google.com/store/apps/details?id=com.gr2206.sanidapp',
    /** Completar con la URL definitiva cuando exista listing de App Store. */
    ios: '',
    iosBundleId: 'com.gr2206.sanidapp',
  },
  appUpdate: {
    /** Ruta bajo `content/` en GitHub (raw). */
    remotePath: 'app-update.json',
  },
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
  /**
   * Fondo del home solo para versión free (sin sanatorio).
   * Archivo en el gist Sanidapp: `home-background-free.json`
   * → `{ "imageUrl": "https://…/tu-imagen.jpg" }`
   * Si `imageUrl` está vacío, se usa `assets/images/home-background.png`.
   * Los sanatorios no usan esto: mantienen su fondo/marca propia.
   */
  homeBackground: {
    gistUser: 'GR2206',
    gistId: '7cab5ab69213029ff5b51063e7834406',
    filename: 'home-background-free.json',
    /** Opcional: URL raw completa. Si está vacía, se arma con user/gistId/filename. */
    gistRawUrl: '',
  },
  /**
   * Tip / clima de guardia del home free (banner gancho).
   * Archivo Gist: `home-guard-tip-free.json`
   * → `{ "tips": [{ "id", "label?", "text" }] }`
   * Se elige al azar (con anti-repetición). Sanatorios usan el mismo carrusel.
   */
  homeGuardTip: {
    gistUser: 'GR2206',
    gistId: '7cab5ab69213029ff5b51063e7834406',
    filename: 'home-guard-tip-free.json',
  },
} as const;

export function getGitHubRawUrl(relativePath: string): string {
  const { owner, repo, branch } = APP_CONFIG.github;
  const normalized = relativePath.replace(/^\/+/, '');
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${normalized}`;
}
