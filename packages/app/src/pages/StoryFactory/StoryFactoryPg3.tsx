import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { StoriesCardNoRating } from "@/components/StoryFactory/StoriesCardNoRating";
import { gameControllerOutline } from "ionicons/icons";
import GameIcon from "@/assets/icons/game_icon.svg?react";
import Heart from "@/assets/icons/heart.svg?react";

import "./StoryFactory.css";

export const StoryFactoryPage3: React.FC = () => {
  const { isImmersive } = useProfile();
  return (
    <>
      <div className="rectangle-header">
        <div className="rectangle-header-text">
          <h1 id="rectangle-header-title">Juego</h1>
          {!isImmersive && <p id="story-juego-title2">Play</p>}
        </div>
        {/* Semi-Transparent Overlay for Rectangle Header */}
        <div className="rectangle-header-semi-transparent-overlay"></div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 110px",
        }}
      >
        <IonCard className="story-factory-pg3-main-card">
          <div className="card-title">
            <h2 id="sf-es">
              <FormattedMessage id="storyFactory.title" />
            </h2>
            {!isImmersive && (
              <p
                style={{
                  fontFamily: "Outfit",
                  fontSize: "2rem",
                  fontWeight: "400",
                  lineHeight: "125%",
                  color: "black",
                  letterSpacing: "-0.5px",
                }}
              >
                Story Factory
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <StoriesCardNoRating
              storyId="3"
              packNumber={1}
              cover={"/assets/img/drum_image.png"}
              icon={
                <IonIcon
                  className="controller-icon"
                  icon={gameControllerOutline}
                  aria-hidden="true"
                />
              }
              iconBackroungColor="var(--Desierto-Desierto)"
              heart={<Heart />}
              className="other-card-image"
            />

            <StoriesCardNoRating
              packNumber={2}
              cover={"/assets/img/dance_image.png"}
              icon={
                <IonIcon
                  className="controller-icon"
                  icon={gameControllerOutline}
                  aria-hidden="true"
                />
              }
              iconBackroungColor="var(--Desierto-Desierto)"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />

            <StoriesCardNoRating
              packNumber={3}
              cover={"/assets/img/band_image.png"}
              icon={
                <IonIcon
                  className="controller-icon"
                  icon={gameControllerOutline}
                  aria-hidden="true"
                />
              }
              iconBackroungColor="var(--Desierto-Desierto)"
              heart={<Heart />}
              className="other-card-image"
              isLocked={true}
            />
          </div>
        </IonCard>
      </div>
    </>
  );
};
