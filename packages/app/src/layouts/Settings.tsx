import { SettingsHeader } from "@/components/Settings/SettingsHeader";
import { SideMenu } from "@/components/Settings/SideMenu";

import { IonCol, IonGrid, IonRow } from "@ionic/react";

export const SettingsLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="auto">
          <SideMenu />
        </IonCol>
        <IonCol>
          <SettingsHeader></SettingsHeader>
          {children}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
