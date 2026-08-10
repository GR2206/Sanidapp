import { loadLocalSanatorios } from '@/services/sanatorios/localSanatorioCatalog';
import { registrationRequiresSanatorio } from '@/constants/registration';
import { i18nError } from '@/i18n/resolveMessage';
import type { RegisterInput, UserProfile, UserRole } from '@/types/auth';
import type { UserSubscriptionFields } from '@/types/subscription';
import type { Sanatorio } from '@/types/sanatorio';
import { FIRESTORE_PATHS } from '@/constants/firebase';
import { validateStaffRegistration } from '@/services/content/staffAllowlistService';
import { syncAllowlistPremiumForUser } from '@/services/subscription/subscriptionAuthService';
import {
  applyDefaultSubscription,
  resolveAccessTierForRole,
  subscriptionFromFirestore,
} from '@/services/subscription/subscriptionService';
import { getFirestoreDb, getFirebaseAuth, getFirebaseFunctions } from '@/services/firebase/firebaseApp';
import {
  clearCachedUserProfile,
  readCachedUserProfile,
  writeCachedUserProfile,
} from '@/services/firebase/userProfileCache';
import { countryFromSanatorioRegion, normalizeCountryCode } from '@/utils/country';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
  type ActionCodeSettings,
  type AuthError,
  type User,
} from 'firebase/auth';
import { getPasswordResetHandlerUrl } from '@/services/auth/passwordResetLinks';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from 'firebase/firestore';

const PROFILE_FETCH_TIMEOUT_MS = 3500;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export function getLocalSanatorios(): Sanatorio[] {
  return loadLocalSanatorios();
}

export function getLocalSanatorio(sanatorioId: string): Sanatorio | null {
  return loadLocalSanatorios().find((item) => item.id === sanatorioId) ?? null;
}

function profileFromSnapshot(uid: string, data: DocumentData): UserProfile {
  const role = (data.role as UserRole) ?? 'user';
  const subscription = subscriptionFromFirestore(data as Record<string, unknown>);

  return {
    uid,
    email: String(data.email ?? ''),
    nombre: String(data.nombre ?? ''),
    apellido: String(data.apellido ?? ''),
    profesion: String(data.profesion ?? ''),
    sanatorioId: String(data.sanatorioId ?? ''),
    sanatorioName: String(data.sanatorioName ?? ''),
    countryCode: String(data.countryCode ?? ''),
    role,
    accessTier: resolveAccessTierForRole(role, subscription),
    institutionToken: subscription.institutionToken,
    premiumSource: subscription.premiumSource,
    premiumGrantedAt: subscription.premiumGrantedAt,
    canPublishFeeds: Boolean(data.canPublishFeeds),
    stripeConnectAccountId: String(data.stripeConnectAccountId ?? '').trim(),
    stripeConnectChargesEnabled: Boolean(data.stripeConnectChargesEnabled),
    stripeConnectCountry: String(data.stripeConnectCountry ?? '').trim(),
    avatarUrl: String(data.avatarUrl ?? '').trim(),
    publicId: String(data.publicId ?? '').trim().toUpperCase(),
    createdAt: String(data.createdAt ?? ''),
    updatedAt: String(data.updatedAt ?? ''),
  };
}

function getBootstrapAdminUids(): string[] {
  const raw = process.env.EXPO_PUBLIC_ADMIN_UIDS ?? '';
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatAuthError(error: AuthError, context: 'login' | 'register'): Error {
  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      if (context === 'register') {
        return i18nError('auth.errors.emailInUseRegister');
      }
      return i18nError('auth.errors.invalidCredential');
    case 'auth/email-already-in-use':
      return i18nError('auth.errors.emailInUse');
    case 'auth/user-not-found':
      return i18nError('auth.errors.userNotFound');
    case 'auth/too-many-requests':
      return i18nError('auth.errors.tooManyRequests');
    case 'auth/invalid-email':
      return i18nError('auth.errors.invalidEmail');
    case 'auth/weak-password':
      return i18nError('auth.errors.weakPassword');
    default:
      return i18nError('auth.errors.authFailed');
  }
}

