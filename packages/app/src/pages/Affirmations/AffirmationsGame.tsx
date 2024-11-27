// TODO: replace with Carousel component
// TODO: audio does not account for inclusive

import { AudioButton } from "@/components/AudioButton";
import { I18nMessage } from "@/components/I18nMessage";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
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

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

interface AffirmationsCardProps {
  image: any;
  text_back: any;
  text_front: any;
}

type MultilingualTextAndAudio = any;

const AffirmationsCard: React.FC<AffirmationsCardProps> = ({
  image,
  text_back,
  text_front,
}) => {
  const { filterText } = useLanguage();
  const { addAudio } = useAudioManager();
  const [showFront, setShowFront] = useState<boolean>(true);
  const text_front_filtered = filterText(text_front);
  const text_back_filtered = filterText(text_back);
  const audio = Object.fromEntries(
    showFront
      ? text_front_filtered.map((t: any) => [t.language, t.audio.url])
      : text_back_filtered.map((t: any) => [t.language, t.audio.url]),
  );
  return (
    <>
      <IonCard
        className="drop-shadow ion-no-padding"
        style={{
          aspectRatio: 1200 / 1950,
          backgroundImage: showFront ? `url('${image.url}')` : "",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundColor: showFront ? "inherit" : "#D6D3F0",
        }}
        onClick={() => {
          setShowFront(!showFront);
        }}
      >
        <IonCardContent
          className="ion-text-center"
          style={{
            alignSelf: "stretch",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {showFront && (
            <>
              <div></div>
              <IonText>
                <h1 className="text-xl semibold color-suelo">
                  {text_front_filtered[0].text}
                </h1>
                {text_front_filtered[1] && (
                  <p className="text-lg color-english">
                    {text_front_filtered[1].text}
                  </p>
                )}
              </IonText>
            </>
          )}
          {!showFront && (
            <div className="ion-text-left" style={{ height: "100%" }}>
              <h1 className="text-xl semibold color-suelo">
                <I18nMessage id="affirmations.card.back.title" />
              </h1>
              <I18nMessage
                id="affirmations.card.back.title"
                level={2}
                wrapper={(text: string) => (
                  <p className="text-lg color-english">{text}</p>
                )}
              />
              <div
                style={{
                  borderTop: "0.125rem solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
                className="margin-top-1 margin-bottom-1"
              >
                <IonText>
                  <p className="text-xl semibold color-suelo">
                    {text_back_filtered[0].text}
                  </p>
                  {text_back_filtered[1] && (
                    <p className="text-lg color-english margin-top-1">
                      {text_back_filtered[1].text}
                    </p>
                  )}
                </IonText>
              </div>
            </div>
          )}
        </IonCardContent>
      </IonCard>
      <div className="ion-text-center margin-top-3">
        <AudioButton audio={audio} />
      </div>
    </>
  );
};

export const AffirmationsGame: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  return (
    <FirestoreDocProvider collection="affirmation" id={pack_id}>
      <AffirmationsHydratedGame />
    </FirestoreDocProvider>
  );
};

const CARDS_PER_PAGE = 3;

type Status = "error" | "loading" | "ready";

const AffirmationsHydratedGame: React.FC = () => {
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
    />
  );
};

const AffirmationsHydratedFilteredGame: React.FC<any> = ({ cards }) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const { languageNormalized } = useLanguage();

  const canBackward = cardIndex > 0;
  const canForward = cardIndex + CARDS_PER_PAGE < cards.length;

  return (
    <>
      <IonGrid>
        <IonRow style={{ alignItems: "stretch" }}>
          <IonCol size="auto" style={{ display: "flex" }}>
            <IonImg
              className="page-control backward"
              style={{
                opacity: canBackward ? 1 : 0,
              }}
              onClick={() => {
                if (canBackward) {
                  setCardIndex(Math.max(0, cardIndex - CARDS_PER_PAGE));
                }
              }}
              src={backward}
            />
          </IonCol>
          {cards.slice(cardIndex, cardIndex + CARDS_PER_PAGE).map((c: any) => (
            <IonCol size="4" key={c.id}>
              <AffirmationsCard
                image={c.image}
                text_back={c.text_back}
                text_front={c.text_front}
              />
            </IonCol>
          ))}
          <IonCol size="auto" style={{ display: "flex" }}>
            <IonImg
              className="page-control forward"
              style={{
                opacity: canForward ? 1 : 0,
              }}
              onClick={() => {
                if (canForward) {
                  setCardIndex(
                    Math.min(
                      cards.length - CARDS_PER_PAGE,
                      cardIndex + CARDS_PER_PAGE,
                    ),
                  );
                }
              }}
              src={forward}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
