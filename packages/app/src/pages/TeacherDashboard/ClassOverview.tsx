import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
} from "@ionic/react";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { RadioCard } from "@/components/RadioCard";
import PieChartComponent from "@/components/PieChartComponent/PieChartComponent";
import CommunityIcon from "@/assets/icons/community.svg";
import StoriesIcon from "@/assets/icons/stories.svg";
import WellnessIcon from "@/assets/icons/wellness.svg";
import DropIcon from "@/assets/icons/drop.svg";
import HouseIcon from "@/assets/icons/house.svg";
import PresentIcon from "@/assets/icons/present.svg";
import PlayIcon from "@/assets/icons/play.svg";
import LightBulb from "@/assets/icons/lightbulb.svg";
import StudentPicture from "@/assets/img/student_picture.png";
import StudentsReadingPicture from "@/assets/img/kids_reading.png";
import { useClassroom } from "@/hooks/Classroom";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./ClassOverview.css";

export const ClassOverview: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <FirestoreDocProvider
      collection="classroom"
      id={classroomId}
      populate={{
        classroomAnalytics: ["classroom", "==", classroomId],
      }}
    >
      <ClassLoader />
    </FirestoreDocProvider>
  );
};

const ClassLoader: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      const { classroomAnalytics, ...d } = data;
      const restructuredData = {
        ...d,
        classroomAnalytics: classroomAnalytics[0],
      };
      return <ClassOverviewHydrated {...restructuredData} />;
      break;
    default:
      return <>default case</>;
      break;
  }
};

const studentHighlightsStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Outfit",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "800",
  letterSpacing: "0.2px",
};

export const ClassOverviewHydrated: React.FC<any> = ({
  id,
  school,
  name,
  classroomAnalytics,
}) => {
  const intl = useIntl();
  const { setInfo } = useClassroom();
  useEffect(() => {
    setInfo({
      name,
      id,
      schoolId: school,
    });
  }, [setInfo, id, school, name]);
  return (
    <div id="teacher-dashboard-class-overview-id">
      {/* header text */}
      <div className="overview-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {name}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Overview
                </IonText>
              </div>
              <div className="classroom-name-block">
                <IonText className="text-3xl semibold">{name}</IonText>
                <button className="visit-students-button">
                  <Link
                    to={`/classrooms/${id}/select-student`}
                    className="no-underline"
                  >
                    <p className="text-md semibold color-suelo">
                      Go to student app
                    </p>
                  </Link>
                </button>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>

      {/*top students cards*/}
      <div className="overview-top-student-cards">
        <IonGrid>
          <IonRow>
            {classroomAnalytics?.studentHighlights?.map((s: any) => (
              <FirestoreDocProvider
                collection="student"
                key={s.studentId}
                id={s.studentId}
              >
                <StudentHighlightCard {...s} />
              </FirestoreDocProvider>
            ))}
          </IonRow>
        </IonGrid>
      </div>

      {/* class data */}

      <div className="main-students-data">
        <IonGrid>
          <IonRow>
            {/* left card with graph*/}
            <IonCol>
              <LearningTimeSummary data={classroomAnalytics.timeBreakdown} />
              {/* blog part */}
              <IonCard className="card-blog">
                <div className="class-overview-blog-styles">
                  <IonGrid>
                    <IonRow class="ion-align-items-center">
                      <IonCol size="2.5">
                        <img src={StudentsReadingPicture} alt="" />
                      </IonCol>
                      <IonCol>
                        <p className="text-xl semibold text-color-black">
                          Visit the Bili blog
                        </p>
                        <p>
                          Explore resources and tips for <br />
                          teaching multilingual students
                        </p>
                      </IonCol>
                      <IonCol size="2.5">
                        <button className="visit-blog-button">
                          <a
                            href="https://thebiliapp.com/blog/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-sm semibold">Learn more</p>
                          </a>
                        </button>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonCard>
              <IonRow />
            </IonCol>
            {/* right card with progress bar*/}
            <IonCol>
              <IonCard>
                <IonText className="text-xl semibold color-suelo">
                  Needs more support
                </IonText>

                <IonList lines="full" className="students-needs-support-list">
                  {classroomAnalytics?.studentNeeds?.map((s: any) => (
                    <FirestoreDocProvider
                      collection="student"
                      key={s.studentId}
                      id={s.studentId}
                    >
                      <StudentNeedsCard {...s} />
                    </FirestoreDocProvider>
                  ))}
                </IonList>
                <div className="review-word-styles">
                  <IonGrid>
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                      <IonCol size="1.1">
                        <span className="smaller-oval-element color-5">
                          <IonIcon icon={LightBulb}></IonIcon>
                        </span>
                      </IonCol>
                      <IonCol>
                        <p className="text-sm text-color-black">
                          Review word families again
                        </p>
                        <p className="text-xs text-color-grey">
                          Some students need help with this concept
                        </p>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
                <Link
                  className="no-underline"
                  to={`/classrooms/view/${id}/students`}
                >
                  <IonButton expand="block">See all students</IonButton>
                </Link>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </div>
  );
};

