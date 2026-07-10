import type { UserRole } from '@/types/auth';

export interface StaffAllowlistEntry {
  nombre: string;
  apellido: string;
  /** Opcional en el padrón; el correo lo define el usuario al registrarse. */
  email?: string;
  /** Solo se usa para marcar supervisores/as en el padrón. */
  rango?: string;
}

export interface StaffAllowlistPage {
  version?: string;
  updatedAt?: string;
  sanatorioId?: string;
  staff: StaffAllowlistEntry[];
}

export interface StaffAllowlistGistConfig {
  user: string;
  gistId: string;
  filename: string;
  /** Token corporativo rotatable; vacío hasta que lo definas en el Gist/config. */
  institutionToken?: string;
}

export interface StaffAllowlistConfig {
  sanatorios: Record<string, StaffAllowlistGistConfig>;
}

export interface StaffRegistrationMatch {
  entry: StaffAllowlistEntry;
  role: Extract<UserRole, 'user' | 'supervisor'>;
  profesion: string;
}

export interface StaffRegistrationInput {
  nombre: string;
  apellido: string;
  profesion: string;
}
