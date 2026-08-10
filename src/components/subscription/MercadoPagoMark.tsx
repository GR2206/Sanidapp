import { Image } from 'expo-image';

type MarkProps = {
  size?: number;
};

/**
 * Logo Mercado Pago (PNG): chip blanco + handshake azul oscuro.
 * Visible sobre el botón celeste oficial (#009EE3).
 */
export function MercadoPagoMark({ size = 22 }: MarkProps) {
  return (
    <Image
      source={require('../../../assets/images/mercado-pago-mark.png')}
      style={{ width: size, height: size }}
      contentFit="contain"
      accessibilityIgnoresInvertColors
    />
  );
}
