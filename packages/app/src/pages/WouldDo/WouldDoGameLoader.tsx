import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";

const { isImmersive } = useProfile();
const { pack_id } = useParams();
const firestore = useFirestore();
const ref = doc(firestore, "would-do-game", pack_id);
const { status, data } = useFirestoreDocData(ref);
