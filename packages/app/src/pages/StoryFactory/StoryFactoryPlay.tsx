import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useParams } from "react-router-dom";
import { StoryFactoryLevel1 } from "./StoryFactoryLevel1";
import { StoryFactoryLevel2 } from "./StoryFactoryLevel2";
import { ActivityProvider } from "@/contexts/ActivityContext";

export const StoryFactoryPlay: React.FC = () => {
  //@ts-ignore
  const { pack_id } = useParams();
  return (
    <FirestoreDocProvider
      collection="story-factory-game"
      id={pack_id}
      populate={{
        "dnd-game": ["story-factory-game", "==", pack_id],
      }}
    >
      <ActivityProvider>
        <StoryFactoryHydratedGame />
      </ActivityProvider>
    </FirestoreDocProvider>
  );
};

const StoryFactoryHydratedGame: React.FC = () => {
  const { status, data } = useFirestoreDoc();

  if (status === "loading") {
    return <></>;
  }

  if (status === "error") {
    return <>error</>;
  }
  switch (data.level) {
    case 1:
      console.log(data);
      return <StoryFactoryLevel1 />;
      break;
    case 2:
      return <StoryFactoryLevel2 />;
      break;
    default:
      return <></>;
      break;
  }
};
