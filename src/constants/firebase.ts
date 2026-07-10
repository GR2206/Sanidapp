/**
 * Firebase / Firestore — namespace exclusivo de Sanidapp.
 *
 * En Firebase Console:
 * 1. Crear proyecto NUEVO "sanidapp" (recomendado) o usar uno existente con reglas estrictas.
 * 2. Activar Authentication → Email/Password.
 * 3. Crear Firestore en modo producción.
 * 4. Copiar credenciales web a .env (ver .env.example).
 * 5. Desplegar firestore.rules de la raíz del repo.
 *
 * Estructura válida (no mezclar con otras apps):
 *   apps/sanidapp/sanatorios/{sanatorioId}              → catálogo + branding
 *   apps/sanidapp/sanatorios/{sanatorioId}/usuarios/{uid} → perfil en ese sanatorio
 *   apps/sanidapp/usuarios/{uid}                        → perfil global (role, accessTier, institutionToken, …)
 *   apps/sanidapp/config/admins                         → lista de UIDs admin
 *   apps/sanidapp/sanatorios/{sanatorioId}/foroPosts/{postId} → pizarrón del sanatorio
 *   apps/sanidapp/sanatorios/{sanatorioId}/pushTokens/{uid}   → token push Expo del usuario
 *   apps/sanidapp/purchases/{uid}                             → compra IAP verificada (solo backend)
 */
export const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
} as const;

export function isFirebaseConfigured(): boolean {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
      FIREBASE_CONFIG.projectId &&
      FIREBASE_CONFIG.appId,
  );
}

export const FIRESTORE_APPS_COLLECTION = 'apps' as const;
export const FIRESTORE_APP_ID = 'sanidapp' as const;

export const FIRESTORE_PATHS = {
  appDoc: () => [FIRESTORE_APPS_COLLECTION, FIRESTORE_APP_ID] as const,
  sanatorios: () => [...FIRESTORE_PATHS.appDoc(), 'sanatorios'] as const,
  sanatorio: (sanatorioId: string) =>
    [...FIRESTORE_PATHS.sanatorios(), sanatorioId] as const,
  sanatorioUsuarios: (sanatorioId: string) =>
    [...FIRESTORE_PATHS.sanatorio(sanatorioId), 'usuarios'] as const,
  sanatorioUsuario: (sanatorioId: string, uid: string) =>
    [...FIRESTORE_PATHS.sanatorioUsuarios(sanatorioId), uid] as const,
  usuarios: () => [...FIRESTORE_PATHS.appDoc(), 'usuarios'] as const,
  usuario: (uid: string) => [...FIRESTORE_PATHS.usuarios(), uid] as const,
  config: () => [...FIRESTORE_PATHS.appDoc(), 'config'] as const,
  configAdmins: () => [...FIRESTORE_PATHS.config(), 'admins'] as const,
  foroPosts: (sanatorioId: string) =>
    [...FIRESTORE_PATHS.sanatorio(sanatorioId), 'foroPosts'] as const,
  foroPost: (sanatorioId: string, postId: string) =>
    [...FIRESTORE_PATHS.foroPosts(sanatorioId), postId] as const,
  pushTokens: (sanatorioId: string) =>
    [...FIRESTORE_PATHS.sanatorio(sanatorioId), 'pushTokens'] as const,
  pushToken: (sanatorioId: string, uid: string) =>
    [...FIRESTORE_PATHS.pushTokens(sanatorioId), uid] as const,
} as const;
