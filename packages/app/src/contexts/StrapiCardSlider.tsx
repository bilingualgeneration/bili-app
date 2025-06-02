import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLanguage } from "@/hooks/Language";
import { useTimeTracker } from "@/hooks/TimeTracker";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/Firebase";

type Card = any;
type PackName = any;

type CardSlider = any;

const CardSliderContext = createContext<CardSlider>({} as CardSlider);

export const useCardSlider = () => useContext(CardSliderContext);

export const CardSliderProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activity, setActivity] = useState<string | null>(null);
  const [packId, setPackId] = useState<string | null>(null);
  const [rawPackName, setRawPackName] = useState<PackName[]>([]);
  const [packName, setPackName] = useState<PackName[]>([]);
  const [cardClicks, setCardClicks] = useState<number>(0);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [timesShownFeedback, setTimesShownFeedback] = useState<number>(0);
  const [rawCards, setRawCards] = useState<Card[]>([]);
  const { languageNormalized, filterText } = useLanguage();
  const [questions, setQuestions] = useState<any[]>([]);
  const { startTimer } = useTimeTracker();

  useEffect(() => {
    startTimer();
  }, [packId]);

  useEffect(() => {
    (async () => {
      const response = await getDoc(doc(firestore, "/bundles/sel-questions"));
      setQuestions(Object.values(response.data()!.data));
    })();
  }, [setQuestions]);
  useEffect(() => {
    if (rawCards.length > 0) {
      setCards(
        rawCards.filter((card: Card) =>
          card.text_front.some(
            (text: any) => text.language === languageNormalized,
          ),
        ),
      );
    }
  }, [rawCards, languageNormalized, setCards]);

  useEffect(() => {
    if (rawPackName.length > 0) {
      setPackName(filterText(rawPackName));
    }
  }, [languageNormalized, rawPackName, setPackName]);

  const reset = () => {
    setRawPackName([]);
    setRawCards([]);
    setCurrentCardIndex(0);
    setCardClicks(0);
  };

  const isReady =
    cards.length > 0 &&
    packName.length > 0 &&
    packId !== null &&
    questions.length > 0;
  return (
    <CardSliderContext.Provider
      children={children}
      value={{
        activity,
        cardClicks,
        cards,
        currentCardIndex,
        isReady,
        packId,
        packName,
        questions,
        rawCards,
        rawPackName,
        reset,
        timesShownFeedback,

        setActivity,
        setCardClicks,
        //setCards,
        setCurrentCardIndex,
        setPackId,
        //setPackName,
        setRawCards,
        setRawPackName,
        setTimesShownFeedback,
      }}
    />
  );
};
