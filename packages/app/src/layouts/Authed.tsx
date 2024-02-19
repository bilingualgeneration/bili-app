import { FC, useEffect, useState, PropsWithChildren } from "react";
import { I18nWrapper } from "@/components/I18nWrapper";
import { Redirect } from "react-router-dom";
import { useUser, useSigninCheck } from "reactfire";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { ChildProfileContextProvider } from "@/contexts/ChildProfileContext";
import { FavoritesContextProvider } from "@/contexts/FavoritesContext";
import { useHistory } from "react-router-dom";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

const AuthedLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userReady, setUserReady] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    FirebaseAuthentication.addListener("authStateChange", (change) => {
      console.log(change.user);
      setUserReady(true);
      setIsSignedIn(change.user !== null);
    });
  }, []);

  //const { status: userStatus } = useUser();
  const history = useHistory();
  useEffect(() => {
    // clear history so that the back button can operate correctly
  }, []);
  if (!userReady) {
    // unsure what the sign in status is
    return <></>;
  }
  if (isSignedIn === false) {
    // not logged in
    return <Redirect to="/" />;
  }
  // implied else
  return (
    <ProfileContextProvider>
      <ChildProfileContextProvider>
        <I18nWrapper locale="es">
          <FavoritesContextProvider>{children}</FavoritesContextProvider>
        </I18nWrapper>
      </ChildProfileContextProvider>
    </ProfileContextProvider>
  );
};

export default AuthedLayout;
