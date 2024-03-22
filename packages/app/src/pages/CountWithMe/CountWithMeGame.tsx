//game logic AM
import React, { useRef, FC, useEffect, useState } from "react";
//import {CountFacts} from './CountFacts';
import {IonText} from "@ionic/react";
import { useProfile } from "@/contexts/ProfileContext";
import { FactsPage } from "./CountFacts";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.mp3";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.mp3";
import { useHistory } from 'react-router-dom';
import "./CountWithMe.scss";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { CountCongrats } from "./CountCongrats";

interface BiliImage {
  url: string;
  id: number
}

interface BiliAudio {
  url: string;
}

interface CountWithMeGame {
  groups: Array<
  {
    animals: Array<{
      image: BiliImage,
      x_percent: number,
      y_percent: number,
      text_color: string,
    }>,
    counting_text: Array<{
      text: string,
      language: string,
      audio: BiliAudio,
    }>,
    fact_text: Array<{
      text: string,
      language: string,
      audio: BiliAudio,
    }>,
    game_text: Array<{
      text: string,
      language: string,
      audio: BiliAudio,
    }>,
    fact_background_image: BiliImage,
    game_background_image: BiliImage,
    counting_voice: string,

  }
  >
}

interface CountGameProps {
  game: CountWithMeGame;
}

