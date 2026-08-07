import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import type { Href } from 'expo-router';

import { APP_CONFIG } from '@/constants/config';
import { ROUTES } from '@/constants/routes';

const PENDING_KEY = '@sanidapp/pendingMeetingJoinCode';

let pendingJoinCode: string | null = null;

function normalizeCode(code: string): string | null {
  const normalized = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return normalized.length >= 4 ? normalized : null;
}

/** Link de acceso rápido: sanidapp://meeting/ABC123 */
export function buildMeetingJoinLink(joinCode: string): string {
  const code = normalizeCode(joinCode) || joinCode.trim().toUpperCase();
  return `${APP_CONFIG.deepLinkScheme}://meeting/${code}`;
}

export function setPendingMeetingJoinCode(code: string) {
  pendingJoinCode = normalizeCode(code);
  if (pendingJoinCode) {
    void AsyncStorage.setItem(PENDING_KEY, pendingJoinCode).catch(() => undefined);
  } else {
    void AsyncStorage.removeItem(PENDING_KEY).catch(() => undefined);
  }
}

export function peekPendingMeetingJoinCode(): string | null {
  return pendingJoinCode;
}

export async function loadPendingMeetingJoinCode(): Promise<string | null> {
  if (pendingJoinCode) return pendingJoinCode;
  try {
    const stored = await AsyncStorage.getItem(PENDING_KEY);
    pendingJoinCode = stored ? normalizeCode(stored) : null;
  } catch {
    pendingJoinCode = null;
  }
  return pendingJoinCode;
}

export function consumePendingMeetingJoinCode(): string | null {
  const value = pendingJoinCode;
  pendingJoinCode = null;
  void AsyncStorage.removeItem(PENDING_KEY).catch(() => undefined);
  return value;
}

/** Extrae código de sanidapp://meeting/CODE o ?code=CODE */
export function getMeetingCodeFromUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  try {
    const parsed = Linking.parse(url);
    const hostname = String(parsed.hostname || '').toLowerCase();
    const path = String(parsed.path || '')
      .replace(/^\//, '')
      .trim();

    if (hostname === 'meeting') {
      const query = parsed.queryParams?.code;
      const fromQuery = Array.isArray(query) ? query[0] : query;
      const fromPath = path.split('/')[0];
      return normalizeCode(String(fromPath || fromQuery || ''));
    }

    if (path.toLowerCase().startsWith('meeting/')) {
      return normalizeCode(path.slice('meeting/'.length).split('/')[0]);
    }

    const match = url.match(/meeting[/:]([A-Za-z0-9]{4,12})/i);
    if (match?.[1]) return normalizeCode(match[1]);
  } catch {
    // fall through
  }
  return null;
}

export function getMeetingLobbyHref(joinCode: string): Href {
  const code = normalizeCode(joinCode) || joinCode.trim().toUpperCase();
  return {
    pathname: ROUTES.reuniones,
    params: { code },
  } as Href;
}

/** Tras login/registro: ir a la sala si hay código pendiente. */
export async function resolvePostAuthHref(fallback: Href = ROUTES.home as Href): Promise<Href> {
  const code = (await loadPendingMeetingJoinCode()) || peekPendingMeetingJoinCode();
  if (code) return getMeetingLobbyHref(code);
  return fallback;
}
