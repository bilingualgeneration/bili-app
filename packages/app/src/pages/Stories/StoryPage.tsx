import { AudioButton } from "@/components/AudioButton";
import classnames from "classnames";
import { IonCol, IonCard, IonCardContent, IonRow, IonText } from "@ionic/react";
import { SegmentedText } from "./SegmentedText";
import { VocabModal } from "./VocabModal";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useStory } from "./StoryContext";
import { useEffect } from "react";

interface StoryPage {
  languages: any[];
  page: any;
  textSize: string;
  onAudioReady?: (audio: Record<string, string>) => void;
}

interface Lookup {
  [key: string]: string;
}

const textSizePrimaryLookup: Lookup = {
  small: "text-2xl",
  default: "text-3xl",
  large: "text-4xl",
};

const textSizeSecondaryLookup: Lookup = {
  small: "text-lg",
  default: "text-2xl",
  large: "text-3xl",
};

export const StoryPage: React.FC<React.PropsWithChildren<StoryPage>> = ({
  languages,
  page,
  textSize,
  onAudioReady,
}) => {
  const { isTranslanguaged, pageNumber, pages, pageForward, pageBackward } =
    useStory();
  const { clearAudio } = useAudioManager();
  const { filterText, languageNormalized } = useLanguage();

  if (!languages.includes(languageNormalized)) {
    pageBackward();
  }

  useEffect(() => {
    return clearAudio;
  }, []);
  useEffect(() => {
    clearAudio();
  }, [pageNumber]);

  const texts = isTranslanguaged
    ? [filterText(page.text)[0]]
    : filterText(page.text);

  useEffect(() => {
    if (onAudioReady && texts.length) {
      const map = Object.fromEntries(
        texts.map((t: any) => [t.language, t.audio.url]),
      );
      onAudioReady(map);
    }
  }, [texts, onAudioReady]);

  if (texts.length === 0) {
    return <></>;
  }

  return (
    <>
      <IonCol size="6">
        <IonCard
          className="drop-shadow story-page"
          style={{ marginLeft: "auto" }}
        >
          <IonCardContent
            className="ion-text-center ion-no-padding"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              margin: "0.6rem",
            }}
          >
            <div></div>
            <IonText className="ion-text-center">
              <h1
                className={classnames(
                  "semibold color-suelo",
                  textSizePrimaryLookup[textSize],
                )}
              >
                <SegmentedText text={texts[0].text} />
              </h1>
              {texts.length > 1 && (
                <p
                  className={classnames(
                    "color-english",
                    textSizeSecondaryLookup[textSize],
                  )}
                >
                  <SegmentedText text={texts[1].text} />
                </p>
              )}
            </IonText>
            <div>
              {/*
              <AudioButton
                audio={Object.fromEntries(
                  texts.map((t: any) => [t.language, t.audio.url]),
                )}
              />
              */}
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol size="6">
        <IonCard className="drop-shadow story-page">
          <IonCardContent className="ion-text-center ion-no-padding">
            <img src={page.image.url} />
          </IonCardContent>
        </IonCard>
      </IonCol>
      <VocabModal />
    </>
  );
};
