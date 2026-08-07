/**
 * Límites de salas de reunión Sanidapp.
 * Free: acceso libre con tope. Premium: más participantes y duración
 * (el costo LiveKit se cubre con la suscripción).
 */
export const MEETING_LIMITS = {
  free: {
    maxParticipants: 4,
    maxDurationMinutes: 40,
  },
  premium: {
    maxParticipants: 8,
    maxDurationMinutes: 120,
  },
} as const;

export type MeetingTier = keyof typeof MEETING_LIMITS;

export function meetingLimitsForPremium(isPremium: boolean) {
  return isPremium ? MEETING_LIMITS.premium : MEETING_LIMITS.free;
}
