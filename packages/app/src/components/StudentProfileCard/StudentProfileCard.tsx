import React, { FC } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { Avatar } from "@/components/Avatar";
import "./StudentProfileCard.scss";
import { IonText } from "@ionic/react";

interface StudentCardProps {
  id: string;
  nameEn: string;
  onClick?: () => void;
}

export const StudentProfileCard: FC<StudentCardProps> = ({
  id,
  nameEn,
  onClick,
}) => {
  const { language } = useLanguageToggle();
  return (
    <div className="student-profile-card" onClick={onClick}>
      <Avatar id={id} size="lg" />
      <IonText>
        <p className="text-xl semibold color-suelo">{nameEn}</p>
      </IonText>
    </div>
  );
};
