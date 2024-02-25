import { FC } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useIntl } from "react-intl";
import CountWithMe from "@/assets/icons/count_with_me.png";
import MagnifyingGlass from "@/assets/icons/magnifying_glass.png";
import FactoryWidget from "@/assets/icons/factory_widget.png";
import { FavoriteButton } from "@/components/FavoriteButton";
import { FormattedMessage } from "react-intl";
import { PlayHeader } from "@/components/PlayHeader";
import { Link } from "react-router-dom";
import { Carousel } from "@/components/Carousel";
import { CategoryTag } from "@/components/CategoryTag";

import "./Play.scss";

const StoryFactoryCard: FC = () => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <div
      id="storyFactoryCard"
      className="card"
      onClick={() => {
        history.push("/story-factory-game/intro");
      }}
    >
      <CategoryTag category="play" className="play-category-tag" />
      <FavoriteButton fid="category-story factory" />
      <img src={FactoryWidget} />
      <IonText>
        <h1 className="text-4xl semibold">
          <FormattedMessage
            id="common.storyFactory"
            defaultMessage="Story Factory!"
            description="Standalone label for Story Factory"
          />
        </h1>
        {!isImmersive && <p className="text-3xl color-nube">Story Factory</p>}
      </IonText>
    </div>
  );
};

const IntruderCard: FC = () => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <div
      id="intruderCard"
      className="card"
      onClick={() => {
        history.push("/intruder-game/intro");
      }}
    >
      <CategoryTag category="play" className="play-category-tag" />
      <FavoriteButton fid="category-the intruder" />
      <img src={MagnifyingGlass} />
      <IonText>
        <h1 className="text-4xl semibold">
          <FormattedMessage
            id="common.theIntruder"
            defaultMessage="The Intruder"
            description="Standalone label for The Intruder"
          />
        </h1>

        {!isImmersive && <p className="text-3xl color-nube">The Intruder</p>}
      </IonText>
    </div>
  );
};

const CountCard: FC = () => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <div
      id="countCard"
      className="card"
      onClick={() => {
        history.push(
          "/count-with-me-game/intro",
        );
      }}
    >
      <CategoryTag category="play" className="play-category-tag" />
      <FavoriteButton fid="category-count with me" />
      <img src={CountWithMe} />
      <IonText>
        <h1 className="text-4xl semibold">
          <FormattedMessage
            id="common.countWithMe"
            defaultMessage="Count with Me"
            description="Standalone label for Count with Me"
          />
        </h1>
        {!isImmersive && <p className="text-3xl color-nube">Count with Me</p>}
      </IonText>
    </div>
  );
};

export const Play: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="playPage">
      <PlayHeader />
          <StoryFactoryCard />
          <IntruderCard />
          <CountCard />
    </div>
  );
};
