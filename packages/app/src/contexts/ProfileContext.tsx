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

export type profile = {
  [key: string]: any;
};

const defaultState: profile = {};

const ProfileContext = createContext<profile>(defaultState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const firestore = useFirestore();
  const user = useUser();
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
            uid: user.data!.uid,
          }
        }
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};
