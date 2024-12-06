import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";

import "./RadioCard.scss";

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
  flexDirectionColumn?: boolean;
  isJustPicture?: boolean;
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
  flexDirectionColumn = false,
  isJustPicture = false,
}) => {
  return (
    <IonCard className="radio-card">
      <div
        className="card-inner"
        style={{ flexDirection: flexDirectionColumn ? "column" : "unset" }}
      >
        {icon && (
          <div
            className={isJustPicture ? "" : "oval-element"}
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
                marginTop: "0.9375rem",
                marginLeft: "1.125rem",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                color: "#000000",
                fontSize: "0.625rem",
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
