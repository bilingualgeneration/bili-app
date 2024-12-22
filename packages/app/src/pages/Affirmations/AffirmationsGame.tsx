// TODO: audio does not account for inclusive

import { CardSlider } from "@/components/CardSlider/CardSlider";
import { useParams } from "react-router";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { useLanguage } from "@/hooks/Language";
import { useLocation } from "react-router";

export const AffirmationsGame: React.FC = () => {
  const { state } = useLocation<{
    cardIndex?: number;
    uniqueClicks?: number;
  }>();
  const { pack_id } = useParams<{ pack_id: string }>();

  return (
    <FirestoreDocProvider collection="affirmation" id={pack_id}>
      <AffirmationsHydratedGame
        pack_id={pack_id}
        startingCardIndex={state?.cardIndex ?? 0}
        uniqueClicks={state?.uniqueClicks ?? 0}
      />
    </FirestoreDocProvider>
  );
};

const AffirmationsHydratedGame: React.FC<{
  pack_id: string;
  startingCardIndex: number;
  uniqueClicks: number;
}> = ({ pack_id, startingCardIndex, uniqueClicks }) => {
  const { status, data } = useFirestoreDoc();
  const { languageNormalized } = useLanguage();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading affirmations.</div>;
  }

  const filteredCards = data.cards.filter((card: any) =>
    card.text_front.some((text: any) => text.language === languageNormalized),
  );

  return (
    <CardSlider
      cards={filteredCards}
      pack_id={pack_id} // Pass pack_id
      startingCardIndex={startingCardIndex} // Pass startingCardIndex
      uniqueClicks={uniqueClicks} // Pass uniqueClicks
    />
  );
};
