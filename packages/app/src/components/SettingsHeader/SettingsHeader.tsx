import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";

export const SettingsHeader: React.FC = ({}) => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Helloooooooooooooooo</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};
