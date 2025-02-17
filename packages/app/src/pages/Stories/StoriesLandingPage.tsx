import { CardPackSelect } from "@/components/CardPackSelect";
import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
import { IonText } from "@ionic/react";
import { StoriesHeader } from "@/components/StoriesHeader";
import { useLanguage } from "@/hooks/Language";

import "./StoriesLandingPage.scss";

const tagOrder: string[] = [
  "allAboutMe",
  "indigenousNarratives",
  "familyAndCommunity",
  "nature",
  "decodables",
];

export const StoriesLandingPage: React.FC = () => {
  return (
    <FirestoreCollectionProvider collection="story">
      <HydratedStoriesLandingPage />
    </FirestoreCollectionProvider>
  );
};

const HydratedStoriesLandingPage: React.FC = () => {
  const { status, data } = useFirestoreCollection();
  const { filterText } = useLanguage();

  const mapToContentCardProps = (card: any, tag?: string) => {
    const tagOrderEntry = card.ordered_tag?.find((t: any) => t.tag === tag);
    const order = tagOrderEntry ? tagOrderEntry.order : null;

    console.log("Card", card);
    return {
      titles: filterText(card.title),
      category: "",
      cover: card.cover_image.url,
      link: `/story/play/${card.uuid}`,
      isTranslanguaged: card.is_translanguaged,
      isStudentStory: card.is_studentStory,
      order,
    };
  };

  if (status !== "ready") {
    return <></>;
  }

  let storiesByTag: { [key: string]: any[] } = { all: [] };
  for (const story of data) {
    storiesByTag.all.push(mapToContentCardProps(story));

    for (const orderedTag of story.ordered_tag || []) {
      const { tag } = orderedTag;

      if (!storiesByTag[tag]) {
        storiesByTag[tag] = [];
      }
      storiesByTag[tag].push(mapToContentCardProps(story, tag));
    }
  }

  return (
    <>
      <StoriesHeader />
      <div id="stories-landing-page">
        <CardPackSelect
          cards={storiesByTag.all}
          sortBy="order"
          titleKey="pages.storiesLandingPage.title"
        />

        {tagOrder
          .filter((tag: string) => storiesByTag[tag])
          .map((tag: string) => (
            <div className="margin-top-3" key={tag}>
              <CardPackSelect
                cards={storiesByTag[tag]}
                sortBy="order"
                titleKey={`pages.storiesLandingPage.${tag}`}
              />
            </div>
          ))}
      </div>
    </>
  );
};
