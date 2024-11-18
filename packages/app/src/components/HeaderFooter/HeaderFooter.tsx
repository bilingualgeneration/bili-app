import { FC, PropsWithChildren } from "react";
import { BackButton } from "@/components/BackButton";
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
import { useStudent } from "@/hooks/Student";
import { useScreenSize } from "@/lib/screenSize";

import "./HeaderFooter.scss";

export const HeaderFooter: FC<
  PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  const showBackButton = true;
  const { screenType } = useScreenSize();
  const { id } = useStudent();
  return (
    <IonPage>
      <IonContent fullscreen={true} className="ion-padding background-figures">
        <div className="page-wrapper" style={{ background }}>
          <IonGrid id="authedHeader">
            <IonRow class="ion-align-items-center">
              <IonCol size="5">{showBackButton && <BackButton />}</IonCol>
              <IonCol className="ion-text-center" size="2">
                <Link to="/student-dashboard">
                  <img src={biliLogo} />
                </Link>
              </IonCol>
              <IonCol className="ion-text-right" size="5">
                {id !== null && <ProfileChip />}
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
