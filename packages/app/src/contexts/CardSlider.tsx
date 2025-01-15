import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLanguage } from "@/hooks/Language";

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
  const [rawCards, setRawCards] = useState<Card[]>([]);
  const { languageNormalized, filterText } = useLanguage();

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

  const isReady = cards.length > 0 && packName.length > 0 && packId !== null;
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
        rawCards,
        rawPackName,
        reset,

        setActivity,
        setCardClicks,
        //setCards,
        setCurrentCardIndex,
        setPackId,
        //setPackName,
        setRawCards,
        setRawPackName,
      }}
    />
  );
};
