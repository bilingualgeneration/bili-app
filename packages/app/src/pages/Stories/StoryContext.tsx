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
  currentVocabWord: string | null;
  id: string | null;
  isTranslanguaged: boolean;
  pageBackward: any;
  pageForward: any;
  pageLocks: any;
  pageNumber: number;
  pages: any;
  ready: boolean;
  setCurrentVocabWord: Dispatch<SetStateAction<string | null>>;
  setId: Dispatch<SetStateAction<string | null>>;
  setIsTranslanguaged: Dispatch<SetStateAction<boolean>>;
  setPageLocks: Dispatch<SetStateAction<any>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setPages: Dispatch<SetStateAction<any>>;
  setReady: Dispatch<SetStateAction<boolean>>;
  setVocab: Dispatch<SetStateAction<VocabDictionaries>>;
  setVocabLookup: Dispatch<SetStateAction<VocabLookup>>;
  vocab: VocabDictionaries;
  vocabLookup: VocabLookup;
}

const StoryContext = createContext<StoryState>({} as StoryState);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isTranslanguaged, setIsTranslanguaged] = useState<boolean>(false);
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
    /*
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
        currentVocabWord,
        id,
        isTranslanguaged,
        pageBackward,
        pageForward,
        pageLocks,
        pageNumber,
        pages,
        ready,
        setCurrentVocabWord,
        setId,
        setIsTranslanguaged,
        setPageLocks,
        setPageNumber,
        setPages,
        setReady,
        setVocab,
        setVocabLookup,
        vocab,
        vocabLookup,
      }}
      children={children}
    />
  );
};
