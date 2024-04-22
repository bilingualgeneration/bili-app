import React, { useState, useEffect } from "react";
import { IonCard, IonIcon, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/hooks/Profile";
import { StoriesCardNoRating } from "@/components/StoryFactory/StoriesCardNoRating";
import { gameControllerOutline } from "ionicons/icons";
import { PlayHeader } from "@/components/PlayHeader";
import Heart from "@/assets/icons/heart.svg?react";
import "./StoryFactory.scss";

export const StoryFactoryPage3: React.FC = () => {
  const {profile: { isImmersive }} = useProfile();
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
            <IonText>
              <h1>
                <FormattedMessage
                  id="common.storyFactory"
                  defaultMessage="Story Factory"
                />
              </h1>
              {!isImmersive && <h2>Story Factory</h2>}
            </IonText>
            <div
              className="hide-scrollbar"
              style={{
                alignItems: "center",
                display: "flex",
                marginTop: "2rem",
                overflowX: "scroll",
              }}
            >
              <StoriesCardNoRating
                storyId="55cb3673-8fb1-49cd-826a-0ddf2360025d"
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
      </div>
    </>
  );
};
