import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useParams } from "react-router";
import {
  ActivityProvider,
  GameData,
  useActivity,
} from "@/contexts/ActivityContext";
import { StoryProvider } from "./StoryContext";
import { StoryLoader } from "./StoryLoader";

export const Stories = () => {
  // @ts-ignore
  const { uuid } = useParams();
  return (
    <FirestoreDocProvider
      collection="story"
      id={uuid}
      populate={{
        "story-vocabulary-list": ["story", "==", uuid],
        "dn-d": ["story", "==", uuid],
        "multiple-choice": ["story", "==", uuid],
      }}
    >
      <StoriesHydrated />
    </FirestoreDocProvider>
  );
};

const StoriesHydrated: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      const vocab =
        data["story-vocabulary-list"].length > 0
          ? data["story-vocabulary-list"][0].words
          : [];
      return (
        <ActivityProvider>
          <StoryProvider>
            <div id="story-wrapper">
              <StoryLoader vocab={vocab} />
            </div>
          </StoryProvider>
        </ActivityProvider>
      );
      break;
  }
  return <></>;
};

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <></>;
};

export const StoryPage: React.FC<
  React.PropsWithChildren<{ page: any; languages: any[] }>
> = ({ page, languages }) => {
  return <></>;
};
