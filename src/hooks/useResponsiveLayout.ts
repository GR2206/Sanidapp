import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/** Ancho mínimo del lado corto para considerar tablet. */
export const TABLET_SHORT_SIDE = 600;

/** Ancho máximo del contenido en pantallas grandes. */
export const CONTENT_MAX_WIDTH = 720;

/** Columna principal en inicio (teléfono/tablet). */
export const HOME_CONTENT_MAX_WIDTH = 560;

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const shortSide = Math.min(width, height);
    const longSide = Math.max(width, height);
    const isLandscape = width > height;
    const isTablet = shortSide >= TABLET_SHORT_SIDE;
    const contentMaxWidth = Math.min(width, CONTENT_MAX_WIDTH);

    return {
      width,
      height,
      shortSide,
      longSide,
      isLandscape,
      isTablet,
      contentMaxWidth,
    };
  }, [width, height]);
}
