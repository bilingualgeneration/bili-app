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
import "./HeaderFooter.css";

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
            <IonRow
              className="ion-align-items-center"
              style={{ position: "relative" }}
            >
              {screenType === "mobile" ? (
                <>
                  <IonCol size="5">{showBackButton && <BackButton />}</IonCol>
                  <IonCol size="2" className="ion-text-center">
                    <Link to="/student-dashboard">
                      <img className="header-bili-logo" src={biliLogo} />
                    </Link>
                  </IonCol>
                  <IonCol size="5" className="ion-text-right">
                    {id !== null && <ProfileChip />}
                  </IonCol>
                </>
              ) : (
                <>
                  <IonCol size="5" className="back-button-container">
                    {showBackButton && (
                      <div className="back-button-wrapper">
                        <BackButton />
                      </div>
                    )}
                  </IonCol>
                  <IonCol size="2" className="ion-text-center">
                    <Link to="/student-dashboard">
                      <img src={biliLogo} className="logo" alt="Logo" />
                    </Link>
                  </IonCol>
                  <IonCol size="5" className="ion-text-right">
                    {id !== null && <ProfileChip />}
                  </IonCol>
                </>
              )}
            </IonRow>
          </IonGrid>
          {children}
        </div>
        <FooterMenu />
      </IonContent>
    </IonPage>
  );
};
