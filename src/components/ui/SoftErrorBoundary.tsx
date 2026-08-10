import type { ReactNode } from 'react';
import { Component } from 'react';
import { View } from 'react-native';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

/** Evita que un fallo de UI secundaria tumbe toda la app. */
export class SoftErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('SoftErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <View />;
    }
    return this.props.children;
  }
}
