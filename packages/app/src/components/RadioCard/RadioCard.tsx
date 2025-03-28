import classnames from "classnames";
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
import { useLanguage } from "@/hooks/Language";

type RadioCardProps = {
  title: string | null | undefined;
  content?: string | null | undefined;
  subTitle?: string | null | undefined;
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
  isTextCentered?: boolean;
  backgroundColor?: string;
  maxHeight?: string;
  className?: string;
  onAudioPlay?: () => void; // Audio playback handler
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
  isTextCentered = false,
  backgroundColor = "#FFFFFF",
  maxHeight = "undefined",
  className = "",
  onAudioPlay,
}) => {
  const language = useLanguage();
  return (
    <IonCard
      className={`radio-card ${className}`}
      style={{
        backgroundColor: backgroundColor,
        maxHeight: maxHeight,
      }}
      onClick={onAudioPlay} // Triggers audio playback
    >
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
        <div
          className={
            isTextCentered ? "centered-title-content" : "title-content"
          }
        >
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
          <IonCardContent>
            <div>
              <IonText>
                {/* todo: don't force type cast */}
                <p
                  className={classnames(
                    `text-${titleFontSize} semibold ${titleColor}`,
                    { "ion-text-center": isTextCentered },
                  )}
                  style={{
                    whiteSpace: "nowrap", // Prevent wrapping
                    overflow: "hidden",
                  }}
                >
                  {title as string}
                </p>
                {subTitle && (
                  <p
                    className={classnames(
                      `text-${subTitleFontSize} semibold ${subTitleColor}`,
                      { "ion-text-center": isTextCentered },
                    )}
                  >
                    {subTitle as string}
                  </p>
                )}
                {content && (
                  <p
                    className={classnames(
                      `text-${contentFontSize} ${contentColor}`,
                      { "ion-text-center": isTextCentered },
                    )}
                  >
                    {/* todo: don't force type cast */}
                    {content as string}
                  </p>
                )}
              </IonText>
            </div>
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  );
};
