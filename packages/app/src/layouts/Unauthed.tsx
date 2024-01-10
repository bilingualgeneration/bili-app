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
  customBackground?: string; // Default to false
  wide?: boolean;
}

const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
  // other props
  children,
  customBackground,
  wide,
}) => {
  const contentStyle: Record<string, string> = {};

  if (customBackground) {
    contentStyle["--background"] = customBackground; // Set background color only if provided
  }
  if (wide) {
    contentStyle["--container-width"] = "1000px"; //set width to 1000px only if wide is true
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding" style={contentStyle}>
        <div>
          <IonToolbar>
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
