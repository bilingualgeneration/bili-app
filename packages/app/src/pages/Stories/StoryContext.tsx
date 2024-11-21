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
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";

interface StoryState {
  currentVocabHandle: string | null;
  id: string | null;
  isTranslanguaged: boolean;
  pageBackward: any;
  pageForward: any;
  pageLocks: any;
  pageNumber: number;
  pages: any;
  ready: boolean;
  setCurrentVocabHandle: Dispatch<SetStateAction<string | null>>;
  setId: Dispatch<SetStateAction<string | null>>;
  setIsTranslanguaged: Dispatch<SetStateAction<boolean>>;
  setPageLocks: Dispatch<SetStateAction<any>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setPages: Dispatch<SetStateAction<any>>;
  setReady: Dispatch<SetStateAction<boolean>>;
  setVocab: Dispatch<SetStateAction<any>>;
  setVocabLookup: Dispatch<SetStateAction<any>>;
  vocab: any;
  vocabLookup: any;
}

const StoryContext = createContext<StoryState>({} as StoryState);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isTranslanguaged, setIsTranslanguaged] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { language, languageNormalized } = useLanguage();
  const {
    profile: { isInclusive },
  } = useProfile();
  const [pages, setPages] = useState<any>([]);
  const [vocab, setVocab] = useState<any>([]);
  const [vocabLookup, setVocabLookup] = useState<any>({});
  const [ready, setReady] = useState<boolean>(false);
  const [currentVocabHandle, setCurrentVocabHandle] = useState<string | null>(
    null,
  );
  const [pageLocks, setPageLocks] = useState<any>({});

  const { handleRecordAttempt } = useActivity();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    //console.log(vocab);
  }, [vocab]);
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
    while (
      !pages[newPageNumber].languages.includes(languageNormalized) &&
      pages[newPageNumber].languages.join("") !== "all"
    ) {
      newPageNumber++;
    }
    // TODO: check if newPageNumber is out of bounds
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

  const pageBackward = useCallback(() => {
    let newPageNumber = pageNumber - 1;
    while (
      !pages[newPageNumber].languages.includes(languageNormalized) &&
      pages[newPageNumber].languages.join("") !== "all"
    ) {
      newPageNumber--;
    }
    if (newPageNumber >= 0) {
      setPageNumber(newPageNumber);
    } else {
      // uh oh
    }
  }, [setPageNumber, pageNumber, language]);

  return (
    <StoryContext.Provider
      value={{
        currentVocabHandle,
        id,
        isTranslanguaged,
        pageBackward,
        pageForward,
        pageLocks,
        pageNumber,
        pages,
        ready,
        setCurrentVocabHandle,
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
