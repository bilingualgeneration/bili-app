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
  textColor?: string; // Optional prop for text color
}

const SettingsExploreMiniCard: React.FC<SettingsExploreMiniCardProps> = ({
  customColor,
  cardText,
  textColor = "black", // Default to black if textColor is not provided
}) => {
  const cardStyle = {
    backgroundColor: customColor || "white",
  };

  const textStyle = {
    color: textColor,
  };

  return (
    <>
      <IonCard className="ion-no-margin explore-mini-card" style={cardStyle}>
        <div className="settings-explore-mini-card-text" style={textStyle}>
          {cardText}
        </div>
      </IonCard>
    </>
  );
};

export default SettingsExploreMiniCard;
