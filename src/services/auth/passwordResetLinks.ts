import * as Linking from 'expo-linking';

import { FIREBASE_CONFIG } from '@/constants/firebase';

/** URL HTTPS del handler (Firebase Hosting). Debe estar en dominios autorizados. */
export function getPasswordResetHandlerUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_PASSWORD_RESET_HANDLER_URL?.trim();
  if (fromEnv) return fromEnv;
  const projectId = FIREBASE_CONFIG.projectId || 'sanidapp-b67d7';
  return `https://${projectId}.web.app/auth/action`;
}

/** Extrae oobCode de deep links Sanidapp o del handler web. */
export function getPasswordResetCodeFromUrl(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = Linking.parse(url);
    const fromQuery = parsed.queryParams?.oobCode;
    if (typeof fromQuery === 'string' && fromQuery.trim()) {
      return fromQuery.trim();
    }
    if (Array.isArray(fromQuery) && typeof fromQuery[0] === 'string' && fromQuery[0].trim()) {
      return fromQuery[0].trim();
    }
  } catch {
    // fall through
  }

  try {
    const normalized = url.includes('://') ? url : `https://sanidapp.local/${url}`;
    const withProtocol = normalized.startsWith('sanidapp:')
      ? normalized.replace('sanidapp:', 'https:')
      : normalized;
    const search = withProtocol.includes('?') ? withProtocol.split('?')[1] : '';
    const params = new URLSearchParams(search);
    const code = params.get('oobCode')?.trim();
    return code || null;
  } catch {
    return null;
  }
}

export function isPasswordResetUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes('reset-password') ||
    lower.includes('mode=resetpassword') ||
    (lower.includes('oobcode=') && lower.includes('auth'))
  );
}
