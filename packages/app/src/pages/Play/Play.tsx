import { ContentLock } from "@/components/ContentLock";
import { FC } from "react";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { FavoriteButton } from "@/components/FavoriteButton";
import { FormattedMessage } from "react-intl";
import { PlayHeader } from "@/components/PlayHeader";
import { Carousel } from "@/components/Carousel";
import { CategoryTag } from "@/components/CategoryTag";
import { I18nMessage } from "@/components/I18nMessage";

import CountWithMe from "@/assets/icons/count_with_me.png";
import MagnifyingGlass from "@/assets/icons/magnifying_glass.png";
import FactoryWidget from "@/assets/icons/factory_widget.png";

import "./Play.scss";

type PlayCardProps = {
  id: string;
  url?: string;
  imgUrl: string;
  i18nKey: string;
  fid: string;
  locked?: boolean;
};

const PlayCard = ({ id, url, imgUrl, i18nKey, fid, locked }: PlayCardProps) => {
  const history = useHistory();
  return (
    <div
      id={id}
      className="play-card"
      onClick={() => {
        if (url) {
          history.push(url);
        }
      }}
    >
      {locked && <ContentLock borderRadius="2rem" />}
      <CategoryTag category="play" className="play-category-tag" />
      <img src={imgUrl} />

      <div className="cardTitles">
        <IonText>
          <h1 className="text-4xl semibold">
            <I18nMessage id={i18nKey} />
          </h1>
          <I18nMessage
            id={i18nKey}
            level={2}
            wrapper={(t: string) => <p className="text-3xl color-nube">{t}</p>}
          />
        </IonText>
      </div>
      <FavoriteButton fid={fid} />
    </div>
  );
};

const playCardData: PlayCardProps[] = [
  {
    id: "storyFactoryCard",
    //url: "/story-factory-game/intro",
    imgUrl: FactoryWidget,
    i18nKey: "common.storyFactory",
    fid: "category-story factory",
    locked: true,
  },
  {
    id: "intruderCard",
    url: "/intruder/intro",
    imgUrl: MagnifyingGlass,
    i18nKey: "common.theIntruder",
    fid: "category-the intruder",
  },
  {
    id: "countCard",
    //url: "/count-with-me-game/intro",
    imgUrl: CountWithMe,
    i18nKey: "common.countWithMe",
    fid: "category-count with me",
    locked: true,
  },
];

export const Play: FC = () => {
  return (
    <div id="playPage">
      <PlayHeader />
      <div className="carousel-container">
        <Carousel height={"30rem"} slideMargin={10}>
          {playCardData.map((card) => (
            <PlayCard key={card.id} {...card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
