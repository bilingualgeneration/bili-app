import { FC, ReactNode } from "react";
import {
  AuthProvider,
  FirestoreProvider,
  FunctionsProvider,
  useFirebaseApp,
} from "reactfire";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const FirebaseFeaturesWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
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
