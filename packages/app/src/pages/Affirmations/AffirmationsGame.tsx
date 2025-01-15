import { CardSlider } from "@/components/CardSlider/CardSlider";
import { FirestoreDocProvider } from "@/hooks/FirestoreDoc";
import { useParams, useLocation } from "react-router";

export const AffirmationsGame: React.FC = () => {
  const { pack_id } = useParams<{ pack_id: string }>();
  const { state } = useLocation<{
    cardIndex?: number;
    uniqueClicks?: number;
  }>();

  return (
    <FirestoreDocProvider collection="affirmation" id={pack_id}>
      <CardSlider
        startingCardIndex={state?.cardIndex ?? 0}
        uniqueClicks={state?.uniqueClicks ?? 0}
      />
    </FirestoreDocProvider>
  );
};
