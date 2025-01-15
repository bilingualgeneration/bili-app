import React, { FC } from "react";
import { useLanguage } from "@/hooks/Language";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import "./ComingSoonCard.scss";

interface ComingSoonCardProps {
  cardColor: string;
  text: any[];
  textColor?: string;
  cardImage: string;
}

export const ComingSoonCard: FC<ComingSoonCardProps> = ({
  cardColor,
  text,
  textColor = "color-nube",
  cardImage,
}) => {
  const { populateText } = useLanguage();
  const texts = populateText(text);
  return (
    <div className="coming-soon-card" style={{ backgroundColor: cardColor }}>
      <IonGrid>
        <IonRow>
          <IonCol
            size="4"
            className="flex ion-justify-content-center ion-align-items-center"
          >
            <img
              src={cardImage}
              alt="Card Image"
              style={{ maxHeight: "10rem" }}
            />
          </IonCol>
          <IonCol size="8" className="flex ion-align-items-center">
            <div className="padding-left-1">
              <h1 className={`text-3xl semibold ${textColor}`}>
                {texts[0].text}
              </h1>
              {texts.length > 1 && (
                <p className={`text-2xl ${textColor} subtitle`}>
                  {texts[1].text}
                </p>
              )}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
