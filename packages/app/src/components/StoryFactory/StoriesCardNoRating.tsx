import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/react";
import type { MessageFormatElement } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import React from "react";
import Lock from "@/assets/icons/lock.svg?react";

type StoriesCardNoRatingProps = {
  packNumber: number;
  icon?: React.ReactNode | string;
  cover: string;
  rating?: React.ReactNode[];
  heart?: React.ReactNode;
  iconBackroungColor?: string;
  className: string;
  isLocked?: boolean;
  lock?: React.ReactNode;
  storyId?: string;
};

export const StoriesCardNoRating: React.FC<StoriesCardNoRatingProps> = ({
  packNumber = 1,
  icon,
  cover,
  heart,
  iconBackroungColor,
  className,
  isLocked = false,
  lock,
  storyId,
}) => {
  const { isImmersive } = useProfile();

  // conditionally make card clickable
  let props: { [key: string]: any } = {};
  if (!isLocked) {
    props.href = `/story-factory/${storyId}`;
  }

  const cardStyles = {
    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60%, rgba(0, 0, 0, 0.60) 100%), url(${cover})`,
  };

  return (
    <>
      <div
        style={cardStyles}
        className={`stories-card ${isLocked ? "locked" : ""} ${className}`}
      >
        {/* check if the card is locked */}
        {isLocked && (
          <>
            <span className="lock-icon">
              <Lock />
            </span>
          </>
        )}
        <div className="stories-card-header">
          <div
            className="oval-element-small"
            style={{
              backgroundColor: iconBackroungColor,
            }}
          >
            {icon}
          </div>
        </div>

        <div className="stories-card-footer">
          <div>
            <div>
              {isLocked && (
                <div className="coming-soon-pill">
                  <p
                    style={{
                      display: "flex",
                      padding: "4px 8px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "16px",
                      backgroundColor: "#FDC094",
                      color: "#393939",
                      fontFamily: "Outfit",
                      fontSize: "12px",
                      fontWeight: "800",
                      lineHeight: "16px",
                      margin: "5px 0",
                    }}
                  >
                    Próximamente
                    {!isImmersive && <span>| coming soon </span>}
                  </p>
                  {/* )} */}
                </div>
              )}
              <h4
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "27px",
                  margin: "0px",
                }}
              >
                Paquete {packNumber as number}
              </h4>
              {!isImmersive && (
                <p
                  style={{
                    fontFamily: "Outfit",
                    fontSize: ".813rem",
                    fontWeight: "400",
                    lineHeight: "normal",
                    color: "white",
                    letterSpacing: "-0.26px",
                    margin: "0px",
                  }}
                >
                  Pack {packNumber as number}
                </p>
              )}
            </div>
          </div>
          <div>{heart}</div>
        </div>
      </div>
    </>
  );
};
