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
  const [activeChildProfile, setActiveChildProfile] = useState<number>(0);
  const { uid } = useProfile();
  const ref = query(
    collection(firestore, "users"),
    where("parentId", "==", uid),
  );
  const { status, data } = useFirestoreCollectionData(ref);
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
            setActiveChildProfile,
          }
        }
      >
        {children}
      </ChildProfileContext.Provider>
    </>
  );
};
