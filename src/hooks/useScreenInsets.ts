import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/theme/spacing';

/** Insets del sistema + margen mínimo para listas y scroll. */
export function useScreenInsets() {
  const insets = useSafeAreaInsets();

  return {
    insets,
    /** Padding inferior cuando el contenedor ya aplica el inset del sistema. */
    scrollPaddingBottom: spacing.xl,
    /** Padding inferior cuando el scroll llega hasta el borde de la pantalla. */
    contentPaddingBottom: insets.bottom + spacing.xl,
  };
}
