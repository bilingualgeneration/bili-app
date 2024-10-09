//A.M.
import {
  IonButton,
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
import { Link, useParams } from "react-router-dom";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import House from "@/assets/icons/house.svg";
import School from "@/assets/icons/school.svg";
import SmallHouse from "@/assets/icons/small_home.svg";
import SmallSchool from "@/assets/icons/small_school.svg";
import CheckCircle from "@/assets/icons/check_circle.svg";
import Printer from "@/assets/icons/printer_white.svg";
import Email from "@/assets/icons/email.svg";
import { useIntl } from "react-intl";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";

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
    languageMode: "English immersion",
    location: "school",
  },
];

export const StudentProgress: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
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
              <IonCard className="graph-and-progressbar-info-card">
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
              <IonCard className="graph-and-progressbar-info-card">
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
          <div className="student-progress-table-div">
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
                  <IonText className="student-progress-language-mode">
                    <p
                      style={{
                        background:
                          student.languageMode.toLowerCase() ===
                          "english immersion"
                            ? "#0045A1"
                            : student.languageMode.toLowerCase() ===
                                "spanish immersion"
                              ? "#EC59B1"
                              : student.languageMode.toLowerCase() ===
                                  "bilingual"
                                ? "var(--Base-Selva)"
                                : "gray",
                      }}
                    >
                      {student.languageMode}
                    </p>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText
                    className="student-progress-location"
                    style={{
                      backgroundColor:
                        student.location.toLowerCase() === "home"
                          ? "#FFDAD2"
                          : "#C3ECE2",
                    }}
                  >
                    <IonIcon
                      icon={
                        student.location.toLowerCase() === "home"
                          ? SmallHouse
                          : SmallSchool
                      }
                    ></IonIcon>
                    <p
                      style={{
                        color:
                          student.location.toLowerCase() === "home"
                            ? "#FF5708"
                            : "#003735",
                      }}
                    >
                      {student.location}
                    </p>
                  </IonText>
                </IonCol>
              </IonRow>
            ))}
          </div>
        </IonGrid>
      </div>
      <div className="student-caregivers-block">
        <IonItem>
          <IonLabel>
            <IonText>
              <p className="semibold text-3xl">Caregivers</p>
            </IonText>
          </IonLabel>
        </IonItem>
        <div>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard className="caregiver-info-card">
                  <IonRow class="ion-align-items-center">
                    <IonCol>
                      <IonText>
                        <p className="text-xl semibold color-suelo">
                          {"Caregiver name"}
                        </p>
                        <p className="text-lg semibold color-selva">
                          {"caregiver1@gmail.com"}
                        </p>
                        <p className="text-lg color-barro">{"Active"}</p>
                      </IonText>
                    </IonCol>
                    <IonCol></IonCol>
                  </IonRow>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard className="caregiver-info-card">
                  <IonRow class="ion-align-items-center">
                    <IonCol>
                      <IonText>
                        <p className="text-xl semibold color-suelo">
                          {"Caregiver name"}
                        </p>
                        <p className="text-lg semibold color-selva">
                          {"caregiver1@gmail.com"}
                        </p>
                        <p className="text-lg color-barro">{"Not active"}</p>
                      </IonText>
                    </IonCol>
                    <IonCol>
                      <div className="resend-invite-buttons">
                        <IonButton>
                          <IonIcon icon={Email}></IonIcon>
                          <p>Resend Invite</p>
                        </IonButton>
                        <IonButton>
                          <IonIcon icon={Printer}></IonIcon>
                          <p>Reprint Invite</p>
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </div>
  );
};
