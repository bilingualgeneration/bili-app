// like PackSelect but database call has already been made by caller
// TODO: not sorting by order yet; don't

import { Carousel } from "@/components/Carousel";
import { ContentCard } from "@/components/ContentCard";
import { I18nMessage } from "@/components/I18nMessage";
import { IonText } from "@ionic/react";
import type { Pill } from "@/components/ContentCard";

import { useLanguage } from "@/hooks/Language";

type Card = any;

interface props {
  cards: Card[];
  sortBy?: string;
  titleKey: string;
}

export const CardPackSelect: React.FC<props> = ({
  cards,
  sortBy,
  titleKey,
}) => {
  // TODO: refactor pills to remove primaryText and secondaryText
  const { languagePrimary, languageSecondary } = useLanguage();
  const translanguagedPill = {
    className: "background-cielo-low",
    primaryText: "Translanguaged Cuento",
  };
  const studentStoryPill = {
    className: "background-flamenco",
    primaryText:
      languagePrimary === "en" ? "Student Story" : "Cuento estudiantil",
    secondaryText: languageSecondary === "en" ? "Student Story" : undefined,
  };

  return (
    <>
      <div className="margin-horizontal-carousel">
        <IonText>
          <h1 className="text-5xl bold carousel-header-margin">
            <I18nMessage id={titleKey} />
          </h1>
          <I18nMessage
            id={titleKey}
            level={2}
            wrapper={(text: string) => (
              <h2 className="text-3xl color-english carousel-header-margin">
                {text}
              </h2>
            )}
          />
        </IonText>
      </div>
      <Carousel slidesToShow={2} height="17rem">
        {cards
          .sort((a: Card, b: Card) => {
            if (sortBy) {
              // @ts-ignore
              return a[sortBy] < b[sortBy] ? -1 : 1;
            } else {
              return 0;
            }
          })
          .map((c: Card, index: number) => {
            let pills: Pill[] = [];
            if (c.isTranslanguaged) {
              pills.push(translanguagedPill);
            }
            if (c.isStudentStory) {
              pills.push(studentStoryPill);
            }
            console.log(pills);
            return <ContentCard key={index} pills={pills} {...c} />;
          })}
      </Carousel>
    </>
  );
};
