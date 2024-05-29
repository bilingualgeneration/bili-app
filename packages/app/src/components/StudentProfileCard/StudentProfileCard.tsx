import React, { FC } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./StudentProfileCard.scss";

interface StudentCardProps {

  nameEn: string;
  profileImage: string;
}

export const StudentProfileCard: FC<StudentCardProps> = ({
  nameEn,
  profileImage
}) => {
  const { language } = useLanguageToggle();
  return (
    <div className="student-profile-card">
      <img src={profileImage} alt="Card Image" className="card-image" />
        
        <h1 className="text-xl semibold color-suelo">
          {nameEn}
        </h1>
       
    </div>

  );
};
