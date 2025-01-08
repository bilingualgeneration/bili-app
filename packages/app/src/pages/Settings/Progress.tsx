import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardTitle,
} from "@ionic/react";
import { RadioCard } from "@/components/RadioCard";
import { chevronDown } from "ionicons/icons";
import { bookOutline } from "ionicons/icons";
import "./Progress.scss";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const Progress: React.FC = () => {
  const [period, setPeriod] = useState("week" as "week" | "all");
  const intl = useIntl();

  const kidsName = "Vanessa";
  const firstLetter = kidsName[0];
  return (
    <>
      <div className="progress-content-container">
        <IonList className="ion-no-padding progress-style">
          <IonItem className="ion-no-margin ion-no-padding">
            <div className="title-style">
              <h1>
                <FormattedMessage
                  id="settings.progress.pageTitle"
                  defaultMessage="Progress"
                  description="Title at the top of 'Progress' settings page"
                />
              </h1>
            </div>
          </IonItem>

          <IonItem
            className="ion-no-margin ion-no-padding activity-insights"
            lines="none"
          >
            <div className="segment-style">
              <h4>
                <FormattedMessage
                  id="settings.progress.activity"
                  defaultMessage="Activity insights"
                  description="Subtitle of 'Progress' settings page"
                />
              </h4>
              <div className="segment-control">
                <button
                  onClick={() => setPeriod("week")}
                  className={`segment-control-button ${
                    period === "week" ? "checked" : ""
                  }`}
                >
                  <FormattedMessage
                    id="settings.progress.toggleWeek"
                    defaultMessage="Week"
                    description="Side 1 of toggle button on 'Progress' settings page"
                  />
                </button>
                <button
                  onClick={() => setPeriod("all")}
                  className={`segment-control-button ${
                    period === "all" ? "checked" : ""
                  }`}
                >
                  <FormattedMessage
                    id="settings.progress.toggleAll"
                    defaultMessage="All time"
                    description="Side 2 of toggle button on 'Progress' settings page"
                  />
                </button>
              </div>
            </div>
          </IonItem>

          <IonItem
            lines="none"
            className="ion-no-margin ion-no-padding kids-name-select"
          >
            <IonSelect interface="popover" toggleIcon={chevronDown}>
              <div className="label-style" slot="label">
                <span className="name-avatar small-oval-element">
                  {firstLetter}
                </span>
                <h4>{kidsName}</h4>
              </div>
              <IonSelectOption value="1">{kidsName}</IonSelectOption>
              {/* <IonSelectOption value="2">{kidsName}</IonSelectOption>
                          <IonSelectOption value="3">{kidsName}</IonSelectOption>
                          <IonSelectOption value="4">{kidsName}</IonSelectOption>
                          <IonSelectOption value="5">{kidsName}</IonSelectOption> */}
            </IonSelect>
          </IonItem>
        </IonList>

        <IonGrid className="whole-grid-style">
          <IonRow>
            <IonCol size="12">
              <IonCard className="ion-no-padding">
                <IonGrid className="grid-graph-style">
                  <IonRow>
                    <IonCol>
                      <p className="grid-text-style-big">
                        <FormattedMessage
                          id="settings.progress.breakdown"
                          defaultMessage="Learning breakdown"
                          description="Title of 'learning breakdown' chart"
                        />
                      </p>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-align-items-center progress-graph-row">
                    <IonCol className="progress-graph"></IonCol>
                    <IonCol className="progress-data">
                      {/* first group */}
                      <IonRow className="no-padding">
                        <IonCol size="1">
                          <span className="small-oval-element color-1"></span>
                        </IonCol>
                        <IonCol size="7">
                          <p className="grid-text-style-small">Communidad</p>
                          <p>
                            <FormattedMessage
                              id="settings.progress.community"
                              defaultMessage="Community"
                              description="'Community' label for the learning breakdown chart"
                            />
                          </p>
                        </IonCol>
                        <IonCol size="4">24%</IonCol>
                      </IonRow>
                      {/* second group */}

                      <IonRow>
                        <IonCol size="1">
                          <span className="small-oval-element color-2"></span>
                        </IonCol>
                        <IonCol size="7">
                          <p className="grid-text-style-small">Cuentos</p>
                          <p>
                            <FormattedMessage
                              id="settings.progress.stories"
                              defaultMessage="Stories"
                              description="'Stories' label for the learning breakdown chart"
                            />
                          </p>
                        </IonCol>
                        <IonCol size="4">26%</IonCol>
                      </IonRow>
                      {/* third group */}

                      <IonRow>
                        <IonCol size="1">
                          <span className="small-oval-element color-3"></span>
                        </IonCol>
                        <IonCol size="7">
                          <p className="grid-text-style-small">Bienestar</p>
                          <p>
                            <FormattedMessage
                              id="settings.progress.wellness"
                              defaultMessage="Wellness"
                              description="'Wellness' label for the learning breakdown chart"
                            />
                          </p>
                        </IonCol>
                        <IonCol size="4">39%</IonCol>
                      </IonRow>
                      {/* fourth group */}

                      <IonRow>
                        <IonCol size="1">
                          <span className="small-oval-element color-4"></span>
                        </IonCol>
                        <IonCol size="7">
                          <p className="grid-text-style-small">Juego</p>
                          <p>
                            <FormattedMessage
                              id="settings.progress.play"
                              defaultMessage="Play"
                              description="'Play' label for the learning breakdown chart"
                            />
                          </p>
                        </IonCol>
                        <IonCol size="4">11%</IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow id="settings-progress-bottom-row">
            <IonCol size-xs="6">
              <div className="grid-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "2.25rem",
                        fontStyle: "normal",
                        fontWeight: "800",
                        lineHeight: "800",
                        letterSpacing: "0.0125rem",
                      }}
                    >
                      1
                    </div>
                  }
                  title={"Fabrica de cuentos"}
                  content={intl.formatMessage({
                    id: "settings.progress.activity1",
                    defaultMessage: "20 minutes in total",
                    description:
                      "Time spent on activity1 (displayed on activity1 card on progress settings page)",
                  })}
                  iconBackgroundColor="#22BEB9"
                />
              </div>
            </IonCol>

            <IonCol size-xs="6">
              <div className="grid-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "2.25rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "800",
                        letterSpacing: "0.0125rem",
                      }}
                    >
                      2
                    </div>
                  }
                  title={"Afirmaciones"}
                  content={intl.formatMessage({
                    id: "settings.progress.activity2",
                    defaultMessage: "12 minutes in total",
                    description:
                      "Time spent on activity2 (displayed on activity2 card on progress settings page)",
                  })}
                  iconBackgroundColor="#FFE24F"
                />
              </div>
            </IonCol>

            <IonCol size-xs="6">
              <div className="grid-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "2.25rem",
                        fontStyle: "normal",
                        fontWeight: "800",
                        lineHeight: "800",
                        letterSpacing: "0.0125rem",
                      }}
                    >
                      3
                    </div>
                  }
                  title={"Cuento: Cara de Catrina"}
                  content={intl.formatMessage({
                    id: "settings.progress.activity3",
                    defaultMessage: "9 minutes in total",
                    description:
                      "Time spent on activity3 (displayed on activity3 card on progress settings page)",
                  })}
                  iconBackgroundColor="#FFAEDC"
                />
              </div>
            </IonCol>
            <IonCol class="ion-text-center" size-xs="6">
              <IonCard className="activities-card">
                <div className="activities-card-overlay"></div>
                <IonGrid>
                  <IonRow class="ion-align-items-center">
                    <IonCol>
                      <span>25</span>
                    </IonCol>

                    <IonCol class="ion-text-center">
                      <IonIcon
                        className="book-icon"
                        icon={bookOutline}
                        aria-hidden="true"
                      />
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol>
                      <IonCardTitle>
                        <FormattedMessage
                          id="settings.progress.activities"
                          defaultMessage="Activities"
                          description="'Activities' card on Progress page detailing number of activities"
                        />
                      </IonCardTitle>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
