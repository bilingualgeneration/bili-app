import { useEffect, useState } from "react";
import {
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
} from "@ionic/react";
import Joyride from "react-joyride";
import {
  addOutline,
  chevronForwardCircle,
  chevronForwardCircleOutline,
  ellipse,
  ellipsisHorizontal,
  sparkles,
} from "ionicons/icons";
import "./Overview.css";
import { SettingsExploreCard } from "@/components/Settings/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import SettingsExploreMiniCard from "@/components/Settings/SettingsExplore/SettingsExploreMiniCard";
import { FormattedMessage, useIntl } from "react-intl";
import { Preferences } from "@capacitor/preferences";
import { useAdultCheck } from "@/contexts/AdultCheckContext";
import React from "react";

export const Overview: React.FC = ({}) => {
  const [shouldShowTutorial, setShouldShowTutorial] = useState<boolean>(false);
  const { isAdultCheckOpen } = useAdultCheck();

  useEffect(() => {
    if (!isAdultCheckOpen) {
      Preferences.get({
        key: "shouldShowSettingsTutorial",
      }).then((response) => {
        if (response.value === null) {
          // have never seen it before
          setShouldShowTutorial(true);
          Preferences.set({
            key: "shouldShowSettingsTutorial",
            value: "false",
          });
        }
      });
    }
  }, [isAdultCheckOpen]);

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

  return (
    <>
      {shouldShowTutorial && !isAdultCheckOpen && (
        <Joyride
          locale={translations.Joyride}
          hideCloseButton
          showSkipButton
          showProgress
          steps={steps}
          continuous={true}
          styles={{
            tooltipContainer: {
              textAlign: "left",
            },
          }}
        />
      )}
      <div className="settings-pg1-container">
        <IonGrid class="adult-profile-content">
          <IonRow class="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading">
                <FormattedMessage
                  id="settings.overview.child"
                  defaultMessage="Child Profile"
                  description="Child Profile page heading in settings"
                />
              </h1>
            </IonCol>

            <IonCol size="auto">
              <IonButton
                disabled={true}
                size="small"
                className="add-child-btn"
                onClick={() => {
                  // route and logic for user to add child
                }}
              >
                <IonIcon
                  aria-hidden="true"
                  slot="start"
                  icon={addOutline}
                  size="small"
                />
                <IonLabel style={{ color: "var(--Base-Nube)" }}>
                  <FormattedMessage
                    id="settings.overview.addChildBtn"
                    defaultMessage="Add child"
                    description="Add child button label for Child Profile within settings page"
                  />
                </IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <div className="child-profile-content">
            <IonRow>
              <IonCol>
                <IonCard className="child-profile-card">
                  <IonGrid className="ion-no-margin ion-no-padding">
                    <IonRow>
                      <IonCol size="sm">
                        <IonIcon
                          icon={ellipse}
                          size="large"
                          className="circle-icon circle-icon-blue"
                        />
                        <div className="circle-icon-overlay circle-icon-blue-overlay">
                          V
                        </div>
                      </IonCol>

                      <IonCol className="child-name-age-col">
                        <h1 className="child-name">Vanessa</h1>
                        <p>3-5 years old</p>
                      </IonCol>

                      <IonCol size="1.5" class="ion-text-end">
                        <IonIcon icon={ellipsisHorizontal} className="more" />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="child-profile-card">
                  <IonGrid className="ion-no-margin ion-no-padding">
                    <IonRow>
                      <IonCol size="auto">
                        <IonIcon
                          icon={ellipse}
                          size="large"
                          className="circle-icon circle-icon-pink"
                        />
                        <div className="circle-icon-overlay circle-icon-pink-overlay">
                          M
                        </div>
                      </IonCol>

                      <IonCol className="child-name-age-col">
                        <h1 className="child-name">Mateo</h1>
                        <p>5-7 years old</p>
                      </IonCol>

                      <IonCol size="1.5" class="ion-text-end">
                        <IonIcon icon={ellipsisHorizontal} className="more" />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </IonCol>
            </IonRow>
          </div>

          <IonRow class="ion-align-items-end ion-justify-content-between row">
            <IonCol size="auto">
              <div className="explore-bili-heading-subheading-container">
                <h1 className="explore-bili-heading">
                  <FormattedMessage
                    id="settings.overview.explore"
                    defaultMessage="Explore Bili"
                    description="Explore Bili heading in settings"
                  />
                </h1>
                <p className="explore-bili-subheading">
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

            <IonCol size="auto">
              <IonButton disabled={true} fill="clear" className="see-all">
                <FormattedMessage
                  id="settings.overview.seeAll"
                  defaultMessage="See all &#40;9&#41;"
                  description="See all link in settings"
                />
              </IonButton>
            </IonCol>
          </IonRow>

          <div className="child-profile-content">
            <IonRow>
              <IonCol size="md">
                <SettingsExploreCard
                  backgroundImage={settingsCardDesign1}
                  backgroundColor={"#973D78"}
                  title={intl.formatMessage({
                    id: "settings.overview.gettingStartedTitle",
                    defaultMessage: "Getting started",
                    description: "Explore card #1 title",
                  })}
                  subtitle={intl.formatMessage({
                    id: "settings.overview.gettingStartedContent",
                    defaultMessage:
                      "When you enter into any new area of science, you almost always find.",
                    description: "Explore card #1 content",
                  })}
                  // can also change text color of SettingsExploreCard using 'textColor' prop if necessary
                >
                  <IonRow>
                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#FFAEDC"} // enter a background color for the mini card
                        cardText={intl.formatMessage({
                          id: "settings.overview.gettingStartedMiniCard1",
                          defaultMessage: "Guide",
                          description:
                            "Explore card #1 mini card #1 found at the top, which describes the content type of the main card",
                        })} // enter custom text for the mini card
                        // can also change color of text for SettingsExploreMiniCard using 'textColor' prop if necessary
                      ></SettingsExploreMiniCard>
                    </IonCol>

                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#F1D100"}
                        cardText={intl.formatMessage({
                          id: "settings.overview.gettingStartedMiniCard2",
                          defaultMessage: "Recommended",
                          description:
                            "Explore card #1 mini card #2 found at the top, which describes the content type of the main card",
                        })}
                      ></SettingsExploreMiniCard>
                    </IonCol>
                  </IonRow>
                </SettingsExploreCard>
              </IonCol>

              <IonCol size="md">
                <span id="inclusive-spanish-card">
                  <SettingsExploreCard
                    backgroundImage={settingsCardDesign2}
                    backgroundColor={"#22BEB9"}
                    title={intl.formatMessage({
                      id: "settings.overview.inclusiveSpanishTitle",
                      defaultMessage: "Inclusive Spanish",
                      description: "Explore card #2 title",
                    })}
                    subtitle={intl.formatMessage({
                      id: "settings.overview.InclusiveSpanishContent",
                      defaultMessage:
                        "Learn about what Inclusive Spanish is and why it exists.",
                      description: "Explore card #2 content",
                    })}
                  >
                    <IonRow>
                      <IonCol size="auto">
                        <SettingsExploreMiniCard
                          customColor={"#D3EAE8"}
                          cardText={intl.formatMessage({
                            id: "settings.overview.InclusiveSpanishMiniCard1",
                            defaultMessage: "Social Justice",
                            description:
                              "Explore card #2 mini card #1 found at the top, which describes the content type of the main card",
                          })}
                        ></SettingsExploreMiniCard>
                      </IonCol>

                      <IonCol size="auto">
                        <SettingsExploreMiniCard
                          customColor={"#F1D100"}
                          cardText={intl.formatMessage({
                            id: "settings.overview.InclusiveSpanishMiniCard2",
                            defaultMessage: "Resources",
                            description:
                              "Explore card #2 mini card #2 found at the top, which describes the content type of the main card",
                          })}
                        ></SettingsExploreMiniCard>
                      </IonCol>
                    </IonRow>
                  </SettingsExploreCard>
                </span>
              </IonCol>

              <IonCol size="md">
                <SettingsExploreCard
                  backgroundImage={settingsCardDesign3}
                  backgroundColor={"#FFB68F"}
                  title={intl.formatMessage({
                    id: "settings.overview.getChildTitle",
                    defaultMessage: "Get your child speaking Spanish with Bili",
                    description: "Explore card #3 title",
                  })}
                  subtitle={intl.formatMessage({
                    id: "settings.overview.getChildContent",
                    defaultMessage:
                      "Explore special features that promote authentic language production.",
                    description: "Explore card #3 content",
                  })}
                  textColor="black"
                >
                  <IonRow>
                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#973D78"}
                        cardText={intl.formatMessage({
                          id: "settings.overview.getChildMiniCard1",
                          defaultMessage: "Parents",
                          description:
                            "Explore card #3 mini card #1 found at the top, which describes the content type of the main card",
                        })}
                        textColor="white"
                      ></SettingsExploreMiniCard>
                    </IonCol>

                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#F1D100"}
                        cardText={intl.formatMessage({
                          id: "settings.overview.getChildMiniCard2",
                          defaultMessage: "Resources",
                          description:
                            "Explore card #3 mini card #2 found at the top, which describes the content type of the main card",
                        })}
                      ></SettingsExploreMiniCard>
                    </IonCol>
                  </IonRow>
                </SettingsExploreCard>
              </IonCol>

              {/* <IonCol size="md">
                <SettingsExploreCard
                  backgroundImage={settingsCardDesign1}
                  backgroundColor={"#973D78"}
                  title={"Getting started"}
                  subtitle={
                    "When you enter into any new area of science, you almost always find."
                  }
                >
                  <IonRow>
                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#FFAEDC"}
                        cardText={"Guide"}
                      ></SettingsExploreMiniCard>
                    </IonCol>

                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#F1D100"}
                        cardText={"Recommended"}
                      ></SettingsExploreMiniCard>
                    </IonCol>
                  </IonRow>
                </SettingsExploreCard>
              </IonCol> */}

              <IonCol className="child-name-age-col ion-align-items-end">
                <IonButton
                  className="scroll-right-button"
                  disabled={true}
                  fill="clear"
                >
                  <IonIcon
                    aria-label="Scroll Right"
                    icon={chevronForwardCircleOutline}
                    className="scroll-right-icon"
                  />
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </div>
    </>
  );
};
