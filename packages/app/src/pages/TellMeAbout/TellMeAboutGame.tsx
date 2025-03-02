import { CardSlider } from "@/components/CardSlider/CardSlider";
import { useCardSlider } from "@/contexts/CardSlider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";

export const TellMeAboutGame: React.FC = () => {
  const { pack_id } = useParams<{ pack_id: string }>();
  return (
    <FirestoreDocProvider collection="tell-me-about" id={pack_id}>
      <TellMeAboutGameLoader />
    </FirestoreDocProvider>
  );
};

const TellMeAboutGameLoader: React.FC = () => {
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
    setActivity("tell-me-about");
  }, []);

  useEffect(() => {
    if (data) {
      const transformedData = data.questions.map((questionItem: any) => ({
        id: questionItem.id,
        text_front: questionItem.question,
        text_back: questionItem.hint,
        image: questionItem.image || { url: "" },
      }));
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
