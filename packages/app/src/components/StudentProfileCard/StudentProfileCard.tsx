import React, { FC } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { Avatar } from "@/components/Avatar";
import "./StudentProfileCard.scss";

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
    <div className="student-card" onClick={onClick}>
      <Avatar id={id} size="lg" />
      <p>{nameEn}</p>
    </div>
  );
};
