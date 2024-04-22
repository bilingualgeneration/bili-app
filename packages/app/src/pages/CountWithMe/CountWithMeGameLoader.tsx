import { useParams } from "react-router";
import {
  FirestoreDocProvider,
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import { CountWithMeGame } from "./CountWithMeGame";

export const CountWithMeGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  return <FirestoreDocProvider collection='count-with-me-game' id={pack_id}>
    <CountWithMeHydratedGame />
  </FirestoreDocProvider>;
};

const CountWithMeHydratedGame: React.FC = () => {
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
  return <CountWithMeGame game={data} />;
};
