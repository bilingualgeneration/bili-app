import React from "react";
import { I18nMessage } from "@/components/I18nMessage";
import { IonCard, IonChip, IonText } from "@ionic/react";
import { Browser } from "@capacitor/browser";
import "./SettingsExploreCard.scss";

interface SettingsExploreCardProps {
  backgroundImage: string;
  backgroundColor: string;
  i18nKeyPrimary: string;
  i18nKeySecondary: string;
  link?: string; // url
  tags?: {
    color: string;
    i18nKey: string;
    textColor?: string;
  }[];
  textColor?: string; // Optional prop for text color
}

export const SettingsExploreCard: React.FC<SettingsExploreCardProps> = ({
  backgroundImage,
  backgroundColor,
  i18nKeyPrimary,
  i18nKeySecondary,
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
            <I18nMessage id={tag.i18nKey} languageSource="unauthed" />
          </IonChip>
        ))}
      </div>
      <IonText style={{ position: "absolute", bottom: 0 }}>
        <h3
          className="text-2xl semibold"
          style={{ color: textColor, marginBottom: 8 }}
        >
          <I18nMessage id={i18nKeyPrimary} languageSource="unauthed" />
        </h3>
        <p className="text-sm margin-bottom-1" style={{ color: textColor }}>
          <I18nMessage id={i18nKeySecondary} languageSource="unauthed" />
        </p>
      </IonText>
    </IonCard>
  );
};
