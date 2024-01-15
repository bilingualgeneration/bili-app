import { FC, useEffect, PropsWithChildren } from "react";
import { Redirect } from "react-router-dom";
import { useUser, useSigninCheck } from "reactfire";
import { useProfile, ProfileContextProvider } from "@/contexts/ProfileContext";
import { ReqdActionsProvider } from "@/contexts/ReqdActionsContext";
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
    return <>loading</>;
  }
  if (signInCheckResult.signedIn === false) {
    // not logged in
    return <Redirect to="/" />;
  }
  // implied else
  return (
    <ProfileContextProvider>
      <ReqdActionsProvider>{children}</ReqdActionsProvider>
    </ProfileContextProvider>
  );
};

export default AuthedLayout;
