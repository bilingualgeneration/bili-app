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
import { SettingsHeader } from "@/components/SettingsHeader";
import {
  addOutline,
  ellipse,
  ellipsisHorizontal,
  sparkles,
} from "ionicons/icons";
import "./SettingsPage1.css";
import { SettingsExploreCard } from "@/components/SettingsExplore";
import settingsCardDesign1 from "@/assets/icons/settings_explore_card_bg1.svg";
import settingsCardDesign2 from "@/assets/icons/settings_explore_card_bg2.svg";
import settingsCardDesign3 from "@/assets/icons/settings_explore_card_bg3.svg";
import SettingsExploreMiniCard from "@/components/SettingsExplore/SettingsExploreMiniCard";

export const SettingsPage1: React.FC = ({}) => {
  return (
    <>
      <SettingsHeader></SettingsHeader>

      <div className="settings-pg1-container">
        <IonGrid>
          <IonRow class="ion-justify-content-between row">
            <IonCol size="auto">
              <h1 className="child-profile-heading">Child Profile</h1>
            </IonCol>

            <IonCol size="auto">
              <IonButton
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
                  Add child
                </IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <div className="child-profile-content">
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonGrid className="ion-no-margin">
                    <IonRow class="">
                      <IonCol size="sm">
                        <IonIcon
                          icon={ellipse}
                          size="large"
                          className="circle-icon"
                        />
                      </IonCol>

                      <IonCol>
                        <h1 className="child-name">Vanessa</h1>
                        <p>3-5 years old</p>
                      </IonCol>

                      <IonCol size="1.5" class="ion-text-center">
                        <IonIcon
                          icon={ellipsisHorizontal}
                          size="large"
                          className="more"
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard>
                  <IonGrid className="ion-no-margin">
                    <IonRow class="">
                      <IonCol size="sm">
                        <IonIcon
                          icon={ellipse}
                          size="large"
                          className="circle-icon-2"
                        />
                      </IonCol>

                      <IonCol>
                        <h1 className="child-name">Mateo</h1>
                        <p>5-7 years old</p>
                      </IonCol>

                      <IonCol size="1.5" class="ion-text-end">
                        <IonIcon
                          icon={ellipsisHorizontal}
                          size="large"
                          className="more"
                        />
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
                <h1 className="child-profile-heading">Explore Bili</h1>
                <p className="explore-bili-subheading">
                  Learn how to use Bili to meet language goals
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
              <a className="a-tag" href="URL">
                See all &#40;9&#41;
              </a>
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

                  <IonRow></IonRow>
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

                  <IonRow></IonRow>
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

                  <IonRow></IonRow>
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

                  <IonRow></IonRow>
                </SettingsExploreCard>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </div>
    </>
  );
};
