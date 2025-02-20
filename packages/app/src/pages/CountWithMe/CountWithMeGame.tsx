//game logic AM
import { GameData, useActivity } from "@/contexts/ActivityContext";
import React, { useRef, FC, useEffect, useState } from "react";
import { IonText } from "@ionic/react";
import { useProfile } from "@/hooks/Profile";
import { CountWithMeFacts } from "./CountWithMeFacts";
import incorrect_card_audio from "@/assets/audio/incorrect.mp3";
import correct_card_audio from "@/assets/audio/correct.mp3";
import { useHistory } from "react-router-dom";
import "./CountWithMe.scss";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { first } from "rxjs/operators";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { useLanguage } from "@/hooks/Language";

interface BiliImage {
  url: string;
  id: number;
}

interface BiliAudio {
  url: string;
}

interface CountWithMeGame {
  groups: Array<{
    handle: string;
    animals: Array<{
      image: BiliImage;
      x_percent: number;
      y_percent: number;
      text_color: string;
    }>;
    counting_text: Array<{
      text: string;
      language: string;
      audio: BiliAudio;
    }>;
    fact_text: Array<{
      text: string;
      language: string;
      audio: BiliAudio;
    }>;
    game_text: Array<{
      text: string;
      language: string;
      audio: BiliAudio;
    }>;
    fact_background_image: BiliImage;
    game_background_image: BiliImage;
    counting_voice: string;
  }>;
  uuid: string;
}

interface CountGameProps {
  game: CountWithMeGame;
}

