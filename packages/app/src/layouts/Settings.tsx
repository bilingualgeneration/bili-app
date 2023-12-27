import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { SideMenu } from "@/components/Settings/SideMenu";
import "./Container.css";

import { IonCol, IonGrid, IonRow } from "@ionic/react";

export const SettingsLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <IonGrid className="ion-no-padding inner-scroll">
      <IonRow>
        <IonCol size="auto">
          <SideMenu />
        </IonCol>
        <IonCol>
          <SettingsHeader></SettingsHeader>
          <div className="container">{children}</div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
