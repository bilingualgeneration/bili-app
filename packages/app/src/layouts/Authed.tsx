import { FC, PropsWithChildren } from "react";
import { Redirect } from "react-router-dom";
import { useUser, useSigninCheck } from "reactfire";
import { useProfile, ProfileContextProvider } from "@/contexts/ProfileContext";

const AuthedLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { status: userStatus } = useUser();
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === "loading" || userStatus === "loading") {
    // unsure what the sign in status is
    return <>loading</>;
  }
  if (signInCheckResult.signedIn === false) {
    // not logged in
    return <Redirect to="/" />;
  }
  // implied else
  return <ProfileContextProvider>{children}</ProfileContextProvider>;
};

export default AuthedLayout;
