import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import { useAuth, useUser, useSigninCheck } from "reactfire";
import { useProfile, ProfileContextProvider } from "@/contexts/ProfileContext";
import { FooterMenu } from "@/components/FooterMenu";

interface AuthedLayoutProps {
  children: React.ReactNode;
  customBackground?: string; // Default to false
  wide?: boolean;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  customBackground,
  wide,
}) => {
  const auth = useAuth();
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
  const contentStyle: Record<string, string> = {};

  if (customBackground) {
    contentStyle["--background"] = customBackground; // Set background color only if provided
  }
  if (wide) {
    contentStyle["--container-width"] = "1000px"; //set width to 1000px only if wide is true
  }

  return (
    <ProfileContextProvider>
      <IonPage>
        <IonHeader className="ion-no-border" id="header">
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  auth.signOut();
                }}
              >
                logout
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding" style={contentStyle}>
          <div className="container">{children}</div>
        </IonContent>
        <IonFooter className="ion-no-border">
          <FooterMenu />
        </IonFooter>
      </IonPage>
    </ProfileContextProvider>
  );
};

export default AuthedLayout;
