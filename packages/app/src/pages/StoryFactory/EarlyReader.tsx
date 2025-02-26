import { FC, useEffect, useRef, useState } from "react";
import { IonText, IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useParams } from "react-router-dom";
import SpeakerIcon from "@/assets/icons/speaker.svg";
import { StoryFactoryCongrats } from "./StoryFactoryCongrats";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";

import "./StoryFactory.scss";
import dataRaw from "./EarlyReaderData.json";
import { useLanguage } from "@/hooks/Language";

const AWS_BUCKET =
  "https://bili-strapi-media-dev.s3.amazonaws.com/story_factory/"; // todo: don't hardcode
function normalizeAWS(s: string) {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/;
  const payload: string = s
    .toLowerCase() // need to lowercase first so replacements don't get overwritten
    .replace(/ /g, "_")
    .replace(/á/g, "%C3%A1")
    .replace(/é/g, "%C3%A9")
    .replace(/ñ/g, "%C3%B1")
    .replace(/í/g, "%C3%AD")
    .replace(regex, "");
  return payload;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getText = (word: any, language: string) => {
  console.log(word, language);
  return word.filter((w: any) => w.language === language)[0].text;
};

const generateSVG = (color: string, direction: string) => {
  if (direction === "up") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="32"
        viewBox="0 0 55 32"
        fill="none"
      >
        <path
          d="M24.9332 1.61877C26.3424 0.181033 28.6576 0.181035 30.0668 1.61878L53.1212 25.14C55.3504 27.4144 53.7391 31.25 50.5544 31.25L4.44562 31.25C1.26091 31.25 -0.35043 27.4144 1.87882 25.14L24.9332 1.61877Z"
          fill={color}
        />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="32"
        viewBox="0 0 55 32"
        fill="none"
      >
        <path
          d="M30.0668 30.5062C28.6576 31.944 26.3424 31.944 24.9332 30.5062L1.87882 6.98501C-0.35043 4.71062 1.26091 0.875 4.44562 0.875L50.5544 0.875003C53.7391 0.875003 55.3504 4.71063 53.1212 6.98502L30.0668 30.5062Z"
          fill={color}
        />
      </svg>
    );
  }
};

