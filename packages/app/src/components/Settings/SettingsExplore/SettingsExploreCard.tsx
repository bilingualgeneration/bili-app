import React from "react";
import { IonCard, IonChip, IonText } from "@ionic/react";
import { Browser } from "@capacitor/browser";
import "./SettingsExploreCard.scss";

interface SettingsExploreCardProps {
  backgroundImage: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
  link?: string; // url
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
  title,
  subtitle,
  link,
  tags = [],
  textColor = "white", // Default to white if textColor is not provided
}) => {
  const handleCardClick = async () => {
    if (link) {
      try {
        await Browser.open({ url: link });
      } catch (error) {
        console.error("Failed to open browser:", error);
      }
    } else {
      console.warn("No link provided for this card");
    }
  };

  return (
    <IonCard
      className="explore-card"
      style={{ backgroundColor }}
      onClick={handleCardClick}
    >
      <div
        className="explore-card-overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="explore-card-content">
        {tags.map((tag, index) => (
          <IonChip
            key={index}
            className="text-xs"
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
          className="text-2xl semibold"
          style={{ color: textColor, marginBottom: 8 }}
        >
          {title}
        </h3>
        <p className="text-sm margin-bottom-1" style={{ color: textColor }}>
          {subtitle}
        </p>
      </IonText>
    </IonCard>
  );
};
