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
  const [uid, setUid] = useState<string>("NULL");
  const { setLocale } = useLanguage();
  const ref = doc(firestore, "users", uid);
  const { status, data: profileData } = useFirestoreDocData(ref);

  useEffect(() => {
    if (profileData) {
      setLocale(profileData.language || "es");
    }
  }, [profileData]);
  if (uid === "NULL") {
    return <></>;
  }
  return (
    <>
      <ProfileContext.Provider
        value={
          // @ts-ignore: todo fix
          {
            ...profileData,
            uid,
          }
        }
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};
