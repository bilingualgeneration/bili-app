import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  collection,
  getDocs
} from 'firebase/firestore';
import {firestore} from '@/components/Firebase';

type FirestoreCollectionState = any;

const FirestoreCollectionContext = createContext<FirestoreCollectionState>({} as FirestoreCollectionState);

export const useFirestoreCollection = () => useContext(FirestoreCollectionContext);


type Status = 'error' | 'loading' | 'ready';

interface Props {collection: any}

export const FirestoreCollectionProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  collection: collectionPath
}) => {
  const [status, setStatus] = useState<Status>('loading');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDocs(collection(firestore, collectionPath))
    .then((snapshot) => {
      setStatus('ready');
      setData(snapshot.docs.map((doc) => doc.data()));
    })
    .catch((error) => {
      setStatus('error');
    });
  }, [collection]);

  return <FirestoreCollectionContext.Provider
	   children={children}
	   value={{
	     data,
	     status
	   }} />;
}
