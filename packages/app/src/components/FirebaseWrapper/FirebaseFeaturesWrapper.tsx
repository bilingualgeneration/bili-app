import { FC, useEffect, ReactNode } from "react";
import {
  AuthProvider,
  FirestoreProvider,
  FunctionsProvider,
  useFirebaseApp,
} from "reactfire";
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { Capacitor } from "@capacitor/core";
import { getApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const FirebaseFeaturesWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const app = useFirebaseApp();

  const auth = Capacitor.isNativePlatform()
    ? initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
      })
    : getAuth();
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  if (import.meta.env.VITE_FIREBASE_ENVIRONMENT === "local") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
  }
  return (
    <>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>
        </FirestoreProvider>
      </AuthProvider>
    </>
  );
};
