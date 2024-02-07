import { FC } from "react";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { StoriesGame } from "./StoriesGame";

export const StoriesGameLoader: FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "story", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "error") {
    return "Error loading the game";
  }

  // @ts-ignore
  return <StoriesGame game={data} />;
};
