import type { BibliographyEntry } from '@/types/protocol';

/** Grupo etario para perfiles de dilución. */
export type DrugPopulation = 'adulto' | 'pediatrico' | 'neonatal';

/**
 * Campos estructurados de dilución/preparación por población.
 * Omitir campos no aplicables; no dejar cadenas vacías.
 */
export interface DrugDilutionProfile {
  /** Presentación comercial o forma farmacéutica de partida. */
  presentation?: string;
  /** Instrucciones de reconstitución (volumen, diluyente, técnica). */
  reconstitution?: string;
  /** Diluyente y volumen final de dilución. */
  diluent?: string;
  /** Concentración final (ej. 10 mcg/mL). */
  finalConcentration?: string;
  /** Dosis habitual o rango de dosis. */
  dose?: string;
  /** Velocidad de infusión o perfusión. */
  infusionRate?: string;
  /** Vía y modalidad de administración. */
  administration?: string;
  /** Compatibilidad en línea o en Y. */
  compatibility?: string;
  /** Observaciones específicas del grupo etario. */
  notes?: string;
}

export interface DrugDilution {
  adulto?: DrugDilutionProfile;
  pediatrico?: DrugDilutionProfile;
  neonatal?: DrugDilutionProfile;
}

export interface DrugMeta {
  id: string;
  /** Nombre de la droga (genérico / DCI). */
  name: string;
  branch: string;
  version: string;
  /** Fecha ISO (YYYY-MM-DD) de última actualización. */
  updatedAt?: string;
}

export interface DrugIndex {
  branch: string;
  drugs: DrugMeta[];
}

export interface Drug extends DrugMeta {
  /** When true, EN/PT locale file replaces Spanish clinical content in the app. */
  translationReviewed?: boolean;
  /** Resumen breve para listados (1–2 frases). */
  executiveSummary?: string;
  /** Indicaciones principales (Markdown). */
  indications: string;
  /** Dilución y preparación por población. */
  dilution: DrugDilution;
  /** Estabilidad tras reconstitución/dilución (Markdown). */
  stability: string;
  /** Efectos adversos relevantes (Markdown). */
  adverseEffects: string;
  bibliography: BibliographyEntry[];
}

export const POPULATION_LABELS: Record<DrugPopulation, string> = {
  adulto: 'Adulto',
  pediatrico: 'Pediátrico',
  neonatal: 'Neonatal',
};

export const DILUTION_FIELD_LABELS: Record<keyof DrugDilutionProfile, string> = {
  presentation: 'Presentación',
  reconstitution: 'Reconstitución',
  diluent: 'Dilución',
  finalConcentration: 'Concentración final',
  dose: 'Dosis',
  infusionRate: 'Velocidad de infusión',
  administration: 'Administración',
  compatibility: 'Compatibilidad',
  notes: 'Observaciones',
};

export const DRUG_POPULATIONS: DrugPopulation[] = ['adulto', 'pediatrico', 'neonatal'];
