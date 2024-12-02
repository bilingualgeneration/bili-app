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

type ProfileState = any;

const ProfileContext = createContext<ProfileState>({} as ProfileState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(undefined);
  const [activeClassroom, setActiveClassroom] = useState<string | null>(null);
  const userRef = useRef<any>(user);
  const [profile, setProfile] = useState<any>(undefined);
  const profileUnsubscribe = useRef<Unsubscribe | null>();
  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (userState) => {
      if (userState && userRef.current === null) {
        // logging in
        setProfile(undefined);
      }
      setUser(userState);
      setJustLoggedIn(true);
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
    setUser(undefined);
    userRef.current = undefined;
    signOut(auth).then(() => {});
  };

  const isLoading = user === undefined || profile === undefined;
  return (
    <ProfileContext.Provider
      children={children}
      value={{
        isLoading,
        isLoggedIn: user !== undefined && user !== null,
        justLoggedIn,
        setJustLoggedIn,
        profile,
        signout,
        user,
      }}
    />
  );
};
