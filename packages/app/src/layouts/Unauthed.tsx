import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <LanguageSwitcher />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ background, marginTop: 56, paddingTop: "4rem" }}>
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnauthedLayout;
