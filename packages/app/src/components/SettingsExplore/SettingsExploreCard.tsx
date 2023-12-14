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
  textColor = "white", // Default to black if textColor is not provided
}) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  const beforeStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  const titleStyle = {
    color: textColor,
  };

  const subtitleStyle = {
    color: textColor,
  };

  return (
    <IonCard className="explore-card" style={cardStyle}>
      <div className="explore-card-overlay" style={beforeStyle}></div>
      <div className="explore-card-content">{children}</div>
      <div className="explore-card-title" style={titleStyle}>
        {title}
      </div>
      <div className="explore-card-subtitle" style={subtitleStyle}>
        {subtitle}
      </div>
    </IonCard>
  );
};
