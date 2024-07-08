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
import { Link } from "react-router-dom";

import "./HeaderFooter.scss";

export const HeaderFooter: FC<
  PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const showBackButton = true;
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding background-figures">
        <div className="page-wrapper" style={{ background }}>
          <IonGrid id="authedHeader">
            <IonRow class="ion-align-items-center">
              <IonCol size="5">
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
              <IonCol className="ion-text-center" size="2">
                <Link to="/">
                  <img src={biliLogo} />
                </Link>
              </IonCol>
              <IonCol className="ion-text-right" size="5">
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
