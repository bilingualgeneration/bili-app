//AM
import React, { useState, useEffect, useMemo } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { StoriesGame } from "@/components/StoriesGame";

export const StoriesSyllableGame: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  const ref = doc(firestore, "story", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
  }

  console.log(data);
  return (
    <div>
      <StoriesGame game={data} gameType="syllable" />
    </div>
  );
};
