import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { spacing } from '@/theme/spacing';

interface KeyboardAwareScrollScreenProps {
  children: ReactNode;
  centerWhenIdle?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollRef?: RefObject<ScrollView | null>;
  scrollYRef?: RefObject<number>;
  scrollProps?: Omit<ScrollViewProps, 'children' | 'contentContainerStyle' | 'ref'>;
}

export function KeyboardAwareScrollScreen({
  children,
  centerWhenIdle = false,
  contentContainerStyle,
  scrollRef: scrollRefProp,
  scrollYRef: scrollYRefProp,
  scrollProps,
}: KeyboardAwareScrollScreenProps) {
  const internalScrollRef = useRef<ScrollView>(null);
  const internalScrollYRef = useRef(0);
  const scrollRef = scrollRefProp ?? internalScrollRef;
  const scrollYRef = scrollYRefProp ?? internalScrollYRef;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const isKeyboardOpen = keyboardHeight > 0;
  // Android usa softwareKeyboardLayoutMode "resize": la ventana ya se achica.
  // iOS necesita padding extra con la altura del teclado.
  const bottomPadding = isKeyboardOpen
    ? Platform.OS === 'ios'
      ? keyboardHeight + spacing.xxl + spacing.lg
      : spacing.xxl + spacing.xl
    : spacing.xl;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? spacing.xl : 0}>
      <ScrollView
        ref={scrollRef}
        {...scrollProps}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollYRef.current = event.nativeEvent.contentOffset.y;
          scrollProps?.onScroll?.(event);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          centerWhenIdle && !isKeyboardOpen ? styles.centered : null,
          contentContainerStyle,
          // Debe ir al final: el padding inferior del teclado no puede pisarse.
          { paddingBottom: isKeyboardOpen ? bottomPadding : undefined },
          !isKeyboardOpen && !contentContainerStyle ? { paddingBottom: spacing.xl } : null,
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function scrollAuthFieldIntoView(
  scrollRef: RefObject<ScrollView | null>,
  scrollYRef: RefObject<number>,
  fieldRef: RefObject<View | null>,
  extraGap: number = spacing.lg,
) {
  const runScroll = () => {
    const field = fieldRef.current;
    if (!field) {
      return;
    }

    field.measureInWindow((_x, y, _width, height) => {
      const windowHeight = Dimensions.get('window').height;
      // En Android con resize, windowHeight ya excluye el teclado.
      const keyboardInset =
        Platform.OS === 'ios' ? (Keyboard.metrics()?.height ?? 0) : 0;
      const visibleBottom = windowHeight - keyboardInset - extraGap;
      const fieldBottom = y + height;

      if (fieldBottom <= visibleBottom) {
        return;
      }

      const overlap = fieldBottom - visibleBottom + spacing.md;
      scrollRef.current?.scrollTo({
        y: Math.max(0, scrollYRef.current + overlap),
        animated: true,
      });
    });
  };

  requestAnimationFrame(runScroll);

  if (Platform.OS === 'android') {
    setTimeout(runScroll, 120);
    setTimeout(runScroll, 280);
    setTimeout(runScroll, 420);
  } else {
    setTimeout(runScroll, 80);
    setTimeout(runScroll, 200);
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  centered: {
    justifyContent: 'center',
  },
});
