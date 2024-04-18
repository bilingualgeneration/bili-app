import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  doc,
  getDoc
} from 'firebase/firestore';
import {firestore} from '@/components/Firebase';

type FirestoreDocState = any;

const FirestoreDocContext = createContext<FirestoreDocState>({} as FirestoreDocState);

export const useFirestoreDoc = () => useContext(FirestoreDocContext);


type Status = 'error' | 'loading' | 'ready';

interface Props {
  collection: any,
  id: string
}

export const FirestoreDocProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  collection,
  id
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDoc(doc(firestore, collection, id))
    .then((snapshot) => {
      setStatus('ready');
      setData(snapshot.data());
    })
    .catch((error) => {
      setStatus('error');
    });
  }, [collection, id]);

  return <FirestoreDocContext.Provider
  children={children}
  value={{
    data,
    status
  }} />;
}
