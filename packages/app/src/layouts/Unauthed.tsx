import React from "react";
import { IonContent, IonPage } from "@ionic/react";

interface UnauthedLayoutProps {
  children: React.ReactNode;
  background?: string; // Default to false
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  children,
  background = "",
}) => {
  const contentStyle: Record<string, string> = {};

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
