import React from "react";
import { IonCard } from "@ionic/react";
import "./SettingsExploreCard.css";

interface SettingsExploreCardProps {
  children: React.ReactNode;
  backgroundImage: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
}

export const SettingsExploreCard: React.FC<SettingsExploreCardProps> = ({
  children,
  backgroundImage,
  backgroundColor,
  title,
  subtitle,
}) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  const beforeStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <IonCard className="explore-card" style={cardStyle}>
      <div className="explore-card-overlay" style={beforeStyle}></div>
      <div className="explore-card-content">{children}</div>
      <div className="explore-card-title">{title}</div>
      <div className="explore-card-subtitle">{subtitle}</div>
    </IonCard>
  );
};
