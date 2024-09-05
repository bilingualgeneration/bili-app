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

export const StudentInfo: React.FC<StudentInfoProps> = ({
  userId,
  userType,
  subtitle,
  link,
  size,
}) => {
  return (
    <div id="student-info-component">
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="12" sizeMd="4" className="ion-text-center">
            <img src={""} alt={"studentName"} style={{}} />
          </IonCol>
          <IonCol size="12" sizeMd="8" className="ion-text-center">
            <IonText>
              <h2>{"studentName"}</h2>
              {subtitle && (
                <p
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {"subtitle"}
                </p>
              )}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
