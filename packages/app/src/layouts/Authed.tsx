import { FC, useEffect, PropsWithChildren } from "react";
import { I18nWrapper } from "@/components/I18nWrapper";
import { Redirect } from "react-router-dom";
import { useUser, useSigninCheck } from "reactfire";
import { ProfileContextProvider } from "@/contexts/ProfileContext";
import { ChildProfileContextProvider } from "@/contexts/ChildProfileContext";
import { FavoritesContextProvider } from "@/contexts/FavoritesContext";
import { useHistory } from "react-router-dom";

const AuthedLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { status: userStatus } = useUser();
  const history = useHistory();
  const { status, data: signInCheckResult } = useSigninCheck();
  useEffect(() => {
    // clear history so that the back button can operate correctly
  }, []);
  if (status === "loading" || userStatus === "loading") {
    // unsure what the sign in status is
    return <></>;
  }
  if (signInCheckResult.signedIn === false) {
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
