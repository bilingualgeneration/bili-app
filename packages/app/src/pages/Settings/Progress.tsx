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
import "./Progress.css";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

export const Progress: React.FC = () => {
  const [period, setPeriod] = useState("week" as "week" | "all");

  const kidsName = "Vanessa";
  const firstLetter = kidsName[0];
  return (
    <>
      <div className="progress-content-container">
        <IonList className="progress-style">
          <IonItem>
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

          <IonItem lines="none">
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

          <IonItem lines="none" className="kids-name-select">
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
            <IonCol size="8">
              <IonCard className="ion-no-padding">
                <IonGrid className="grid-graph-style">
                  <IonRow>
                    <IonCol>
                      <p className="grid-text-style-big">Learning breakdown</p>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-align-items-center progress-graph-row">
                    <IonCol className="progress-graph">
                      <IonImg src="./assets/img/progress-graph.png"></IonImg>
                    </IonCol>
                    <IonCol className="progress-data">
                      {/* first group */}
                      <IonRow className="no-padding">
                        <IonCol size="1">
                          <span className="small-oval-element color-1"></span>
                        </IonCol>
                        <IonCol size="7">
                          <p className="grid-text-style-small">Communidad</p>
                          <p>Community</p>
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
                          <p>Stories</p>
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
                          <p>Wellness</p>
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
                          <p>Play</p>
                        </IonCol>
                        <IonCol size="4">11%</IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCard>
            </IonCol>

            <IonCol size="4" className="second-column">
              <IonRow>
                <IonCol>
                  <div className="grid-card">
                    <RadioCard
                      icon={
                        <div
                          style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Outfit",
                            fontSize: "36px",
                            fontStyle: "normal",
                            fontWeight: "800",
                            lineHeight: "800",
                            letterSpacing: "0.2px",
                          }}
                        >
                          1
                        </div>
                      }
                      title={"Fabrica de cuentos"}
                      content={"20 minutes in total"}
                      iconBackgroundColor="#22BEB9"
                    />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div className="grid-card">
                    <RadioCard
                      icon={
                        <div
                          style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Outfit",
                            fontSize: "36px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "800",
                            letterSpacing: "0.2px",
                          }}
                        >
                          2
                        </div>
                      }
                      title={"Afirmaciones"}
                      content={"12 minutes in total"}
                      iconBackgroundColor="#FFE24F"
                    />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div className="grid-card">
                    <RadioCard
                      icon={
                        <div
                          style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Outfit",
                            fontSize: "36px",
                            fontStyle: "normal",
                            fontWeight: "800",
                            lineHeight: "800",
                            letterSpacing: "0.2px",
                          }}
                        >
                          3
                        </div>
                      }
                      title={"Cuento: Cara de Catrina"}
                      content={"9 minutes in total"}
                      iconBackgroundColor="#FFAEDC"
                    />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCard className="activities-card">
                    <div className="activities-card-overlay"></div>
                    <IonGrid>
                      <IonRow class="ion-align-items-center ion-justify-content-center">
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
                          <IonCardTitle>Activities</IonCardTitle>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </>
  );
};