async function isAdminUid(uid: string): Promise<boolean> {
  if (getBootstrapAdminUids().includes(uid)) {
    return true;
  }

  const db = getFirestoreDb();
  if (!db) {
    return false;
  }

  try {
    const adminDoc = await getDoc(doc(db, ...FIRESTORE_PATHS.configAdmins()));
    if (!adminDoc.exists()) {
      return false;
    }

    const adminUids = (adminDoc.data().uids as string[] | undefined) ?? [];
    return adminUids.includes(uid);
  } catch {
    return false;
  }
}

async function ensureBootstrapAdminRegistry(uid: string): Promise<void> {
  if (!getBootstrapAdminUids().includes(uid)) {
    return;
  }

  const functions = getFirebaseFunctions();
  if (!functions) {
    return;
  }

  try {
    const { httpsCallable } = await import('firebase/functions');
    const bootstrap = httpsCallable(functions, 'bootstrapFirstAdmin');
    await bootstrap({});
  } catch (error) {
    console.warn('No se pudo registrar el admin bootstrap vía Cloud Function:', error);
  }
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirestoreDb();
  if (!db) {
    return null;
  }

  // Solo el doc de usuario en el camino crítico (admin remoto se resuelve después).
  const userDoc = await getDoc(doc(db, ...FIRESTORE_PATHS.usuario(uid)));
  if (!userDoc.exists()) {
    return null;
  }

  const profile = profileFromSnapshot(uid, userDoc.data());
  if (getBootstrapAdminUids().includes(uid)) {
    void ensureBootstrapAdminRegistry(uid);
    return {
      ...profile,
      role: 'admin',
      accessTier: 'premium',
    };
  }

  return profile;
}

async function maybeUpgradeAdminRole(profile: UserProfile): Promise<UserProfile> {
  if (profile.role === 'admin') {
    return profile;
  }
  if (!(await isAdminUid(profile.uid))) {
    return profile;
  }

  void ensureBootstrapAdminRegistry(profile.uid);

  const upgraded: UserProfile = {
    ...profile,
    role: 'admin',
    accessTier: 'premium',
  };

  // Persistir para que syncAllowlist / redeem no vuelvan a bajar el rol.
  const db = getFirestoreDb();
  if (db) {
    void setDoc(
      doc(db, ...FIRESTORE_PATHS.usuario(profile.uid)),
      {
        role: 'admin',
        accessTier: 'premium',
        premiumSource: profile.premiumSource || 'admin',
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    ).catch((error) => {
      console.warn('No se pudo persistir rol admin en el perfil:', error);
    });
  }

  return upgraded;
}

async function maybeSyncAllowlistPremium(profile: UserProfile): Promise<UserProfile> {
  if (profile.accessTier === 'premium') {
    return profile;
  }

  try {
    return await syncAllowlistPremiumForUser(profile);
  } catch (error) {
    console.warn('No se pudo sincronizar premium con el padrón:', error);
    return profile;
  }
}

export async function resolveUserProfile(uid: string): Promise<UserProfile | null> {
  const profile = await fetchUserProfile(uid);
  if (!profile) {
    return null;
  }

  return maybeSyncAllowlistPremium(profile);
}

async function upsertUserProfile(
  uid: string,
  input: RegisterInput,
  options: { profesion: string; role: UserRole; subscription?: UserSubscriptionFields },
): Promise<UserProfile> {
  const db = getFirestoreDb();

  if (!db) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }

  const needsSanatorio = registrationRequiresSanatorio(input.registrationType);
  const sanatorio = needsSanatorio ? getLocalSanatorio(input.sanatorioId) : null;

  if (needsSanatorio && !sanatorio) {
    throw i18nError('auth.errors.invalidSanatorio');
  }

  const now = new Date().toISOString();
  const subscription = applyDefaultSubscription(options.subscription);
  const countryCode = normalizeCountryCode(
    input.countryCode ||
      (sanatorio
        ? countryFromSanatorioRegion(sanatorio.regionId, sanatorio.regionLabel)
        : ''),
  );

  const profile: UserProfile = {
    uid,
    email: input.email.trim().toLowerCase(),
    nombre: input.nombre.trim(),
    apellido: input.apellido.trim(),
    profesion: options.profesion.trim(),
    sanatorioId: sanatorio?.id ?? '',
    sanatorioName: sanatorio?.name ?? '',
    countryCode,
    role: options.role,
    accessTier: resolveAccessTierForRole(options.role, subscription),
    institutionToken: subscription.institutionToken,
    premiumSource: subscription.premiumSource,
    premiumGrantedAt: subscription.premiumGrantedAt,
    canPublishFeeds: false,
    stripeConnectAccountId: '',
    stripeConnectChargesEnabled: false,
    stripeConnectCountry: '',
    avatarUrl: '',
    publicId: '',
    createdAt: now,
    updatedAt: now,
  };

  const usuarioRef = doc(db, ...FIRESTORE_PATHS.usuario(uid));

  const firestorePayload = {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(usuarioRef, firestorePayload);

    if (sanatorio) {
      const sanatorioUsuarioRef = doc(db, ...FIRESTORE_PATHS.sanatorioUsuario(sanatorio.id, uid));
      await setDoc(sanatorioUsuarioRef, firestorePayload);
    }
  } catch (cause) {
    const code = (cause as { code?: string }).code;
    if (code === 'permission-denied') {
      throw i18nError('auth.errors.firestoreBlocked');
    }

    throw cause;
  }

  void writeCachedUserProfile(profile);
  return profile;
}

