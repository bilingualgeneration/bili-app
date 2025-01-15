import classnames from "classnames";
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
import { useLanguage } from "@/hooks/Language";
import { useStory } from "./StoryContext";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useActivity } from "@/contexts/ActivityContext";
import { useState, useEffect, useMemo } from "react";

import "./StoriesGame.scss";
import bili from "@/assets/icons/bili_big_avatar.svg"; // TODO: placeholder image

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
  audio?: PictureAudio;
}

interface GameHeader {
  es: TextPack;
  en?: TextPack;
}

interface StoriesGameProps {
  id: string;
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
    },
    {
      image: story.multiple_image_incorrect_image_1,
      isTarget: false,
      id: "2",
    },
    {
      image: story.multiple_image_incorrect_image_2,
      isTarget: false,
      id: "3",
    },
    {
      image: story.multiple_image_incorrect_image_3,
      isTarget: false,
      id: "4",
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
  id,
  game: data,
  gameType,
}) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language, filterText } = useLanguage();
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const { addAudio, clearAudio } = useAudioManager();
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { pageNumber, pageLocks, setPageLocks, pageForward } = useStory();
  const { handleAttempt } = useActivity();
  const [correctCard, setCorrectCard] = useState<string | null>(null);
  const [incorrectCard, setIncorrectCard] = useState<string | null>(null);

  const texts =
    gameType === "image"
      ? filterText(data.multiple_image_text)
      : filterText(data.multiple_syllable_text);
  //audio effect for autoplaying
  useEffect(() => {
    addAudio(texts.map((t: any) => t.audio.url));
  }, [id]);

  useEffect(() => {
    return () => {
      setIsCorrectSelected(false); // Reset the state
      setCorrectCard(null);
      clearAudio();
    };
  }, []);

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
    // todo: remove settimeout
    if (isCorrectSelected) {
      setTimeout(() => {
        setPageLocks({
          ...pageLocks,
          [pageNumber]: false,
        });
        setIsCorrectSelected(false); // Reset the state
        setCorrectCard(null);
        pageForward();
      }, 3000);
    }
  }, [isCorrectSelected]);

  // Function to handle card click
  const handleCardClick = (card: any) => {
    handleAttempt(id, Boolean(card.isTarget));

    if (!card.isTarget) {
      addAudio(["/assets/audio/choice_incorrect.wav", card.audio?.url]);
      setIncorrectCard(card.id);
      setTimeout(() => {
        setIncorrectCard(null);
      }, 1000);
    } else {
      addAudio(["/assets/audio/choice_correct.wav", card.audio?.url]); //plays audio for correct choice
      setCorrectCard(card.id);
      setIsCorrectSelected(true);
    }
  };
  return (
    <>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <div className="margin-top-2 margin-bottom-2 text-responsive">
          <IonText className="ion-text-center">
            <h1 className="text-4xl color-suelo">{texts[0].text}</h1>
            {texts.length > 1 && (
              <p className="text-2xl color-english">{texts[1].text}</p>
            )}
          </IonText>
        </div>
        <div id="stories-game-mcg-wrapper">
          <IonGrid>
            <IonRow>
              {shuffledCards.map((card, index) => (
                <IonCol
                  key={card.id}
                  size-xs="3"
                  size-md="6"
                  onClick={() => handleCardClick(card)}
                >
                  <div
                    className={classnames("stories-game-mcg-card drop-shadow", {
                      correct: correctCard === card.id,
                      incorrect: incorrectCard === card.id,
                    })}
                  >
                    <img
                      className="stories-game-image"
                      src={card.image ? card.image.url : bili}
                    />
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
