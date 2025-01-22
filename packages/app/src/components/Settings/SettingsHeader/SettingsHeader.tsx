// TODO: add language toggle

import { IonCol, IonGrid, IonHeader, IonRow } from "@ionic/react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import "./SettingsHeader.scss";
import biliLogo from "@/assets/icons/bili.svg";

export const SettingsHeader: React.FC = ({}) => {
  return (
    <>
      <IonHeader className="ion-no-border settings-header">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <img src={biliLogo} className="header-bili-logo" />
            </IonCol>
            <IonCol size="auto">
              <LanguageSwitcher />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
    </>
  );
};
