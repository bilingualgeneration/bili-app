import { AudioButton } from "@/components/AudioButton";
import { IonCol, IonCard, IonCardContent, IonRow, IonText } from "@ionic/react";
import { SegmentedText } from "./SegmentedText";
import { VocabModal } from "./VocabModal";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useStory } from "./StoryContext";
import { useEffect } from "react";

export const StoryPage: React.FC<
  React.PropsWithChildren<{ page: any; languages: any[] }>
> = ({ page, languages }) => {
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
  if (texts.length === 0) {
    return <></>;
  }
  return (
    <>
      <IonCol size="6">
        <IonCard className="drop-shadow story-page">
          <IonCardContent
            className="ion-text-center ion-no-padding"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div></div>
            <IonText className="ion-text-center">
              <h1 className="text-1_5xl semibold color-suelo">
                <SegmentedText text={texts[0].text} />
              </h1>
              {texts.length > 1 && (
                <p className="text-lg color-english">
                  <SegmentedText text={texts[1].text} />
                </p>
              )}
            </IonText>
            <div>
              <AudioButton
                audio={Object.fromEntries(
                  texts.map((t: any) => [t.language, t.audio.url]),
                )}
              />
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
