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
import { useUser, useSigninCheck } from "reactfire";
import { useProfile, ProfileContextProvider } from "@/contexts/ProfileContext";
import { FooterMenu } from "@/components/FooterMenu";

interface AuthedLayoutProps {
  children: React.ReactNode;
  background?: string; // Default to false
  wide?: boolean;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  background = "",
}) => {
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
  return (
    <ProfileContextProvider>
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="end"></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} className="ion-padding">
          <div className="page-wrapper" style={{ background, paddingTop: 56 }}>
            {children}
          </div>
          <FooterMenu />
        </IonContent>
      </IonPage>
    </ProfileContextProvider>
  );
};

export default AuthedLayout;
