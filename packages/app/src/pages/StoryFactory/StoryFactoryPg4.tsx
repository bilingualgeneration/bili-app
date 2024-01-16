import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { StoryFactoryCongrats } from "./Congrats";
import "./StoryFactory.scss";

const AWS_BUCKET =
  "https://bili-strapi-media-dev.s3.amazonaws.com/story_factory/"; // todo: don't hardcode
function normalizeAWS(s: string) {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/;
  const payload: string = s
    .toLowerCase() // need to lowercase first so replacements don't get overwritten
    .replace(/ /g, "_")
    .replace(/á/g, "a%CC%81")
    .replace(/é/g, "e%CC%81")
    .replace(/ñ/g, "n%CC%83")
    .replace(/í/g, "i%CC%81")
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

export const StoryFactoryPage4: FC = () => {
  const { isImmersive } = useProfile();
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();
  const ref = doc(firestore, "story-factory-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);
  const [words, setWords] = useState<any[][]>([]);
  const [lastSentence, setLastSentence] = useState<string>("");
  const [wordIndices, setWordIndices] = useState([0, 0, 0, 0]);
  const [numPlays, setNumPlays] = useState<number>(0);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  useEffect(() => {
    if (data !== undefined) {
      setWords([
        shuffleArray(
          data.word_group.filter((word: any) => word.position === 1),
        ),
        shuffleArray(
          data.word_group.filter((word: any) => word.position === 2),
        ),
        shuffleArray(
          data.word_group.filter((word: any) => word.position === 3),
        ),
        shuffleArray(
          data.word_group.filter((word: any) => word.position === 4),
        ),
      ]);
    }
  }, [data]);
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

  const speak = (position: number, language: string = "es") => {
    const text: string = normalizeAWS(
      getText(words[position][wordIndices[position]].word, language),
    );
    const audio = new Audio(`${AWS_BUCKET}${text}.mp3`);
    audio.play();
  };

  if (words.length === 0) {
    return <></>;
  }

  if (showCongrats) {
    return <StoryFactoryCongrats setShowCongrats={setShowCongrats} />;
  }

  // implied else
  return (
    <>
      <div id="sf-game-page" style={{ userSelect: "none" }}>
        <div className="sf-background-pattern"></div>
        <IonGrid>
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
              <div
                className="sf-game-option option-orange"
                onClick={() => {
                  speak(0);
                }}
              >
                <h1>{getText(words[0][wordIndices[0]].word, "es")}</h1>
                {!isImmersive && (
                  <h2>{getText(words[0][wordIndices[0]].word, "en")}</h2>
                )}
              </div>
            </IonCol>

            <IonCol>
              <div
                className="sf-game-option option-blue"
                onClick={() => {
                  speak(1);
                }}
              >
                <h1>{getText(words[1][wordIndices[1]].word, "es")}</h1>
                {!isImmersive && (
                  <h2>{getText(words[1][wordIndices[1]].word, "en")}</h2>
                )}
              </div>
            </IonCol>

            <IonCol>
              <div
                className="sf-game-option option-yellow"
                onClick={() => {
                  speak(2);
                }}
              >
                <h1>{getText(words[2][wordIndices[2]].word, "es")}</h1>
                {!isImmersive && (
                  <h2>{getText(words[2][wordIndices[2]].word, "en")}</h2>
                )}
              </div>
            </IonCol>

            <IonCol>
              <div
                className="sf-game-option option-purple"
                onClick={() => {
                  speak(3);
                }}
              >
                <h1>{getText(words[3][wordIndices[3]].word, "es")}</h1>
                {!isImmersive && (
                  <h2>{getText(words[3][wordIndices[3]].word, "en")}</h2>
                )}
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
              <div
                className="volume-button-background"
                onClick={() => {
                  const sentence: string = normalizeAWS(
                    [
                      getText(words[0][wordIndices[0]].word, "es"),
                      getText(words[1][wordIndices[1]].word, "es"),
                      getText(words[2][wordIndices[2]].word, "es"),
                      getText(words[3][wordIndices[3]].word, "es"),
                    ].join(" "),
                  );
                  const audio = new Audio(`${AWS_BUCKET}${sentence}.mp3`);
                  audio.play();
                  if (lastSentence !== sentence) {
                    setLastSentence(sentence);
                    if ((numPlays + 1) % 5 === 0) {
                      setShowCongrats(true);
                    }
                    setNumPlays(numPlays + 1);
                  }
                }}
              >
                <img className="volume-icon" src={volumeButton} />
              </div>
            </IonCol>
          </IonRow>

          {/* Row for volume/speaker text */}
          <IonRow>
            <IonCol className="ion-no-padding">
              <span></span>
              <div>
                <h2>
                  <FormattedMessage
                    id="storyFactory.read"
                    defaultMessage="Read"
                    description="Story Factory volume/play button that says 'Read'"
                  />
                </h2>
                {!isImmersive && <p>Read</p>}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
