import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import React from "react";

type IconWithTextProps = {
  title: string | MessageFormatElement[];
  subtitle: string | MessageFormatElement[];
  icon?: React.ReactNode;
  iconBackgroundColor: string;
  margin_bottom?: string;
  url?: string;
};

export const IconWithText: React.FC<IconWithTextProps> = ({
  subtitle,
  icon,
  iconBackgroundColor,
  title,
  margin_bottom,
  url,
}) => {
  return (
    <>
      <div className="home-wave-icons">
        <div
          className="oval-element"
          style={{ backgroundColor: iconBackgroundColor }}
        >
          {url ? <a href={url}>{icon}</a> : icon}
        </div>
        <div className="">
          <div
            className="wave-icon-title"
            style={{
              fontSize: "18px",
              fontWeight: "700",
              maxWidth: "120px",
            }}
          >
            {/* todo: don't force type cast */}
            {title as string}
          </div>
          <div
            className="wave-icon-subtitle"
            style={{
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {/* todo: don't force type cast */}
            {subtitle as string}
          </div>
        </div>
      </div>
    </>
  );
};
