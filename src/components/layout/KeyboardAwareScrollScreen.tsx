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

function visibleAreaBottom(extraGap: number): number {
  const windowHeight = Dimensions.get('window').height;
  const keyboardHeight = Keyboard.metrics()?.height ?? 0;

  if (Platform.OS === 'android') {
    return windowHeight - extraGap;
  }

  return windowHeight - keyboardHeight - extraGap;
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
  const bottomPadding = keyboardHeight + spacing.xxxl * 2;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={isKeyboardOpen ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? spacing.sm : spacing.md}>
      <ScrollView
        ref={scrollRef}
        {...scrollProps}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          scrollYRef.current = event.nativeEvent.contentOffset.y;
          scrollProps?.onScroll?.(event);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.content,
          centerWhenIdle && !isKeyboardOpen ? styles.centered : null,
          { paddingBottom: isKeyboardOpen ? bottomPadding : spacing.xl },
          contentContainerStyle,
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
      const visibleBottom = visibleAreaBottom(extraGap);
      const fieldBottom = y + height;

      if (fieldBottom <= visibleBottom) {
        return;
      }

      const overlap = fieldBottom - visibleBottom + spacing.md;
      scrollRef.current?.scrollTo({
        y: scrollYRef.current + overlap,
        animated: true,
      });
    });
  };

  requestAnimationFrame(runScroll);

  if (Platform.OS === 'android') {
    setTimeout(runScroll, 120);
    setTimeout(runScroll, 300);
  } else {
    setTimeout(runScroll, 100);
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
