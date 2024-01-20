//AM
import React, { useState, useEffect, useMemo } from "react";
import {
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
import { useProfile } from "@/contexts/ProfileContext";
import almohada1 from "@/assets/icons/intruder_almohada_1.svg";
import empanada from "@/assets/icons/intruder_empanada.svg";
import cover from "@/assets/icons/card_back.svg";
import incorrect_card_audio from "@/assets/audio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/intruder_correct.wav";
import card_flip_audio from "@/assets/audio/intruder_card_flip.wav";
import "./Intruder.scss";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { Intruder3 } from "./Intruder3";

interface BiliImage {
  url: string;
}

interface Game {
  word_group: Array<{
    intruder_text: string;
    intruder_image: BiliImage;
    word_2_text: string;
    word_2_image: BiliImage;
    word_3_text: string;
    word_3_image: BiliImage;
  }>;
}

interface IntruderGameProps {
  game: Game;
}

export const IntruderGame: React.FC<IntruderGameProps> = ({ game: data }) => {
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const { isImmersive } = useProfile();
  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);
  const card_flip = new Audio(card_flip_audio);

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

  const temporaryBackgroundStyle = {
    backgroundImage: `url(${cover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "2",
  };

  const [cardColors, setCardColors] = useState({
    1: initialStyle,
    2: initialStyle,
    3: initialStyle,
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
        id: 1,
      },
      { word: wordGroup.word_2_text, image: wordGroup.word_2_image, id: 2 },
      { word: wordGroup.word_3_text, image: wordGroup.word_3_image, id: 3 },
    ];
    return shuffleArray(cards);
  }, [data, currentIndex]);

  useEffect(() => {
    if (isCorrectSelected) {
      setShowBackside(true);
      card_flip.play(); //sound for flipping cards

      setTimeout(() => {
        if (
          (currentIndex + 1) % 5 === 0 ||
          currentIndex === data.word_group.length - 1
        ) {
          setShowCongrats(true); //go to the Intruder3 page
        }

        setShowBackside(false);
        goToNextWordGroup(); //check for the current index
        setIsCorrectSelected(false); // Reset the state
        setCardColors({
          1: initialStyle,
          2: initialStyle,
          3: initialStyle,
        });
      }, 2000);
    }
  }, [isCorrectSelected]);

  // Function to handle card click
  const handleCardClick = (card: any) => {
    if (!card.isIntruder) {
      //logic for the incorrect cards
      audio_incorrect.play(); //plays audio for incorrect choice
      setCardColors((prevColors) => ({
        ...prevColors,
        [card.id]: { ...incorrectStyle, animation: "shake 1s" },
      }));

      setTimeout(() => {
        setCardColors((prevColors) => ({
          ...prevColors,
          [card.id]: initialStyle,
        }));
      }, 1000);
    } else {
      //logic when the correct card is choosen
      audio_correct.play(); //plays audio for correct choice
      setCardColors((prevColors) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }
  };

  if (showCongrats) {
    return <Intruder3 setShowCongrats={setShowCongrats} />;
  }

  return (
    <>
      <div id="intruder-styles">
        <div className="intruder-game-title">
          <h2>¿Qué palabra no rima?</h2>
          {!isImmersive && (
            <>
              <p>Which word does not rhyme?</p>
            </>
          )}
        </div>
        <div className="intruder-cards-container">
          {shuffledCards.map((card) => (
            <IonCard
              key={card.id}
              className="intruder-card-style"
              style={
                showBackside ? temporaryBackgroundStyle : cardColors[card.id]
              }
              onClick={() => handleCardClick(card)}
            >
              {!showBackside && <img src={card.image.url} />}
              {!showBackside && (
                <p className="intruder-card-title">{card.word}</p>
              )}
            </IonCard>
          ))}
        </div>
      </div>
    </>
  );
};
