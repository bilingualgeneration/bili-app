// TODO: remove
import { getFirebaseAuth } from "@/components/Firebase";
import { IonSpinner } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";

import "./QuickLaunch.scss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const QuickLaunch: React.FC = () => {
  const auth = getFirebaseAuth();
  const query = useQuery();
  const { quickLaunchFlag, setQuickLaunchFlag } = useProfile();

  useEffect(() => {
    const password = query.get("password");
    const email = query.get("email");
    setQuickLaunchFlag(true);

    // @ts-ignore
    signInWithEmailAndPassword(auth, email, password);
  }, [query]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonSpinner id="quicklaunch-spinner" />
    </div>
  );
};
