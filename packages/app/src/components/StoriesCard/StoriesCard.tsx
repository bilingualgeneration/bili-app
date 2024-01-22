import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";
import Lock from "@/assets/icons/lock.svg?react";
import { useProfile } from "@/contexts/ProfileContext";

type StoriesCardProps = {
  title: string | MessageFormatElement[];
  subtitle: string | MessageFormatElement[];
  icon?: React.ReactNode;
  cover: string;
  rating?: React.ReactNode[];
  heart?: React.ReactNode;
  iconBackroundColor?: string;
  className: string;
  isLocked?: boolean;
  lock?: React.ReactNode;
};

export const StoriesCard: React.FC<StoriesCardProps> = ({
  subtitle,
  icon,
  cover,
  title,
  rating,
  heart,
  iconBackroundColor,
  className,
  isLocked = false,
  lock,
}) => {
  const { isImmersive } = useProfile();
  const cardStyles = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60%, rgba(0, 0, 0, 0.60) 100%), url(${cover})`,
  };
  return (
    <>
      <div
        style={cardStyles}
        className={`stories-card ${isLocked ? "locked" : ""} ${className}`}
      >
        {/* check if the card is locked */}
        {isLocked && (
          <span className="lock-icon">
            <Lock />
          </span>
        )}
        <div className="stories-card-header">
          <div
            className="oval-element-small"
            style={{
              backgroundColor: iconBackroundColor,
            }}
          >
            {icon}
          </div>
          <div className="stories-card-rating">
            {rating?.map((star, index) => <span key={index}>{star}</span>)}
          </div>
        </div>

        <div className="stories-card-footer">
          <div>
            {isLocked && (
              <IonChip
                style={{
                  backgroundColor: "#fff",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                Proximante{!isImmersive && " | Coming Soon"}
              </IonChip>
            )}
            <h4 style={{ marginTop: 8 }}>{title as string}</h4>
            {!isImmersive && <p>{subtitle as string}</p>}
          </div>
          <div>{heart}</div>
        </div>
      </div>
    </>
  );
};
