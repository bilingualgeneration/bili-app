import React from "react";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { Avatar, AvatarSize } from "@/components/Avatar";
import { FullName } from "@/hooks/Names";

interface StudentInfoProps {
  uid: string;
  userType: string;
  subtitle?: string;
  link?: string;
  size?: AvatarSize;
}

export const StudentInfo: React.FC<StudentInfoProps> = ({
  uid,
  userType,
  subtitle,
  link,
  size = "md",
}) => {
  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol size="auto" style={{ paddingRight: 8 }}>
          {/* temporary image */}
          <Avatar uid={uid} size={size} />
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
              <span className="text-sm">
                <FullName uid={uid} type="user" />
              </span>
            )}

            {/* Subtitle, displayed when provided */}
            {subtitle && <p style={{}}>{"subtitle"}</p>}
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
