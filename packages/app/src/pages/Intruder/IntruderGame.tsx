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
import almohada1 from "@/assets/icons/intruder_almohada_1.svg";
import empanada from "@/assets/icons/intruder_empanada.svg";
import cover from "@/assets/icons/card_back.svg";
import {useAudioManager} from '@/contexts/AudioManagerContext';
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import card_flip_audio from "@/assets/audio/IntruderAudio/intruder_card_flip.wav";
import instruction_en_audio from "@/assets/audio/IntruderAudio/intruder_game_instruction_en.wav";
import instruction_es_audio from "@/assets/audio/IntruderAudio/intruder_game_instruction_es.wav";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { IntruderCongrats } from "./IntruderCongrats";
import "./Intruder.scss";
import "../../theme/animate.scss";
import { card } from "ionicons/icons";

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
  const { isImmersive } = useProfile();
  const {addAudio, clearAudio, setCallback} = useAudioManager();

  useEffect(() => {
    const audios = [instruction_es_audio];
    if(!isImmersive){
      audios.push(instruction_en_audio);
    }
    addAudio(audios);
    return () => {
      clearAudio();
    };
  }, []);

  const initialStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    aspectRatio: '1 / 1.25',
    border: '8.4px solid transparent',
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

  const temporaryBackgroundStyle = {
    backgroundImage: `url(${cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "2",
  };

  const temporaryAudioPlayingStyle = {
    borderRadius: "32px",
    border: "8.4px solid var(--Base-Hover-Shadow, rgba(0, 0, 0, 0.08))",
    background: "#FFF",
    boxShadow: "0px 8.4px 25.2px 7px rgba(0, 0, 0, 0.60)",
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

  const goToNextWordGroup = () => {
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
        audio: wordGroup.intruder_audio[0],
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
    if (!card.isIntruder) {
      //logic for the incorrect cards
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
    // todo: audiomanager needs interstitial before and after callbacks
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
        <div className="margin-top-4 margin-bottom-2">
          <IonText>
            <h1 className="text-5xl color-suelo">¿Qué palabra no rima?</h1>
            {!isImmersive && (
              <p className="text-3xl color-english">
                Which word does not rhyme?
              </p>
            )}
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
	      <img src={card.image.url} style={{opacity: showBackside ? 0 : 1}}/>
	      <p className="text-5xl color-suelo" style={{opacity: showBackside ? 0 : 1}}>{card.word}</p>
            </IonCard>
          ))}
        </div>
        <div className="sound-button">
          <IonButton
            className="sound-button-background"
            onClick={() => handleWordAudioClick()}
          >
            <img className="sound-icon" src={volumeButton} />
          </IonButton>
          <IonText>
            <h1 className="text-3xl semibold color-suelo">Lee</h1>
            {!isImmersive && (
              <p className="text-lg color-english">
                Read
              </p>
            )}
          </IonText>
        </div>
      </div>
    </>
  );
};
