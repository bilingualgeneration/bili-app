import { IonContent, IonPage } from "@ionic/react";
import React from "react";

interface UnauthedLayoutProps {
  background?: string; // Default to false
  children: React.ReactNode;
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  background,
  children,
}) => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="page-wrapper" style={{ background }}>
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnauthedLayout;
