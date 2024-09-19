//A.M.
import React from "react";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import StudentImage from "@/assets/img/student_img.png";
import "./StudentInfo.scss";

interface StudentInfoProps {
  userId: string;
  userType: string;
  subtitle?: string;
  link?: string;
  size: string;
}

// TODO: might need to update props

export const StudentInfo: React.FC<StudentInfoProps> = ({
  userId,
  userType,
  subtitle,
  link,
  size,
}) => {
  return (
    <IonGrid>
      <IonRow id="student-info-row" className="ion-align-items-center">
        <IonCol size="auto" className="image-column-padding">
          {/* temporary image */}
          <img
            src={StudentImage}
            className={`student-info-img-${size}`}
            alt="student-image"
          />
        </IonCol>
        <IonCol size="auto" className="ion-no-padding">
          <IonText>
            {/* If a link is provided, render the name as a link, otherwise as plain text */}
            {/* temporary name */}
            {link ? (
              <a
                href={link}
                className="text-sm semibold color-selva"
                style={{ textDecoration: "none" }}
              >
                {"Mattie Blooman"}
              </a>
            ) : (
              <p className="text-sm">{"Mattie Blooman"}</p>
            )}

            {/* Subtitle, displayed when provided */}
            {subtitle && <p style={{}}>{"subtitle"}</p>}
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
