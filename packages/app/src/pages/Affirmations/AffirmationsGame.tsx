import { CardSlider } from "@/components/StrapiCardSlider";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useCardSlider } from "@/contexts/StrapiCardSlider";
import { useEffect } from "react";
import { useParams } from "react-router";

export const AffirmationsGame: React.FC = () => {
  const { pack_id } = useParams<{ pack_id: string }>();
  return (
    <FirestoreDocProvider collection="affirmation" id={pack_id}>
      <AffirmationsGameLoader />
    </FirestoreDocProvider>
  );
};

const AffirmationsGameLoader: React.FC = () => {
  const { data } = useFirestoreDoc();
  const { pack_id: packIdFromUrl } = useParams<{ pack_id: string }>();
  const {
    isReady,
    packId,
    reset,
    setPackId,
    setRawCards,
    setRawPackName,
    setActivity,
  } = useCardSlider();
  useEffect(() => {
    if (packId !== packIdFromUrl) {
      setPackId(packIdFromUrl);
      reset();
    }
  }, [packId, packIdFromUrl]);

  useEffect(() => {
    setActivity("affirmations");
  }, []);

  useEffect(() => {
    if (data) {
      const transformedData = data.cards.map((card: any) => ({
        id: card.id,
        text_front: card.text_front,
        text_back: card.text_back,
        image: card.image || { url: "" },
      }));
      setRawCards(transformedData);
      setRawPackName(data.pack_name || []);
    }
  }, [data]);

  if (isReady && packId === packIdFromUrl) {
    return <CardSlider cardType="wellness" hasFlap={true} />;
  } else {
    return <></>;
  }
};
