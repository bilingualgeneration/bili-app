import React, { FC, useEffect, useState } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { any, string } from "zod";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import card_flip_audio from "@/assets/audio/IntruderAudio/intruder_card_flip.wav";
import "./countWithMe.scss";

export const CountWithMe: React.FC = () => {
  const { isImmersive } = useProfile();
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();

  //Firestore operations
  const ref = doc(firestore, "count-with-me-game", pack_id);
  const { status, data } = useFirestoreDocData(ref);

  const [getData, setData] = useState<{
    animalImages: any[];
    gameQuestions: any[];
    countQuestions: any[];
    gameBackground: any;
    factBackground: any;
    factText: any[];
  }>({
    animalImages: [],
    gameQuestions: [],
    countQuestions: [],
    gameBackground: any,
    factBackground: any,
    factText: [],
  });

  //audio files
  const audio_correct = new Audio(correct_card_audio);
  const audio_incorrect = new Audio(incorrect_card_audio);
  const card_flip = new Audio(card_flip_audio);

  //styles for correct or incorrect choice
  const initialStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    WebkitFilter: "drop-shadow(-4.638px 9.275px 27.826px rgba(0, 0, 0, 0.25))",
    filter: "drop-shadow(-4.638px 9.275px 27.826px rgba(0, 0, 0, 0.25))",
  };

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    WebkitFilter:
      "drop-shadow(1px 1px 0 var(--alerts-status-success, #12D18E)) drop-shadow(-1px -1px 0 var(--alerts-status-success, #12D18E)) drop-shadow(1px 1px 5px rgba(0,0,0,0.5))",
    filter:
      "drop-shadow(1px 1px 0 var(--alerts-status-success, #12D18E)) drop-shadow(-1px -1px 0 var(--alerts-status-success, #12D18E)) drop-shadow(1px 1px 5px rgba(0,0,0,0.5))",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "32px",
    WebkitFilter:
      "drop-shadow(1px 1px 0 var(--Categories-Error, #F0091B)) drop-shadow(-1px -1px 0 var(--Categories-Error, #F0091B)) drop-shadow(1px 1px 5px rgba(0,0,0,0.5))",
    filter:
      "drop-shadow(1px 1px 0 var(--Categories-Error, #F0091B)) drop-shadow(-1px -1px 0 var(--Categories-Error, #F0091B)) drop-shadow(1px 1px 5px rgba(0,0,0,0.5))",
  };

  //states
  const [animalColors, setAnimalColors] = useState<{ [key: string]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showNumber, setSHowNumber] = useState(false);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [allAnimalsClicked, setAllAnimalsClicked] = useState(false);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const goToNextAnimalGroup = () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.groups.length - 1) {
      setCurrentIndex(0); // Reset to the first element
    } else {
      setCurrentIndex(currentIndex + 1); // Move to the next element
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      const animalGroup = data.groups[currentIndex];

      const countGameData = {
        animalImages: animalGroup.animals,
        gameQuestions: animalGroup.game_text,
        countQuestions: animalGroup.counting_text,
        gameBackground: animalGroup.game_background_image,
        factBackground: animalGroup.fact_background_image,
        factText: animalGroup.fact_text,
      };

      setData(countGameData);
    }
  }, [data, currentIndex]);

  //logic when the correct animal number is choosen
  useEffect(() => {
    if (isCorrectSelected) {
      setShowCongrats(true);
      goToNextAnimalGroup();
    }
  }, [isCorrectSelected]);

  //function to handle bird click order
  const handleBirdClickOrder = (index: number) => {
    if (!clickedIndexes.includes(index)) {
      setClickedIndexes([...clickedIndexes, index]);
      if (index === getData.animalImages.length - 1) {
        setAllAnimalsClicked(true); //switches text from game question to count questions
      }
    }

    //next step happens only when all images were clicked
    if (clickedIndexes.length === getData.animalImages.length) {
      if (clickedIndexes.indexOf(index) !== getData.animalImages.length - 1) {
        //logic for the incorrect number
        audio_incorrect.play(); //plays audio for incorrect choice
        setAnimalColors((prevColors: any) => ({
          ...prevColors,
          [getData.animalImages[index].image.id]: {
            ...incorrectStyle,
            animation: "shake 1s",
          },
        }));

        setTimeout(() => {
          setAnimalColors((prevColors: any) => ({
            ...prevColors,
            [getData.animalImages[index].image.id]: initialStyle,
          }));
        }, 1000);
      } else {
        //logic when the correct card is choosen
        audio_correct.play(); //plays audio for correct choice
        setAnimalColors((prevColors: any) => ({
          ...prevColors,
          [getData.animalImages[index].image.id]: correctStyle,
        }));

        setTimeout(() => {
          setIsCorrectSelected(true);
        }, 1000);
      }
    }
  };

  if (showCongrats) {
    return (
      <>
        <h1>{getData.factText[1].text}</h1>
        {!isImmersive && (
          <p className="count-english-text-style">{getData.factText[0].text}</p>
        )}
        <img
          src={getData.factBackground.url}
          alt="animals"
          style={{
            width: "100%",
            cursor: "pointer",
            borderRadius: "32px",
            boxShadow: "-4.638px 9.275px 27.826px 0px rgba(0, 0, 0, 0.25)",
          }}
        />
      </>
      // <CountFacts
      //  factText = {factText}
      // factBackround = {factBackround}
      //
      // />
    );
  }

  // do a check if status === loading

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
  }

  return (
    <div
      style={{
        backgroundColor: "#F7FAF9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          width: "1159px",
          height: "800px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <IonText>
          {getData.gameQuestions.length > 0 &&
            getData.countQuestions.length > 0 && (
              <>
                {allAnimalsClicked ? (
                  <>
                    <h1>{getData.countQuestions[1].text}</h1>
                    {!isImmersive && (
                      <p className="count-english-text-style">
                        {getData.countQuestions[0].text}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h1>{getData.gameQuestions[1].text}</h1>
                    {!isImmersive && (
                      <p className="count-english-text-style">
                        {getData.gameQuestions[0].text}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
        </IonText>
        <img
          src={getData.gameBackground.url}
          alt="hummingbirds"
          style={{
            width: "100%",
            cursor: "pointer",
            borderRadius: "32px",
            boxShadow: "-4.638px 9.275px 27.826px 0px rgba(0, 0, 0, 0.25)",
          }}
        />

        {/* Overlay animals */}
        {getData.animalImages.map((animal, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${animal.coordinate_y}px`,
              left: `${animal.coordinate_x}px`,
              cursor: "pointer",
            }}
            onClick={() => handleBirdClickOrder(index)}
          >
            <img
              className="image-count-with-me-style"
              src={animal.image.url}
              alt={`animal-${index}`}
              style={animalColors[animal.image.id]}
            />
            {clickedIndexes.includes(index) && (
              <div
                className="number-overlay"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "33px",
                  fontWeight: "700",
                }}
              >
                {clickedIndexes.indexOf(index) + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
