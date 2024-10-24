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
import { Link, useParams } from "react-router-dom";
import { FullName } from "@/hooks/Names";
import { useIntl } from "react-intl";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useState } from "react";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";

import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import CheckCircle from "@/assets/icons/check_circle.svg";
import Email from "@/assets/icons/email.svg";
import House from "@/assets/icons/house.svg";
import Printer from "@/assets/icons/printer_white.svg";
import School from "@/assets/icons/school.svg";
import SmallHouse from "@/assets/icons/small_home.svg";
import SmallSchool from "@/assets/icons/small_school.svg";

import "./StudentProgress.css";

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
  const { data } = useFirestoreDoc();
  const { studentId } = useParams<{ studentId: string }>();
  const analytics = data.classroomAnalytics[0].studentAnalytics[studentId];

  const languageTotal =
    Math.max(analytics.languageBreakdown.es, 1) +
    Math.max(analytics.languageBreakdown.en, 1) +
    Math.max(analytics.languageBreakdown.esen, 1);
  const languageBreakdown = {
    es:
      Math.round(
        (Math.max(analytics.languageBreakdown.es, 1) / languageTotal) * 1000,
      ) / 10,
    en:
      Math.round(
        (Math.max(analytics.languageBreakdown.en, 1) / languageTotal) * 1000,
      ) / 10,
    esen:
      Math.round(
        (Math.max(analytics.languageBreakdown.esen, 1) / languageTotal) * 1000,
      ) / 10,
  };
  return (
    <div>
      {/* student header with name and time spent on games this week */}
      <div className="student-progress-header">
        <IonItem>
          <IonLabel>
            <div className="header-progress-row">
              <div className="header-progress-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {data.name}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm color-barro progress-text-header">
                  Students
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold progress-text-header">
                  <FullName id={studentId} type="student" />
                </IonText>
              </div>
              <div className="student-name-block">
                <IonText className="text-3xl semibold">
                  <FullName id={studentId} type="student" />
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
                              <p className="text-md semibold">
                                {Math.floor(
                                  analytics.timeBreakdown.atHome / 60,
                                )}{" "}
                                min
                              </p>
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
                              <p className="text-md semibold">
                                {Math.floor(
                                  analytics.timeBreakdown.atSchool / 60,
                                )}{" "}
                                min
                              </p>
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
                              <p className="text-md semibold">
                                {Math.floor(
                                  (analytics.timeBreakdown.atHome +
                                    analytics.timeBreakdown.atSchool) /
                                    60,
                                )}{" "}
                                min
                              </p>
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
            {analytics.highlights
              .sort((a: any, b: any) => (a.score > b.score ? -1 : 1))
              .slice(0, 3)
              .map((highlight: any, index: number) => (
                <IonCol key={highlight.skill} size="4">
                  <TopSkill number={index} skill={highlight.skill} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </div>
      <div className="graph-and-progressbar">
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="graph-and-progressbar-info-card">
                <IonText className="text-xl semibold color-suelo">
                  Language Mode
                </IonText>
                <IonRow class="ion-justify-content-between">
                  {/* graph columnn */}
                  <IonCol size="6" className="class-graph-percentage">
                    <PieChartComponent
                      data={[
                        languageBreakdown.es,
                        languageBreakdown.en,
                        languageBreakdown.esen,
                      ]}
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
                        {[
                          {
                            label: "Spanish Immersion",
                            value: languageBreakdown.es.toFixed(1),
                            color: "#EC59B1",
                          },
                          {
                            label: "English Immersion",
                            value: languageBreakdown.en.toFixed(1),
                            color: "#006A67",
                          },
                          {
                            label: "Bilingual",
                            value: languageBreakdown.esen.toFixed(1),
                            color: "#0045A1",
                          },
                        ].map((stat: any) => (
                          <LanguageModeLabel key={stat.label} {...stat} />
                        ))}
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
            {/* progress bar */}
            <IonCol size="6">
              <IonCard
                className="graph-and-progressbar-info-card"
                style={{ justifyContent: "start41" }}
              >
                <IonText className="text-xl semibold color-suelo">
                  Needs more support
                </IonText>
                <IonList lines="full" className="students-needs-support-list">
                  {analytics.needs
                    .sort((a: any, b: any) => (a.score > b.score ? 1 : -1))
                    .slice(0, 5)
                    .map((need: any) => (
                      <TopNeed
                        key={need.skill}
                        skill={need.skill}
                        value={need.value}
                      />
                    ))}
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <ActivityBreakdown />
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

const LanguageModeLabel: React.FC<any> = ({ label, value, color }) => (
  <IonRow className="no-padding">
    <IonCol size="2">
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      ></div>
    </IonCol>
    <IonCol size="7">
      <p className="text-md-no-line-height semibold text-color-black">
        {label}
      </p>
    </IonCol>
    <IonCol size="3" style={{ textAlign: "center" }}>
      <p>{value}%</p>
    </IonCol>
  </IonRow>
);

const TopNeed: React.FC<any> = ({ skill }) => (
  <IonItem>
    <div className="student-needs-support-text">
      <p className="student-needs-support-text-problem text-color-grey">
        {skill}
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
          "--background": 0.7 < 0.5 ? "#FFDAD2" : "#FFF3D3",
          "--progress-background": 0.7 < 0.5 ? "#FF5708" : "#F1D100",
        }}
      ></IonProgressBar>
    </div>
  </IonItem>
);

const TopSkillColors = ["#22BEB9", "#FFE24F", "#FFAEDC"];

const TopSkill: React.FC<any> = ({ skill, number }) => (
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
          {number}
        </div>
      }
      title={skill}
      content=""
      titleColor="color-suelo"
      titleFontSize="lg"
      iconBackgroundColor={TopSkillColors[number - 1]}
    />
  </div>
);

const ActivityBreakdown: React.FC = ({}) => {
  const [logs, setLogs] = useState<any>([]);
  return (
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
                            : student.languageMode.toLowerCase() === "bilingual"
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
  );
};
