import { FC, PropsWithChildren } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FooterMenu } from "@/components/FooterMenu";
import backButton from "@/assets/icons/back_button_orange.svg";
import biliLogo from "@/assets/icons/bili.svg";
import { ProfileChip } from "@/components/ProfileChip";
import { useHistory } from "react-router-dom";

export const HeaderFooter: FC<
  PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const showBackButton = true;
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding">
        <div className="page-wrapper" style={{ background }}>
          <IonGrid style={{ margin: "0 2rem 1rem 2rem", paddingTop: "1rem" }}>
            <IonRow class="ion-align-items-center">
              <IonCol>
                {showBackButton && (
                  <IonButton
                    fill="clear"
                    id="back_button"
                    onClick={history.goBack}
                  >
                    <IonIcon slot="icon-only" icon={backButton} />
                  </IonButton>
                )}
              </IonCol>
              <IonCol className="ion-text-center">
                <img src={biliLogo} />
              </IonCol>
              <IonCol className="ion-text-right">
                <ProfileChip />
              </IonCol>
            </IonRow>
          </IonGrid>
          {children}
        </div>
        <FooterMenu />
      </IonContent>
    </IonPage>
  );
};