export async function registerUser(input: RegisterInput): Promise<UserProfile> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }

  const email = input.email.trim().toLowerCase();

  const registrationProfile =
    input.registrationType === 'institutional'
      ? await (async () => {
          // Obligatorio: debe figurar en el padrón del sanatorio (CSV/Gist).
          // Premium/supervisor se otorgan después vía Cloud Function (no desde el cliente).
          const staffMatch = await validateStaffRegistration(input.sanatorioId, {
            nombre: input.nombre,
            apellido: input.apellido,
            profesion: input.profesion,
          });

          return {
            profesion: staffMatch.profesion,
            role: 'user' as const,
            subscription: applyDefaultSubscription(),
          };
        })()
      : {
          profesion: input.profesion.trim(),
          role: 'user' as const,
          subscription: applyDefaultSubscription(),
        };

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, input.password);
    await credential.user.getIdToken(true);
    try {
      const created = await upsertUserProfile(
        credential.user.uid,
        { ...input, email },
        registrationProfile,
      );

      if (input.registrationType === 'institutional') {
        const synced = await maybeSyncAllowlistPremium(created);
        const refreshed = await fetchUserProfile(credential.user.uid);
        return refreshed ?? synced;
      }

      return created;
    } catch (profileError) {
      await deleteUser(credential.user);
      throw profileError;
    }
  } catch (cause) {
    const authError = cause as AuthError;
    if (authError.code === 'auth/email-already-in-use') {
      try {
        const credential = await signInWithEmailAndPassword(auth, email, input.password);
        await credential.user.getIdToken(true);
        const existing = await resolveUserProfile(credential.user.uid);
        if (existing) {
          return existing;
        }

        const created = await upsertUserProfile(
          credential.user.uid,
          { ...input, email },
          registrationProfile,
        );

        if (input.registrationType === 'institutional') {
          const synced = await maybeSyncAllowlistPremium(created);
          const refreshed = await fetchUserProfile(credential.user.uid);
          return refreshed ?? synced;
        }

        return created;
      } catch (recoveryError) {
        const recoveryAuth = recoveryError as AuthError;
        if (
          recoveryAuth.code === 'auth/invalid-credential' ||
          recoveryAuth.code === 'auth/wrong-password'
        ) {
          throw formatAuthError(recoveryAuth, 'register');
        }
        throw recoveryError;
      }
    }

    if (authError.code) {
      throw formatAuthError(authError, 'register');
    }

    throw cause;
  }
}

export async function loginUser(email: string, password: string): Promise<UserProfile> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }

  let credential;
  try {
    credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (cause) {
    const authError = cause as AuthError;
    if (authError.code) {
      throw formatAuthError(authError, 'login');
    }
    throw cause;
  }

  const profile = await resolveUserProfile(credential.user.uid);

  if (!profile) {
    throw i18nError('auth.errors.profileMissing');
  }

  void writeCachedUserProfile(profile);
  return profile;
}

