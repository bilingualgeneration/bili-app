import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";


type Vocab = any;
type Lang = string;

type VocabDictionaries = {
  [lang: Lang]: {
    [key: string]: Vocab
  }
};

type VocabLookup = {
  [key: string]: {
    [lang: Lang]: string
  }
}

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
}

const StoryContext = createContext<StoryState>({} as StoryState);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pages, setPages] = useState<any>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [currentVocabWord, setCurrentVocabWord] = useState<string | null>(null);
  const [pageLocks, setPageLocks] = useState<any>({});
  const [vocab, setVocab] = useState<VocabDictionaries>({
    es: {},
    'es-inc': {},
    en: {}
  });
  const [vocabLookup, setVocabLookup] = useState<VocabLookup>({});
  const totalPages = pages.length;
  const pageForward = () => {
    // todo: better logic handling for pageLocks
    if(totalPages > 0 && !pageLocks[pageNumber]){
      setPageNumber((p) => (p < totalPages - 1 ? p + 1 : totalPages - 1));
    }
  };
  const pageBackward = () => {
    if(totalPages > 0){
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
      }}
      children={children}
    />
  );
};
