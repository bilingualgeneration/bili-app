import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {firestore} from '@/components/Firebase';

type FirestoreDocState = any;

const FirestoreDocContext = createContext<FirestoreDocState>({} as FirestoreDocState);

export const useFirestoreDoc = () => useContext(FirestoreDocContext);


type Status = 'error' | 'loading' | 'ready';

interface Props {
  collection: any,
  id: string,
  populate?: string[]
}

export const FirestoreDocProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  collection: collectionPath,
  id,
  populate = []
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const snapshot: any = await getDoc(doc(firestore, collectionPath, id));
      let payload = snapshot.data();
      for(const p of populate){
	const docs = await getDocs(
	  query(
	    collection(firestore, p),
	    where(collectionPath, '==', id)
	  )
	);
	payload[p] = docs.docs.map((d) => d.data());
      }
      setStatus('ready');
      setData(payload);
      // todo: handle errors
    })();
  }, [collection, id]);

  return <FirestoreDocContext.Provider
  children={children}
  value={{
    data,
    status
  }} />;
}
