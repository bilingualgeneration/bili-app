import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface StoryState {
  pageNumber: number;
  pageForward: any;
  pageBackward: any;
  setPageNumber: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  filteredPages: any[];
  setFilteredPages: Dispatch<SetStateAction<any[]>>;
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
  hasMultipleImage: boolean;
  setHasMultipleImage: Dispatch<SetStateAction<boolean>>;
  hasMultipleSyllable: boolean;
  setHasMultipleSyllable: Dispatch<SetStateAction<boolean>>;
  vocab: any;
  setVocab: Dispatch<SetStateAction<any>>;
}

const StoryContext = createContext<StoryState>({} as StoryState);

export const useStory = () => useContext(StoryContext);

export const StoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filteredPages, setFilteredPages] = useState<any[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [hasMultipleImage, setHasMultipleImage] = useState<boolean>(false);
  const [hasMultipleSyllable, setHasMultipleSyllable] = useState<boolean>(false);
  const [vocab, setVocab] = useState<any>({
    es: {},
    'es-inc': {},
    en: {}
  });
  const pageForward = () => {
    if(totalPages > 0){
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
	hasMultipleImage,
	hasMultipleSyllable,
	setHasMultipleImage,
	setHasMultipleSyllable,
        pageNumber,
        pageForward,
        pageBackward,
        setPageNumber,
        totalPages,
        setTotalPages,
        filteredPages,
        setFilteredPages,
        ready,
        setReady,
	vocab,
	setVocab,
      }}
      children={children}
    />
  );
};
