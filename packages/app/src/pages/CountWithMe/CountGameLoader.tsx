import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { CountWithMeGame } from "./CountWithMeGame";

export const CountGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "count-with-me-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "error") {
    return "Error loading the game";
  }

  // @ts-ignore
  return <CountWithMeGame game={data} />;
};