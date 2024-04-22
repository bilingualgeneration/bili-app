import {
  FirestoreDocProvider,
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import { useParams } from 'react-router';
import { StoriesDragGame } from './StoriesDragGame';

export const StoriesDragGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();

  return <FirestoreDocProvider collection='story' id={pack_id}>
    <HydratedStoriesDragGame />
  </FirestoreDocProvider>;
}

const HydratedStoriesDragGame: React.FC = () => {
  const {status, data} = useFirestoreDoc();
  if (status === "loading") {
    // todo: loading screen
    return <></>;
  }

  if (status === "error") {
    // todo: better error checking
    return <></>;
  }

  // @ts-ignore
  return <StoriesDragGame game={data} />;
};
