// TODO: replace RadioCard with regular card?

import { useEffect, useState } from "react";
import {
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonPopover,
  IonContent,
  IonText,
} from "@ionic/react";
import { add, ellipse, link, sparkles } from "ionicons/icons";
import { Carousel } from "@/components/Carousel";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import ClassroomAvatar from "@/assets/icons/classroom_avatar.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { Preferences } from "@capacitor/preferences";
import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";

import { useClassroom } from "@/hooks/Classroom";
import { useProfile } from "@/hooks/Profile";

import "./MyClassrooms.scss";
import { RadioCard } from "@/components/RadioCard";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom"; // TODO: remove

const gradesLookup: { [i: string]: string } = {
  p: "Pre-K",
  k: "Kindergarten",
  "1": "1st Grade",
  "2": "2nd Grade",
  "3": "3rd Grade",
  "4": "4th Grade",
  "5": "5th Grade",
  o: "Other",
};

const getGrades = (grades: string[]) => {
  return grades.map((g: string) => gradesLookup[g]).join(", ");
};

export const MyClassrooms: React.FC = () => {
  const {
    user: { uid },
    profile: { isImmersive, isInclusive },
  } = useProfile();
  const intl = useIntl();
  const settingsExploreCards = [
    {
      backgroundImage: settingsCardDesign1,
      backgroundColor: "#973D78",
      i18nKeyPrimary: "settings.overview.gettingStartedTitle",
      i18nKeySecondary: "settings.overview.gettingStartedContent",
      link: "https://thebiliapp.com/getting-started/",
      tags: [
        {
          color: "#FFAEDC",
          i18nKey: "tag.guide",
        },
        {
          color: "#F1D100",
          i18nKey: "tag.resources",
        },
      ],
    },
    {
      backgroundImage: settingsCardDesign2,
      backgroundColor: "#22BEB9",
      i18nKeyPrimary: "settings.overview.inclusiveSpanishTitle",
      i18nKeySecondary: "settings.overview.InclusiveSpanishContent",
      link: "https://thebiliapp.com/inclusive-spanish/",
      tags: [
        {
          color: "#D3EAE8",
          i18nKey: "tags.social_justice",
        },
        {
          color: "#F1D100",
          i18nKey: "tag.resources",
        },
      ],
    },
    {
      backgroundImage: settingsCardDesign3,
      backgroundColor: "#FFB68F",
      i18nKeyPrimary: "settings.overview.getChildTitle",
      i18nKeySecondary: "settings.overview.getChildContent",
      link: "https://thebiliapp.com/7-fun-and-effective-ways-to-teach-spanish-to-your-kids-at-home/",
      tags: [
        {
          color: "#973D78",
          i18nKey: "tags.parents",
          textColor: "#fff",
        },
        {
          color: "#F1D100",
          i18nKey: "tag.resources",
        },
      ],
    },
  ];

  return (
    <div id="add-my-classrooms-id">
      <div className="settings-pg1-container">
        <IonGrid class="adult-profile-content">
          <IonRow class="ion-justify-content-between row">
            <IonCol size="auto">
              <IonText className="text-3xl semibold child-profile-heading margin-bottom-1-5">
                My Classrooms
              </IonText>
            </IonCol>
            <IonCol size="auto"></IonCol>
          </IonRow>
          <FirestoreCollectionProvider
            collection="classroom"
            filters={[["teachers", "array-contains", uid]]}
          >
            <ClassroomsList />
          </FirestoreCollectionProvider>
          <IonRow className="ion-justify-content-between margin-bottom-3 add-new-class-row ion-align-items-center">
            <IonCol>
              <IonText className="text-xl semibold">
                Add a new classroom
              </IonText>
            </IonCol>
            <IonCol size="0.75">
              <Link to="/classrooms/add">
                <IonButton className="elevate">
                  <IonIcon slot="icon-only" icon={add}></IonIcon>
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>

          <IonRow class="ion-align-items-end ion-justify-content-between row margin-bottom-1-5">
            <IonCol size="11.2">
              <div className="explore-bili-heading-subheading-container">
                <IonText className="text-3xl semibold explore-bili-heading">
                  Implementation guides
                </IonText>
                <p className="text-md color-barro margin-bottom-1-5">
                  Carousel section description to explain about the content.
                </p>
              </div>
            </IonCol>
            <IonCol>
              <IonText></IonText>
              <p className="margin-bottom-1-5">
                <a
                  href="https://thebiliapp.com/blog/"
                  className="text-md color-barro no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See all (9)
                </a>
              </p>
            </IonCol>
          </IonRow>

          <div className="child-profile-content margin-top-1">
            <Carousel height={350}>
              {settingsExploreCards.map((card, index) => (
                <SettingsExploreCard {...card} key={index} />
              ))}
            </Carousel>
          </div>
        </IonGrid>
      </div>
    </div>
  );
};

const ClassroomsList: React.FC = () => {
  const intl = useIntl();
  const { data, status } = useFirestoreCollection();
  const { subscribe } = useClassroom();
  const { quickLaunchFlag, setQuickLaunchFlag } = useProfile();
  const history = useHistory();

  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      if (quickLaunchFlag) {
        setQuickLaunchFlag(false);
        subscribe(data[0].id);
        history.push(`/select-student/${data[0].id}`);
      }
      return (
        <IonRow
          className="ion-justify-content-between"
          id="classroom_name_wrapper"
        >
          {data.map((classroom: any, index: number) => (
            <IonCol size="6" key={classroom.id}>
              <div className="classroom-names">
                <Link
                  to={`/classrooms/view/${classroom.id}`}
                  className="no-underline"
                  onClick={() => {
                    subscribe(classroom.id);
                  }}
                >
                  <RadioCard
                    icon={<img src={ClassroomAvatar} />}
                    title={classroom.name}
                    subTitle={getGrades(classroom.grades)}
                    content={intl.formatMessage(
                      { id: "pages.classrooms.classroomSize" },
                      { size: classroom.size },
                    )}
                    iconBackgroundColor=""
                    titleFontSize="xl"
                    titleColor="color-suelo"
                    contentFontSize="lg"
                    contentColor="color-barro"
                  />
                </Link>
              </div>
            </IonCol>
          ))}
        </IonRow>
      );
      break;
    default:
      return <>this should never render</>;
  }
};
