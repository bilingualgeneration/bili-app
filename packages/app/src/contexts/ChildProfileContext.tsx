import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { collection, where, query } from "firebase/firestore";
import { useProfile } from "@/contexts/ProfileContext";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export type childProfile = {
  [key: string]: any;
};

const defaultState: childProfile = {};

const ChildProfileContext = createContext<childProfile>(defaultState);

export const useChildProfile = () => useContext(ChildProfileContext);

export const ChildProfileContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const firestore = useFirestore();
  const [activeChildProfile, internalSetActiveChildProfile] =
    useState<childProfile>();
  const { uid } = useProfile();
  const ref = query(
    collection(firestore, "users"),
    where("parentId", "==", uid),
  );
  const { status, data } = useFirestoreCollectionData(ref);
  useEffect(() => {
    if (data && activeChildProfile === undefined) {
      // todo: save active child
      internalSetActiveChildProfile({
        ...data[0],
        uid: data[0].NO_ID_FIELD,
      });
    }
  }, [data]);
  if (status === "loading" || activeChildProfile === undefined) {
    return <></>;
  }
  return (
    <>
      <ChildProfileContext.Provider
        value={
          // @ts-ignore: todo fix
          {
            childProfiles: data.map((d: any) => ({ uid: d.NO_ID_FIELD, ...d })),
            activeChildProfile,
            setActiveChildProfile: (uid: string) => {
              const selectedProfile: any = data.filter(
                (p: any) => p.NO_ID_FIELD === uid,
              )[0];
              internalSetActiveChildProfile({
                uid: selectedProfile.NO_ID_FIELD,
                ...selectedProfile,
              });
            },
          }
        }
      >
        {children}
      </ChildProfileContext.Provider>
    </>
  );
};
