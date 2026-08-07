/**
 * Identidad comercial del servicio de cobro de cursos/congresos.
 * La personería operativa frente al disertante es Sanidapp;
 * la mención de Grproducciones es de crédito / marca detrás.
 */
export const BILLING_OPERATOR = {
  /** Denominación frente a usuarios y disertantes. */
  tradeName: 'Sanidapp',
  /** Crédito pequeño (no sustituye la personería comercial Sanidapp). */
  creditLine: 'Grproducciones by Gino Rotondaro',
  /** Canon sobre el monto bruto cobrado al alumno (sin descontar fees del procesador). */
  commissionPercent: 20,
  /** Contacto comercial / liquidaciones (Mercado Pago y acuerdos). */
  contactEmail: 'grproducciones2026@gmail.com',
  /**
   * Plazo para transferir el canon tras cobro externo (Argentina · Mercado Pago):
   * 3 días hábiles posteriores a la fecha de inicio del curso/congreso
   * (aunque el evento dure varias semanas).
   */
  externalSettlementBusinessDays: 3,
} as const;
