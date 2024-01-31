import React, { FC, useEffect, useState } from "react";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { doc } from "firebase/firestore";
import { any, string } from "zod";

export const CountWithMe: React.FC = () => {
  console.log("Component rendered");
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
    gameBackground: any;
  }>({
    animalImages: [],
    gameQuestions: [],
    gameBackground: any,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showNumber, setSHowNumber] = useState(false);

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
        gameBackground: animalGroup.game_background_image,
      };

      setData(countGameData);
    }
  }, [data, currentIndex]);

  //function to handle bird click order
  const arrayOfImagesqueue: number[] = [];

  const handleBirdClickOrder = (index: number) => {
    arrayOfImagesqueue.push(index);
    setSHowNumber(true);
  };

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
          {getData.gameQuestions.length > 0 && (
            <>
              <h1>{getData.gameQuestions[1].text}</h1>
              {!isImmersive && <p>{getData.gameQuestions[0].text}</p>}
            </>
          )}
        </IonText>
        <img
          src={getData.gameBackground.url}
          alt="hummingbirds"
          style={{ width: "100%" }}
        />

        {/* Overlay animals */}
        {getData.animalImages.map((animal, index) => (
          <img
            key={index}
            src={animal.image.url}
            alt={`animal-${index}`}
            style={{
              position: "absolute",
              cursor: "pointer",
              top: `${animal.coordinate_y}px`,
              left: `${animal.coordinate_x}px`,
            }}
            onClick={() => handleBirdClickOrder(index)}
          />
          // {showNumber &&
          //   (
          //     <div className="number-overlay">
          //     123
          //     </div>
          //   )
          // }
        ))}
      </div>
    </div>
  );
};
