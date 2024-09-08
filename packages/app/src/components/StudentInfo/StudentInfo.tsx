//A.M.
import React from "react";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import StudentImage from "@/assets/img/student_img.png";
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
        <IonRow className="">
          <IonCol size="" className="ion-text-center">
            {/* temporary image */}
            <img src={StudentImage} alt="student-image" style={{}} />
          </IonCol>
          <IonCol size="" className="ion-text-center">
            <IonText>
              {/* temporary name */}
              <p>{"Mattie Blooman"}</p>
              {subtitle && <p style={{}}>{"subtitle"}</p>}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};
