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
              <Link to="/intruder/play/9262a65e-0e73-4cbb-988e-697e82d5cb93">
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
