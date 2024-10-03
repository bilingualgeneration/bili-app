//A.M.
import {
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
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

const studentData = [
  {
    date: "6/6/24",
    activity: "Stories",
    completions: "5",
    accuracy: "50%",
    languageMode: "bilingual",
    location: "school",
  },
  {
    date: "5/6/24",
    activity: "The intruder",
    completions: "5",
    accuracy: "70%",
    languageMode: "Spanish Immersion",
    location: "home",
  },
  {
    date: "3/6/24",
    activity: "Story factory",
    completions: "3",
    accuracy: "30%",
    languageMode: "Englsih immersion",
    location: "school",
  },
];

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
                <IonText className="text-xl semibold color-suelo">
                  Language Mode
                </IonText>
                <IonRow class="ion-justify-content-between">
                  {/* graph columnn */}
                  <IonCol size="6" className="class-graph-percentage">
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
                  <IonCol size="5">
                    <IonRow>
                      <IonCol className="student-language-percentage">
                        {/* first group */}
                        <IonRow className="no-padding">
                          <IonCol size="2">
                            <span className="small-oval-element color-1"></span>
                          </IonCol>
                          <IonCol size="7">
                            <p className="text-md-no-line-height semibold text-color-black">
                              Spanish Immersion
                            </p>
                          </IonCol>
                          <IonCol size="3" style={{ textAlign: "center" }}>
                            <p>{"30"}%</p>
                          </IonCol>
                        </IonRow>
                        {/* second group */}

                        <IonRow>
                          <IonCol size="2">
                            <span className="small-oval-element color-2"></span>
                          </IonCol>
                          <IonCol size="7">
                            <p className="text-md-no-line-height semibold text-color-black">
                              Bilingual
                            </p>
                          </IonCol>
                          <IonCol size="3" style={{ textAlign: "center" }}>
                            <p>{"20"}%</p>
                          </IonCol>
                        </IonRow>
                        {/* third group */}

                        <IonRow>
                          <IonCol size="2">
                            <span className="small-oval-element color-3"></span>
                          </IonCol>
                          <IonCol size="7">
                            <p className="text-md-no-line-height semibold text-color-black">
                              English Immersion
                            </p>
                          </IonCol>
                          <IonCol size="3" style={{ textAlign: "center" }}>
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
              <IonCard>
                <IonText className="text-xl semibold color-suelo">
                  Needs more support
                </IonText>
                <IonList lines="full" className="students-needs-support-list">
                  <IonItem>
                    <div className="student-needs-support-text">
                      <p className="student-needs-support-text-problem text-color-grey">
                        {
                          "Syntax & Grammar: Similarities & Differences - EN & ES"
                        }
                      </p>
                    </div>
                    <div className="student-needs-support-progress-bar">
                      <div className="student-needs-support-progress-bar-percentage">
                        {Math.round(0.7 * 100)}%
                      </div>
                      <IonProgressBar
                        value={0.7}
                        buffer={1}
                        style={{
                          "--background": 0.7 < 0.5 ? "#FFDAD2" : "#FFF3D3",
                          "--progress-background":
                            0.7 < 0.5 ? "#FF5708" : "#F1D100",
                        }}
                      ></IonProgressBar>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="student-needs-support-text">
                      <p className="student-needs-support-text-problem text-color-grey">
                        {"Blending Phonemes into Words - EN"}
                      </p>
                    </div>
                    <div className="student-needs-support-progress-bar">
                      <div className="student-needs-support-progress-bar-percentage">
                        {Math.round(0.3 * 100)}%
                      </div>
                      <IonProgressBar
                        value={0.7}
                        buffer={1}
                        style={{
                          "--background": 0.3 < 0.5 ? "#FFDAD2" : "#FFF3D3",
                          "--progress-background":
                            0.3 < 0.5 ? "#FF5708" : "#F1D100",
                        }}
                      ></IonProgressBar>
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="student-needs-support-text">
                      <p className="student-needs-support-text-problem text-color-grey">
                        {"Segmenting Words into Syllables - EN"}
                      </p>
                    </div>
                    <div className="student-needs-support-progress-bar">
                      <div className="student-needs-support-progress-bar-percentage">
                        {Math.round(0.5 * 100)}%
                      </div>
                      <IonProgressBar
                        value={0.7}
                        buffer={1}
                        style={{
                          "--background": 0.5 < 0.5 ? "#FFDAD2" : "#FFF3D3",
                          "--progress-background":
                            0.5 < 0.5 ? "#FF5708" : "#F1D100",
                        }}
                      ></IonProgressBar>
                    </div>
                  </IonItem>
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <div className="student-data-activity-table">
        <IonGrid>
          <IonCard>
            <IonRow className="student-table-header-row ion-align-items-center">
              <IonCol className="text-md semibold">Date</IonCol>
              <IonCol className="text-md semibold">Activity</IonCol>
              <IonCol className="text-md semibold">Completions</IonCol>
              <IonCol className="text-md semibold">Accuracy</IonCol>
              <IonCol className="text-md semibold">Language mode</IonCol>
              <IonCol className="text-md semibold">Location</IonCol>
            </IonRow>
            {studentData.map((student, index) => (
              <IonRow
                className="ion-align-items-center student-table-body-row"
                key={index}
              >
                <IonCol>
                  <IonText>
                    <p>{student.date}</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <p>{student.activity}</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <p>{student.completions}</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <p>{student.accuracy}</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <p>{student.languageMode}</p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    <p>{student.location}</p>
                  </IonText>
                </IonCol>
              </IonRow>
            ))}
          </IonCard>
        </IonGrid>
      </div>
    </div>
  );
};