const getIcon = (area: string) => {
  switch (area) {
    case "highestAccuracy":
      return {
        icon: <IonIcon icon={DropIcon}></IonIcon>,
        iconBackgroundColor: "#D3EAE8",
      };
    case "mostHomeLearning":
      return {
        icon: <IonIcon icon={HouseIcon}></IonIcon>,
        iconBackgroundColor: "#FFDBCA",
      };
    case "mostStars":
      return {
        icon: <IonIcon icon={PresentIcon}></IonIcon>,
        iconBackgroundColor: "#FFD8EB",
      };
    default:
      return {
        icon: null,
        iconBackgroundColor: "red",
      };
  }
};

const StudentHighlightCard: React.FC<any> = ({ area, student }) => {
  const intl = useIntl();
  const { data, status } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <IonCol size-xs="4"></IonCol>;
    case "error":
      return <>error</>;
    case "ready":
      const { icon, iconBackgroundColor } = getIcon(area);
      return (
        <IonCol size-xs="4">
          <div className="grid-card">
            <RadioCard
              icon={
                <div
                  // @ts-ignore
                  style={studentHighlightsStyle}
                >
                  {icon}
                </div>
              }
              title={`${data.firstName} ${data.lastName}`}
              content={intl.formatMessage({ id: `teacherDashboard.${area}` })}
              iconBackgroundColor={iconBackgroundColor}
              titleFontSize="xl"
              titleColor="color-suelo"
              contentFontSize="sm"
              contentColor="color-barro"
            />
          </div>
        </IonCol>
      );
    default:
      return <>this should never show</>;
  }
};

type LearningTimeSummaryFilter = "atSchool" | "atHome" | "both";

const sum = (array: number[]) => {
  return array.reduce((acc, current) => acc + current, 0);
};

const summarizeTime = (
  data: any,
  filter: LearningTimeSummaryFilter,
  category: string,
) => {
  switch (filter) {
    case "atHome":
      return sum(Object.values(data.atHome[category]));
    case "atSchool":
      return sum(Object.values(data.atSchool[category]));
    case "both":
      return (
        sum(Object.values(data.atHome[category])) +
        sum(Object.values(data.atSchool[category]))
      );
  }
  // default case
  return (
    sum(Object.values(data.atHome[category])) +
    sum(Object.values(data.atSchool[category]))
  );
};

