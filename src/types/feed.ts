export type FeedKind = 'cursos' | 'congresos';

/** Público mundial vs privado del sanatorio del usuario. */
export type FeedAudience = 'public' | 'institution';

export type FeedModalidad = 'presencial' | 'online' | 'presencial_online';

/** Cobro: externo (link) por defecto; in_app = intermediación Sanidapp (canon 20%). */
export type FeedPaymentMode = 'external' | 'in_app';

/** Moneda del cobro in-app: ARS→Mercado Pago; EUR/USD→Stripe Connect. */
export type FeedPaymentCurrency = 'ARS' | 'EUR' | 'USD';

export interface FeedItem {
  id: string;
  title: string;
  subtitle?: string;
  /** Leyenda breve bajo el título / sobre la imagen. */
  caption?: string;
  date?: string;
  location?: string;
  /** Imagen de la tarjeta (URL pública https). */
  imageUrl?: string;
  /** URL al tocar la tarjeta o el enlace (p. ej. inscripción). */
  url?: string;
  /** Texto del hipervínculo editable (si falta, se usa “Ver más”). */
  linkLabel?: string;
  body?: string;
  /** Cupos disponibles / totales (texto libre, p. ej. "30" o "20/30"). */
  cupos?: string;
  /** Precio (texto libre, p. ej. "Gratis", "$15.000", "20 EUR"). */
  precio?: string;
  modalidad?: FeedModalidad | string;
  /** Fecha u hora de finalización. */
  finaliza?: string;
  /** Duración (p. ej. "8 horas", "2 días"). */
  duracion?: string;
  /** Página web o dirección del disertante. */
  speakerPage?: string;
  /** Idioma del curso/congreso (código o etiqueta, p. ej. es, en, pt). */
  idioma?: string;
  /** Zona horaria IANA (p. ej. America/Argentina/Buenos_Aires). */
  zonaHoraria?: string;
  /**
   * Cómo se cobra:
   * - external: inscripción/pago fuera de la app (link)
   * - in_app: cobro intermediado por Sanidapp (canon 20%)
   */
  paymentMode?: FeedPaymentMode;
  /** Moneda del cobro in-app (ARS Mercado Pago · EUR/USD Stripe). */
  paymentCurrency?: FeedPaymentCurrency;
  /** Titular declarado de la cuenta destino (debe coincidir con el CBU/CVU). */
  payeeNombre?: string;
  payeeApellido?: string;
  /** CBU o CVU (22 dígitos) del Prestador del contenido (solo ARS). */
  payeeCbuCvu?: string;
  /** Cuenta Stripe Connect Express del organizador (EUR/USD). */
  stripeConnectAccountId?: string;
  /** ISO de aceptación de términos de cobro en app. */
  paymentTermsAcceptedAt?: string;
  /** Alcance persistido en Firestore (para checkout). */
  scopeType?: 'global' | 'sanatorio';
  /** Sanatorio del feed privado (si scopeType = sanatorio). */
  sanatorioId?: string | null;
  /**
   * Sanatorio organizador cuando la publicación es pública (global).
   * Sirve para inscripción gratuita del personal interno.
   */
  organizerSanatorioId?: string | null;
  organizerSanatorioName?: string | null;
}

export interface FeedPage {
  version: string;
  updatedAt?: string;
  title: string;
  intro?: string;
  items: FeedItem[];
}

export interface GistFeedConfig {
  user: string;
  gistId: string;
  filename: string;
}

export interface GistConfig {
  cursos: GistFeedConfig;
  congresos: GistFeedConfig;
}

/** Alcance de publicación: free global (admin) o un sanatorio. */
export type FeedPublishScope =
  | { type: 'global' }
  | { type: 'sanatorio'; sanatorioId: string };
