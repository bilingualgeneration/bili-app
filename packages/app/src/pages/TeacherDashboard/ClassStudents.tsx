//A.M.
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
  IonText,
} from "@ionic/react";
import { addOutline, addSharp } from "ionicons/icons";
import ArrowRight from "@/assets/icons/arrow-right-grey.svg";
import StudentsReadingPicture from "@/assets/img/kids_reading.png";
import { Link, useParams } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";
import "./ClassStudents.scss";

export const ClassStudents: React.FC = () => {
  const studentsData = [
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "support recommended",
      homeAccount: "active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "support recommended",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@example.com",
      needsMoreSupport: "needs support",
      homeAccount: "active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
    {
      studentName: "John Doeeeeeee",
      primaryHomeEmail: "Michel Doeeeeee",
      secondaryHomeEmail: "john.doe@exampleeeeeeeeeeeee.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
      studentId: "U73tqRtJ5bmeTcnxsfca",
    },
  ];
  const { classroomId } = useParams<{ classroomId: string }>();

  return (
    <div id="teacher-dashboard-students">
      {/* header */}
      <div className="class-students-header">
        <IonItem>
          <IonLabel>
            <div className="header-overview-row">
              <div className="header-overview-arrow">
                <IonText className="text-sm color-barro classroom-name-text">
                  {"1-st grade Spanish"}
                </IonText>
                <IonIcon color="medium" icon={ArrowRight}></IonIcon>
                <IonText className="text-sm semibold overview-text-header">
                  Students
                </IonText>
              </div>
              <div className="students-header-block">
                <IonText className="text-3xl semibold">{"Students"}</IonText>
                <button className="add-students-button">
                  <IonIcon icon={addSharp}></IonIcon>
                  <Link
                    to={`/classrooms/:classroomId/add_students`}
                    className="no-underline"
                  >
                    <p className="text-sm semibold color-nube">Add students</p>
                  </Link>
                </button>
              </div>
            </div>
          </IonLabel>
        </IonItem>
      </div>
      {/* table */}
      <div className="class-students-table">
        <IonGrid className="class-students-table-grid">
          <IonRow className="class-student-table-header-row">
            <IonCol className="text-md semibold">Student Name</IonCol>
            <IonCol className="text-md semibold">Primary home email</IonCol>
            <IonCol className="text-md semibold">Secondary home email</IonCol>
            <IonCol className="text-md semibold">Needs More Support</IonCol>
            <IonCol className="text-md semibold">Home Account</IonCol>
          </IonRow>
          {studentsData.map((student, index) => (
            <IonRow
              className="ion-align-items-center class-student-table-body-row"
              key={index}
            >
              <IonCol>
                <StudentInfo
                  userId={""}
                  userType={""}
                  link={`/classrooms/view/${classroomId}/students/view/${student.studentId}`}
                  size="xs"
                />
              </IonCol>
              <IonCol>
                <IonText>
                  <p className="text-sm">
                    {student.primaryHomeEmail.length > 23
                      ? `${student.primaryHomeEmail.slice(0, 23)}...`
                      : student.primaryHomeEmail}
                  </p>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <p className="text-sm">
                    {student.secondaryHomeEmail.length > 23
                      ? `${student.secondaryHomeEmail.slice(0, 23)}...`
                      : student.secondaryHomeEmail}
                  </p>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText
                  className="student-needs-support-text text-sm-xs semibold"
                  style={{
                    background:
                      student.needsMoreSupport.toLowerCase() === "on track"
                        ? "var(--Cielo-Low)"
                        : student.needsMoreSupport.toLowerCase() ===
                            "needs support"
                          ? "var(--Habanero-Habanero)"
                          : student.needsMoreSupport.toLowerCase() ===
                              "support recommended"
                            ? "var(--Sol)"
                            : "gray",
                    textTransform: "uppercase",
                  }}
                >
                  {student.needsMoreSupport}
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <p className="text-sm">{student.homeAccount}</p>
                </IonText>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </div>
      {/* banner temporary commented out*/}

      {/* <div className="class-students-banner-styles">
        <IonCard className="card-blog">
          <div>
            <IonGrid>
              <IonRow class="ion-align-items-center banner-row">
                <IonCol size="1">
                  <img src={StudentsReadingPicture} alt="" />
                </IonCol>
                <IonCol>
                  <p className="text-xl semibold color-suelo">
                    Alert banner of some sort
                  </p>
                  <p>Get notified when students need help!</p>
                </IonCol>
                <IonCol size="2" className="button-column">
                  <button className="get-notified-button">
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
      </div> */}
    </div>
  );
};
