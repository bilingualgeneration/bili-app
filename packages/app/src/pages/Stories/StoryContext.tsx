import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { updateActivityStars } from "@/realtimeDb";
import { getStarsFromAttempts } from "@/lib/utils";
import { useActivity } from "@/contexts/ActivityContext";

type Vocab = any;
type Lang = string;

type VocabDictionaries = {
  [lang: Lang]: {
    [key: string]: Vocab;
  };
};

type VocabLookup = {
  [key: string]: {
    [lang: Lang]: string;
  };
};

export type Attempt = {
  pageNumber: number;
  mistakes: number;
};

type PageNumber = number;

export type GameData = Record<
  PageNumber,
  {
    totalMistakesPossible: number;
  }
>;

interface StoryState {
  pages: any;
  setPages: Dispatch<SetStateAction<any>>;
  pageNumber: number;
  pageForward: any;
  pageBackward: any;
  setPageNumber: Dispatch<SetStateAction<number>>;
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
  vocab: VocabDictionaries;
  setVocab: Dispatch<SetStateAction<VocabDictionaries>>;
  vocabLookup: VocabLookup;
  setVocabLookup: Dispatch<SetStateAction<VocabLookup>>;
  currentVocabWord: string | null;
  setCurrentVocabWord: Dispatch<SetStateAction<string | null>>;
  pageLocks: any;
  setPageLocks: Dispatch<SetStateAction<any>>;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
}

const StoryContext = createContext<StoryState>({} as StoryState);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pages, setPages] = useState<any>([]);
  const totalPages = pages.length;

  const [ready, setReady] = useState<boolean>(false);
  const [currentVocabWord, setCurrentVocabWord] = useState<string | null>(null);
  const [pageLocks, setPageLocks] = useState<any>({});
  const [vocab, setVocab] = useState<VocabDictionaries>({
    es: {},
    "es-inc": {},
    en: {},
  });
  const [vocabLookup, setVocabLookup] = useState<VocabLookup>({});

  const {
    attempts,
    gamesData,
    setPageNumber: setActivityPageNumber,
  } = useActivity();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setActivityPageNumber(pageNumber);
  }, [pageNumber]);

  // Record attempt and calculate stars
  useEffect(() => {
    if (id && pageNumber === totalPages - 1) {
      recordUserActivity({
        activity: "story",
        activityId: id,
        type: "attempt",
        time: new Date().toISOString(),
        version: "0.0.1",
        data: JSON.stringify({
          attempts,
        }),
      });

      updateActivityStars({
        classroomId: null,
        userId: "user1",
        activity: "story",
        activityId: id,
        stars: getStarsFromAttempts(attempts, gamesData),
      });
    }
  }, [pageNumber, totalPages]);

  const functions = getFunctions();

  const recordUserActivity = httpsCallable(functions, "user-activity-record");

  const pageForward = () => {
    if (totalPages > 0 && !pageLocks[pageNumber]) {
      // Increment page
      setPageNumber((p) => {
        const newPage = p < totalPages - 1 ? p + 1 : totalPages - 1;
        if (id) {
          recordUserActivity({
            activity: "story",
            activityId: id,
            type: "pageForward",
            time: new Date().toISOString(),
            version: "0.0.1",
            data: {
              newPage,
            },
          });
        }

        return newPage;
      });
    }
  };

  const pageBackward = () => {
    if (totalPages > 0) {
      setPageNumber((p) => (p > 0 ? p - 1 : 0));
    }
  };

  return (
    <StoryContext.Provider
      value={{
        pageLocks,
        setPageLocks,
        pageNumber,
        pageForward,
        pageBackward,
        setPageNumber,
        ready,
        setReady,
        vocab,
        setVocab,
        currentVocabWord,
        setCurrentVocabWord,
        vocabLookup,
        setVocabLookup,
        pages,
        setPages,
        id,
        setId,
      }}
      children={children}
    />
  );
};
