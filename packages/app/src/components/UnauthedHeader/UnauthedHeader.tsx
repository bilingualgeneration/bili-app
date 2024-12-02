import { FC, PropsWithChildren } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import backButton from "@/assets/icons/back_button_green.svg";
import biliLogo from "@/assets/icons/bili.svg";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import "./UnauthedHeader.scss";

export const UnauthedHeader: FC<
  PropsWithChildren<{
    backButtonOnClick?: () => void;
    showBackButton?: boolean;
  }>
> = ({ backButtonOnClick = () => {}, children, showBackButton = true }) => {
  return (
    <IonGrid style={{ margin: "1rem 2rem 4rem 2rem" }}>
      <IonRow class="ion-align-items-center">
        <IonCol>
          {showBackButton && (
            <IonButton
              fill="clear"
              id="back_button"
              onClick={backButtonOnClick}
            >
              <IonIcon slot="icon-only" icon={backButton} />
            </IonButton>
          )}
        </IonCol>
        <IonCol className="ion-text-center">
          <img src={biliLogo} id="bili-header-logo" />
        </IonCol>
        <IonCol className="ion-text-right">
          <LanguageSwitcher />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
