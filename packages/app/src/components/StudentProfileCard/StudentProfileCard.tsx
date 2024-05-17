import React, {FC} from "react";
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
    const {language} = useLanguageToggle();
    return (
      <div id="student-card" className="card-styles" style={{ }}>
        <img src={profileImage} alt="Card Image" className="card-image" />
        <div className="card-text">
          <h1 className="text-3xl semibold color-suelo">
            {language !== 'en' && nameEs}
	          {language === 'en' && nameEn}
          </h1>
          {language === 'esen' &&
            <p className="text-2xl color-barro subtitle">
                {nameEn}
            </p>
          }
        </div>
      </div>
    );
  };
