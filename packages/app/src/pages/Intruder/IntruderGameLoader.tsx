import { useParams } from "react-router";
import {
  FirestoreDocProvider,
  useFirestoreDoc
} from '@/hooks/FirestoreDoc';
import { IntruderGame } from "./IntruderGame";

export const IntruderGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();

  return <FirestoreDocProvider collection='intruder-game' id={pack_id}>
    <IntruderHydratedGame />
  </FirestoreDocProvider>;
}

const IntruderHydratedGame: React.FC = () => {
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
  return <IntruderGame game={data} />;
};
