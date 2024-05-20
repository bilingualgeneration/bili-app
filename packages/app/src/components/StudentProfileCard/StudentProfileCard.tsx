import React, { FC } from "react";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./StudentProfileCard.scss";

interface StudentCardProps {

  nameEn: string;
  nameEs: string;
  profileImage: string;
}

export const StudentProfileCard: FC<StudentCardProps> = ({
  nameEn,
  nameEs,
  profileImage
}) => {
  const { language } = useLanguageToggle();
  return (
    <div className="student-profile-card">
      <img src={profileImage} alt="Card Image" className="card-image" />
        
        <h1 className="text-xl semibold color-suelo">
          {language !== 'en' && nameEs}
          {language === 'en' && nameEn}
        </h1>
        {language === 'esen' &&
          <p className="text-xl color-barro subtitle">
            {nameEn}
          </p>
        }
    </div>

  );
};
