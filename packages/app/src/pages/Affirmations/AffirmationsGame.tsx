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
    <IonCard
      className="affirmations-card drop-shadow ion-no-padding"
      style={{
        aspectRatio: 1950 / 1200,
        maxWidth: "650px",
        backgroundColor: showFront ? "inherit" : "#D6D3F0",
        cursor: "pointer",
        borderRadius: "2rem",
      }}
      onClick={() => setShowFront(!showFront)}
    >
      <IonCardContent
        style={{
          alignSelf: "stretch",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
        }}
      >
        {showFront ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img src={image.url} alt="Affirmation" style={{ width: "47%" }} />
            <div
              style={{ flex: "1", marginLeft: "0.5rem", marginRight: "1rem" }}
            >
              <h1 className="text-3xl semibold color-suelo">
                {text_front_filtered[0].text}
              </h1>
              {text_front_filtered[1] && (
                <p className="text-xl color-english">
                  {text_front_filtered[1].text}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IonText>
              <p className="text-3xl semibold color-suelo">
                {text_back_filtered[0].text}
              </p>
              {text_back_filtered[1] && (
                <p className="text-xl color-english margin-top-1">
                  {text_back_filtered[1].text}
                </p>
              )}
            </IonText>
          </div>
        )}
      </IonCardContent>
    </IonCard>
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

const CARDS_PER_PAGE = 1;

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
  const canBackward = cardIndex > 0;
  const canForward = cardIndex + CARDS_PER_PAGE < cards.length;

  return (
    <IonGrid
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        marginTop: "-4rem",
      }}
    >
      <IonRow
        style={{
          width: "100%",
        }}
      >
        <IonCol
          size="4"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            paddingLeft: "4rem",
          }}
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
            <AudioButton audio={{}} />
          </div>
        </IonCol>
        <IonCol
          size="8"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IonImg
              className="page-control backward"
              style={{
                display: canBackward ? "block" : "none",
                opacity: 1,
                position: "absolute",
                left: "-1rem",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
                width: "10%",
              }}
              onClick={() => {
                if (canBackward) {
                  setCardIndex(Math.max(0, cardIndex - CARDS_PER_PAGE));
                }
              }}
              src={backward}
            />
            <div style={{ flex: 1, margin: "0 1rem", textAlign: "center" }}>
              <AffirmationsCard
                key={cards[cardIndex].id}
                image={cards[cardIndex].image}
                text_back={cards[cardIndex].text_back}
                text_front={cards[cardIndex].text_front}
              />
            </div>
            <IonImg
              className="page-control forward"
              style={{
                display: canForward ? "block" : "none",
                opacity: 1,
                position: "absolute",
                right: "-1rem",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
                width: "10%",
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
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
