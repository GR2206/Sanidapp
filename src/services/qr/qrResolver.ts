import { router } from 'expo-router';

import { ROUTES } from '@/constants/routes';
import { resolveQrPayload } from '@/services/qr/qrEncoder';

export function getProtocolIdFromScan(data: string): string | null {
  return resolveQrPayload(data);
}

export function openProtocolFromScan(data: string): string | null {
  const protocolId = getProtocolIdFromScan(data);

  if (!protocolId) {
    return null;
  }

  router.push(ROUTES.protocol(protocolId));
  return protocolId;
}
