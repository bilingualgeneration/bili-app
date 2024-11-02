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
} from "@ionic/react";
import Joyride from "react-joyride";
import { addOutline, ellipse, sparkles } from "ionicons/icons";
import { Carousel } from "@/components/Carousel";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { Preferences } from "@capacitor/preferences";
import React from "react";
import { ChildProfileCard } from "./ChildProfileCard";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";

import "./Overview.scss";

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
  const [shouldShowTutorial, setShouldShowTutorial] = useState<boolean>(false);

  const steps = [
    {
      target: "#side-menu-button-sideMenu-profile",
      disableBeacon: true,
      content: (
        <FormattedMessage
          id="settings.onboarding.profile"
          defaultMessage="Language learning is for the whole family! You can add up to five child profiles on the overview page or by clicking 'Profiles.'"
          description="Onboarding message for the Profiles button on the side menu"
        />
      ),
    },
    {
      target: "#inclusive-spanish-card",
      disableBeacon: true,
      content: (
        <FormattedMessage
          id="settings.onboarding.inclusiveSpanish"
          defaultMessage="Did you know you can choose inclusive Spanish on Bili? Opt for terms like 'amigues,' 'niñes,' and 'Latine' to personalize your experience when referring to groups or non-binary characters."
          description="Onboarding message for the Profiles button on the side menu"
        />
      ),
    },
    {
      target: "#side-menu-button-sideMenu-preferences",
      disableBeacon: true,
      content: (
        <FormattedMessage
          id="settings.onboarding.preferences"
          defaultMessage="Click on 'Preferences' to change your language settings to and manage other preferences like playtime limits."
          description="Onboarding message for the Preferences button on the side menu"
        />
      ),
    },
    {
      target: "#side-menu-button-sideMenu-progress",
      disableBeacon: true,
      content: (
        <FormattedMessage
          id="settings.onboarding.progress"
          defaultMessage="Learn more about your child's language learning by checking out the 'Progress' section. Use this section to gain insights into your child's activity, including how much time they've spend in each category and their favorite Bili activities."
          description="Onboarding message for the Progress button on the side menu"
        />
      ),
    },
  ];

  // todo: rekey these ids to be joyride.___ eg joyride.back
  const translations = {
    Joyride: {
      back: (
        <FormattedMessage
          id="settings.overview.joyrideBack"
          defaultMessage="Back"
          description="Button to go 'back' in the walkthrough tutorial on settings/overview page"
        />
      ),
      last: (
        <FormattedMessage
          id="settings.overview.joyrideLast"
          defaultMessage="Last"
          description="Appears when user is on 'last' slide of the walkthrough tutorial on settings/overview page"
        />
      ),
      next: (
        <FormattedMessage
          id="settings.overview.joyrideNext"
          defaultMessage="Next"
          description="Button to go to 'next' section of the walkthrough tutorial on settings/overview page"
        />
      ),
      skip: (
        <FormattedMessage
          id="settings.overview.joyrideSkip"
          defaultMessage="Skip"
          description="Button to 'skip' the walkthrough tutorial on settings/overview page"
        />
      ),
    },
  };

  const intl = useIntl();

  /*
     letterAvatarBackgroundColor="#f28ac9"
     letterAvatarTextColor="#973d78"
   */

  const settingsExploreCards = [
    {
      backgroundImage: settingsCardDesign1,
      backgroundColor: "#973D78",
      title: intl.formatMessage({
        id: "settings.overview.gettingStartedTitle",
        defaultMessage: "Getting started",
        description: "Explore card #1 title",
      }),
      subtitle: intl.formatMessage({
        id: "settings.overview.gettingStartedContent",
        defaultMessage:
          "Your Essential Guide to Getting Started with the Bili App.",
        description: "Explore card #1 content",
      }),
      tags: [
        {
          color: "#FFAEDC",
          text: intl.formatMessage({
            id: "tag.guide",
            defaultMessage: "Guide",
            description: "Content tag for guides",
          }),
        },
        {
          color: "#F1D100",
          text: intl.formatMessage({
            id: "tag.resources",
            defaultMessage: "Resources",
            description: "Content tag for resources",
          }),
        },
      ],
    },
    {
      backgroundImage: settingsCardDesign2,
      backgroundColor: "#22BEB9",
      title: intl.formatMessage({
        id: "settings.overview.inclusiveSpanishTitle",
        defaultMessage: "Inclusive Spanish",
        description: "Explore card #2 title",
      }),
      subtitle: intl.formatMessage({
        id: "settings.overview.InclusiveSpanishContent",
        defaultMessage:
          "Learn about what Inclusive Spanish is and why it exists.",
        description: "Explore card #2 content",
      }),
      tags: [
        {
          color: "#D3EAE8",
          text: intl.formatMessage({
            id: "tags.social_justice",
            defaultMessage: "Social Justice",
            description: "Content tag for social justice",
          }),
        },
        {
          color: "#F1D100",
          text: intl.formatMessage({
            id: "tag.resources",
            defaultMessage: "Resources",
            description: "Content tag for resources",
          }),
        },
      ],
    },
    {
      backgroundImage: settingsCardDesign3,
      backgroundColor: "#FFB68F",
      title: intl.formatMessage({
        id: "settings.overview.getChildTitle",
        defaultMessage: "Get your child speaking Spanish with Bili",
        description: "Explore card #3 title",
      }),
      subtitle: intl.formatMessage({
        id: "settings.overview.getChildContent",
        defaultMessage:
          "Explore special features that promote authentic language production.",
        description: "Explore card #3 content",
      }),
      tags: [
        {
          color: "#973D78",
          text: intl.formatMessage({
            id: "tags.parents",
            defaultMessage: "Parents",
            description: "Content tag for parents",
          }),
          textColor: "#fff",
        },
        {
          color: "#F1D100",
          text: intl.formatMessage({
            id: "tag.resources",
            defaultMessage: "Resources",
            description: "Content tag for resources",
          }),
        },
      ],
    },
  ];

  return (
    <div id="settings-profile">
      <div className="settings-pg1-container">
        <IonGrid class="adult-profile-content">
          <IonRow class="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading margin-bottom-1-5">
                <FormattedMessage
                  id="settings.overview.child"
                  defaultMessage="Child Profile"
                  description="Child Profile page heading in settings"
                />
              </h1>
            </IonCol>

            {/* UNCOMMENT ONCE +ADD CHILD FUNCTIONALITY IMPLEMENTED - CAN ALSO REMOVE BUTTON POPOVER */}

            <IonCol size="auto">
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
            </IonCol>
          </IonRow>

          <div style={{ marginTop: "2rem" }}>
            <IonRow className="margin-bottom-3">
              {students.map((s: any, index: number) => (
                <IonCol
                  className="ion-no-padding"
                  size="6"
                  onClick={() => {}}
                  key={s.uid}
                >
                  <ChildProfileCard
                    age={s.age}
                    isActive={activeStudentId === s.id}
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
                  <FormattedMessage
                    id="settings.overview.explore"
                    defaultMessage="Explore Bili"
                    description="Explore Bili heading in settings"
                  />
                </h1>
                <p className="explore-bili-subheading margin-bottom-1-5">
                  <FormattedMessage
                    id="settings.overview.exploreSubheading"
                    defaultMessage="Learn how to use Bili to meet language goals"
                    description="Explore Bili subheading in settings"
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
