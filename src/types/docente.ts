/**
 * Solicitud de alta como docente Sanidapp (publicar cursos/congresos globales).
 * Tras aprobación admin: premium + canPublishFeeds.
 */

export type DocenteApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface DocenteApplication {
  id: string;
  uid: string;
  email: string;
  nombre: string;
  apellido: string;
  profesion: string;
  /** Universidad / institución que avala. */
  universidad: string;
  /** Título o cargo académico (p. ej. Magister, Licenciado). */
  tituloAcademico: string;
  /** Área o tema de los cursos que dicta. */
  areaCursos: string;
  /** URL pública del certificado (JPG/PNG) en Storage. */
  certificadoUrl: string;
  /** Aceptación de declaración jurada. */
  declaracionJurada: boolean;
  declaracionJuradaAt: string | null;
  status: DocenteApplicationStatus;
  rejectReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type DocenteApplicationInput = {
  universidad: string;
  tituloAcademico: string;
  areaCursos: string;
  certificadoUrl: string;
  declaracionJurada: boolean;
};
