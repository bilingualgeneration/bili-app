import React, { useState, useCallback } from "react";
import { IonImg, IonGrid, IonRow, IonCol } from "@ionic/react";
import { AudioButton } from "@/components/AudioButton";
import { I18nMessage } from "@/components/I18nMessage";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { Card } from "./Card";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

import "./CardSlider.scss";
import { useHistory } from "react-router";

export interface CardSliderProps {
  cards: {
    id: string;
    image: { url: string };
    text_front: { text: string }[];
    text_back: { text: string }[];
  }[];
  cardsPerPage?: number;
  startingCardIndex: number;
  uniqueClicks: number;
  pack_id: string;
}

export const CardSlider: React.FC<CardSliderProps> = ({
  cards,
  cardsPerPage = 1,
  startingCardIndex,
  uniqueClicks,
  pack_id,
}) => {
  const history = useHistory();

  const [cardIndex, setCardIndex] = useState<number>(startingCardIndex);
  const [showFront, setShowFront] = useState<boolean>(true);
  const [uniqueClickCount, setUniqueClickCount] =
    useState<number>(uniqueClicks);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const { filterText } = useLanguage();
  const text_front_filtered = filterText(cards[cardIndex].text_front);
  const text_back_filtered = filterText(cards[cardIndex].text_back);

  const { clearAudio } = useAudioManager();
  const audio = Object.fromEntries(
    showFront
      ? text_front_filtered.map((t: any) => [t.language, t.audio.url])
      : text_back_filtered.map((t: any) => [t.language, t.audio.url]),
  );

  const canBackward = cardIndex > 0;
  const canForward = cardIndex + cardsPerPage < cards.length;

  const handleAudioClick = () => {
    if (currentCardId !== cards[cardIndex].id) {
      setCurrentCardId(cards[cardIndex].id);
      const newCount = uniqueClickCount + 1;
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
              Math.min(cards.length - cardsPerPage, cardIndex + cardsPerPage),
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
    [cards, cardIndex, clearAudio, setCardIndex, setShowFront],
  );

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
              <I18nMessage id="affirmations.game.title" />
            </h1>
            <I18nMessage
              id="affirmations.game.title"
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
              image={cards[cardIndex].image}
              key={cards[cardIndex].id}
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
