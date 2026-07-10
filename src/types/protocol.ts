export type CategoryId = 'adulto' | 'pediatrico' | 'neonatologia';

export type ProtocolDivision = 'intensiva' | 'baja-complejidad';

export interface ContentBranch {
  id: string;
  label: string;
  enabled: boolean;
  categories: CategoryId[];
}

export interface ContentManifest {
  version: string;
  defaultBranch: string;
  branches: ContentBranch[];
}

export interface ProtocolMeta {
  id: string;
  title: string;
  category: CategoryId;
  branch: string;
  version: string;
  /** Fecha ISO (YYYY-MM-DD) de última actualización del protocolo. */
  updatedAt?: string;
  /** Subdivisión dentro de neonatología (UCI vs baja complejidad). */
  division?: ProtocolDivision;
  /** Opcional. Si se omite, la app genera sanidapp://protocol/{id} */
  qrPayload?: string;
}

export interface ProtocolIndex {
  category: CategoryId;
  protocols: ProtocolMeta[];
}

export interface BibliographyEntry {
  citation: string;
  url?: string;
}

export interface Protocol extends ProtocolMeta {
  executiveSummary: string;
  body: string;
  bibliography: BibliographyEntry[];
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  adulto: 'Adulto',
  pediatrico: 'Pediátrico',
  neonatologia: 'Neonatología',
};

export const DIVISION_LABELS: Record<ProtocolDivision, string> = {
  intensiva: 'UCI Neonatal',
  'baja-complejidad': 'Baja complejidad',
};

/** Año o fecha de actualización para etiquetas impresas (QR). */
export function getProtocolDisplayDate(meta: Pick<ProtocolMeta, 'updatedAt'>): string {
  const value = meta.updatedAt?.trim();
  if (!value) {
    return '2026';
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }

  return value;
}
