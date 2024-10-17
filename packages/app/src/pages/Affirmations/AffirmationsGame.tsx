// TODO: replace with Carousel component
// TODO: audio does not account for inclusive

import { AudioButton } from "@/components/AudioButton";

import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useEffect, useState } from "react";
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
import { useLanguageToggle } from "@/components/LanguageToggle";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

interface AffirmationsCardProps {
  image: any;
  text_back: any;
  text_front: any;
}

/*
   interface MultilingualTextAndAudio {
   language: 'en' | 'en-inc' | 'es' | 'es-inc',
   text: string
   audio: any
   }
 */

type MultilingualTextAndAudio = any;

const AffirmationsCard: React.FC<AffirmationsCardProps> = ({
  image,
  text_back,
  text_front,
}) => {
  const { language } = useLanguageToggle();
  const { addAudio } = useAudioManager();
  const [showFront, setShowFront] = useState<boolean>(true);
  const text_back_es = text_back.filter(
    (t: MultilingualTextAndAudio) => t.language === "es",
  )[0];
  const text_back_es_inc = text_back.filter(
    (t: MultilingualTextAndAudio) => t.language === "es-inc",
  )[0];
  const text_back_en = text_back.filter(
    (t: MultilingualTextAndAudio) => t.language === "en",
  )[0];
  const text_front_es = text_front.filter(
    (t: MultilingualTextAndAudio) => t.language === "es",
  )[0];
  const text_front_es_inc = text_front.filter(
    (t: MultilingualTextAndAudio) => t.language === "es-inc",
  )[0];
  const text_front_en = text_front.filter(
    (t: MultilingualTextAndAudio) => t.language === "en",
  )[0];
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
                  {language !== "en" ? text_front_es.text : text_front_en.text}
                </h1>
                {language === "esen" && (
                  <p className="text-lg color-english">{text_front_en.text}</p>
                )}
              </IonText>
            </>
          )}
          {!showFront && (
            <div className="ion-text-left" style={{ height: "100%" }}>
              <h1 className="text-xl semibold color-suelo">
                {language !== "en" ? "¡Platiquemos!" : "Let's Talk!"}
              </h1>
              {language === "esen" && (
                <h2 className="text-lg color-english">Let's Talk!</h2>
              )}
              <div
                style={{
                  borderTop: "2px solid black",
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
                    {language !== "en" ? text_back_es.text : text_back_en.text}
                  </p>
                  {language === "esen" && (
                    <p className="text-lg color-english margin-top-1">
                      {text_back_en.text}
                    </p>
                  )}
                </IonText>
              </div>
            </div>
          )}
        </IonCardContent>
      </IonCard>
      <div className="ion-text-center margin-top-3">
        <AudioButton
          audio={{
            en: { url: text_front_en.audio.url },
            es: { url: text_front_es.audio.url },
          }}
        />
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
  const [cardIndex, setCardIndex] = useState<number>(0);
  const { status, data } = useFirestoreDoc();

  if (status === "loading") {
    // todo: loading screen
    return <></>;
  }

  if (status === "error") {
    // todo: better error checking
    return <></>;
  }

  const canBackward = cardIndex > 0;
  const canForward = cardIndex + CARDS_PER_PAGE < data.cards.length;

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
          {data.cards
            .slice(cardIndex, cardIndex + CARDS_PER_PAGE)
            .map((c: any) => (
              <IonCol key={c.id}>
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
                      data.cards.length - CARDS_PER_PAGE,
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
