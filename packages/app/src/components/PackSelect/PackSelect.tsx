import { FormattedMessage } from "react-intl";
import { gameControllerOutline } from "ionicons/icons";
import Heart from "@/assets/icons/heart.svg?react";
import { IonCard, IonIcon, IonText } from "@ionic/react";
import { Link } from "react-router-dom";
import { PlayHeader } from "@/components/PlayHeader";
import { StoriesCardNoRating } from "@/components/StoryFactory/StoriesCardNoRating";
import { useProfile } from "@/contexts/ProfileContext";

interface props {
  headerComponent: React.ReactNode;
  module: string;
  packId: string;
  translatedTitle: React.ReactNode;
  englishTitle: string;
}

export const PackSelect: React.FC<props> = ({
  headerComponent,
  module,
  packId,
  translatedTitle,
  englishTitle,
}) => {
  const { isImmersive } = useProfile();
  return (
    <>
      {headerComponent}
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
              <h1>{translatedTitle}</h1>
              {!isImmersive && <h2>{englishTitle}</h2>}
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
              <Link to={`/${module}/play/${packId}`}>
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