export const CountWithMeGame: React.FC<CountGameProps> = ({ game: data }) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguage();
  const history = useHistory();
  const { addAudio, clearAudio, onended } = useAudioManager();
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
    setActivityState(
      {
        type: "count-with-me",
        id: data.uuid,
      },
      [],
    );

    const gamesData: GameData = new Map();
    for (const group of data.groups) {
      const groupId = group.handle;
      gamesData.set(groupId, { totalMistakesPossible: 2 });
    }
    setGamesData(gamesData);

    return clearAudio;
  }, []);

  //styles for correct or incorrect choice
  const initialStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    WebkitFilter:
      "drop-shadow(-0.289875rem 0.5796875rem 1.739125rem rgba(0, 0, 0, 0.25))",
    filter:
      "drop-shadow(-0.289875rem 0.5796875rem 1.739125rem rgba(0, 0, 0, 0.25))",
  };

  const correctStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    WebkitFilter:
      "drop-shadow(0.0625rem 0.0625rem 0 var(--alerts-status-success, #12D18E)) drop-shadow(-0.0625rem -0.0625rem 0 var(--alerts-status-success, #12D18E)) drop-shadow(0.0625rem 0.0625rem 0.3125rem rgba(0,0,0,0.5))",
    filter:
      "drop-shadow(0.0625rem 0.0625rem 0 var(--alerts-status-success, #12D18E)) drop-shadow(-0.0625rem -0.0625rem 0 var(--alerts-status-success, #12D18E)) drop-shadow(0.0625rem 0.0625rem 0.3125rem rgba(0,0,0,0.5))",
  };

  const incorrectStyle = {
    cursor: "pointer",
    borderRadius: "2rem",
    WebkitFilter:
      "drop-shadow(0.0625rem 0.0625rem 0 var(--Categories-Error, #F0091B)) drop-shadow(-0.0625rem -0.0625rem 0 var(--Categories-Error, #F0091B)) drop-shadow(0.0625rem 0.0625rem 0.3125rem rgba(0,0,0,0.5))",
    filter:
      "drop-shadow(0.0625rem 0.0625rem 0 var(--Categories-Error, #F0091B)) drop-shadow(-0.0625rem -0.0625rem 0 var(--Categories-Error, #F0091B)) drop-shadow(0.0625rem 0.0625rem 0.3125rem rgba(0,0,0,0.5))",
  };

  //states
  const [animalColors, setAnimalColors] = useState<{ [key: string]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [allAnimalsClicked, setAllAnimalsClicked] = useState(false);
  const [showFacts, setShowFacts] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const goToNextAnimalGroup = () => {
    // Check if the current index is at the last element of the word_group array
    if (currentIndex >= data.groups.length - 1) {
      setCurrentIndex(0); // Reset to the first element
      history.replace("/student-dashboard");
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
    voice: animalGroup.counting_voice,
    handle: animalGroup.handle,
  };
  const getData = countGameData;

  useEffect(() => {
    let audios = [];
    if (allAnimalsClicked) {
      //audio for the count questions
      const ften = countGameData.countQuestions.filter(
        (f: any) => f.language === "en",
      )[0];
      const ftes = countGameData.countQuestions.filter(
        (f: any) => f.language === "es",
      )[0];

      switch (language) {
        case "en":
          audios.push(ften.audio.url);
          break;
        case "es":
          audios.push(ftes.audio.url);
          break;
        case "es.en":
          audios.push(ftes.audio.url);
          audios.push(ften.audio.url);
          break;
        default:
          break;
      }
    } else {
      //audio for the game questions
      const ften = countGameData.gameQuestions.filter(
        (f: any) => f.language === "en",
      )[0];

      const ftes = countGameData.gameQuestions.filter(
        (f: any) => f.language === "es",
      )[0];

      switch (language) {
        case "en":
          audios.push(ften.audio.url);
          break;
        case "es":
          audios.push(ftes.audio.url);
          break;
        case "es.en":
          audios.push(ftes.audio.url);
          audios.push(ften.audio.url);
          break;
        default:
          break;
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
        let audios = [];
        const audio_es = `/assets/audio/count/${
          clickedIndexes.length + 1
        }_${getData.voice.toLowerCase()}_es.wav`;
        const audio_en = `/assets/audio/count/${
          clickedIndexes.length + 1
        }_${getData.voice.toLowerCase()}_en.wav`;
        switch (language) {
          case "en":
            audios.push(audio_en);
            break;
          case "es":
            audios.push(audio_es);
            break;
          case "es.en":
            audios.push(audio_es);
            audios.push(audio_en);
            break;
          default:
            break;
        }

        //switches text from game question to count questions and wait until the number's audio is stopped
        if (clickedIndexes.length + 1 === getData.animalImages.length) {
          setIsButtonDisabled(true);
          onended.pipe(first()).subscribe(() => {
            setAllAnimalsClicked(true);
            setIsButtonDisabled(false);
          });
        }
        addAudio(audios);
      }
    }

    //next step happens only when all images were clicked
    if (clickedIndexes.length === getData.animalImages.length) {
      const groupId = getData.handle;
      if (clickedIndexes.indexOf(index) !== getData.animalImages.length - 1) {
        //logic for the incorrect number
        handleAttempt(groupId, false);
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
        handleAttempt(groupId, true);
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

  if (showFacts) {
    return (
      <CountWithMeFacts
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

  const cften = getData.countQuestions.filter(
    (f: any) => f.language === "en",
  )[0];
  const cftes = getData.countQuestions.filter(
    (f: any) => f.language === "es",
  )[0];
  const cftesinc = getData.countQuestions.filter(
    (f: any) => f.language === "es-inc",
  )[0];
  const gften = getData.gameQuestions.filter(
    (f: any) => f.language === "en",
  )[0];
  const gftes = getData.gameQuestions.filter(
    (f: any) => f.language === "es",
  )[0];
  const gftesinc = getData.gameQuestions.filter(
    (f: any) => f.language === "es-inc",
  )[0];

  // generate CSS class name based on group index
  const animalGroupClass = `group-${currentIndex}`;

  return (
    <>
      {/* Main container with background image */}
      <div className="padding-top-4"></div>
      <div className="count-with-me-wrapper responsive-height-with-header">
        <div
          className="background-card"
          style={{
            backgroundImage: `url(${getData.gameBackground.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            aspectRatio: "1159 / 724",
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
                        {language !== "en" && cftes.text}
                        {language === "en" && cften.text}
                      </h1>
                      {language === "es.en" && (
                        <p className="text-3xl color-english">{cften.text}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <h1 className="text-4xl color-suelo">
                        {language !== "en" && gftes.text}
                        {language === "en" && gften.text}
                      </h1>
                      {language === "es.en" && (
                        <p className="text-3xl color-english">{gften.text}</p>
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
              onClick={
                !isButtonDisabled
                  ? () => handleBirdClickOrder(index)
                  : undefined
              }
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
                    fontSize: "5rem",
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
      </div>
    </>
  );
};
