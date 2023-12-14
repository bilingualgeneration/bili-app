import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonCol,
  IonCard,
} from "@ionic/react";
import "./SettingsExploreMiniCard.css";

interface SettingsExploreMiniCardProps {
  customColor: string;
  cardText: string;
}

const SettingsExploreMiniCard: React.FC<SettingsExploreMiniCardProps> = ({
  customColor,
  cardText,
}) => {
  return (
    <>
      <IonCard
        className="ion-no-margin explore-mini-card"
        style={{ backgroundColor: customColor || "white" }}
      >
        {" "}
        {/* default background color = white */}
        <div className="settings-explore-mini-card-text">{cardText}</div>
      </IonCard>
    </>
  );
};

export default SettingsExploreMiniCard;
