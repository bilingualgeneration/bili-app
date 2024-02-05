import { FC } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useIntl } from "react-intl";
import MagnifyingGlass from "@/assets/icons/magnifying_glass.png";
import FactoryWidget from "@/assets/icons/factory_widget.png";
import { FormattedMessage } from "react-intl";
import { PlayHeader } from "@/components/PlayHeader";

import "./Play.scss";

const StoryFactoryCard: FC = () => {
  const { isImmersive } = useProfile();
  const history = useHistory();
  return (
    <div
      id="storyFactoryCard"
      className="card"
      onClick={() => {
        history.push("/story-factory/1");
      }}
    >
      <div className="spreader"></div>
      <img src={FactoryWidget} />
      <IonText>
        <h1 className="ion-text-center">
          <FormattedMessage
            id="common.storyFactory"
            defaultMessage="Story Factory!"
            description="Standalone label for Story Factory"
          />
        </h1>
      </IonText>
      {!isImmersive && <h2>Story Factory</h2>}
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
        history.push("/intruder/intro");
      }}
    >
      <div className="spreader"></div>
      <img src={MagnifyingGlass} />
      <h1>
        <FormattedMessage
          id="common.theIntruder"
          defaultMessage="The Intruder"
          description="Standalone label for The Intruder"
        />
      </h1>

      {!isImmersive && <h2>The Intruder</h2>}
    </div>
  );
};

const CountCard: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="countCard" className="card">
      <div className="spreader"></div>
      <h1>
        <FormattedMessage
          id="common.countWithMe"
          defaultMessage="Count with Me"
          description="Standalone label for Count with Me"
        />
      </h1>
      {!isImmersive && <h2>Count with Me</h2>}
    </div>
  );
};

export const Play: FC = () => {
  const { isImmersive } = useProfile();
  return (
    <div id="playPage">
      <PlayHeader />
      <div id="playCardWrapper">
        <StoryFactoryCard />
        <IntruderCard />
        <CountCard />
      </div>
    </div>
  );
};
