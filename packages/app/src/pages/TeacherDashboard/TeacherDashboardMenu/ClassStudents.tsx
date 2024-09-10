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
import { Link } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";
import "./ClassStudents.scss";

export const ClassStudents: React.FC = () => {
  const studentsData = [
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "support recommended",
      homeAccount: "active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "support recommended",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "needs support",
      homeAccount: "active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "on track",
      homeAccount: "not active",
    },
  ];

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
                  Overview
                </IonText>
              </div>
              <div className="students-header-block">
                <IonText className="text-3xl semibold">{"Students"}</IonText>
                <button className="add-students-button">
                  <IonIcon icon={addSharp}></IonIcon>
                  <Link to={`/classrooms/add`} className="no-underline">
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
            <IonCol className="text-md semibold">Caregiver Name</IonCol>
            <IonCol className="text-md semibold">
              Primary Carergiver Email
            </IonCol>
            <IonCol className="text-md semibold">Needs More Support</IonCol>
            <IonCol className="text-md semibold">Home Account</IonCol>
          </IonRow>
          {studentsData.map((student, index) => (
            <IonRow className="ion-align-items-center class-student-table-body-row">
              <IonCol key={index}>
                <StudentInfo userId={""} userType={""} link="/classrooms/add" />
              </IonCol>
              <IonCol>
                <IonText>
                  <p className="text-sm">{student.caregiverName}</p>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  <p className="text-sm">{student.primaryCaregiverEmail}</p>
                </IonText>
              </IonCol>
              <IonCol>
                <IonText
                  className="student-needs-support-text text-sm-xs semibold"
                  style={{
                    background:
                      student.needsMoreSupport === "on track"
                        ? "var(--Cielo-Low)"
                        : student.needsMoreSupport === "needs support"
                          ? "var(--Habanero-Habanero)"
                          : student.needsMoreSupport === "support recommended"
                            ? "var(--Sol)"
                            : "transparent",
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
      {/* banner */}
      <div className="class-overview-blog-styles">
        <IonCard className="card-blog">
          <div>
            <IonGrid>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
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
      </div>
    </div>
  );
};
