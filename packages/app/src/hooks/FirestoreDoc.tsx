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

interface PropsPopulate {
  [index: string]: string[]
}

interface Props {
  collection: any,
  id: string,
  populate?: PropsPopulate
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
      for(const p of Object.keys(populate)){
	const docs = await getDocs(
	  query(
	    query(collection(firestore, p)),
	    // @ts-ignore
	    where(populate[p][0], populate[p][1], populate[p][2])
	  )
	);
	payload[p] = docs.docs.map((d) => ({
	  id: d.id,
	  ...d.data()
	})
	);
      }
      setStatus('ready');
      setData({
	id,
	...payload
      });
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
