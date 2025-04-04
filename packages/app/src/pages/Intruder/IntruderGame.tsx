import { GameData, useActivity } from "@/contexts/ActivityContext";
import React, { useState, useEffect, useMemo } from "react";
import { I18nMessage } from "@/components/I18nMessage";
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
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/Language";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import SpeakerIcon from "@/assets/icons/speaker.svg";
import { useParams } from "react-router";
import { IntruderCongrats } from "./IntruderCongrats";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { card } from "ionicons/icons";
import { groupBy } from "rxjs";

import "./Intruder.scss";
import "../../theme/animate.scss";

import cover from "@/assets/icons/card_back.svg";
import incorrect_card_audio from "@/assets/audio/incorrect.mp3";
import correct_card_audio from "@/assets/audio/correct.mp3";
import card_flip_audio from "@/assets/audio/IntruderAudio/intruder_card_flip.mp3";
import instruction_en_audio from "@/assets/audio/IntruderAudio/intruder_game_instruction_en.mp3";
import instruction_es_audio from "@/assets/audio/IntruderAudio/intruder_game_instruction_es.mp3";
const instruction_audio_raw = [
  {
    language: "en",
    audio: instruction_en_audio,
  },
  {
    language: "es",
    audio: instruction_es_audio,
  },
];

interface BiliImage {
  url: string;
}

interface BiliAudio {
  url: string;
}

interface Game {
  word_group: Array<{
    intruder_text: string;
    intruder_image: BiliImage;
    intruder_audio: any;
    word_2_text: string;
    word_2_image: BiliImage;
    word_2_audio: BiliAudio;
    word_3_text: string;
    word_3_image: BiliImage;
    word_3_audio: BiliAudio;
  }>;
  uuid: string;
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
  //const { language } = useLanguage();
  const { addAudio, clearAudio } = useAudioManager();
  const { populateText } = useLanguage();
  const { language, setIsVisible } = useLanguageToggle();
  const {
    handleAttempt,
    handleRecordAttempt,
    handleResetAttempts,
    setActivityState,
    setGamesData,
  } = useActivity();
  const { startTimer } = useTimeTracker();
  useEffect(() => {
    startTimer();
    setActivityState({
      type: "intruder",
      id: data.uuid,
    });
    const gamesData: GameData = new Map();

    for (const group of data.word_group) {
      const groupId = `${group.intruder_text}-${group.word_2_text}-${group.word_3_text}`;
      gamesData.set(groupId, { totalMistakesPossible: 2 });
    }

    setGamesData(gamesData);
    const audios = populateText(instruction_audio_raw).map((a: any) => a.audio);
    addAudio(audios);
    return () => {
      clearAudio();
    };
  }, []);

