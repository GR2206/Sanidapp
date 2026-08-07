/** Opciones de profesión en el registro (menú desplegable). */
export const PROFESSION_OPTION_IDS = [
  'enfermero',
  'medico',
  'supervisor',
  'docente',
  'estudiante',
  'otro',
] as const;

export type ProfessionOptionId = (typeof PROFESSION_OPTION_IDS)[number];
