/** Precio PREMIUM mostrado en UI (USD). El backend cobra USD 12 o ARS al tipo MP. */
export const MERCADO_PAGO_PREMIUM_PRICE_USD = Number(
  process.env.EXPO_PUBLIC_MERCADO_PAGO_PREMIUM_PRICE_USD ?? '12',
);

/** Debe coincidir con `title` de la preferencia en functions/mercadoPago.js */
export const MERCADO_PAGO_PREMIUM_TITLE = 'Sanidapp Plan PREMIUM';

/** Detalle que ve el usuario en la app antes de abrir Checkout Pro. */
export const MERCADO_PAGO_PREMIUM_DETAIL =
  'Incluye pediatría, neonatología, farmacología, patologías, protocolos y cálculos clínicos. Acceso personal; sin sanatorio hasta que ingreses un token institucional.';
