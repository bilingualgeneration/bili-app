import React from "react";
import { IonCard } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import {
  gameControllerOutline,
  heartOutline,
  lockClosedOutline,
} from "ionicons/icons";
import { MessageFormatElement } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import "./sf_SlotMachineGame.css";
import { useHistory } from "react-router-dom";

interface JuegoCardProps {
  backgroundImage: string;
  isLocked?: boolean; // prop to indicate whether the module is locked
  isSpanishBilingual?: boolean;
  packNumber?: number;
  showOverlay?: boolean;
  storyId?: string;
}

export const JuegoCard: React.FC<JuegoCardProps> = ({
  backgroundImage,
  isLocked = false,
  isSpanishBilingual = false,
  packNumber = 1,
  showOverlay = true,
  storyId,
}) => {
  const { isImmersive } = useProfile();
  const history = useHistory();

  // conditionally make card clickable

  return (
    <IonCard
      onClick={() => {
        // todo: better
        if (!isLocked) {
          //props.href = `/story-factory/${storyId}`;
          history.push(`/story-factory/${storyId}`);
        }
      }}
      className={`individual-juego-card ${isLocked ? "locked" : ""}`}
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for Unlocked Cards */}
      {!isLocked && showOverlay && (
        <div className="overlay">
          <div className="gradient-overlay" />
        </div>
      )}

      {/* Locked Icon */}
      {isLocked && (
        <div className="lock-icon-container">
          <IonIcon icon={lockClosedOutline} className="lock-icon" />
        </div>
      )}

      <p className="es-pack-title">Paquete {packNumber}</p>
      {!isImmersive && <p className="en-pack-title2">Pack {packNumber}</p>}

      {/* Game container with outline in top left corner */}
      <IonIcon className="game-icon-container" icon={gameControllerOutline} />

      {/* Heart outline in the lower right corner */}
      <IonIcon className="heart-icon-container" icon={heartOutline} />
    </IonCard>
  );
};
