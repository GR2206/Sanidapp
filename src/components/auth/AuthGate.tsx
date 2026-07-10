import { Redirect } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthenticated, firebaseEnabled } = useAuth();

  if (!firebaseEnabled) {
    return children;
  }

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.login} />;
  }

  return children;
}
