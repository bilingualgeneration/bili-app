import { AudioButton } from "@/components/AudioButton";
import { CloseButton } from "@/components/CloseButton";
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonRow,
  IonText,
} from "@ionic/react";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";
import { useStory } from "./StoryContext";

import StudentAvatar from "@/assets/icons/avatar_profile.svg";

import "./VocabModal.css";

// todo: ion-padding on IonContent is overridden

export const VocabModal: React.FC = () => {
  const { clearAudio } = useAudioManager();
  const { populateText } = useLanguage();
  const { currentVocabHandle, setCurrentVocabHandle, vocab } = useStory();
  const wordFamily = vocab.filter(
    (v: any) => v.handle === currentVocabHandle,
  )[0];
  const currentWordFamily = populateText(wordFamily?.word ?? []);
  if (currentWordFamily.length === 0) {
    // no current word so exit early
    return <></>;
  }

  const wordAudios = Object.fromEntries(
    currentWordFamily.map((c: any) => [c.language, c.word_audio.url]),
  );
  const definitionAudios = Object.fromEntries(
    currentWordFamily.map((c: any) => [c.language, c.definition_audio.url]),
  );
  const imageUrl = wordFamily?.image.url;

  return (
    <>
      <IonModal
        className="modal"
        isOpen={currentVocabHandle !== null}
        onWillDismiss={() => {
          clearAudio();
          setCurrentVocabHandle(null);
        }}
      >
        <div id="vocab-modal-id" className="modal-content">
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "0.5rem",
              zIndex: 999,
            }}
          >
            <CloseButton
              onClick={() => {
                clearAudio();
                setCurrentVocabHandle(null);
              }}
              size="small"
            />
          </div>
          <div className="ion-padding modal-container">
            <IonRow style={{ gap: "0.875rem" }}>
              <IonCol size="8">
                <IonRow class="ion-align-items-start">
                  <IonCol>
                    <div className="word-row">
                      <div className="audio-button-word">
                        <AudioButton audio={wordAudios} size="small" />
                      </div>

                      <IonText>
                        <h1 className="text-4xl semibold">
                          <SyllableBreakdown
                            word={currentWordFamily[0].syllable_breakdown}
                          />
                        </h1>
                        {currentWordFamily.length > 1 && (
                          <p className="text-3xl semibold word-color">
                            <SyllableBreakdown
                              word={currentWordFamily[1].syllable_breakdown}
                            />
                          </p>
                        )}
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow class="ion-align-items-start">
                  <IonCol>
                    <div className="word-row">
                      <div className="audio-button-word">
                        <AudioButton audio={definitionAudios} size="small" />
                      </div>

                      <IonText>
                        <h1 className="text-2xl semibold">
                          {currentWordFamily[0].definition}
                        </h1>
                        {currentWordFamily.length > 1 && (
                          <p className="text-xl word-color">
                            {currentWordFamily[1].definition}
                          </p>
                        )}
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
              </IonCol>
              {imageUrl && (
                <IonCol>
                  <img src={imageUrl} alt="Word popover image" />
                </IonCol>
              )}
            </IonRow>
          </div>
        </div>
      </IonModal>
    </>
  );
};

const SyllableBreakdown: React.FC<{ word: string }> = ({ word = "" }) => {
  const segments = word.split(" ").map((w: string) =>
    w.split("-").map((s: string, index: number) => (
      <span className="vocab-syllable-breakdown segment" key={index}>
        {s}
        <span className="vocab-syllable-breakdown underline"></span>
      </span>
    )),
  );
  return (
    <>
      {segments.map((w: any, index: number) => (
        <span className="vocab-syllable-breakdown word" key={index}>
          {w}
        </span>
      ))}
    </>
  );
};
