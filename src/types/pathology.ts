import type { BibliographyEntry } from '@/types/protocol';

export interface PathologyMeta {
  id: string;
  name: string;
  branch: string;
  version: string;
  updatedAt?: string;
}

export interface PathologyRelatedDrug {
  drugId: string;
  /** Etiqueta del botón; si se omite, se usa el nombre del fármaco en la app. */
  label?: string;
}

export interface PathologyIndex {
  branch: string;
  pathologies: PathologyMeta[];
}

export type PathologyClinicalIllustration = 'ecg-sinus-vs-stemi';

export interface PathologyClinicalBox {
  title: string;
  /** Texto en Markdown ligero (párrafos y **negrita**). */
  content?: string;
  /** Ilustración clínica integrada (ECG, escalas visuales, etc.). */
  illustration?: PathologyClinicalIllustration;
}

export interface Pathology extends PathologyMeta {
  /** When true, EN/PT locale file replaces Spanish clinical content in the app. */
  translationReviewed?: boolean;
  /** Texto principal en Markdown (2–3 párrafos). */
  body: string;
  /** Cuadro clínico breve (escalas, criterios). */
  clinicalBox?: PathologyClinicalBox;
  /** Varios cuadros clínicos (si hay más de uno, tiene prioridad sobre clinicalBox). */
  clinicalBoxes?: PathologyClinicalBox[];
  /** Fármacos relacionados con enlace a monografías. */
  relatedDrugs?: PathologyRelatedDrug[];
  bibliography: BibliographyEntry[];
}
