import type { Protocol } from '@/types/protocol';
import type { AppLocale } from '@/i18n/types';
import { LOCAL_PROTOCOL_LOCALES } from '@/services/content/protocolLocaleRegistry';

export function resolveProtocolLocale(protocol: Protocol, locale: AppLocale): Protocol {
  if (locale === 'es') {
    return protocol;
  }

  const localized = LOCAL_PROTOCOL_LOCALES[locale]?.[protocol.id];
  return localized ?? protocol;
}

export function isProtocolTranslated(protocolId: string, locale: AppLocale): boolean {
  if (locale === 'es') return true;
  return Boolean(LOCAL_PROTOCOL_LOCALES[locale]?.[protocolId]);
}
