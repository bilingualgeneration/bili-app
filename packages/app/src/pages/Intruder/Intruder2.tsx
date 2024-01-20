import React, { useState, useEffect } from "react";
import { IonCard, IonIcon } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { StoriesCardNoRating } from "@/components/StoryFactory/StoriesCardNoRating";
import { gameControllerOutline } from "ionicons/icons";
import { PlayHeader } from "@/components/PlayHeader";
import Heart from "@/assets/icons/heart.svg?react";
import "./Intruder.scss";
import "../StoryFactory/StoryFactory.scss";

export const Intruder2: React.FC = () => {
  const { isImmersive } = useProfile();
  return (
    <>
      <PlayHeader />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 110px",
        }}
      >
        <div className="sf-card">
          <IonCard>
            <h1 style={{ marginTop: 0 }}>
              <FormattedMessage
                id="common.storyFactory"
                defaultMessage="Story Factory"
              />
            </h1>
            {!isImmersive && <h2 style={{ marginTop: 0 }}>Story Factory</h2>}

            <div
              className="hide-scrollbar"
              style={{
                display: "flex",
                alignItems: "center",
                overflowX: "scroll",
              }}
            >
              <StoriesCardNoRating
                storyId="9262a65e-0e73-4cbb-988e-697e82d5cb93"
                packNumber={1}
                cover={"/assets/img/drum_image.png"}
                isIntruder={true}
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
      </div>
    </>
  );
};