const LearningTimeSummary: React.FC<any> = ({ data }) => {
  const [learningTimeSummaryFilter, setLearningTimeSummaryFilter] =
    useState<LearningTimeSummaryFilter>("atSchool");
  const filteredData = useMemo(() => {
    const times = {
      community: Math.max(
        summarizeTime(data, learningTimeSummaryFilter, "community"),
        1,
      ),
      games: Math.max(
        summarizeTime(data, learningTimeSummaryFilter, "games"),
        1,
      ),
      stories: Math.max(
        summarizeTime(data, learningTimeSummaryFilter, "stories"),
        1,
      ),
      wellness: Math.max(
        summarizeTime(data, learningTimeSummaryFilter, "wellness"),
        1,
      ),
    };
    console.log(times);
    const total = sum(Object.values(times));

    // needs to be percentages
    return {
      community: Math.floor((times.community / total) * 100),
      games: Math.floor((times.games / total) * 100),
      stories: Math.floor((times.stories / total) * 100),
      wellness: Math.floor((times.wellness / total) * 100),
    };
  }, [data, learningTimeSummaryFilter]);
  return (
    <IonCard>
      {/* Learning time summary row */}
      <IonRow>
        <IonCol>
          <div className="graph-header">
            <IonText className="text-xl semibold color-suelo">
              Learning time summary
            </IonText>
            <IonSegment
              value={learningTimeSummaryFilter}
              mode="ios"
              onIonChange={({ detail: { value } }) => {
                setLearningTimeSummaryFilter(
                  value as LearningTimeSummaryFilter,
                );
              }}
            >
              <IonSegmentButton value="atSchool">
                <IonLabel>At school</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="atHome">
                <IonLabel>At home</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="both">
                <IonLabel>All Learning</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="6.5" className="class-game-names-percentage">
          <IonRow>
            {/*game names with percentage */}
            <IonCol className="class-game-name-percentage">
              {/* first group */}
              <IonRow className="no-padding">
                <IonCol size="3">
                  <span className="small-oval-element color-1">
                    <IonIcon icon={StoriesIcon}></IonIcon>
                  </span>
                </IonCol>
                <IonCol size="6">
                  <p className="text-md-no-line-height semibold text-color-black">
                    Cuentos
                  </p>

                  <p className="text-color-grey">Stories</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <p>{filteredData.stories}%</p>
                </IonCol>
              </IonRow>
              {/* second group */}

              <IonRow>
                <IonCol size="3">
                  <span className="small-oval-element color-2">
                    <IonIcon icon={WellnessIcon}></IonIcon>
                  </span>
                </IonCol>
                <IonCol size="6">
                  <p className="text-md-no-line-height semibold text-color-black">
                    Bienestar
                  </p>
                  <p className="text-color-grey">Wellness</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <p>{filteredData.wellness}%</p>
                </IonCol>
              </IonRow>
              {/* third group */}

              <IonRow>
                <IonCol size="3">
                  <span className="small-oval-element color-3">
                    <IonIcon icon={PlayIcon}></IonIcon>
                  </span>
                </IonCol>
                <IonCol size="6">
                  <p className="text-md-no-line-height semibold text-color-black">
                    Juego
                  </p>

                  <p className="text-color-grey">Play</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <p>{filteredData.games}%</p>
                </IonCol>
              </IonRow>
              {/* fourth group */}

              <IonRow>
                <IonCol size="3">
                  <span className="small-oval-element color-4">
                    <IonIcon icon={CommunityIcon}></IonIcon>
                  </span>
                </IonCol>
                <IonCol size="6">
                  <p className="text-md-no-line-height semibold text-color-black">
                    Communidad
                  </p>

                  <p className="text-color-grey">Community</p>
                </IonCol>
                <IonCol size="3" style={{ textAlign: "center" }}>
                  <p>{filteredData.community}%</p>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCol>

        {/* graph columnn */}
        <IonCol size="5.5" className="class-graph-percentage">
          <PieChartComponent
            data={[
              filteredData.stories,
              filteredData.wellness,
              filteredData.games,
              filteredData.community,
            ]}
            colors={["#0045A1", "#973D78", "#FF5708", "#22BEB9"]}
            innRadius={3}
            width={200}
            height={205}
            cX={105}
            cY={85}
          />
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

const StudentNeedsCard: React.FC<any> = ({ area, percentage, studentId }) => {
  const intl = useIntl();
  const { data, status } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <IonItem />;
    case "error":
      return <>error</>;
    case "ready":
      return (
        <IonItem>
          <div className="student-needs-support-picture">
            <img src={StudentPicture} />
          </div>
          <div className="student-needs-support-text">
            <p className="student-needs-support-text-name">
              {`${data.firstName} ${data.lastName}`}
            </p>
            <p className="student-needs-support-text-problem text-color-grey">
              {intl.formatMessage({ id: `teacherDashboard.${area}` })}
            </p>
          </div>
          <div className="student-needs-support-progress-bar">
            <div className="student-needs-support-progress-bar-percentage">
              {Math.round(percentage * 100)}%
            </div>
            <IonProgressBar
              value={percentage}
              buffer={1}
              style={{
                "--background": percentage < 0.5 ? "#FFDAD2" : "#FFF3D3",
                "--progress-background":
                  percentage < 0.5 ? "#FF5708" : "#F1D100",
              }}
            ></IonProgressBar>
          </div>
        </IonItem>
      );
    default:
      return <>this should never show</>;
  }
};
