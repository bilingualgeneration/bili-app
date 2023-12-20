import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonThumbnail,
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
import { FormattedMessage } from "react-intl";

export const Overview: React.FC = ({}) => {
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
          id="settings.onboarding.inclusive-spanish"
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
  return (
    <>
      <Joyride
        steps={steps}
        continuous={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
        }}
      />
      <div className="settings-pg1-container">
        <IonGrid class="adult-profile-content">
          <IonRow class="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading">
                <FormattedMessage
                  id="settings.child"
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
                    id="settings.addChildBtn"
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
                    id="settings.explore"
                    defaultMessage="Explore Bili"
                    description="Explore Bili heading in settings"
                  />
                </h1>
                <p className="explore-bili-subheading">
                  <FormattedMessage
                    id="settings.exploreSubheading"
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
                  id="settings.seeAll"
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
                  title={"Getting started"}
                  subtitle={
                    "When you enter into any new area of science, you almost always find."
                  }
                  // can also change text color of SettingsExploreCard using 'textColor' prop if necessary
                >
                  <IonRow>
                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#FFAEDC"} // enter a background color for the mini card
                        cardText={"Guide"} // enter a custom text for the mini card
                        // can also change color of text for SettingsExploreMiniCard using 'textColor' prop if necessary
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
              </IonCol>

              <IonCol size="md">
                <span id="inclusive-spanish-card">
                  <SettingsExploreCard
                    backgroundImage={settingsCardDesign2}
                    backgroundColor={"#22BEB9"}
                    title={"Inclusive Spanish"}
                    subtitle={
                      "Learn about what Inclusive Spanish is and why it exists."
                    }
                  >
                    <IonRow>
                      <IonCol size="auto">
                        <SettingsExploreMiniCard
                          customColor={"#D3EAE8"}
                          cardText={"Social Justice"}
                        ></SettingsExploreMiniCard>
                      </IonCol>

                      <IonCol size="auto">
                        <SettingsExploreMiniCard
                          customColor={"#F1D100"}
                          cardText={"Resources"}
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
                  title={"Get your child speaking Spanish with Bili"}
                  subtitle={
                    "Explore special features that promote authentic language production."
                  }
                  textColor="black"
                >
                  <IonRow>
                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#973D78"}
                        cardText={"Parents"}
                        textColor="white"
                      ></SettingsExploreMiniCard>
                    </IonCol>

                    <IonCol>
                      <SettingsExploreMiniCard
                        customColor={"#F1D100"}
                        cardText={"Resources"}
                      ></SettingsExploreMiniCard>
                    </IonCol>
                  </IonRow>
                </SettingsExploreCard>
              </IonCol>

              <IonCol size="md">
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
              </IonCol>

              <IonCol className="child-name-age-col ion-align-items-end">
                <IonButton
                  className="scroll-right-button"
                  disabled={true}
                  fill="clear"
                >
                  <IonIcon
                    aria-label="Scroll Right"
                    // size="large"
                    // slot="end"
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
