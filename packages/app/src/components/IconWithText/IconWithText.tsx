import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import { Link } from "react-router-dom";
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
          style={{
            backgroundColor: iconBackgroundColor,
            width: "7.875rem",
            height: "7.875rem",
          }}
        >
          {url ? <Link to={url}>{icon}</Link> : icon}
        </div>
        <div className="">
          <div
            className="wave-icon-title"
            style={{
              fontSize: "1.125rem",
              fontWeight: "700",
              maxWidth: "7.5rem",
            }}
          >
            {/* todo: don't force type cast */}
            {title as string}
          </div>
          <div
            className="wave-icon-subtitle"
            style={{
              fontSize: "1rem",
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