export async function requestPasswordReset(email: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    throw i18nError('auth.errors.emailRequired');
  }

  const actionCodeSettings: ActionCodeSettings = {
    url: getPasswordResetHandlerUrl(),
    handleCodeInApp: true,
    android: {
      packageName: 'com.gr2206.sanidapp',
      installApp: true,
      minimumVersion: '1',
    },
    iOS: {
      bundleId: 'com.gr2206.sanidapp',
    },
  };

  try {
    await sendPasswordResetEmail(auth, normalizedEmail, actionCodeSettings);
  } catch (cause) {
    const authError = cause as AuthError;
    if (authError.code === 'auth/user-not-found') {
      throw i18nError('auth.errors.userNotFound');
    }
    if (authError.code === 'auth/invalid-continue-uri' || authError.code === 'auth/unauthorized-continue-uri') {
      throw i18nError('auth.errors.resetContinueUri');
    }
    if (authError.code) {
      throw formatAuthError(authError, 'login');
    }
    throw cause;
  }
}

/** Valida el código del mail y devuelve el email asociado. */
export async function verifyPasswordResetOobCode(oobCode: string): Promise<string> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }
  const code = oobCode.trim();
  if (!code) {
    throw i18nError('auth.errors.resetCodeInvalid');
  }
  try {
    return await verifyPasswordResetCode(auth, code);
  } catch {
    throw i18nError('auth.errors.resetCodeInvalid');
  }
}

/** Confirma la nueva contraseña con el código del mail. */
export async function completePasswordReset(oobCode: string, newPassword: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw i18nError('auth.errors.firebaseNotConfigured');
  }
  const code = oobCode.trim();
  const password = newPassword.trim();
  if (!code) {
    throw i18nError('auth.errors.resetCodeInvalid');
  }
  if (password.length < 6) {
    throw i18nError('auth.errors.weakPassword');
  }
  try {
    await confirmPasswordReset(auth, code, password);
  } catch (cause) {
    const authError = cause as AuthError;
    if (authError.code === 'auth/expired-action-code' || authError.code === 'auth/invalid-action-code') {
      throw i18nError('auth.errors.resetCodeInvalid');
    }
    if (authError.code === 'auth/weak-password') {
      throw i18nError('auth.errors.weakPassword');
    }
    if (authError.code) {
      throw formatAuthError(authError, 'login');
    }
    throw cause;
  }
}

export async function logoutUser(): Promise<void> {
  const auth = getFirebaseAuth();
  await clearCachedUserProfile();
  if (!auth) {
    return;
  }

  await signOut(auth);
}

export function subscribeAuthState(
  listener: (user: User | null, profile: UserProfile | null) => void,
): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    listener(null, null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      void clearCachedUserProfile();
      listener(null, null);
      return;
    }

    void (async () => {
      let cached: UserProfile | null = null;
      try {
        cached = await withTimeout(readCachedUserProfile(user.uid), 600);
      } catch {
        cached = null;
      }

      if (cached) {
        listener(user, cached);
      } else {
        // Desbloquea isReady ya (login redirige a home cuando llegue el perfil).
        listener(user, null);
      }

      let profile: UserProfile | null = null;
      try {
        profile = await withTimeout(fetchUserProfile(user.uid), PROFILE_FETCH_TIMEOUT_MS);
      } catch (error) {
        console.warn('Timeout/error al cargar perfil; se usa caché si hay:', error);
      }

      if (profile) {
        void writeCachedUserProfile(profile);
        listener(user, profile);

        void maybeUpgradeAdminRole(profile).then(async (withAdmin) => {
          let next = withAdmin;
          next = await maybeSyncAllowlistPremium(next);
          if (
            next.role !== profile!.role ||
            next.accessTier !== profile!.accessTier ||
            next.premiumSource !== profile!.premiumSource ||
            next.premiumGrantedAt !== profile!.premiumGrantedAt ||
            next.canPublishFeeds !== profile!.canPublishFeeds
          ) {
            void writeCachedUserProfile(next);
            listener(user, next);
          }
        });
      }
    })();
  });
}

export { redeemInstitutionTokenForUser } from '@/services/subscription/subscriptionAuthService';

export async function fetchRemoteSanatorios(): Promise<Sanatorio[]> {
  const db = getFirestoreDb();
  if (!db) {
    return getLocalSanatorios();
  }

  try {
    const snapshot = await getDocs(collection(db, ...FIRESTORE_PATHS.sanatorios()));
    if (snapshot.empty) {
      return getLocalSanatorios();
    }

    return snapshot.docs.map((item) => item.data() as Sanatorio);
  } catch {
    return getLocalSanatorios();
  }
}
