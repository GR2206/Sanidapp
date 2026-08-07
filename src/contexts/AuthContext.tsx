import { router } from 'expo-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { ROUTES } from '@/constants/routes';
import { isFirebaseConfigured } from '@/constants/firebase';
import type { RegisterInput, UserProfile } from '@/types/auth';
import type { AccessTier } from '@/types/subscription';
import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  redeemInstitutionTokenForUser,
  subscribeAuthState,
  resolveUserProfile,
} from '@/services/firebase/authService';
import { getFirebaseAuth } from '@/services/firebase/firebaseApp';
import { i18nError } from '@/i18n/resolveMessage';
import { resolvePostAuthHref } from '@/services/meeting/meetingDeepLink';
import { hasPremiumAccess } from '@/services/subscription/subscriptionService';

interface AuthContextValue {
  isReady: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSupervisor: boolean;
  isPremium: boolean;
  accessTier: AccessTier;
  /** Supervisor/a del sanatorio activo (no incluye admin). */
  canManageForo: boolean;
  profile: UserProfile | null;
  firebaseEnabled: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  redeemInstitutionToken: (token: string, sanatorioId?: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(!isFirebaseConfigured());
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const firebaseEnabled = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseEnabled) {
      setIsReady(true);
      return;
    }

    const unsubscribe = subscribeAuthState((_user, nextProfile) => {
      setProfile(nextProfile);
      setIsReady(true);
    });

    // Si Firebase/Firestore no responde, igual desbloqueamos la UI.
    const failsafe = setTimeout(() => {
      setIsReady(true);
    }, 2500);

    return () => {
      unsubscribe();
      clearTimeout(failsafe);
    };
  }, [firebaseEnabled]);

  // Asigna ID público único la primera vez (búsqueda / invitaciones a salas).
  useEffect(() => {
    if (!firebaseEnabled || !profile?.uid || profile.publicId) {
      return;
    }
    let cancelled = false;
    void import('@/services/meeting/publicUserService')
      .then(({ ensureMyPublicId }) => ensureMyPublicId())
      .then(async (publicId) => {
        if (cancelled || !publicId) return;
        const next = await resolveUserProfile(profile.uid);
        if (!cancelled) setProfile(next);
      })
      .catch((error) => {
        console.warn('No se pudo asignar ID público:', error);
      });
    return () => {
      cancelled = true;
    };
  }, [firebaseEnabled, profile?.publicId, profile?.uid]);

  const login = useCallback(async (email: string, password: string) => {
    const nextProfile = await loginUser(email, password);
    setProfile(nextProfile);
    router.replace(await resolvePostAuthHref(ROUTES.home as never));
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const nextProfile = await registerUser(input);
    setProfile(nextProfile);
    const fallback = input.registrationType === 'premium' ? ROUTES.upgrade : ROUTES.home;
    router.replace(await resolvePostAuthHref(fallback as never));
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await requestPasswordReset(email);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setProfile(null);
    router.replace(ROUTES.login);
  }, []);

  const refreshProfile = useCallback(async () => {
    const auth = getFirebaseAuth();
    const uid = auth?.currentUser?.uid;
    if (!uid) {
      return;
    }

    const nextProfile = await resolveUserProfile(uid);
    setProfile(nextProfile);
  }, []);

  const redeemInstitutionToken = useCallback(
    async (token: string, sanatorioId?: string) => {
      if (!profile) {
        throw i18nError('subscription.errors.loginRequiredForToken');
      }

      const nextProfile = await redeemInstitutionTokenForUser(profile, token, sanatorioId);
      setProfile(nextProfile);
      await refreshProfile();
    },
    [profile, refreshProfile],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isReady,
      isAuthenticated: Boolean(profile),
      isAdmin: profile?.role === 'admin',
      isSupervisor: profile?.role === 'supervisor' && Boolean(profile?.sanatorioId),
      isPremium: hasPremiumAccess(profile),
      accessTier: profile?.accessTier ?? 'free',
      canManageForo: profile?.role === 'supervisor' && Boolean(profile?.sanatorioId),
      profile,
      firebaseEnabled,
      login,
      register,
      resetPassword,
      redeemInstitutionToken,
      refreshProfile,
      logout,
    }),
    [firebaseEnabled, isReady, login, logout, profile, redeemInstitutionToken, refreshProfile, register, resetPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
