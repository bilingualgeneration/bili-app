import { CardSlider } from "@/components/CardSlider";
import { directus } from "@/hooks/Directus";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { readItem } from "@directus/sdk";
import { useCardSlider } from "@/contexts/CardSlider";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

/*
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
*/

export const AffirmationsGame: React.FC = () => {
  const { pack_id: packIdFromUrl } = useParams<{ pack_id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["affirmations", packIdFromUrl],
    queryFn: async () => {
      const data = await directus.request(
        readItem("affirmations", packIdFromUrl, {
          fields: ["*", { cards: ["*", { texts: ["*"] }] }],
        }),
      );
      return data;
    },
  });

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
    if (data !== null && data !== undefined) {
      setRawCards(data!.cards);
      setRawPackName(data!.packName);
    }
  }, [data]);

  if (error !== null) {
    // TODO: render appropriate component
    return <>error</>;
  }

  if (isLoading || isReady === false) {
    return <LoadingIndicator />;
  }

  return <CardSlider cardType="wellness" hasFlap={true} />;
};
