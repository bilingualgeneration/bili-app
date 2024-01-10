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
  background = "#fff",
}) => {
  const contentStyle: Record<string, string> = {};

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={{ background }}>
        <div style={{ marginBottom: "4rem" }}>
          <IonToolbar style={{ padding: "0 2rem" }}>
            <IonButtons slot="end">
              <LanguageSwitcher />
            </IonButtons>
          </IonToolbar>
        </div>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default UnauthedLayout;
