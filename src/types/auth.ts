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
  /** ISO country (p. ej. AR). Usado para free: cursos/congresos solo en Argentina. */
  countryCode: string;
  role: UserRole;
  accessTier: AccessTier;
  institutionToken: string;
  premiumSource: PremiumSource;
  premiumGrantedAt: string | null;
  /**
   * Docente aprobado por admin: puede publicar cursos/congresos globales.
   * El resto del acceso premium es igual a cualquier enfermero premium.
   */
  canPublishFeeds: boolean;
  /** Cuenta Stripe Connect Express (cobros EUR/USD). */
  stripeConnectAccountId: string;
  stripeConnectChargesEnabled: boolean;
  stripeConnectCountry: string;
  /** URL pública del avatar (Storage). Si falta, se muestra la inicial. */
  avatarUrl: string;
  /** ID corto público para buscarse e invitar a reuniones. */
  publicId: string;
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
  /** País elegido o detectado por GPS en registro free. */
  countryCode?: string;
}
