import { APP_CONFIG } from '@/constants/config';

export function buildQrPayload(protocolId: string): string {
  return `${APP_CONFIG.deepLinkScheme}://protocol/${protocolId}`;
}

export function resolveQrPayload(payload: string): string | null {
  const trimmed = payload.trim();

  const deepLinkPrefix = `${APP_CONFIG.deepLinkScheme}://protocol/`;
  if (trimmed.startsWith(deepLinkPrefix)) {
    const protocolId = trimmed.slice(deepLinkPrefix.length).split(/[?#]/)[0];
    return protocolId || null;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === `${APP_CONFIG.deepLinkScheme}:` && url.hostname === 'protocol') {
      const protocolId = url.pathname.replace(/^\/+/, '').split('/')[0];
      return protocolId || null;
    }
  } catch {
    return null;
  }

  return null;
}

export function getProtocolQrPayload(protocolId: string, explicitPayload?: string): string {
  if (explicitPayload?.trim()) {
    return explicitPayload.trim();
  }

  return buildQrPayload(protocolId);
}
