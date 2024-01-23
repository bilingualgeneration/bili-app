import React, { useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { WouldDo } from "./WouldDo";

export const WouldDoGameLoader: React.FC = () => {
  const { pack_id } = useParams<{ pack_id: string }>();
  const firestore = useFirestore();
  const wouldDoRef = collection(firestore, "wouldDo");
  const { status, data } = useFirestoreCollectionData(wouldDoRef);

  useEffect(() => {
    // logic to be added still
  }, [data]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading the game</div>;
  }

  return <WouldDo data={data} />;
};
