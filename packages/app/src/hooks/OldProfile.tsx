import { auth, firestore } from "@/components/Firebase";
import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

type OldProfileState = any;

const OldProfileContext = createContext<OldProfileState>({} as OldProfileState);

export const useOldProfile = () => useContext(OldProfileContext);

export const OldProfileProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(undefined);
  const userRef = useRef<any>(user);
  const [profile, setProfile] = useState<any>(undefined);
  const profileUnsubscribe = useRef<Unsubscribe | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (userState) => {
      if (userState && userRef.current === null) {
        // logging in
        setProfile(undefined);
      }
      setUser(userState);
      userRef.current = userState;
    });
  }, []);

  useEffect(() => {
    if (user) {
      // get profile
      const userDoc = doc(firestore, "user", user.uid);
      const unsub = onSnapshot(userDoc, (d) => {
        const data = d.data();
        if (data) {
          setProfile(data);
        }
      });
      profileUnsubscribe.current = unsub;
    } else {
      if (user !== undefined) {
        if (profileUnsubscribe.current) {
          profileUnsubscribe.current();
        }
        setProfile(null);
        profileUnsubscribe.current = null;
      }
    }
  }, [user]);

  const signout = () => {
    setUser(null);
    userRef.current = null;
    signOut(auth).then(() => {});
  };
  const isLoading = user === undefined || profile === undefined;

  return (
    <OldProfileContext.Provider
      children={children}
      value={{
        isLoading,
        isLoggedIn: user !== undefined && user !== null,
        profile,
        signout,
        user,
      }}
    />
  );
};
