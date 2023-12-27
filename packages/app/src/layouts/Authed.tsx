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
import "./Container.css";

interface AuthedLayoutProps {
  children: React.ReactNode;
  customBackground?: string; // Default to false
  wide?: boolean;
  showOgAuthedHeader?: boolean; // Control visibility of OG header since there are so many headers ~ F
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  customBackground,
  wide,
  showOgAuthedHeader = true, // Default value is true, meaning header is visible
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
    contentStyle["--container-width"] = "100%";
  }

  return (
    <ProfileContextProvider>
      <IonPage>
        {showOgAuthedHeader && ( // Conditionally render IonHeader
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
        )}
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
