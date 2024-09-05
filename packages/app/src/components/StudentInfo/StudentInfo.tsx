//A.M.
import React from "react";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";

interface StudentInfoProps {
  userId: string;
  userType: string;
  subtitle?: string;
  link?: string;
  size?: string;
}

//we need studentId, link - /classrooms/3GJTSWXuJ4NL3ZZpygF1/students/studentId
export const StudentInfo: React.FC<StudentInfoProps> = ({}) => {
  return (
    <div id="student-info-component">
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="12" sizeMd="4" className="ion-text-center">
            <img
              src={image}
              alt={studentName}
              style={{
                width: hasSubtitle ? "150px" : "200px", // different size if no subtitle
                height: hasSubtitle ? "150px" : "200px",
                borderRadius: "50%",
              }}
            />
          </IonCol>
          <IonCol size="12" sizeMd="8" className="ion-text-center">
            <IonText>
              <h2
                style={{
                  fontSize: hasSubtitle ? "1.5rem" : "2rem", // larger font if no subtitle
                  fontWeight: hasSubtitle ? "normal" : "bold",
                }}
              >
                {studentName}
              </h2>
              {hasSubtitle && (
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#666", // Optional: subtitle color
                  }}
                >
                  {subtitle}
                </p>
              )}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
