import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { IntruderGame } from "./IntruderGame";

export const IntruderGameLoader: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "intruder-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "error") {
    return "Error loading the game";
  }

  // @ts-ignore
  return <IntruderGame game={data} />;
};
