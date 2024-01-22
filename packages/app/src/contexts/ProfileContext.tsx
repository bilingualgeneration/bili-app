import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { doc } from "firebase/firestore";

import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { useLanguage } from "@/contexts/LanguageContext";

export type profile = {
  [key: string]: any;
};

const defaultState: profile = {};

const ProfileContext = createContext<profile>(defaultState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const firestore = useFirestore();
  const user = useUser();
  const { setLocale } = useLanguage();
  const ref = doc(firestore, "users", user.data!.uid);
  const { status, data: profileData } = useFirestoreDocData(ref);
  useEffect(() => {
    if (profileData) {
      setLocale(profileData.language || "es");
    }
  }, [profileData]);
  if (status === "loading") {
    return <></>;
  }
  return (
    <>
      <ProfileContext.Provider
        value={
          // @ts-ignore: todo fix
          {
            ...profileData,
            uid: user.data!.uid,
          }
        }
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};