  const initialStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    aspectRatio: "1 / 1.25",
    border: "0.525rem solid transparent",
    boxShadow: "-0.289875rem 0.5796875rem 1.739125rem 0 rgba(0, 0, 0, 0.25)",
  };

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    aspectRatio: "1 / 1.25",
    border: "0.525rem solid var(--alerts-status-success, #12D18E)",
    boxShadow: "0 0.525rem 1.575rem 0 #12D18E",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    aspectRatio: "1 / 1.25",
    border: " solid var(--Categories-Error, #F0091B)",
    boxShadow: "0 0.525rem 1.575rem 0 #F0091B",
  };

  const temporaryBackgroundStyle = {
    backgroundImage: `url(${cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    aspectRatio: "1 / 1.25",
    border: "0.525rem solid transparent",
    zIndex: "2",
  };

  const temporaryAudioPlayingStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    aspectRatio: "1 / 1.25",
    border: "0.525rem solid var(--Base-Hover-Shadow, rgba(0, 0, 0, 0.08))",
    boxShadow: "0 0.525rem 1.575rem 0.4375rem rgba(0, 0, 0, 0.60)",
  };

  const [cardColors, setCardColors] = useState<any>({
    "1": initialStyle,
    "2": initialStyle,
    "3": initialStyle,
  });
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showBackside, setShowBackside] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  useEffect(() => {
    setIsVisible(false);
    return () => {
      setIsVisible(true);
    };
  });
  const goToNextWordGroup = async () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.word_group.length - 1) {
      setCurrentIndex(0); // Reset to the first element
    } else {
      setCurrentIndex(currentIndex + 1); // Move to the next element
    }
  };

  const shuffledCards = useMemo(() => {
    const wordGroup = data.word_group[currentIndex];
    const cards = [
      {
        word: wordGroup.intruder_text,
        image: wordGroup.intruder_image,
        isIntruder: true,
        id: "1",
        audio: wordGroup.intruder_audio,
      },
      {
        word: wordGroup.word_2_text,
        image: wordGroup.word_2_image,
        id: "2",
        audio: wordGroup.word_2_audio,
      },
      {
        word: wordGroup.word_3_text,
        image: wordGroup.word_3_image,
        id: "3",
        audio: wordGroup.word_3_audio,
      },
    ];
    return shuffleArray(cards);
  }, [data, currentIndex]);
  useEffect(() => {
    if (isCorrectSelected) {
      setShowBackside(true);
      setTimeout(() => {
        if (
          currentIndex + 1 === 5 ||
          currentIndex + 1 === 10 ||
          currentIndex + 1 === 20 ||
          currentIndex + 1 === data.word_group.length
        ) {
          setShowCongrats(true); //go to the IntruderCongrats page
        }

        setShowBackside(false);
        goToNextWordGroup(); //check for the current index
        setIsCorrectSelected(false); // Reset the state
        setCardColors({
          "1": initialStyle,
          "2": initialStyle,
          "3": initialStyle,
        });
      }, 3000);
    }
  }, [isCorrectSelected]);

  // Function to handle card click
  const handleCardClick = (card: any) => {
    const groupId = `${data.word_group[currentIndex].intruder_text}-${data.word_group[currentIndex].word_2_text}-${data.word_group[currentIndex].word_3_text}`;
    if (!card.isIntruder) {
      //logic for the incorrect cards
      handleAttempt(groupId, false);
      addAudio([incorrect_card_audio]);
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
      handleAttempt(groupId, true);
      addAudio([correct_card_audio, card_flip_audio]);
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }
  };

  //function for the button playing audio for the cards text
  const handleWordAudioClick = async () => {
    // TODO: audiomanager needs interstitial before and after callbacks
    for (const card of shuffledCards) {
      const wordAudio = new Audio(card.audio.url);
      await new Promise<void>((resolve) => {
        wordAudio.onended = () => {
          setCardColors((prevColors: any) => ({
            ...prevColors,
            [card.id]: initialStyle,
          }));
          resolve();
        };
        wordAudio.play();

        setCardColors((prevColors: any) => ({
          ...prevColors,
          [card.id]: temporaryAudioPlayingStyle,
        }));
      });
    }
  };

  if (showCongrats) {
    return (
      <IntruderCongrats
        setShowCongrats={setShowCongrats}
        count={currentIndex}
      />
    );
  }

  return (
    <>
      <div id="intruder-styles">
        <div className="padding-top-4 margin-bottom-2">
          <IonText>
            <h1 className="text-5xl color-suelo">
              <I18nMessage id="intruder.instructions" />
            </h1>
            <I18nMessage
              id="intruder.instructions"
              level={2}
              wrapper={(t: string) => (
                <p className="text-3xl color-english">{t}</p>
              )}
            />
          </IonText>
        </div>
        <div className="intruder-cards-container">
          {shuffledCards.map((card, index) => (
            <IonCard
              className="intruder-card-style"
              key={card.id}
              style={
                showBackside ? temporaryBackgroundStyle : cardColors[card.id]
              }
              onClick={() => handleCardClick(card)}
            >
              <img
                src={card.image.url}
                style={{ height: "100%", opacity: showBackside ? 0 : 1 }}
              />
              <p
                className="text-5xl color-suelo"
                style={{ opacity: showBackside ? 0 : 1 }}
              >
                {card.word}
              </p>
            </IonCard>
          ))}
        </div>
        <div className="sound-button">
          <IonButton
            className="sound-button-background"
            onClick={() => handleWordAudioClick()}
          >
            <img className="sound-icon" src={SpeakerIcon} />
          </IonButton>
        </div>
      </div>
    </>
  );
};
