//game logic AM
import React, { useRef, FC, useEffect, useState } from "react";
//import {CountFacts} from './CountFacts';
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { FormattedMessage } from "react-intl";
import { useProfile } from "@/contexts/ProfileContext";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { FactsPage } from "./CountFacts";
import { doc } from "firebase/firestore";
import { any, string } from "zod";
import incorrect_card_audio from "@/assets/audio/IntruderAudio/intruder_incorrect.wav";
import correct_card_audio from "@/assets/audio/IntruderAudio/intruder_correct.wav";
import card_flip_audio from "@/assets/audio/IntruderAudio/intruder_card_flip.wav";
import {useHistory} from 'react-router-dom';
import "./CountWithMe.scss";
import { useAudioManager } from "@/contexts/AudioManagerContext";

export const CountWithMeGame: React.FC = () => {
  const { isInclusive, isImmersive } = useProfile();
  const history = useHistory();
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  //@ts-ignore
  const { pack_id } = useParams();
  const firestore = useFirestore();
  useEffect(() => {
    return clearAudio;
  }, []);
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
    voice: string;
  }>({
    animalImages: [],
    gameQuestions: [],
    countQuestions: [],
    gameBackground: any,
    factBackground: any,
    factText: [],
    voice: ''
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
  const [showNumber, setShowNumber] = useState(false);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [allAnimalsClicked, setAllAnimalsClicked] = useState(false);
  const [showFacts, setShowFacts] = useState<boolean>(false);
  const prevState = useRef<string>('');

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const goToNextAnimalGroup = () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.groups.length - 1) {
      setCurrentIndex(0); // Reset to the first element
      history.replace('/student-dashboard');
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
	      voice: animalGroup.counting_voice
      };
      // console.log(animalGroup);

      let audios = [];
      if(allAnimalsClicked){
        const ften = countGameData.countQuestions.filter((f: any) => f.language === 'en')[0];
        const ftes = countGameData.countQuestions.filter((f: any) => f.language === 'es')[0];
        const ftesinc = countGameData.countQuestions.filter((f: any) => f.language === 'es-inc')[0];
        audios.push(ftes.audio.url);
        if(!isImmersive){
          if(ften && ften.audio){
            audios.push(ften.audio.url);
          }
        }
      }else{
        const ften = countGameData.gameQuestions.filter((f: any) => f.language === 'en')[0];
        const ftes = countGameData.gameQuestions.filter((f: any) => f.language === 'es')[0];
        const ftesinc = countGameData.gameQuestions.filter((f: any) => f.language === 'es-inc')[0];
        audios.push(ftes.audio.url);
        if(!isImmersive){
          if(ften && ften.audio){
            audios.push(ften.audio.url);
          }
        }
      }
      if(!showFacts){
	      addAudio(audios);
      }  
      setData(countGameData);
    }
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
      if (clickedIndexes.length + 1 === getData.animalImages.length) {
        setAllAnimalsClicked(true);
        //switches text from game question to count questions
      }
      if(clickedIndexes.length + 1 !== getData.animalImages.length){
	let audios = [`/assets/audio/count/${clickedIndexes.length + 1}_${getData.voice.toLowerCase()}_es.wav`];
	if(!isImmersive){
	  audios.push(`/assets/audio/count/${clickedIndexes.length + 1}_${getData.voice.toLowerCase()}_en.wav`);
	}
	//addAudio(audios);
      }
    }

    //next step happens only when all images were clicked
    if (clickedIndexes.length === getData.animalImages.length) {
      if (clickedIndexes.indexOf(index) !== getData.animalImages.length - 1) {
        //logic for the incorrect number
	addAudio([incorrect_card_audio]);
        //audio_incorrect.play(); //plays audio for incorrect choice
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
        //audio_correct.play(); //plays audio for correct choice
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

  // do a check if status === loading

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", paddingTop: "50vh" }}>Loading...</div>
    );
  }

  if (status === "error") {
    return "Error loading the game";
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
            onClick={() => handleBirdClickOrder(index)}
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
      <span style={{ display: "none" }}>
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
      </span>
    </>
  );
};
