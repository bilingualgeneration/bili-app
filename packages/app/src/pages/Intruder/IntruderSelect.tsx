import { FormattedMessage } from "react-intl";
import { gameControllerOutline } from "ionicons/icons";
import Heart from "@/assets/icons/heart.svg?react";
import { IonCard, IonIcon, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import { PlayHeader } from "@/components/PlayHeader";
import { StoriesCardNoRating } from "@/components/StoryFactory/StoriesCardNoRating";
import { useProfile } from "@/contexts/ProfileContext";

export const IntruderSelect: React.FC = () => {
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
            <IonText>
              <h1>
                <FormattedMessage
                  id="common.intruder"
                  defaultMessage="The Intruder"
                />
              </h1>
              {!isImmersive && <h2>The Intruder</h2>}
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
              <Link to="/intruder-game/play/ceff6ae6-fe21-456a-9b57-29f07b5b52d5">
                <StoriesCardNoRating
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
              </Link>

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
