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
import "./ClassStudents.scss";
import { Link } from "react-router-dom";
import { StudentInfo } from "@/components/StudentInfo";

export const ClassStudents: React.FC = () => {
  const studentsData = [
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "no support needed",
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
      needsMoreSupport: "no support needed",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "no support needed",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "no support needed",
      homeAccount: "not active",
    },
    {
      studentName: "John Doeeeeeee",
      caregiverName: "Michel Doeeeeee",
      primaryCaregiverEmail: "john.doe@example.com",
      needsMoreSupport: "no support needed",
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
      needsMoreSupport: "no support needed",
      homeAccount: "not active",
    },
  ];

  return (
    <div id="teacher-dashboard-students">
      {/* header text */}
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
      <div className="class-students-table">
        <IonGrid>
          <IonRow>
            <IonCol>Student Name</IonCol>
            <IonCol>Caregiver Name</IonCol>
            <IonCol>Primary Carergiver Email</IonCol>
            <IonCol>Needs More Support</IonCol>
            <IonCol>Home Account</IonCol>
          </IonRow>
          {studentsData.map((student, index) => (
            <IonRow>
              <IonCol key={index}>
                <StudentInfo userId={""} userType={""} />
              </IonCol>
              <IonCol>
                <IonText>{student.caregiverName}</IonText>
              </IonCol>
              <IonCol>
                <IonText>{student.primaryCaregiverEmail}</IonText>
              </IonCol>
              <IonCol>
                <IonText>{student.needsMoreSupport}</IonText>
              </IonCol>
              <IonCol>
                <IonText>{student.homeAccount}</IonText>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </div>
    </div>
  );
};
