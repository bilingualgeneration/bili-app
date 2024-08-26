import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";

import "./RadioCard.css";

type RadioCardProps = {
  title: string | MessageFormatElement[];
  content: string | MessageFormatElement[];
  subTitle?: string | MessageFormatElement[];
  icon?: React.ReactNode;
  iconBackgroundColor?: string;
  badge?: React.ReactNode;
  titleFontSize?: string;
  titleColor?: string;
  contentFontSize?: string;
  contentColor?: string;
  subTitleFontSize?: string;
  subTitleColor?: string;
};

export const RadioCard: React.FC<RadioCardProps> = ({
  badge,
  content,
  subTitle,
  icon,
  iconBackgroundColor,
  title,
  titleFontSize = "2xl", // default font-size for title
  titleColor = "color-selva", // default color for title
  subTitleFontSize = "lg", // default font-size for subTitle
  subTitleColor = "color-barro", // default color for subTitle
  contentFontSize = "sm", // default font-size for content
  contentColor = "color-suelo", // default color for content
}) => {
  return (
    <IonCard className="radio-card">
      <div className="card-inner">
        {icon && (
          <div
            className="oval-element"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            {icon}
          </div>
        )}
        <div className="title-content">
          {badge && (
            <div
              className="badge-content"
              style={{
                backgroundColor: "#F48722",
                marginTop: "15px",
                marginLeft: "18px",
                padding: "4px 8px",
                borderRadius: "4px",
                color: "#000000",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              {badge}
            </div>
          )}

          <IonCardHeader class="custom-ion-header">
            <IonCardTitle>
              <IonText>
                {/* todo: don't force type cast */}
                <p className={`text-${titleFontSize} semibold ${titleColor}`}>
                  {title as string}
                </p>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div>
              <IonText>
                {subTitle && (
                  <p
                    className={`text-${subTitleFontSize} semibold ${subTitleColor}`}
                  >
                    {subTitle as string}
                  </p>
                )}
                <p className={`text-${contentFontSize} ${contentColor}`}>
                  {/* todo: don't force type cast */}
                  {content as string}
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  );
};
