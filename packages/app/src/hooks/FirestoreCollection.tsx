import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/components/Firebase";

type FirestoreCollectionState = any;

const FirestoreCollectionContext = createContext<FirestoreCollectionState>(
  {} as FirestoreCollectionState,
);

export const useFirestoreCollection = () =>
  useContext(FirestoreCollectionContext);

type Status = "error" | "loading" | "ready";

interface Props {
  collection: any;
  filters?: any;
}

export const FirestoreCollectionProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, collection: collectionPath, filters = [] }) => {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<any>(null);

  let q = query(collection(firestore, collectionPath));
  for (const f of filters) {
    q = query(q, where(f[0], f[1], f[2]));
  }
  useEffect(() => {
    getDocs(q)
      .then((snapshot) => {
        setStatus("ready");
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      })
      .catch((error) => {
        setStatus("error");
      });
  }, [collection]);

  return (
    <FirestoreCollectionContext.Provider
      children={children}
      value={{
        data,
        status,
      }}
    />
  );
};
