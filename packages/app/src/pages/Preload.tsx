import { IonSpinner } from "@ionic/react";
import { Redirect } from "react-router";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useSigninCheck } from "reactfire";

import { useEffect, useState } from "react";

export const Preload: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    FirebaseAuthentication.getCurrentUser()
      .then((response) => {
        setIsReady(true);
        setUser(response.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!isReady) {
    return <IonSpinner name="circular" />;
  }
  if (user !== null) {
    // todo: redirect based on user account type
    return <Redirect to="/student-dashboard" />;
  } else {
    return <Redirect to="/presplash" />;
  }
};
