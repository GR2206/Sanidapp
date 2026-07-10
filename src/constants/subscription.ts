import type { ContentSection } from '@/types/contentUpdates';
import type { CategoryId } from '@/types/protocol';

/** Categorías desbloqueadas por completo para usuarios free. */
export const FREE_ACCESS_SECTIONS = new Set<ContentSection>(['adulto']);

/** Patologías de muestra incluidas en el plan gratuito. */
export const FREE_ACCESS_PATHOLOGY_IDS = new Set(['sep-001', 'ana-001']);

/** Protocolos de muestra incluidos en el plan gratuito (por id). */
export const FREE_ACCESS_PROTOCOL_IDS = new Set<string>(['med-p001', 'neo-i-005']);

/** Fármacos de muestra incluidos en el plan gratuito. */
export const FREE_ACCESS_DRUG_IDS = new Set(['van-001', 'ami-001', 'fnt-001']);

export const FREE_ACCESS_PROTOCOLS_BY_CATEGORY: Record<CategoryId, readonly string[]> = {
  adulto: [],
  pediatrico: ['med-p001'],
  neonatologia: ['neo-i-005'],
};

export const PREMIUM_ACCESS_SECTIONS = new Set<ContentSection>([
  'adulto',
  'pediatrico',
  'neonatologia',
  'farmacologia',
]);

export const FREE_PLAN_SAMPLE_SUMMARY_KEY = 'subscription.freePlanSummary';