export const StoryFactoryEarlyReader: React.FC = () => {
  const { language } = useLanguage();
  const { addAudio, clearAudio, onended } = useAudioManager();
  //const { status, data } = useFirestoreDoc();
  const status: string = "ready";
  const data = { word_group: dataRaw };
  const [words, setWords] = useState<any[][]>([]);
  const [lastSentence, setLastSentence] = useState<string>("");
  const lastSentenceRef = useRef(lastSentence);
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const currentSentenceRef = useRef(currentSentence);
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);
  const [numPlays, setNumPlays] = useState<number>(0);
  const numPlaysRef = useRef(numPlays);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  useEffect(() => {
    setWords([
      shuffleArray(data.word_group.filter((word: any) => word.position === 1)),
      shuffleArray(data.word_group.filter((word: any) => word.position === 2)),
      shuffleArray(data.word_group.filter((word: any) => word.position === 3)),
      shuffleArray(data.word_group.filter((word: any) => word.position === 4)),
    ]);

    const subscription = onended.subscribe(() => {
      if (currentSentenceRef.current !== lastSentenceRef.current) {
        if (
          // check if the next number that will be iterated to is a target
          numPlaysRef.current + 1 === 5 ||
          numPlaysRef.current + 1 === 10 ||
          numPlaysRef.current + 1 === 20 ||
          numPlaysRef.current + 1 === 30
        ) {
          setShowCongrats(true);
        }
        setNumPlays((n) => n + 1);
        numPlaysRef.current = numPlaysRef.current + 1;
      }
    });
    return () => {
      subscription.unsubscribe();
      clearAudio();
    };
  }, []);
  // Function to handle the up arrow click
  const handleUpArrowClick = (position: number) => {
    const newWordIndices = [...wordIndices];
    // Decrement the index for the specified position
    newWordIndices[position] =
      (newWordIndices[position] - 1 + words[position].length) %
      words[position].length;
    setWordIndices(newWordIndices);
  };

  // Function to handle the down arrow click
  const handleDownArrowClick = (position: number) => {
    const newWordIndices = [...wordIndices];
    // Increment the index for the specified position
    newWordIndices[position] =
      (newWordIndices[position] + 1) % words[position].length;
    setWordIndices(newWordIndices);
  };

  if (words.length === 0) {
    return <></>;
  }

  if (showCongrats) {
    return <StoryFactoryCongrats />;
  }

  if (status === "loading") {
    return <>loading</>;
  }

  if (status === "error") {
    return <>error</>;
  }
  // implied else
  return (
    <>
      <div id="sf-game-page" style={{ userSelect: "none" }}>
        <div className="sf-background-pattern"></div>
        <IonGrid className="sf-game-content">
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <div className="sf-colorful-text-heading">
                <span style={{ color: "#006A67" } as any}>¡</span>
                <span style={{ color: "#FF5708" } as any}>F</span>
                <span style={{ color: "#8E84E9" } as any}>á</span>
                <span style={{ color: "#F28AC9" } as any}>b</span>
                <span style={{ color: "#006A67" } as any}>r</span>
                <span style={{ color: "#E3C029" } as any}>i</span>
                <span style={{ color: "#F48722" } as any}>c</span>
                <span style={{ color: "#8E84E9" } as any}>a</span>
                <span> </span>
                <span style={{ color: "#F28AC9" } as any}>d</span>
                <span style={{ color: "#F48722" } as any}>e</span>
                <span> </span>
                <span style={{ color: "#E3C029" } as any}>c</span>
                <span style={{ color: "#006A67" } as any}>u</span>
                <span style={{ color: "#FF5708" } as any}>e</span>
                <span style={{ color: "#8E84E9" } as any}>n</span>
                <span style={{ color: "#F28AC9" } as any}>t</span>
                <span style={{ color: "#006A67" } as any}>o</span>
                <span style={{ color: "#E3C029" } as any}>s</span>
                <span style={{ color: "#FF5708" } as any}>!</span>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            {["#C25808", "#006A67", "#CAA900", "#8E84E9"].map(
              (color, index) => (
                <IonCol key={index}>
                  <span
                    onClick={() => {
                      handleUpArrowClick(index);
                    }}
                  >
                    {generateSVG(color, "up")}
                  </span>
                </IonCol>
              ),
            )}
          </IonRow>

          {/* Row for ovals w/ words */}
          <IonRow class="ion-justify-content-center">
            <IonCol>
              <div className="sf-game-option option-orange">
                <IonText>
                  <h1 className="text-4xl semibold color-suelo">
                    {language === "en"
                      ? getText(words[0][wordIndices[0]].word, "en")
                      : getText(words[0][wordIndices[0]].word, "es")}
                  </h1>
                  {language === "es.en" && (
                    <p className="text-3xl color-english">
                      {getText(words[0][wordIndices[0]].word, "en")}
                    </p>
                  )}
                </IonText>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option option-blue">
                <IonText>
                  <h1 className="text-4xl semibold color-suelo">
                    {language === "en"
                      ? getText(words[1][wordIndices[1]].word, "en")
                      : getText(words[1][wordIndices[1]].word, "es")}
                  </h1>
                  {language === "es.en" && (
                    <p className="text-3xl color-english">
                      {getText(words[1][wordIndices[1]].word, "en")}
                    </p>
                  )}
                </IonText>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option option-yellow">
                <IonText>
                  <h1 className="text-4xl semibold color-suelo">
                    {language === "en"
                      ? getText(words[2][wordIndices[2]].word, "en")
                      : getText(words[2][wordIndices[2]].word, "es")}
                  </h1>
                  {language === "es.en" && (
                    <p className="text-3xl color-english">
                      {getText(words[2][wordIndices[2]].word, "en")}
                    </p>
                  )}
                </IonText>
              </div>
            </IonCol>

            <IonCol>
              <div className="sf-game-option option-purple">
                <IonText>
                  <h1 className="text-4xl semibold color-suelo">
                    {language === "en"
                      ? getText(words[3][wordIndices[3]].word, "en")
                      : getText(words[3][wordIndices[3]].word, "es")}
                  </h1>
                  {language === "es.en" && (
                    <p className="text-3xl color-english">
                      {getText(words[3][wordIndices[3]].word, "en")}
                    </p>
                  )}
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          {/* Row for downward arrows */}
          <IonRow>
            {["#C25808", "#006A67", "#CAA900", "#8E84E9"].map(
              (color, index) => (
                <IonCol key={index}>
                  <span
                    onClick={() => {
                      handleDownArrowClick(index);
                    }}
                  >
                    {generateSVG(color, "down")}
                  </span>
                </IonCol>
              ),
            )}
          </IonRow>

          {/* Row for volume/speaker */}
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-no-padding">
              <IonButton
                className="volume-button-background"
                onClick={() => {
                  // TODO: need to check for en and esen
                  const audios = [];
                  if (language !== "es.en") {
                    audios.push(
                      AWS_BUCKET +
                        normalizeAWS(
                          [
                            getText(words[0][wordIndices[0]].word, language),
                            getText(words[1][wordIndices[1]].word, language),
                            getText(words[2][wordIndices[2]].word, language),
                            getText(words[3][wordIndices[3]].word, language),
                          ].join(" "),
                        ) +
                        ".mp3",
                    );
                  } else {
                    audios.push(
                      AWS_BUCKET +
                        normalizeAWS(
                          [
                            getText(words[0][wordIndices[0]].word, "es"),
                            getText(words[1][wordIndices[1]].word, "es"),
                            getText(words[2][wordIndices[2]].word, "es"),
                            getText(words[3][wordIndices[3]].word, "es"),
                          ].join(" "),
                        ) +
                        ".mp3",
                    );
                    audios.push(
                      AWS_BUCKET +
                        normalizeAWS(
                          [
                            getText(words[0][wordIndices[0]].word, "en"),
                            getText(words[1][wordIndices[1]].word, "en"),
                            getText(words[2][wordIndices[2]].word, "en"),
                            getText(words[3][wordIndices[3]].word, "en"),
                          ].join(" "),
                        ) +
                        ".mp3",
                    );
                  }
                  const sentence = JSON.stringify(audios);
                  setLastSentence(currentSentence);
                  lastSentenceRef.current = currentSentence;
                  setCurrentSentence(sentence);
                  currentSentenceRef.current = sentence;
                  addAudio(audios);
                }}
              >
                <img className="volume-icon" src={SpeakerIcon} />
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-no-padding ion-text-center">
              <IonText>
                <h1 className="text-3xl semibold color-suelo">
                  <FormattedMessage
                    id="storyFactory.read"
                    defaultMessage="Read"
                    description="Story Factory volume/play button that says 'Read'"
                  />
                </h1>
                {language === "esen" && (
                  <p className="text-lg color-english">Read</p>
                )}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
