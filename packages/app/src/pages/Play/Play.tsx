import { FC } from "react";
import { IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import CountWithMe from "@/assets/icons/count_with_me.png";
import MagnifyingGlass from "@/assets/icons/magnifying_glass.png";
import FactoryWidget from "@/assets/icons/factory_widget.png";
import { FavoriteButton } from "@/components/FavoriteButton";
import { FormattedMessage } from "react-intl";
import { PlayHeader } from "@/components/PlayHeader";
import { Carousel } from "@/components/Carousel";
import { CategoryTag } from "@/components/CategoryTag";
import { useLanguageToggle } from "@/components/LanguageToggle";

import "./Play.css";

type PlayCardProps = {
  id: string;
  url: string;
  imgUrl: string;
  title: {
    id: string;
    defaultMessage: string;
    description: string;
  };
  altTitle: string;
  fid: string;
};

const PlayCard = ({ id, url, imgUrl, title, altTitle, fid }: PlayCardProps) => {
  const { language } = useLanguageToggle();
  const history = useHistory();
  return (
    <div
      id={id}
      className="card"
      onClick={() => {
        history.push(url);
      }}
    >
      <CategoryTag category="play" className="play-category-tag" />
      <img src={imgUrl} />

      <div className="cardTitles">
        <IonText>
          <h1 className="text-4xl semibold">
            <FormattedMessage
              id={title.id}
              defaultMessage={title.defaultMessage}
              description={title.description}
            />
          </h1>
        </IonText>

        <IonText>
          {language === "esen" && (
            <p className="text-3xl color-nube">{altTitle}</p>
          )}
        </IonText>
      </div>

      <FavoriteButton fid={fid} />
    </div>
  );
};

const playCardData: PlayCardProps[] = [
  {
    id: "storyFactoryCard",
    url: "/story-factory-game/intro",
    imgUrl: FactoryWidget,
    title: {
      id: "common.storyFactory",
      defaultMessage: "Story Factory!",
      description: "Standalone label for Story Factory",
    },
    altTitle: "Story Factory",
    fid: "category-story factory",
  },
  {
    id: "intruderCard",
    url: "/intruder-game/intro",
    imgUrl: MagnifyingGlass,
    title: {
      id: "common.theIntruder",
      defaultMessage: "The Intruder",
      description: "Standalone label for The Intruder",
    },
    altTitle: "The Intruder",
    fid: "category-the intruder",
  },
  {
    id: "countCard",
    url: "/count-with-me-game/intro",
    imgUrl: CountWithMe,
    title: {
      id: "common.countWithMe",
      defaultMessage: "Count with Me",
      description: "Standalone label for Count with Me",
    },
    altTitle: "Count with Me",
    fid: "category-count with me",
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
