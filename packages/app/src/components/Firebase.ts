import {Capacitor} from '@capacitor/core';
import {initializeApp} from 'firebase/app';
import {
  connectDatabaseEmulator,
  getDatabase
} from 'firebase/database';
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import {
  connectFunctionsEmulator,
  getFunctions
} from 'firebase/functions';
import {
  connectAuthEmulator,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
});

export const getFirebaseAuth: any = () => {
  if(Capacitor.isNativePlatform()){
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  }else{
    return getAuth();
  }
}

export const auth = getFirebaseAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app);

if(import.meta.env.VITE_ENVIRONMENT === 'emulator'){
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectDatabaseEmulator(database, 'localhost', 9000)
  connectFirestoreEmulator(firestore, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export default app;
