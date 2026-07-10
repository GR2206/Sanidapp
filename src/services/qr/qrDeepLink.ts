import { ROUTES } from '@/constants/routes';
import { resolveQrPayload } from '@/services/qr/qrEncoder';

export function getProtocolRouteFromUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  const protocolId = resolveQrPayload(url);
  return protocolId ? ROUTES.protocol(protocolId) : null;
}
