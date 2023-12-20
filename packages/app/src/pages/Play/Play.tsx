import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";

import { Link } from "react-router-dom";

import { useIntl } from "react-intl";

import "./Play.scss";

// todo: put textured background

interface PlayCard {
  // todo: try to find a way to use a css variable for this?
  i18nId: string;
  i18nDefaultMessage: string;
  i18nDescription: string;
  to?: string;
}

const PlayCard: React.FC<PlayCard> = ({
  i18nId,
  i18nDefaultMessage,
  i18nDescription,
  to,
}) => {
  // todo: check if react-intl cli picks this up
  const intl = useIntl();

  // todo: better
  const c = (
    <IonCard>
      <IonCardContent>
        <IonText className="ion-text-center">
          <h1>
            {intl.formatMessage({
              id: i18nId,
              defaultMessage: i18nDefaultMessage,
              description: i18nDescription,
            })}
          </h1>
          <p>{i18nDefaultMessage}</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
  return (
    <IonCol className="playCard">
      {to && <Link to={to}>{c}</Link>}
      {!to && c}
    </IonCol>
  );
};

export const Play = () => {
  const cards: PlayCard[] = [
    {
      i18nId: "play.card.story-factory",
      i18nDefaultMessage: "Story Factory",
      i18nDescription: "Title for Story Factory Card",
      to: "/story-factory/1",
    },
    {
      i18nId: "play.card.intruder",
      i18nDefaultMessage: "The Intruder",
      i18nDescription: "Title for Intruder Card",
    },
    {
      i18nId: "play.card.count",
      i18nDefaultMessage: "Count with Me",
      i18nDescription: "Title for Count with Me Card",
    },
  ];
  return (
    <IonGrid>
      <IonRow>
        {cards.map((card) => (
          <PlayCard {...card} key={card.i18nId} />
        ))}
      </IonRow>
    </IonGrid>
  );
};
