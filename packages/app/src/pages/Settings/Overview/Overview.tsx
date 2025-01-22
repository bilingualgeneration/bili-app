import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
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
import { addOutline, ellipse, sparkles } from "ionicons/icons";
import { Carousel } from "@/components/Carousel";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import { I18nMessage } from "@/components/I18nMessage";
import { Preferences } from "@capacitor/preferences";
import React from "react";
import { ChildProfileCard } from "./ChildProfileCard";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";

import "./Overview.scss";
import { Link } from "react-router-dom";

export const Overview: React.FC = () => {
  const { user } = useProfile();
  return (
    <FirestoreCollectionProvider
      collection="student"
      filters={[["caregiver", "array-contains", user.uid]]}
    >
      <OverviewLoader />
    </FirestoreCollectionProvider>
  );
};

const OverviewLoader: React.FC = () => {
  const { data, status } = useFirestoreCollection();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      return <OverviewHydrated students={data} />;
      break;
    default:
      return <>default case</>;
      break;
  }
};

const OverviewHydrated: React.FC<{ students: any }> = ({ students }) => {
  const {
    profile: { isImmersive, isInclusive },
  } = useProfile();
  const { id: activeStudentId } = useStudent();

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
    <div id="settings-profile">
      <div className="settings-pg1-container">
        <IonGrid class="adult-profile-content">
          <IonRow class="ion-justify-content-between row">
            <IonCol size="4">
              <h1 className="child-profile-heading margin-bottom-1-5">
                <I18nMessage
                  id="settings.overview.child"
                  languageSource="unauthed"
                />
              </h1>
            </IonCol>
            <IonCol size="3" className="column-button-visit-app">
              <button className="visit-students-button">
                <Link to={`/select-student/`} className="no-underline">
                  <p className="text-md semibold color-suelo">
                    Go to student app
                  </p>
                </Link>
              </button>
            </IonCol>
          </IonRow>

          {/* UNCOMMENT ONCE +ADD CHILD FUNCTIONALITY IMPLEMENTED - CAN ALSO REMOVE BUTTON POPOVER */}
          {/* <IonRow>
            <IonCol size="auto"> */}
          {/* <IonButton
                // disabled={true}
                size="small"
                id="hover-trigger"
                className="add-child-btn ion-no-margin"
                onClick={() => {
                  // route and logic for user to add child
                }}
              >
                <IonIcon
                  className="add"
                  aria-hidden="true"
                  aria-label="addition icon"
                  slot="start"
                  icon={addOutline}
                  size="small"
                />
                <IonLabel className="text-sm semibold" style={{ color: "var(--Base-Nube)" }}>
                  <FormattedMessage
                    id="settings.overview.addChildBtn"
                    defaultMessage="Add child"
                    description="Add child button label for Child Profile within settings page"
                  />
                </IonLabel>
              </IonButton>
              <IonPopover 
                className="cs-hover" 
                trigger="hover-trigger" 
                triggerAction="hover" 
                side="bottom"
                alignment="center"
                showBackdrop={false}
                arrow={true}
              >
                <IonContent className="cs-content ion-text-center">
                  <div className="text-2xl semibold color-suelo">¡Próximamente!</div>
                  {!isImmersive && <div className="text-2xl color-english">Coming soon!</div>}
                </IonContent>  
              </IonPopover> */}
          {/* </IonCol>
            </IonRow> */}

          <div style={{ marginTop: "2rem" }}>
            <IonRow className="margin-bottom-3">
              {students.map((s: any, index: number) => (
                <IonCol className="ion-no-padding" size="6" key={index}>
                  <ChildProfileCard
                    age={s.age}
                    // isActive={activeStudentId === s.id}
                    isActive={false}
                    letterAvatarBackgroundColor="#20bfb9"
                    letterAvatarTextColor="#ffffff"
                    name={s.firstName}
                  />
                </IonCol>
              ))}
            </IonRow>
          </div>

          <IonRow class="ion-align-items-end ion-justify-content-between row margin-bottom-1-5">
            <IonCol size="auto">
              <div className="explore-bili-heading-subheading-container">
                <h1 className="explore-bili-heading">
                  <I18nMessage
                    id="settings.overview.explore"
                    languageSource="unauthed"
                  />
                </h1>
                <p className="explore-bili-subheading margin-bottom-1-5">
                  <I18nMessage
                    id="settings.overview.exploreSubheading"
                    languageSource="unauthed"
                  />
                  <IonIcon
                    aria-hidden="true"
                    slot="end"
                    icon={sparkles}
                    color="warning"
                    className="sparkle-icon"
                  />
                </p>
              </div>
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
