import { CardSlider } from "@/components/CardSlider/CardSlider";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useCardSlider } from "@/contexts/CardSlider";
import { useEffect } from "react";
import { useParams } from "react-router";

export const WouldDoGame: React.FC = () => {
  const { pack_id } = useParams<{ pack_id: string }>();
  return (
    <FirestoreDocProvider collection="would-do" id={pack_id}>
      <WouldDoGameLoader />
    </FirestoreDocProvider>
  );
};

const WouldDoGameLoader: React.FC = () => {
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
    setActivity("community"); // Set to "wellness" for now to mimic Affirmations' behavior
  }, []);

  useEffect(() => {
    if (data) {
      // Transform WouldDo data to look exactly like Affirmations' data
      const transformedData = data.questions.map((questionItem: any) => ({
        id: questionItem.id,
        text_front: questionItem.question, // Remove filter to include all entries
        text_back: questionItem.hint, // Ensure hint is an empty array if undefined
        image: questionItem.image || { url: "" },
      }));
      console.log("Transformed WouldDo Data:", transformedData);
      setRawCards(transformedData);
      setRawPackName(data.pack_name || []);
    }
  }, [data]);

  if (isReady && packId === packIdFromUrl) {
    return <CardSlider cardType="community" />;
  } else {
    return <></>;
  }
};
