import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { SideMenu } from "@/components/Settings/SideMenu";

import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";

export const SettingsLayout: React.FC<
  React.PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="page-wrapper" style={{ background }}>
          <IonGrid className="ion-no-padding inner-scroll">
            <IonRow>
              <IonCol size="auto" style={{ minHeight: "100vh" }}>
                <SideMenu />
              </IonCol>
              <IonCol>
                <SettingsHeader></SettingsHeader>
                {children}
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};
