// TODO: refactor how i18n keys are structured

import { ContentLock } from "@/components/ContentLock";
import { I18nMessage } from "@/components/I18nMessage";
import { IonText } from "@ionic/react";
import { Link } from "react-router-dom";

import AffirmationGirl from "@/assets/img/affirmation_girl.png";
import BreathingGirl from "@/assets/img/breathing_girl.png";

import "./Wellness.scss";

interface CardProps {
  background: string;
  image?: string;
  locked?: boolean;
  titleKey?: string;
  url?: string;
}

const Card: React.FC<CardProps> = ({
  background,
  image,
  locked = false,
  titleKey,
  url,
}) => {
  return (
    <div className="wellness-card-wrapper">
      <div className="wellness-card">
        <div
          className={`wellness-card-inner`}
          style={{
            backgroundColor: background,
          }}
        >
          {locked && <ContentLock />}
          <div
            className="wellness-card-image"
            style={{
              backgroundImage: `url('${image}')`,
            }}
          ></div>
          <div className="wellness-card-text">
            {titleKey && (
              <IonText className="ion-text-center">
                <h1 className="text-4xl semibold color-flamenco-lowest">
                  <I18nMessage id={titleKey} />
                </h1>
                <I18nMessage
                  id={titleKey}
                  level={2}
                  wrapper={(text: string) => (
                    <h2 className="text-3xl color-flamenco-lowest">{text}</h2>
                  )}
                />
              </IonText>
            )}
          </div>
        </div>
        {[1, 2, 3, 4].map((number: number) => (
          <div
            className={`wellness-card-fringe`}
            key={number}
            style={{
              backgroundColor: background,
            }}
          >
            {locked && <ContentLock showLock={false} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Wellness: React.FC = () => {
  const cards: CardProps[] = [
    {
      background: "#D6D3F0",
      image: AffirmationGirl,
      titleKey: "wellness.affirmations",
      url: "/affirmations/intro",
    },
    {
      background: "#FDAFDB",
      image: BreathingGirl,
      locked: true,
      titleKey: "wellness.breathingDeeply",
    },
  ];
  return (
    <div id="wellness-cards-wrapper">
      <Card background="#FCDBCC"></Card>
      {cards.map((card: CardProps, index: number) => {
        if (card.url) {
          return (
            <Link key={index} to={card.url}>
              <Card {...card} />
            </Link>
          );
        } else {
          return <Card key={index} {...card} />;
        }
      })}
      <Card background="#FCDBCC"></Card>
    </div>
  );
};
