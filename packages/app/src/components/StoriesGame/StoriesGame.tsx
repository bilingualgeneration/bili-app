//AM

import React, { useState, useEffect, useMemo } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import { FormattedMessage } from "react-intl";
import type { MessageFormatElement } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import CorrectImage from "packages/app/public/assets/img/correct_card.png";
import InCorrectImage2 from "packages/app/public/assets/img/incorrect_card_1.png";
import InCorrectImage3 from "packages/app/public/assets/img/incorrect_card_2.png";
import InCorrectImage4 from "packages/app/public/assets/img/incorrect_card_3.png";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import corr_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import { useHistory } from "react-router";
import { card } from "ionicons/icons";

interface PictureImage {
  url: string;
}

interface PictureAudio {
  url: string;
}

interface Story {
  multiple_image_text: [];
  multiple_image_correct_image: PictureImage;
  multiple_image_incorrect_image_1: PictureImage;
  multiple_image_incorrect_image_2: PictureImage;
  multiple_image_incorrect_image_3: PictureImage;
  multiple_syllable_correct_audio: PictureAudio;
  multiple_syllable_correct_image: PictureImage;
  multiple_syllable_incorrect_audio_1: PictureAudio;
  multiple_syllable_incorrect_image_1: PictureImage;
  multiple_syllable_incorrect_audio_2: PictureAudio;
  multiple_syllable_incorrect_image_2: PictureImage;
  multiple_syllable_incorrect_audio_3: PictureAudio;
  multiple_syllable_incorrect_image_3: PictureImage;
  multiple_syllable_text: [];
}

interface GameCard {
  image: PictureImage;
  isTarget: boolean;
  id: string;
  audio: PictureAudio;
}

