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
import { useProfile } from "@/hooks/Profile";
import {useLanguageToggle} from '@/components/LanguageToggle';
import {useStory} from './StoryContext';
import { useAudioManager } from "@/contexts/AudioManagerContext";
import "../../pages/Stories/Stories.scss";

interface PictureImage {
  url: string;
}

interface PictureAudio {
  url: string;
}

interface TextPack {
  text: string;
  audio: PictureAudio;
  language: "en" | "es" | "en-inc" | "es-inc";
}

interface Story {
  multiple_image_text: TextPack[];
  multiple_image_correct_image: PictureImage;
  multiple_image_incorrect_image_1: PictureImage;
  multiple_image_incorrect_image_2: PictureImage;
  multiple_image_incorrect_image_3: PictureImage;
  multiple_syllable_correct_audio: PictureAudio;
  multiple_syllable_correct_image: PictureImage;
  multiple_syllable_incorrect_audio_1: PictureAudio;
  multiple_syllable_incorrect_image_1: PictureImage;
  multiple_syllable_incorrect_audio_2: PictureAudio;
  multiple_syllable_incorrect_image_2: PictureImage;
  multiple_syllable_incorrect_audio_3: PictureAudio;
  multiple_syllable_incorrect_image_3: PictureImage;
  multiple_syllable_text: TextPack[];
}

interface GameCard {
  image: PictureImage;
  isTarget: boolean;
  id: string;
  audio: PictureAudio;
}

interface GameHeader {
  es: TextPack;
  en?: TextPack;
}

interface StoriesGameProps {
  //game: Story;
  game: any;
  gameType: "image" | "syllable";
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getCardsFromImageGame(story: Story): GameCard[] {
  return [
    {
      image: story.multiple_image_correct_image,
      isTarget: true,
      id: "1",
      audio: { url: "/assets/audio/choice_correct.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_1,
      isTarget: false,
      id: "2",
      audio: { url: "/assets/audio/choice_incorrect.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_2,
      isTarget: false,
      id: "3",
      audio: { url: "/assets/audio/choice_incorrect.wav" },
    },
    {
      image: story.multiple_image_incorrect_image_3,
      isTarget: false,
      id: "4",
      audio: { url: "/assets/audio/choice_incorrect.wav" },
    },
  ];
}

function getCardsFromSyllableGame(story: Story): GameCard[] {
  return [
    {
      image: story.multiple_syllable_correct_image,
      isTarget: true,
      id: "1",
      audio: story.multiple_syllable_correct_audio,
    },
    {
      image: story.multiple_syllable_incorrect_image_1,
      isTarget: false,
      id: "2",
      audio: story.multiple_syllable_incorrect_audio_1,
    },
    {
      image: story.multiple_syllable_incorrect_image_2,
      isTarget: false,
      id: "3",
      audio: story.multiple_syllable_incorrect_audio_2,
    },
    {
      image: story.multiple_syllable_incorrect_image_3,
      isTarget: false,
      id: "4",
      audio: story.multiple_syllable_incorrect_audio_3,
    },
  ];
}

export const StoriesGame: React.FC<StoriesGameProps> = ({
  game: data,
  gameType,
}) => {
  const { profile: {isInclusive} } = useProfile();
  const {language} = useLanguageToggle();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio, setCallback } = useAudioManager();
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {pageForward} = useStory();
  
  const headerData = useMemo((): GameHeader => {
    const textPacks =
      gameType === "image"
        ? data.multiple_image_text
      : data.multiple_syllable_text;
    console.log(textPacks);
    return {
      es: textPacks.find(
        (tp: any) => tp.language === (isInclusive ? "es-inc" : "es"),
      )!,
      en: textPacks.find(
            (tp: any) => tp.language === "en",
          ),
    };
  }, [language, isInclusive, data, gameType]);

  //audio effect for autoplaying
  useEffect(() => {
    const audios = [headerData.es.audio.url];
    if (headerData.en) {
      audios.push(headerData.en.audio.url);
    }
    addAudio(audios);

    return () => {
      clearAudio();
    };
  }, [headerData]);

  //styles for correct and wrong cards
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
    "4": initialStyle,
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const shuffledCards = useMemo(() => {
    const cards =
      gameType === "image"
        ? getCardsFromImageGame(data)
        : getCardsFromSyllableGame(data);
    return shuffleArray(cards);
  }, [data, currentIndex, gameType]);

  useEffect(() => {
    // todo: remove from useEffect
    if (isCorrectSelected) {
      setTimeout(() => {
	pageForward();
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

      addAudio([card.audio.url]);

      //plays audio for incorrect choice
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
      addAudio([card.audio.url]); //plays audio for correct choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }

    if (!card.isTarget) {
      //logic for the incorrect cards
      addAudio([card.audio.url]); //plays audio for incorrect choice
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
      addAudio([card.audio.url]); //plays audio for correct choice
      setCardColors((prevColors: any) => ({
        ...prevColors,
        [card.id]: correctStyle,
      }));

      setTimeout(() => {
        setIsCorrectSelected(true);
      }, 1000);
    }
  };
  console.log(headerData);
  return (
    <>
      <div style={{width: 800, margin: 'auto', textAlign: 'center'}}>
        <div className="margin-top-2 margin-bottom-2 text-responsive">
          <IonText
            className=""
            style={{
              textAlign: "center",
            }}
          >
            <h1 className="text-4xl color-suelo">
	      {language === 'en'
	      ? headerData.en?.text
	      : headerData.es.text}
	    </h1>

            {language === 'esen' && headerData.en && (
              <p className="text-3xl color-english">{headerData.en.text}</p>
            )}
          </IonText>
        </div>
        <div className="">
          <IonGrid fixed={true}>
            <IonRow className="ion-justify-content-center">
              {shuffledCards.slice(0, 2).map((card, index) => (
                <IonCol
                  key={card.id}
                  className=""
                  size="auto"
                  onClick={() => handleCardClick(card)}
                >
                  <img className="stories-game-image" style={
                    cardColors[card.id]
                  } 
                    src={card.image.url} />
                </IonCol>
              ))}
            </IonRow>
            <IonRow className="ion-justify-content-center">
              {shuffledCards.slice(2, 4).map((card, index) => (
                <IonCol
                  key={index}
                  className=""
                  size="auto"
                  onClick={() => handleCardClick(card)}
                >
                  <img className="stories-game-image" style={cardColors[card.id]} src={card.image.url} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
