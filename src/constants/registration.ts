import type { RegistrationType } from '@/types/auth';

export const REGISTRATION_TYPES: RegistrationType[] = ['institutional', 'premium', 'individual'];

export const INDIVIDUAL_ACCOUNT_LABEL_KEY = 'registration.individualLabel';

export function registrationRequiresSanatorio(type: RegistrationType): boolean {
  return type === 'institutional';
}

/** Cuenta sin sanatorio: free o compra premium individual. */
export function registrationIsOutsideInstitution(type: RegistrationType): boolean {
  return type === 'individual' || type === 'premium';
}
