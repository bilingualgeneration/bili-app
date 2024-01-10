import React from "react";
import { IonCard } from "@ionic/react";
import "./SettingsExploreCard.css";

interface SettingsExploreCardProps {
  children: React.ReactNode;
  backgroundImage: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
  textColor?: string; // Optional prop for text color
}

export const SettingsExploreCard: React.FC<SettingsExploreCardProps> = ({
  children,
  backgroundImage,
  backgroundColor,
  title,
  subtitle,
  textColor = "white", // Default to white if textColor is not provided
}) => {
  return (
    <IonCard className="explore-card" style={{ backgroundColor }}>
      <div
        className="explore-card-overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="explore-card-content">{children}</div>
      <div className="explore-card-title" style={{ color: textColor }}>
        {title}
      </div>
      <div className="explore-card-subtitle" style={{ color: textColor }}>
        {subtitle}
      </div>
    </IonCard>
  );
};
