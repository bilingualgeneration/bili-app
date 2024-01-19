//AM
import React, { useState, useEffect } from "react";
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
import "./Intruder.scss";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";

interface IntruderGameProps {
  game: any;
}

export const Intruder2: React.FC<IntruderGameProps> = ({ game: data }) => {
  const { isImmersive } = useProfile();
  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);

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

  //hardcoded set of cards untill we pull over from Db
  //   const cardSet1 = [
  //     { id: 1, isCorrect: false, imgSrc: almohada1, text: "almohada" },
  //     { id: 2, isCorrect: false, imgSrc: empanada, text: "empanada" }, // Assuming this is the correct card
  //     {
  //       id: 3,
  //       isCorrect: true,
  //       imgSrc: "/assets/img/intruder_boca.png",
  //       text: "boca",
  //     },
  //   ];

  //   const cardSet2 = [
  //     {
  //       id: 1,
  //       isCorrect: true,
  //       imgSrc: "/assets/img/intruder_boca.png",
  //       text: "boca",
  //     },
  //     { id: 2, isCorrect: false, imgSrc: almohada1, text: "almohada" },
  //     { id: 3, isCorrect: false, imgSrc: empanada, text: "empanada" }, // Assuming this is the correct card
  //   ];

  const [cardColors, setCardColors] = useState({
    1: initialStyle,
    2: initialStyle,
    3: initialStyle,
  });
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showBackside, setShowBackside] = useState(false);
  //   const [currentCardSet, setCurrentCardSet] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const wordGroup = data[currentIndex];
  const incorrectWord = wordGroup.intruder_text;

  const cards = [
    { word: wordGroup.intruder_text, image: wordGroup.intruder_image },
    { word: wordGroup.word_2_text, image: wordGroup.word_2_image },
    //{...}
  ];

  useEffect(() => {
    if (isCorrectSelected) {
      setShowBackside(true);

      setTimeout(() => {
        setShowBackside(false);
        setCurrentIndex(currentIndex + 1); // Update to new set of cards
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
  const handleCardClick = (cardNumber: number, isCorrect: boolean) => {
    if (!isCorrect) {
      //logic for the incorrect cards

      audio_incorrect.play(); //plays audio for incorrect choice
      setCardColors((prevColors) => ({
        ...prevColors,
        [cardNumber]: { ...incorrectStyle, animation: "shake 1s" },
      }));

      setTimeout(() => {
        setCardColors((prevColors) => ({
          ...prevColors,
          [cardNumber]: initialStyle,
        }));
      }, 1000);
    } else {
      //logic when the correct card is choosen

      audio_correct.play(); //plays audio for correct choice
      setCardColors((prevColors) => ({
        ...prevColors,
        [cardNumber]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }
  };

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
          {currentCardSet.map((card) => (
            <IonCard
              key={card.id}
              className="intruder-card-style"
              style={
                showBackside ? temporaryBackgroundStyle : cardColors[card.id]
              }
              onClick={() => handleCardClick(card.id, card.isCorrect)}
            >
              {!showBackside && <img src={card.imgSrc} />}
              {!showBackside && (
                <p className="intruder-card-title">{card.text}</p>
              )}
            </IonCard>
          ))}
        </div>
      </div>
    </>
  );
};
