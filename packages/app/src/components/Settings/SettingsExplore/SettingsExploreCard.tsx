import React from "react";
import { IonCard, IonChip, IonText } from "@ionic/react";
import "./SettingsExploreCard.css";

interface SettingsExploreCardProps {
  backgroundImage: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
  tags?: {
    color: string;
    text: string;
    textColor?: string;
  }[];
  textColor?: string; // Optional prop for text color
}

export const SettingsExploreCard: React.FC<SettingsExploreCardProps> = ({
  backgroundImage,
  backgroundColor,
  subtitle,
  tags = [],
  textColor = "white", // Default to white if textColor is not provided
  title,
}) => {
  return (
    <IonCard className="explore-card" style={{ backgroundColor }}>
      <div
        className="explore-card-overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="explore-card-content">
        {tags.map((tag, index) => (
          <IonChip
            key={index}
            style={{
              "--background": tag.color,
              color: tag.textColor || "#000",
            }}
          >
            {tag.text}
          </IonChip>
        ))}
      </div>
      <IonText style={{ position: "absolute", bottom: 0 }}>
        <h3
          className="explore-card-title"
          style={{ color: textColor, marginBottom: 8 }}
        >
          {title}
        </h3>
        <p className="explore-card-subtitle" style={{ color: textColor }}>
          {subtitle}
        </p>
      </IonText>
    </IonCard>
  );
};
