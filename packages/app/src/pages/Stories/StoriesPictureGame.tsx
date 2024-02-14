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
import { useProfile } from "@/contexts/ProfileContext";
import CorrectImage from "packages/app/public/assets/img/correct_card.png";
import InCorrectImage2 from "packages/app/public/assets/img/incorrect_card_1.png";
import InCorrectImage3 from "packages/app/public/assets/img/incorrect_card_2.png";
import InCorrectImage4 from "packages/app/public/assets/img/incorrect_card_3.png";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { useAudioManager } from "@/contexts/AudioManagerContext";
//temporary audio files, should be chaged for count-with-me files oncel uploade
import audio_en_file from "@/assets/audio/IntruderAudio/intruder_instruction_en.mp3";
import audio_es_file from "@/assets/audio/IntruderAudio/intruder_instruction_es.mp3";
import audio_es_inc_file from "@/assets/audio/IntruderAudio/intruder_instruction_es_inc.mp3";
import { useHistory } from "react-router";
import { card } from "ionicons/icons";

// interface PictureImage {
//     url: string;
// }

// interface PictureAudio {
//     url: string;
// }

interface Game {
  card_group: Array<{
    spanish_question: string;
    english_question: string;
    correct_card_image: string;
    correct_card_audio: any;
    incorrect_card_image_2: string;
    incorrect_card_audio_2: string;
    incorrect_card_image_3: string;
    incorrect_card_audio_3: string;
    incorrect_card_image_4: string;
    incorrect_card_audio_4: string;
  }>;
}

interface IntruderGameProps {
  game: Game;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const IntruderGame: React.FC<IntruderGameProps> = ({ game: data }) => {
  const { isImmersive, isInclusive } = useProfile();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);

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
      if (isInclusive) {
        addAudio([audio_es_inc_file]);
      } else {
        addAudio([audio_es_file]);
      }
    } else {
      if (isInclusive) {
        addAudio([audio_es_inc_file, audio_en_file]);
      } else {
        addAudio([audio_es_file, audio_en_file]);
      }
    }
  }, []);
  const history = useHistory();

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
  });
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showBackside, setShowBackside] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNextGame, setShowNextGame] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  //not sure if it's needed for this game
  const goToNextWordGroup = () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.card_group.length - 1) {
      setCurrentIndex(0); // Reset to the first element
    } else {
      setCurrentIndex(currentIndex + 1); // Move to the next element
    }
  };

  const shuffledCards = useMemo(() => {
    //const wordGroup = data.word_group[currentIndex];
    const cards = [
      {
        image: CorrectImage,
        isTarget: true,
        id: "1",
      },
      {
        image: InCorrectImage2,
        id: "2",
      },
      {
        image: InCorrectImage3,
        id: "3",
      },
      {
        image: InCorrectImage4,
        id: "4",
      },
    ];
    return shuffleArray(cards);
  }, [data, currentIndex]);

  useEffect(() => {
    if (isCorrectSelected) {
      setTimeout(() => {
        if (
          currentIndex + 1 === 5 ||
          currentIndex + 1 === 10 ||
          currentIndex + 1 === 20 ||
          currentIndex + 1 === data.card_group.length
        ) {
          setShowNextGame(true); //go to the IntruderCongrats page
        }

        goToNextWordGroup(); //check for the current index
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
      audio_incorrect.play(); //plays audio for incorrect choice
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
      audio_correct.play(); //plays audio for correct choice
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
      <div id="intruder-styles">
        <div className="margin-top-4 margin-bottom-2">
          <IonText>
            <h1 className="text-5xl color-suelo">
              {data.card_group[0].spanish_question}
            </h1>
            {!isImmersive && (
              <p className="text-3xl color-english">
                {data.card_group[0].english_question}
              </p>
            )}
          </IonText>
        </div>
        <div className="">
          <IonGrid>
            <IonRow>
              {shuffledCards.map((card, index) => (
                <IonCol
                  className=""
                  size="6"
                  key={card.id}
                  style={cardColors[card.id]}
                  onClick={() => handleCardClick(card)}
                >
                  <img src={card.image.url} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
