import type { ContentItemType } from '@/types/userActivity';
import {
  FREE_CATEGORY_PILL_TONES,
  type FreeCategoryPillKind,
  type FreeCategoryPillTone,
} from '@/theme/freeCategoryPills';

export function resolveFreeCategoryPillKind(
  type: ContentItemType,
  subtitle?: string,
): FreeCategoryPillKind {
  if (type === 'drug') {
    return 'farmacologia';
  }
  if (type === 'pathology') {
    return 'patologia';
  }

  const haystack = (subtitle ?? '').toLowerCase();
  if (haystack.includes('pediatr') || haystack.includes('paediat')) {
    return 'pediatria';
  }
  if (haystack.includes('neonat')) {
    return 'neonatologia';
  }
  if (haystack.includes('adult')) {
    return 'adulto';
  }
  return 'protocolo';
}

export function freeCategoryPillTone(
  type: ContentItemType,
  subtitle?: string,
): FreeCategoryPillTone {
  return FREE_CATEGORY_PILL_TONES[resolveFreeCategoryPillKind(type, subtitle)];
}

type TranslateFn = (key: string) => string;

/** Etiqueta corta dentro de la píldora (sin “Protocolo ·” / “Protocol ·”). */
export function freeCategoryPillLabel(
  type: ContentItemType,
  subtitle: string | undefined,
  t: TranslateFn,
): string {
  const raw = subtitle?.trim() ?? '';
  if (!raw) {
    if (type === 'drug') return t('content.pharmacology');
    if (type === 'pathology') return t('content.pathology');
    return t('content.protocol');
  }

  const sep = raw.includes('·') ? '·' : raw.includes('•') ? '•' : null;
  if (sep && type === 'protocol') {
    const parts = raw.split(sep).map((part) => part.trim()).filter(Boolean);
    return parts[parts.length - 1] || raw;
  }

  return raw;
}
