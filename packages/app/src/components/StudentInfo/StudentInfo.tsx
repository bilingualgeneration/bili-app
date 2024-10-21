import React from "react";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { Avatar, AvatarSize } from "@/components/Avatar";
import { FullName } from "@/hooks/Names";
import { Link } from "react-router-dom";

interface StudentInfoProps {
  id: string;
  type: string;
  subtitle?: string;
  link?: string;
  size?: AvatarSize;
}

export const StudentInfo: React.FC<StudentInfoProps> = ({
  id,
  type,
  subtitle,
  link,
  size = "md",
}) => {
  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol size="auto" style={{ paddingRight: 8 }}>
          {/* temporary image */}
          <Avatar id={id} size={size} />
        </IonCol>
        <IonCol size="auto" className="ion-no-padding">
          <IonText>
            {/* If a link is provided, render the name as a link, otherwise as plain text */}
            {/* temporary name */}
            {link ? (
              <Link
                to={link}
                className="text-sm semibold color-selva no-text-decoration"
              >
                <FullName id={id} type={type} />
              </Link>
            ) : (
              <span className="text-sm">
                <FullName id={id} type={type} />
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
