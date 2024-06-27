import { FC, PropsWithChildren } from "react";
import {BackButton} from '@/components/BackButton';
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
import biliLogo from "@/assets/icons/bili.svg";
import { ProfileChip } from "@/components/ProfileChip";
import { Link } from "react-router-dom";

import "./HeaderFooter.scss";

export const HeaderFooter: FC<
  PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const showBackButton = true;
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding background-figures">
        <div className="page-wrapper" style={{ background }}>
          <IonGrid id="authedHeader">
            <IonRow class="ion-align-items-center">
              <IonCol>
                {showBackButton && <BackButton />}
              </IonCol>
              <IonCol className="ion-text-center">
                <Link to="/">
                  <img src={biliLogo} />
                </Link>
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
