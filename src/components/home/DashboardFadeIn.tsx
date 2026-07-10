import { type ReactNode } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface DashboardFadeInProps {
  children: ReactNode;
  index?: number;
}

export function DashboardFadeIn({ children, index = 0 }: DashboardFadeInProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(340).delay(index * 55).springify().damping(18)}>
      {children}
    </Animated.View>
  );
}
