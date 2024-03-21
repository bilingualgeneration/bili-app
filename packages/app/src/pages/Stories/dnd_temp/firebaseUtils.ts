import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/ProfileContext';

interface LetterAudio {
  url: string;
}

interface LetterData {
  id: string;
  esText?: string;
  esAudio?: LetterAudio;
  esIncText?: string;
  esIncAudio?: LetterAudio;
}

interface Game {
  dnd_letters: Array<{
    letter: Array<{
      language: string;
      text: string;
      audio: LetterAudio;
    }>;
  }>;
}

export interface StoriesGameProps {
  data: Game;
}

export function useFirebaseData(data: Game): [LetterData[]] {
  const { isInclusive } = useProfile();
  const [chosenLanguageData, setChosenLanguageData] = useState<LetterData[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      const extractedLetters = data.dnd_letters.map((letterItem: any, index: number) => {
        // Generate a unique id for each letter object for react-dnd
        const id = `id${index}`;

        if (isInclusive) {
          const esIncItems = letterItem.letter.filter(
            (item: any) => item.language === "es-inc",
          );
          return {
            id,
            esIncText: esIncItems.length > 0 ? esIncItems[0].text : "",
            esIncAudio: esIncItems.length > 0 ? esIncItems[0].audio : undefined,
          };
        } else {
          const esItems = letterItem.letter.filter(
            (item: any) => item.language === "es",
          );
          return {
            id,
            esText: esItems.length > 0 ? esItems[0].text : "",
            esAudio: esItems.length > 0 ? esItems[0].audio : undefined,
          };
        }
      });

      setChosenLanguageData(extractedLetters);
    }
  }, [data, isInclusive]);

  return [chosenLanguageData];
}
