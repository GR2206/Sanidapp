import { StyleSheet, View, type ViewProps } from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme/spacing';
import { AppWatermark } from '@/components/layout/AppWatermark';

type SafeEdges = Edge[];

interface ScreenContainerProps extends ViewProps {
  safe?: boolean;
  centered?: boolean;
  /** Sin color de fondo (p. ej. pantalla con imagen de fondo). */
  transparent?: boolean;
  /** Marca de agua Sanidapp detrás del contenido. */
  watermark?: boolean;
  /** Bordes con padding seguro. Por defecto: laterales e inferior (pantallas con cabecera). */
  edges?: SafeEdges;
}

const DEFAULT_EDGES: SafeEdges = ['left', 'right', 'bottom'];

export function ScreenContainer({
  children,
  safe = true,
  centered = false,
  transparent = false,
  watermark = true,
  edges = DEFAULT_EDGES,
  style,
  ...rest
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const { isTablet, contentMaxWidth } = useResponsiveLayout();
  const { colors } = useAppTheme();

  const safeStyle = safe
    ? {
        paddingTop: edges.includes('top') ? insets.top : 0,
        paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        paddingLeft: edges.includes('left') ? insets.left : 0,
        paddingRight: edges.includes('right') ? insets.right : 0,
      }
    : undefined;

  return (
    <View
      style={[
        styles.root,
        !transparent && { backgroundColor: colors.background },
        transparent && styles.rootTransparent,
        safeStyle,
      ]}>
      <View
        style={[
          styles.inner,
          isTablet && styles.innerTablet,
          isTablet && { maxWidth: contentMaxWidth },
          centered && styles.centered,
          style,
        ]}
        {...rest}>
        {watermark ? <AppWatermark /> : null}
        <View style={[styles.content, centered && styles.contentCentered]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootTransparent: {
    backgroundColor: 'transparent',
  },
  inner: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    position: 'relative',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  contentCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTablet: {
    alignSelf: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
