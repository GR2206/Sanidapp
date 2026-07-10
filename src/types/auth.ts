import type { AccessTier, PremiumSource } from '@/types/subscription';

export type UserRole = 'user' | 'supervisor' | 'admin';

/** Camino de registro: padrón institucional, cuenta free o compra premium individual. */
export type RegistrationType = 'institutional' | 'individual' | 'premium';

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  apellido: string;
  profesion: string;
  sanatorioId: string;
  sanatorioName: string;
  role: UserRole;
  accessTier: AccessTier;
  institutionToken: string;
  premiumSource: PremiumSource;
  premiumGrantedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterInput {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  profesion: string;
  registrationType: RegistrationType;
  sanatorioId: string;
}
