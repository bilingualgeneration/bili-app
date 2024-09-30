//A.M.
import {
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import "./StudentProgress.css";
import { Link } from "react-router-dom";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import House from "@/assets/icons/house.svg";
import School from "@/assets/icons/school.svg";
import CheckCircle from "@/assets/icons/check_circle.svg";
import { useIntl } from "react-intl";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";
import CommunityIcon from "@/assets/icons/community.svg";
import StoriesIcon from "@/assets/icons/stories.svg";
import WellnessIcon from "@/assets/icons/wellness.svg";
import DropIcon from "@/assets/icons/drop.svg";
import HouseIcon from "@/assets/icons/house.svg";
import PresentIcon from "@/assets/icons/present.svg";
import PlayIcon from "@/assets/icons/play.svg";

const studentHighlightsStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Outfit",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "800",
  letterSpacing: "0.2px",
};

export const StudentProgress: React.FC = () => {
  return (
    <div>
      {/* student header with name and time spent on games this week */}
      <div className="student-progress-header">
        <IonItem>
          <IonLabel>
            <div className="header-progress-row">
              <div className="header-progress-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm color-barro progress-text-header">
                  Students
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold progress-text-header">
                  Student Name
                </IonText>
              </div>
              <div className="student-name-block">
                <IonText className="text-3xl semibold">
                  {"Student Name"}
                </IonText>
                <div>
                  <IonGrid>
                    <IonRow class="ion-justify-content-between">
                      <IonCol className="time-data-column">
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                          <IonCol size="4">
                            <IonIcon icon={House}></IonIcon>
                          </IonCol>
                          <IonCol className="student-time-text" size="8">
                            <IonText>
                              <p className="text-md semibold">120 min</p>
                              <p className="text-sm color-barro">At home</p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol className="time-data-column">
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                          <IonCol size="4">
                            <IonIcon icon={School}></IonIcon>
                          </IonCol>
                          <IonCol className="student-time-text" size="8">
                            <IonText>
                              <p className="text-md semibold">60 min</p>
                              <p className="text-sm color-barro">At school</p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                      <IonCol className="time-data-column">
                        <IonRow class="ion-justify-content-between ion-align-items-center">
                          <IonCol size="4">
                            <IonIcon icon={CheckCircle}></IonIcon>
                          </IonCol>
                          <IonCol className="student-time-text" size="8">
                            <IonText>
                              <p className="text-md semibold">180 min</p>
                              <p className="text-sm color-barro">Total time</p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>

      {/* student top skills this week */}
      <div className="student-top-skills">
        <IonGrid>
          <IonRow>
            <IonCol className="student-top-skills-header-text">
              <IonText>
                <p className="text-xl semibold">Top skills this week</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="top-skills-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "38px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "40px",
                        letterSpacing: "0.2px",
                      }}
                    >
                      1
                    </div>
                  }
                  title={"Initial Sound Identification - EN"}
                  content={""}
                  titleColor="color-suelo"
                  titleFontSize="lg"
                  iconBackgroundColor="#22BEB9"
                />
              </div>
            </IonCol>
            <IonCol>
              <div className="top-skills-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "38px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "40px",
                        letterSpacing: "0.2px",
                      }}
                    >
                      2
                    </div>
                  }
                  title={"Comprehension: explicit questions - ES"}
                  content={""}
                  titleColor="color-suelo"
                  titleFontSize="lg"
                  iconBackgroundColor="#FFE24F"
                />
              </div>
            </IonCol>
            <IonCol>
              <div className="top-skills-card">
                <RadioCard
                  icon={
                    <div
                      style={{
                        color: "#000",
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontSize: "38px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "40px",
                        letterSpacing: "0.2px",
                      }}
                    >
                      3
                    </div>
                  }
                  title={"Subitizing"}
                  content={""}
                  titleColor="color-suelo"
                  titleFontSize="lg"
                  iconBackgroundColor="#FFAEDC"
                />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <div className="graph-and-progressbar">
        <IonGrid>
          <IonRow>
            {/* pie-chart */}
            <IonCol size="6">
              <IonCard>
                <IonRow>
                  {/* graph columnn */}
                  <IonCol size="5.5" className="class-graph-percentage">
                    <PieChartComponent
                      data={[30, 20, 50]}
                      colors={["#EC59B1", "#006A67", "#0045A1"]}
                      innRadius={3}
                      width={200}
                      height={205}
                      cX={105}
                      cY={85}
                    />
                  </IonCol>
                  {/*language names with percentage */}
                  <IonCol size="6.5">
                    <IonRow>
                      <IonCol className="student-language-percentage">
                        {/* first group */}
                        <IonRow className="no-padding">
                          <IonCol size="2">
                            <span className="small-oval-element color-1"></span>
                          </IonCol>
                          <IonCol size="6">
                            <p className="text-md-no-line-height semibold text-color-black">
                              Spanish Immersion
                            </p>
                          </IonCol>
                          <IonCol size="2" style={{ textAlign: "center" }}>
                            <p>{"30"}%</p>
                          </IonCol>
                        </IonRow>
                        {/* second group */}

                        <IonRow>
                          <IonCol size="2">
                            <span className="small-oval-element color-2"></span>
                          </IonCol>
                          <IonCol size="6">
                            <p className="text-md-no-line-height semibold text-color-black">
                              Bilingual
                            </p>
                          </IonCol>
                          <IonCol size="2" style={{ textAlign: "center" }}>
                            <p>{"20"}%</p>
                          </IonCol>
                        </IonRow>
                        {/* third group */}

                        <IonRow>
                          <IonCol size="2">
                            <span className="small-oval-element color-3"></span>
                          </IonCol>
                          <IonCol size="6">
                            <p className="text-md-no-line-height semibold text-color-black">
                              English Immersion
                            </p>
                          </IonCol>
                          <IonCol size="2" style={{ textAlign: "center" }}>
                            <p>{"50"}%</p>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
            {/* progress bar */}
            <IonCol size="6">
              <IonCard></IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
};
