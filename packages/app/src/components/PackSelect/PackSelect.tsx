import { collection, query, orderBy } from "firebase/firestore";
import { ContentCard } from "@/components/ContentCard";
import { IonCard, IonIcon, IonText } from "@ionic/react";

import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
import { useProfile } from "@/hooks/Profile";
import { Carousel } from "@/components/Carousel";
import { CommunityHeader } from "@/components/CommunityHeader";
import { PackHeader } from "../PackHeader";
import type { Pill } from "@/components/ContentCard";
import { PlayHeader } from "@/components/PlayHeader";
import { FormattedMessage } from "react-intl";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useScreenSize } from "@/lib/screenSize";

type Card = any;

interface props {
  translatedTitle: string;
  englishTitle: string;
  category: string;
  module: string;
  modulePath?: string;
  placeholderCards?: Card[];
  pack_name_field?: string;
  only_cards?: boolean;
  sortBy?: string;
}

export const PackSelect: React.FC<props> = (props) => {
  return (
    <FirestoreCollectionProvider collection={props.module}>
      <HydratedPackSelect {...props} />
    </FirestoreCollectionProvider>
  );
};

export const HydratedPackSelect: React.FC<props> = ({
  module,
  modulePath,
  translatedTitle,
  englishTitle,
  category,
  placeholderCards = [],
  pack_name_field = "pack_name",
  only_cards = false,
  sortBy,
}) => {
  const { screenType } = useScreenSize();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { status, data } = useFirestoreCollection();
  if (status === "loading") {
    return <></>;
  }
  const translanguagedPill = {
    className: "background-cielo-low",
    primaryText: "Translanguaged Cuento",
  };
  const studentStoryPill = {
    className: "background-flamenco-flamenco",
    primaryText: language === "en" ? "Student Story" : "Cuento estudiantil",
    secondaryText: language === "esen" ? "Student Story" : undefined,
  };

  const cards = data
    .sort((a: Card, b: Card) => {
      if (sortBy) {
        // @ts-ignore
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return 0;
      }
    })
    .map((p: any, index: number) => {
      const esTitle = p[pack_name_field].filter(
        (pn: any) => pn.language === "es",
      );
      const esIncTitle = p[pack_name_field].filter(
        (pn: any) => pn.language === "es-inc",
      );
      const title: string =
        isInclusive && esIncTitle.length > 0
          ? esIncTitle[0].text
          : esTitle[0].text;
      const titleEn: string = p[pack_name_field].filter(
        (pn: any) => pn.language === "en",
      )[0].text;
      const fid: string = `${module}/${p.id}`;
      return {
        title,
        titleEn,
        fid,
        category,
        cover:
          p.cover_image?.url ||
          "https://bili-strapi-media-dev.s3.us-east-1.amazonaws.com/drum_image_c3729d3060.png",
        link: `/${modulePath || module}/play/${p.uuid}`,
        is_translanguaged: p.is_translanguaged,
        is_student_story: p.is_student_story,
      };
    });
  if (only_cards) {
    return (
      <>
        <Carousel
          slidesToShow={screenType === "mobile" ? 1 : 2}
          height={"17rem"}
        >
          {cards.map((c: Card, index: number) => {
            let pills: Pill[] = [];
            if (module === "story") {
              if (c.is_translanguaged) {
                pills.push(translanguagedPill);
              }
              if (c.is_student_story) {
                pills.push(studentStoryPill);
              }
            }
            return <ContentCard key={index} pills={pills} {...c} />;
          })}
          {placeholderCards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
        </Carousel>
      </>
    );
  }
  return (
    <>
      {category == "play" && <PlayHeader />}
      {category == "community" && <CommunityHeader />}
      <div className="background-card" style={{ margin: "auto 2rem" }}>
        <div className="margin-bottom-2">
          <IonText>
            <h1
              style={{
                marginLeft: screenType === "mobile" ? "0.5rem" : "1.875rem",
                marginTop: screenType === "mobile" ? "-1rem" : "",
                marginBottom: screenType === "mobile" ? "-1.4rem" : "",
              }}
              className={`${
                screenType === "mobile" ? "text-2xl" : "text-5xl"
              } color-suelo semibold`}
            >
              {language !== "en" ? translatedTitle : englishTitle}
            </h1>
            {language === "esen" && (
              <h2
                style={{
                  marginLeft:
                    screenType === "mobile" ? "0.3125rem" : "1.875rem",
                  marginBottom: screenType === "mobile" ? "-1.2rem" : "",
                }}
                className={`${
                  screenType === "mobile" ? "text-md" : "text-3xl"
                } color-english`}
              >
                {englishTitle}
              </h2>
            )}
          </IonText>
        </div>
        <Carousel
          slidesToShow={screenType === "mobile" ? 1 : 2}
          height={"17rem"}
        >
          {cards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
          {placeholderCards.map((c: Card, index: number) => (
            <ContentCard {...c} key={index} />
          ))}
        </Carousel>
      </div>
    </>
  );
};