interface StoriesGameProps {
  game: Story;
  gameType: string;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getCardsFromImageGame(story: Story): GameCard[] {
  return [
    {
      image: story.multiple_image_correct_image,
      isTarget: true,
      id: "1",
      audio: { url: "@/assets/audio/IntruderAudio/intruder_correct.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_1,
      isTarget: false,
      id: "2",
      audio: { url: "@/assets/audio/IntruderAudio/intruder_incorrect.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_2,
      isTarget: false,
      id: "3",
      audio: { url: "@/assets/audio/IntruderAudio/intruder_incorrect.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_3,
      isTarget: false,
      id: "4",
      audio: { url: "@/assets/audio/IntruderAudio/intruder_incorrect.wav" },
    },
  ];
}

function getCardsFromSyllableGame(story: Story): GameCard[] {
  return [
    {
      image: story.multiple_syllable_correct_image,
      isTarget: true,
      id: "1",
      audio: story.multiple_syllable_correct_audio,
    },
    {
      image: story.multiple_syllable_incorrect_image_1,
      isTarget: false,
      id: "2",
      audio: story.multiple_syllable_incorrect_audio_1,
    },
    {
      image: story.multiple_syllable_incorrect_image_2,
      isTarget: false,
      id: "3",
      audio: story.multiple_syllable_incorrect_audio_2,
    },
    {
      image: story.multiple_syllable_incorrect_image_3,
      isTarget: false,
      id: "4",
      audio: story.multiple_syllable_incorrect_audio_3,
    },
  ];
}

export const StoriesGame: React.FC<StoriesGameProps> = ({
  game: data,
  gameType,
}) => {
  const { isImmersive, isInclusive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const [questionsData, setQuestionsData] = useState<any[]>([]);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showBackside, setShowBackside] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextGame, setShowNextGame] = useState<boolean>(false);

  //questions data

  const imageQuestions = data.multiple_image_text.map((questionItem: any) => {
    return {
      text: {
        en: questionItem.en?.text,
        es: questionItem.es?.text,
        "en-inc": questionItem["en-inc"]?.text,
        "es-inc": questionItem["es-inc"]?.text,
      },
      audio: {
        en: questionItem.en?.audio,
        es: questionItem.es?.audio,
        "en-inc": questionItem["en-inc"]?.audio,
        "es-inc": questionItem["es-inc"]?.audio,
      },
    };
  });

  const syllableQuestions = data.multiple_syllable_text.map(
    (questionItem: any) => {
      return {
        text: {
          en: questionItem.en?.text,
          es: questionItem.es?.text,
          "en-inc": questionItem["en-inc"]?.text,
          "es-inc": questionItem["es-inc"]?.text,
        },
        audio: {
          en: questionItem.en?.audio,
          es: questionItem.es?.audio,
          "en-inc": questionItem["en-inc"]?.audio,
          "es-inc": questionItem["es-inc"]?.audio,
        },
      };
    },
  );

  useEffect(() => {
    if (data !== undefined) {
      if (gameType === "image") {
        setQuestionsData(imageQuestions);
      } else {
        setQuestionsData(syllableQuestions);
      }
    }
  }, [data]);

  //audio effect for autoplaying
  useEffect(() => {
    return () => {
      clearAudio();
    };
  }, []);
  useEffect(() => {
    setCallback(() => () => {
      setAudioPlayed(true);
    });

    if (isImmersive) {
      const audioUrls = [];
      if (isInclusive) {
        audioUrls.push(questionsData[0].audio["es-inc"]);
      } else {
        audioUrls.push(questionsData[0].audio.es);
      }
      addAudio(audioUrls);
    } else {
      const audioUrls = [];
      if (isInclusive) {
        audioUrls.push(questionsData[0].audio["es-inc"]);
        audioUrls.push(questionsData[0].audio["en-inc"]);
      } else {
        audioUrls.push(questionsData[0].audio.es);
        audioUrls.push(questionsData[0].audio.en);
      }
    }
  }, [questionsData, isImmersive, isInclusive]);
  const history = useHistory();

  //styles for correct and wrong cards
  const initialStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    boxShadow: "-4.638px 9.275px 27.826px 0px rgba(0, 0, 0, 0.25)",
  };

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--alerts-status-success, #12D18E)",
    boxShadow: "0px 8.4px 25.2px 0px #12D18E",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    border: "8.4px solid var(--Categories-Error, #F0091B)",
    boxShadow: "0px 8.4px 25.2px 0px #F0091B",
  };

  const [cardColors, setCardColors] = useState<any>({
    "1": initialStyle,
    "2": initialStyle,
    "3": initialStyle,
    "4": initialStyle,
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const shuffledCards = useMemo(() => {
    const cards =
      gameType === "image"
        ? getCardsFromImageGame(data)
        : getCardsFromSyllableGame(data);
    return shuffleArray(cards);
  }, [data, currentIndex, gameType]);

  useEffect(() => {
    if (isCorrectSelected) {
      setTimeout(() => {
        setShowNextGame(true);
        setIsCorrectSelected(false); // Reset the state
        setCardColors({
          "1": initialStyle,
          "2": initialStyle,
          "3": initialStyle,
          "4": initialStyle,
        });
      }, 3000);
    }
  }, [isCorrectSelected]);

  // Function to handle card click
  const handleCardClick = (card: any) => {
    if (!card.isTarget) {
      //logic for the incorrect cards

      addAudio([card.audio.url]);

      //plays audio for incorrect choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: { ...incorrectStyle, animation: "shake 1s" },
      }));

      setTimeout(() => {
        setCardColors((prevColors: any) => ({
          ...prevColors,
          [card.id]: initialStyle,
        }));
      }, 1000);
    } else {
      //logic when the correct card is choosen
      addAudio([card.audio.url]); //plays audio for correct choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }

    if (!card.isTarget) {
      //logic for the incorrect cards
      addAudio([card.audio.url]); //plays audio for incorrect choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: { ...incorrectStyle, animation: "shake 1s" },
      }));

      setTimeout(() => {
        setCardColors((prevColors: any) => ({
          ...prevColors,
          [card.id]: initialStyle,
        }));
      }, 1000);
    } else {
      //logic when the correct card is choosen
      addAudio([card.audio.url]); //plays audio for correct choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }
  };

  if (showNextGame) {
    return <></>;
  }

  return (
    <>
      <div id="">
        <div className="margin-top-4 margin-bottom-2">
          <IonText>
            {isInclusive ? (
              <h1 className="text-5xl color-suelo">
                {questionsData[0].text["es-inc"]}
              </h1>
            ) : (
              <h1 className="text-5xl color-suelo">
                {questionsData[0].text.es}
              </h1>
            )}

            {!isImmersive && (
              <p className="text-3xl color-english">
                {questionsData[0].text.es}
              </p>
            )}
          </IonText>
        </div>
        <div className="">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {shuffledCards.slice(0, 2).map((card, index) => (
                <IonCol
                  className=""
                  size="auto"
                  onClick={() => handleCardClick(card)}
                >
                  <img
                    key={card.id}
                    style={cardColors[card.id]}
                    src={card.image.url}
                  />
                </IonCol>
              ))}
            </IonRow>
            <IonRow className="ion-justify-content-center">
              {shuffledCards.slice(2, 4).map((card, index) => (
                <IonCol
                  className=""
                  size="auto"
                  onClick={() => handleCardClick(card)}
                >
                  <img
                    key={card.id}
                    style={cardColors[card.id]}
                    src={card.image.url}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
