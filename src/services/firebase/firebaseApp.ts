import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';

import {

  getAuth,

  getReactNativePersistence,

  initializeAuth,

  type Auth,

} from 'firebase/auth';

import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFunctions, type Functions } from 'firebase/functions';

import { Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



import { FIREBASE_CONFIG, isFirebaseConfigured } from '@/constants/firebase';



let app: FirebaseApp | null = null;

let auth: Auth | null = null;

let db: Firestore | null = null;
let functions: Functions | null = null;



export function getFirebaseApp(): FirebaseApp | null {

  if (!isFirebaseConfigured()) {

    return null;

  }



  if (!app) {

    app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG);

  }



  return app;

}



export function getFirebaseAuth(): Auth | null {

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {

    return null;

  }



  if (!auth) {

    if (Platform.OS === 'web') {

      auth = getAuth(firebaseApp);

    } else {

      try {

        auth = initializeAuth(firebaseApp, {

          persistence: getReactNativePersistence(AsyncStorage),

        });

      } catch {

        auth = getAuth(firebaseApp);

      }

    }

  }



  return auth;

}



export function getFirestoreDb(): Firestore | null {

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {

    return null;

  }



  if (!db) {

    db = getFirestore(firebaseApp);

  }



  return db;

}

export function getFirebaseFunctions(): Functions | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) {
    return null;
  }

  if (!functions) {
    functions = getFunctions(firebaseApp);
  }

  return functions;
}

