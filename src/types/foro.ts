export type ForoPostType = 'notificacion' | 'evento' | 'planificacion' | 'directa';

export interface ForoPost {
  id: string;
  sanatorioId: string;
  type: ForoPostType;
  title: string;
  body: string;
  /** Fecha y hora del evento (ISO 8601). */
  eventDate: string | null;
  /** Si está definido, la publicación es privada para esa persona (+ autor). */
  targetUid: string | null;
  targetName: string | null;
  authorUid: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface SanatorioStaffMember {
  uid: string;
  nombre: string;
  apellido: string;
  profesion: string;
  role: string;
}

export interface CreateForoPostInput {
  sanatorioId: string;
  type: ForoPostType;
  title: string;
  body: string;
  eventDate?: string | null;
  targetUid?: string | null;
  targetName?: string | null;
  authorUid: string;
  authorName: string;
}

export interface UpdateForoPostInput {
  type?: ForoPostType;
  title?: string;
  body?: string;
  eventDate?: string | null;
}

/** @deprecated Use `useAppLabels().foroPostType()` or `t('foro.postType.*')` instead. */
export const FORO_POST_TYPE_LABELS: Record<ForoPostType, string> = {
  notificacion: 'Notificación',
  directa: 'Notificación directa',
  evento: 'Evento',
  planificacion: 'Planificación',
};
