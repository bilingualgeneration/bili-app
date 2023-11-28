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

export type profile = {};

const defaultState: profile = {};

const ProfileContext = createContext<profile>(defaultState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const firestore = useFirestore();
  const { locale, setLocale } = useLanguage();
  const user = useUser();
  if (locale === "en") {
    setLocale("es");
  }
  const ref = doc(firestore, "users", user.data!.uid);
  const { status, data: profileData } = useFirestoreDocData(ref);
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
          }
        }
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};