export const CountWithMeGame: React.FC<CountGameProps> = ({game: data}) => {
  const { isInclusive, isImmersive } = useProfile();
  const history = useHistory();
  const { addAudio, clearAudio, setCallback } = useAudioManager();


  useEffect(() => {
    return clearAudio;
  }, []);


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
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [allAnimalsClicked, setAllAnimalsClicked] = useState(false);
  const [showFacts, setShowFacts] = useState<boolean>(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  if (showCongrats) {
    return <CountCongrats onKeepGoingClick={showFacts} count={currentIndex} />;
  }

  const goToNextAnimalGroup = () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.groups.length - 1) {
      setCurrentIndex(0); // Reset to the first element
      history.replace('/student-dashboard');
    } else {
      setCurrentIndex(currentIndex + 1); // Move to the next element
    }
  };

  const animalGroup = data.groups[currentIndex];
  const countGameData = {
    animalImages: animalGroup.animals,
    gameQuestions: animalGroup.game_text,
    countQuestions: animalGroup.counting_text,
    gameBackground: animalGroup.game_background_image,
    factBackground: animalGroup.fact_background_image,
    factText: animalGroup.fact_text,
    voice: animalGroup.counting_voice
  };
  const getData = countGameData

  useEffect(() => {
   
      let audios = [];
      if (allAnimalsClicked) { //audio for the count questions
        const ften = countGameData.countQuestions.filter((f: any) => f.language === 'en')[0];
        const ftes = countGameData.countQuestions.filter((f: any) => f.language === 'es')[0];
        audios.push(ftes.audio.url);
        if (!isImmersive) {
          if (ften && ften.audio) {
            audios.push(ften.audio.url);
          }
        }
        
      }else{ //audio for the game questions
        const ften = countGameData.gameQuestions.filter((f: any) => f.language === 'en')[0];
        const ftes = countGameData.gameQuestions.filter((f: any) => f.language === 'es')[0];
        audios.push(ftes.audio.url);
        if(!isImmersive){
          if(ften && ften.audio){
            audios.push(ften.audio.url);
          }
        }
      }
      addAudio(audios);
  
  }, [data, currentIndex, allAnimalsClicked]);


  //logic when the correct animal number is choosen
  useEffect(() => {
    if (isCorrectSelected) {
      setShowFacts(true);
    }
  }, [isCorrectSelected]);

  //function to handle bird click order
  const handleBirdClickOrder = (index: number) => {
    if (!clickedIndexes.includes(index)) {
      setClickedIndexes([...clickedIndexes, index]);
     
      if (clickedIndexes.length + 1 <= getData.animalImages.length) {
        let audios = [`/assets/audio/count/${clickedIndexes.length + 1}_${getData.voice.toLowerCase()}_es.wav`];
        if (!isImmersive) {
          audios.push(`/assets/audio/count/${clickedIndexes.length + 1}_${getData.voice.toLowerCase()}_en.wav`);
        }
        addAudio(audios);
      }
       //switches text from game question to count questions and wait until the number's audio is stopped
      if (clickedIndexes.length + 1 === getData.animalImages.length) {
        
        setIsButtonDisabled(true);
        setTimeout(() => {
          setAllAnimalsClicked(true);
          setIsButtonDisabled(false);
        }, 2000);
      }
    }

    //next step happens only when all images were clicked
    if (clickedIndexes.length === getData.animalImages.length) {
      if (clickedIndexes.indexOf(index) !== getData.animalImages.length - 1) {
        //logic for the incorrect number
        addAudio([incorrect_card_audio]);
       //plays audio for incorrect choice
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
         //plays audio for correct choice
        addAudio([correct_card_audio]);
        setAnimalColors((prevColors: any) => ({
          ...prevColors,
          [getData.animalImages[index].image.id]: correctStyle,
        }));

        setTimeout(() => {
          setIsCorrectSelected(true);
          setAnimalColors((prevColors: any) => ({
            ...prevColors,
            [getData.animalImages[index].image.id]: initialStyle,
          }));
        }, 1000);
      }
    }
  };

  //show next page if showCongrats(true)
  if (showFacts) {
    return (
      <FactsPage
        factText={getData.factText}
        factBackground={getData.factBackground.url}
        count={currentIndex}
        onKeepGoingClick={() => {
          setIsCorrectSelected(false);
          setAllAnimalsClicked(false);
          setClickedIndexes([]);
          goToNextAnimalGroup();
          setShowFacts(false);
        }}
      />
    );
  }


  const cften = getData.countQuestions.filter((f: any) => f.language === 'en')[0];
  const cftes = getData.countQuestions.filter((f: any) => f.language === 'es')[0];
  const cftesinc = getData.countQuestions.filter((f: any) => f.language === 'es-inc')[0];
  const gften = getData.gameQuestions.filter((f: any) => f.language === 'en')[0];
  const gftes = getData.gameQuestions.filter((f: any) => f.language === 'es')[0];
  const gftesinc = getData.gameQuestions.filter((f: any) => f.language === 'es-inc')[0];

  // generate CSS class name based on group index
  const animalGroupClass = `group-${currentIndex}`;

  return (
    <>
      {/* Main container with background image */}
      <div
        className="background-card margin-top-4"
        style={{
          backgroundImage: `url(${getData.gameBackground.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          aspectRatio: '1159 / 724',
          position: "relative",
        }}
      >
        {/* Render text based on game or count questions */}
        <IonText>
          {getData.gameQuestions.length > 0 &&
            getData.countQuestions.length > 0 && (
              <>
                {allAnimalsClicked ? (
                  <>
                    <h1 className="text-4xl color-suelo">
                      {cftes.text}
                    </h1>
                    {!isImmersive && (
                      <p className="text-3xl color-english">
                        {cften.text}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl color-suelo">
                      {gftes.text}
                    </h1>
                    {!isImmersive && (
                      <p className="text-3xl color-english">
                        {gften.text}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
        </IonText>

        {/* Overlay animals */}
        {getData.animalImages.map((animal, index) => (
          <div
            key={index}
            className={`animal ${animalGroupClass}`}
            style={{
              position: "absolute",
              // width: '25%',
              // maxWidth: '100%',
              // height: 'auto',
              bottom: `${animal.y_percent || index * 5}%`,
              left: `${animal.x_percent || index * 10}%`,
              cursor: "pointer",
            }}
            onClick={!isButtonDisabled ? () => handleBirdClickOrder(index) : undefined}
          >
            {/* Animal image */}
            <img
              // className="image-count-with-me-style"
              src={animal.image.url}
              alt={`animal-${index}`}
              style={animalColors[animal.image.id]}
            />
            {/* Render number overlay if clicked */}
            {clickedIndexes.includes(index) && (
              <div
                className="number-overlay"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: `${animal.text_color}`,
                  fontSize: "80px",
                  fontWeight: "700",
                }}
              >
                {/* Display clicked index */}
                <span>{clickedIndexes.indexOf(index) + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <span style={{ display: "none" }}>
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
            <img
              src={getData.gameBackground.url}
              alt="animals"
              style={{
                width: "100%",
                cursor: "pointer",
                borderRadius: "32px",
                boxShadow: "-4.638px 9.275px 27.826px 0px rgba(0, 0, 0, 0.25)",
              }}
            />
          </div>
        </div>
      </span> */}
    </>
  );
};
