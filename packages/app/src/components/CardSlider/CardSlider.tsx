import React, { useState, useCallback, useEffect } from "react";
import { IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { AudioButton } from "@/components/AudioButton";
import { I18nMessage } from "@/components/I18nMessage";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useHistory, useLocation } from "react-router";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { Card } from "./Card";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

import "./CardSlider.scss";

export interface CardSliderProps {
  title_id: string;
  startingCardIndex?: number;
  uniqueClicks?: number;
  cardsPerPage?: number;
}

interface LocationState {
  returnTo?: string;
  cardIndex?: number;
  uniqueClicks?: number;
}

export const CardSlider: React.FC<CardSliderProps> = ({
  title_id,
  startingCardIndex = 0,
  uniqueClicks = 0,
  cardsPerPage = 1,
}) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [cardIndex, setCardIndex] = useState<number>(startingCardIndex);
  const [showFront, setShowFront] = useState<boolean>(true);
  const [uniqueClickCount, setUniqueClickCount] =
    useState<number>(uniqueClicks);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const { status, data } = useFirestoreDoc();
  const { languageNormalized, filterText } = useLanguage();
  const { clearAudio } = useAudioManager();

  const filteredCards = data?.cards
    ? data.cards.filter((card: any) =>
        card.text_front.some(
          (text: any) => text.language === languageNormalized,
        ),
      )
    : [];

  const text_front_filtered = React.useMemo(
    () => filterText(filteredCards[cardIndex]?.text_front || []),
    [filteredCards, cardIndex, filterText],
  );
  const text_back_filtered = React.useMemo(
    () => filterText(filteredCards[cardIndex]?.text_back || []),
    [filteredCards, cardIndex, filterText],
  );

  const audio = Object.fromEntries(
    showFront
      ? text_front_filtered.map((t: any) => [t.language, t.audio?.url || ""])
      : text_back_filtered.map((t: any) => [t.language, t.audio?.url || ""]),
  );

  const canBackward = cardIndex > 0;
  const canForward = cardIndex + cardsPerPage < filteredCards.length;

  const handleAudioClick = () => {
    if (currentCardId !== filteredCards[cardIndex]?.id) {
      setCurrentCardId(filteredCards[cardIndex]?.id);
      const newCount = uniqueClickCount + 1;
      setUniqueClickCount(newCount);

      if (newCount > 0 && newCount % 5 === 0) {
        const destination =
          (newCount / 5) % 2 === 0
            ? "/community/thoughts"
            : "/community/feelings";
        history.push(destination, {
          cardIndex,
          uniqueClicks: newCount,
          returnTo: location.pathname,
        });
        return;
      }
    }
  };

  useEffect(() => {
    if (location.state?.returnTo === location.pathname) {
      const { cardIndex, uniqueClicks } = location.state;
      setCardIndex(cardIndex ?? 0);
      setUniqueClickCount(uniqueClicks ?? 0);
      setShowFront(true);
    }
  }, [location.state]);

  const changeCard = useCallback(
    (direction: string) => {
      switch (direction) {
        case "forward":
          if (canForward) {
            const nextCardIndex = cardIndex + 1;
            clearAudio();
            setShowFront(true);
            setCardIndex(
              Math.min(filteredCards.length - cardsPerPage, nextCardIndex),
            );
          }
          return;
        case "backward":
          if (canBackward) {
            clearAudio();
            setShowFront(true);
            setCardIndex(Math.max(0, cardIndex - cardsPerPage));
          }
          return;
        default:
          // do nothing
          return;
      }
    },
    [
      cardIndex,
      canForward,
      canBackward,
      filteredCards,
      clearAudio,
      setCardIndex,
      setShowFront,
      cardsPerPage,
    ],
  );

  if (status === "loading") {
    return <div>Loading cards...</div>;
  }
  if (status === "error" || !data || !data.cards) {
    return <div>Error loading cards.</div>;
  }

  return (
    <div className="responsive-height-with-header flex ion-align-items-center">
      <IonGrid>
        <IonRow>
          <IonCol
            className="ion-text-center ion-justify-content-center"
            size="4"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1 className="text-4xl semibold">
              <I18nMessage id={title_id} />
            </h1>
            <I18nMessage
              id={title_id}
              level={2}
              wrapper={(text: string) => (
                <p className="text-2xl color-english">{text}</p>
              )}
            />
            <div className="margin-top-1" onClick={handleAudioClick}>
              <AudioButton audio={audio} />
            </div>
          </IonCol>
          <IonCol size="8" className="padding-horizontal-2">
            <IonImg
              className="page-control backward"
              style={{ display: canBackward ? "block" : "none" }}
              onClick={() => changeCard("backward")}
              src={backward}
            />
            <Card
              image={filteredCards[cardIndex]?.image || { url: "" }}
              key={filteredCards[cardIndex]?.id || ""}
              setShowFront={setShowFront}
              showFront={showFront}
              text_back={text_back_filtered}
              text_front={text_front_filtered}
            />
            <IonImg
              className="page-control forward"
              style={{ display: canForward ? "block" : "none" }}
              onClick={() => changeCard("forward")}
              src={forward}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
