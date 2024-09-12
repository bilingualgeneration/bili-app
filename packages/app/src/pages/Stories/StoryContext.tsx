import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useActivity } from "@/contexts/ActivityContext";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useProfile } from "@/hooks/Profile";

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
  const { language } = useLanguageToggle();
  const {
    profile: { isInclusive },
  } = useProfile();
  const [pages, setPages] = useState<any>([]);

  const [ready, setReady] = useState<boolean>(false);
  const [currentVocabWord, setCurrentVocabWord] = useState<string | null>(null);
  const [pageLocks, setPageLocks] = useState<any>({});
  const [vocab, setVocab] = useState<VocabDictionaries>({
    es: {},
    "es-inc": {},
    en: {},
  });
  const [vocabLookup, setVocabLookup] = useState<VocabLookup>({});

  const { handleRecordAttempt } = useActivity();

  const [id, setId] = useState<string | null>(null);

  // Record attempt and calculate stars
  /*
  useEffect(() => {
    const recordAttempt = async () => {
      if (id && pageNumber === totalPages - 1) {
        await handleRecordAttempt();
      }
    };

    recordAttempt();
  }, [pageNumber, totalPages]);
  */
  const functions = getFunctions();

  const recordUserActivity = httpsCallable(functions, "user-activity-record");

  const pageForward = useCallback(() => {
    // find next appropriate page number
    // must assume that all stories begin and end with pages that have ['all'] languages
    let newPageNumber = pageNumber + 1;
    const esLangCode = isInclusive ? "es-inc" : "es";
    while (
      (language === "esen" &&
        !(
          pages[newPageNumber].languages.includes(esLangCode) &&
          pages[newPageNumber].languages.includes("en")
        )) ||
      (language === "en" && !pages[newPageNumber].languages.includes("en")) ||
      (language === "es" &&
        !pages[newPageNumber].languages.includes(esLangCode))
    ) {
      newPageNumber++;
    }
    setPageNumber(newPageNumber);
    if (id) {
      recordUserActivity({
        activity: "story",
        activityId: id,
        type: "pageForward",
        time: new Date().toISOString(),
        version: "0.0.1",
        data: {
          newPageNumber,
        },
      });
    }
    /*
    if (totalPages > 0 && !pageLocks[pageNumber]) {
      // Increment page
      setPageNumber((p) => {
        const newPage = p < totalPages - 1 ? p + 1 : totalPages - 1;

        return newPage;
      });
    }
    */
  }, [isInclusive, language, pageNumber, pages]);

  const pageBackward = () => {
    let newPageNumber = pageNumber - 1;
    const esLangCode = isInclusive ? "es-inc" : "es";
    while (
      (language === "esen" &&
        !(
          pages[newPageNumber].languages.includes(esLangCode) &&
          pages[newPageNumber].languages.includes("en")
        )) ||
      (language === "en" && !pages[newPageNumber].languages.includes("en")) ||
      (language === "es" &&
        !pages[newPageNumber].languages.includes(esLangCode))
    ) {
      newPageNumber--;
    }
    setPageNumber(newPageNumber);
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
