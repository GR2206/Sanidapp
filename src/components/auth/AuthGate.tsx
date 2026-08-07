import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { palette } from '@/theme/colors';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthenticated, firebaseEnabled } = useAuth();

  if (!firebaseEnabled) {
    return children;
  }

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={palette.accent} size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.login} />;
  }

  return children;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background,
  },
});
