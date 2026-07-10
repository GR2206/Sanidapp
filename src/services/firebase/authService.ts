import rosarioCatalog from '../../../content/sanatorios/rosario.json';
import { registrationRequiresSanatorio } from '@/constants/registration';
import { i18nError } from '@/i18n/resolveMessage';
import type { RegisterInput, UserProfile, UserRole } from '@/types/auth';
import type { UserSubscriptionFields } from '@/types/subscription';
import type { Sanatorio, SanatorioCatalog } from '@/types/sanatorio';
import { FIRESTORE_PATHS } from '@/constants/firebase';
import { matchStaffRegistration } from '@/services/content/staffAllowlistService';
import { syncAllowlistPremiumForUser } from '@/services/subscription/subscriptionAuthService';
import {
  applyDefaultSubscription,
  buildAllowlistPremiumGrant,
  resolveAccessTierForRole,
  subscriptionFromFirestore,
} from '@/services/subscription/subscriptionService';
import { getFirestoreDb, getFirebaseAuth } from '@/services/firebase/firebaseApp';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type AuthError,
  type User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from 'firebase/firestore';

const LOCAL_CATALOG = rosarioCatalog as SanatorioCatalog;

export function getLocalSanatorios(): Sanatorio[] {
  return LOCAL_CATALOG.sanatorios;
}

export function getLocalSanatorio(sanatorioId: string): Sanatorio | null {
  return LOCAL_CATALOG.sanatorios.find((item) => item.id === sanatorioId) ?? null;
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
    role,
    accessTier: resolveAccessTierForRole(role, subscription),
    institutionToken: subscription.institutionToken,
    premiumSource: subscription.premiumSource,
    premiumGrantedAt: subscription.premiumGrantedAt,
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

  const db = getFirestoreDb();
  if (!db) {
    return;
  }

  const ref = doc(db, ...FIRESTORE_PATHS.configAdmins());

  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return;
    }

    await setDoc(ref, { uids: [uid] });
  } catch (error) {
    console.warn('No se pudo registrar el admin bootstrap en Firestore:', error);
  }
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirestoreDb();
  if (!db) {
    return null;
  }

  const userDoc = await getDoc(doc(db, ...FIRESTORE_PATHS.usuario(uid)));
  if (!userDoc.exists()) {
    return null;
  }

  const profile = profileFromSnapshot(uid, userDoc.data());
  if (await isAdminUid(uid)) {
    void ensureBootstrapAdminRegistry(uid);
    return {
      ...profile,
      role: 'admin',
      accessTier: 'premium',
    };
  }

  return profile;
}

async function maybeSyncAllowlistPremium(profile: UserProfile): Promise<UserProfile> {
  if (profile.accessTier === 'premium' || !profile.sanatorioId) {
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

  const profile: UserProfile = {
    uid,
    email: input.email.trim().toLowerCase(),
    nombre: input.nombre.trim(),
    apellido: input.apellido.trim(),
    profesion: options.profesion.trim(),
    sanatorioId: sanatorio?.id ?? '',
    sanatorioName: sanatorio?.name ?? '',
    role: options.role,
    accessTier: resolveAccessTierForRole(options.role, subscription),
    institutionToken: subscription.institutionToken,
    premiumSource: subscription.premiumSource,
    premiumGrantedAt: subscription.premiumGrantedAt,
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
          const staffMatch = await matchStaffRegistration(input.sanatorioId, {
            nombre: input.nombre,
            apellido: input.apellido,
            profesion: input.profesion,
          });

          if (staffMatch) {
            return {
              profesion: staffMatch.profesion,
              role: staffMatch.role,
              subscription: buildAllowlistPremiumGrant(),
            };
          }

          return {
            profesion: input.profesion.trim(),
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
      return await upsertUserProfile(credential.user.uid, { ...input, email }, registrationProfile);
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

        return upsertUserProfile(credential.user.uid, { ...input, email }, registrationProfile);
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

  try {
    await sendPasswordResetEmail(auth, normalizedEmail);
  } catch (cause) {
    const authError = cause as AuthError;
    if (authError.code === 'auth/user-not-found') {
      throw i18nError('auth.errors.userNotFound');
    }
    if (authError.code) {
      throw formatAuthError(authError, 'login');
    }
    throw cause;
  }
}

export async function logoutUser(): Promise<void> {
  const auth = getFirebaseAuth();
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

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      listener(null, null);
      return;
    }

    const profile = await resolveUserProfile(user.uid);
    listener(user, profile);
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
