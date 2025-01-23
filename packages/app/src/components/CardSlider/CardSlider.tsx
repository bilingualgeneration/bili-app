import { useCardSlider } from "@/contexts/CardSlider";

import React, { useState, useCallback, useEffect } from "react";
import { IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react";
import { AudioButton } from "@/components/AudioButton";
import { first } from "rxjs/operators";
import { I18nMessage } from "@/components/I18nMessage";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useHistory, useLocation } from "react-router";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { Card } from "./Card";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

import "./CardSlider.scss";

export interface CardSliderProps {}

export const CardSlider: React.FC<CardSliderProps> = () => {
  const {
    cards,
    cardClicks,
    currentCardIndex,
    packName,
    setCardClicks,
    setCurrentCardIndex,
    setTimesShownFeedback,
    timesShownFeedback,
  } = useCardSlider();
  const uniqueClicks = 0;
  const history = useHistory();
  const [showFront, setShowFront] = useState<boolean>(true);
  const { filterText } = useLanguage();
  const { clearAudio, onended } = useAudioManager();
  const [] = useState(0);
  const destinations = [
    "/affirmations/feedback/opinion",
    "/affirmations/feedback/feeling",
  ];

  const text_front_filtered = React.useMemo(
    () => filterText(cards[currentCardIndex]?.text_front || []),
    [cards, currentCardIndex, filterText],
  );
  const text_back_filtered = React.useMemo(
    () => filterText(cards[currentCardIndex]?.text_back || []),
    [cards, currentCardIndex, filterText],
  );

  const audio = Object.fromEntries(
    showFront
      ? text_front_filtered.map((t: any) => [t.language, t.audio?.url || ""])
      : text_back_filtered.map((t: any) => [t.language, t.audio?.url || ""]),
  );

  const [lastAudioPlayedId, setLastAudioPlayedId] = useState<string | null>(
    null,
  );

  const canBackward = currentCardIndex > 0;
  const canForward = currentCardIndex + 1 < cards.length;

  const handleAudioClick = () => {
    if (lastAudioPlayedId !== cards[currentCardIndex].id) {
      setLastAudioPlayedId(cards[currentCardIndex].id);
      setCardClicks(cardClicks + 1);
      const newCardClicks = cardClicks + 1;
      setCardClicks(newCardClicks);
      if (newCardClicks % 5 === 0) {
        setTimesShownFeedback(timesShownFeedback + 1);
        onended.pipe(first()).subscribe(() => {
          history.push(destinations[timesShownFeedback % destinations.length]);
        });
      }
    }
  };

  const changeCard = useCallback(
    (direction: string) => {
      switch (direction) {
        case "forward":
          if (canForward) {
            const nextCardIndex = currentCardIndex + 1;
            clearAudio();
            setShowFront(true);
            setCurrentCardIndex(Math.min(cards.length - 1, nextCardIndex));
          }
          return;
        case "backward":
          if (canBackward) {
            clearAudio();
            setShowFront(true);
            setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
          }
          return;
        default:
          // do nothing
          return;
      }
    },
    [
      currentCardIndex,
      canForward,
      canBackward,
      cards,
      clearAudio,
      setCurrentCardIndex,
      setShowFront,
    ],
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
            <IonText>
              <h1 className="text-4xl semibold">{packName[0].text}</h1>
              {packName.length === 2 && (
                <p className="text-2xl color-english">{packName[1].text}</p>
              )}
            </IonText>
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
              image={cards[currentCardIndex]?.image || { url: "" }}
              key={cards[currentCardIndex]?.id || ""}
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
