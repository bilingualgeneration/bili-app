// TODO: audio does not account for inclusive

import { AudioButton } from "@/components/AudioButton";
import classnames from "classnames";
import { I18nMessage } from "@/components/I18nMessage";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { useLanguage } from "@/hooks/Language";

import "./AffirmationsGame.scss";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import { car } from "ionicons/icons";

interface AffirmationsCardProps {
  image: any;
  setShowFront: any;
  showFront: boolean;
  text_back: any[];
  text_front: any[];
}

type MultilingualTextAndAudio = any;

const AffirmationsCard: React.FC<AffirmationsCardProps> = ({
  image,
  text_back,
  text_front,
  setShowFront,
  showFront,
}) => {
  return (
    <span className="affirmations-card-wrapper">
      <IonCard
        className={classnames("affirmations-card padding-horizontal-2", {
          front: showFront,
          back: !showFront,
        })}
      >
        <div className="flap" onClick={() => setShowFront(!showFront)}></div>
        <IonCardContent>
          {showFront ? (
            <IonGrid className="responsive-height">
              <IonRow className="ion-align-items-stretch responsive-height">
                <IonCol style={{ aspectRatio: 1.35 }}>
                  <img
                    src={image.url}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      objectPosition: "center",
                    }}
                    alt="Affirmation"
                  />
                </IonCol>
                <IonCol className="flex flex-column ion-justify-content-center ion-text-center">
                  <h1 className="text-3xl semibold color-suelo">
                    {text_front[0].text}
                  </h1>
                  {text_front[1] && (
                    <p className="text-xl color-english">
                      {text_front[1].text}
                    </p>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          ) : (
            <div
              className="ion-justify-content-center ion-align-items-center"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <IonText>
                <p className="text-3xl semibold color-suelo">
                  {text_back[0].text}
                </p>
                {text_back[1] && (
                  <p className="text-xl color-english margin-top-1">
                    {text_back[1].text}
                  </p>
                )}
              </IonText>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </span>
  );
};

export const AffirmationsGame: React.FC = () => {
  //@ts-ignore
  const { state } = useLocation<{
    cardIndex?: number;
    uniqueClicks?: number;
  }>();
  const { pack_id } = useParams<{ pack_id: string }>();
  return (
    <FirestoreDocProvider collection="affirmation" id={pack_id}>
      <AffirmationsHydratedGame
        pack_id={pack_id}
        startingCardIndex={state?.cardIndex ?? 0}
        uniqueClicks={state?.uniqueClicks ?? 0}
      />
    </FirestoreDocProvider>
  );
};

const CARDS_PER_PAGE = 1;

type Status = "error" | "loading" | "ready";

const AffirmationsHydratedGame: React.FC<{
  pack_id: string;
  startingCardIndex: number;
  uniqueClicks: number;
}> = ({ pack_id, startingCardIndex, uniqueClicks }) => {
  const { status, data } = useFirestoreDoc();
  const { languageNormalized } = useLanguage();
  if (status === "loading") {
    // todo: loading screen
    return <></>;
  }

  if (status === "error") {
    // todo: better error checking
    return <></>;
  }
  return (
    <AffirmationsHydratedFilteredGame
      cards={data.cards.filter((c: any) =>
        c.text_front.some((t: any) => t.language === languageNormalized),
      )}
      pack_id={pack_id}
      startingCardIndex={startingCardIndex}
      uniqueClicks={uniqueClicks}
    />
  );
};

const AffirmationsHydratedFilteredGame: React.FC<{
  cards: any[];
  pack_id: string;
  startingCardIndex: number;
  uniqueClicks: number;
}> = ({ cards, pack_id, startingCardIndex, uniqueClicks }) => {
  const history = useHistory();
  const [cardIndex, setCardIndex] = useState<number>(startingCardIndex);
  const [showFront, setShowFront] = useState<boolean>(true);
  const [uniqueClickCount, setUniqueClickCount] =
    useState<number>(uniqueClicks);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const { filterText } = useLanguage();
  const text_front_filtered = filterText(cards[cardIndex].text_front);
  const text_back_filtered = filterText(cards[cardIndex].text_back);
  const audio = Object.fromEntries(
    showFront
      ? text_front_filtered.map((t: any) => [t.language, t.audio.url])
      : text_back_filtered.map((t: any) => [t.language, t.audio.url]),
  );

  const { clearAudio } = useAudioManager();
  const canBackward = cardIndex > 0;
  const canForward = cardIndex + CARDS_PER_PAGE < cards.length;

  const handleAudioClick = () => {
    if (currentCardId !== cards[cardIndex].id) {
      setCurrentCardId(cards[cardIndex].id); // Update the card ID to the current one

      const newCount = uniqueClickCount + 1; // Calculate new total clicks
      setUniqueClickCount(newCount);
    }
  };

  const changeCard = useCallback(
    (direction: string) => {
      switch (direction) {
        case "forward":
          if (canForward) {
            const nextCardIndex = cardIndex + 1;
            console.log(uniqueClickCount, "clicks");
            // Check 5, 10, 15, etc., cards
            if (uniqueClickCount > 0 && uniqueClickCount % 5 === 0) {
              const destination =
                (uniqueClickCount / 5) % 2 === 0
                  ? "/community/thoughts"
                  : "/community/feelings";
              history.push(destination, {
                cardIndex: nextCardIndex,
                pack_id: pack_id,
                uniqueClicks: uniqueClickCount,
              });
              return; // Stop here to trigger navigation
            }
            clearAudio();
            setShowFront(true);
            setCardIndex(
              Math.min(
                cards.length - CARDS_PER_PAGE,
                cardIndex + CARDS_PER_PAGE,
              ),
            );
          }
          return;
        case "backward":
          if (canBackward) {
            clearAudio();
            setShowFront(true);
            setCardIndex(Math.max(0, cardIndex - CARDS_PER_PAGE));
          }
          return;
        default:
          // do nothing
          return;
      }
    },
    [cards, cardIndex, clearAudio, setCardIndex, setShowFront],
  );

  return (
    <IonGrid>
      <IonRow>
        <IonCol
          className="ion-text-center ion-justify-content-center"
          size="4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1 className="text-4xl semibold">
            <I18nMessage id="affirmations.game.title" />
          </h1>
          <I18nMessage
            id="affirmations.game.title"
            level={2}
            wrapper={(text: string) => (
              <p className="text-2xl color-english">{text}</p>
            )}
          />
          <div className="margin-top-1">
            <AudioButton audio={audio} onClick={handleAudioClick} />
          </div>
        </IonCol>
        <IonCol size="8" className="padding-horizontal-2">
          <div>
            <IonImg
              className="affirmations-page-control backward"
              style={{ display: canBackward ? "block" : "none" }}
              onClick={() => changeCard("backward")}
              src={backward}
            />
            <AffirmationsCard
              image={cards[cardIndex].image}
              key={cards[cardIndex].id}
              setShowFront={setShowFront}
              showFront={showFront}
              text_back={text_back_filtered}
              text_front={text_front_filtered}
            />
            <IonImg
              className="affirmations-page-control forward"
              style={{ display: canForward ? "block" : "none" }}
              onClick={() => changeCard("forward")}
              src={forward}
            />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
