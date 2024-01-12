import { FC, PropsWithChildren } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FooterMenu } from "@/components/FooterMenu";

export const HeaderFooter: FC<
  PropsWithChildren<{
    background?: string;
  }>
> = ({ background = "", children }) => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>123</IonButton>
          </IonButtons>
          <IonTitle>hello</IonTitle>
          <IonButtons slot="end">
            <IonButton>456</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <div className="page-wrapper" style={{ background, paddingTop: 56 }}>
          {children}
        </div>
        <FooterMenu />
      </IonContent>
    </IonPage>
  );
};
