import React, {FC} from "react";
import { PackHeader } from "@/components/PackHeader";
import {StudentProfileCard} from "@/components/StudentProfileCard";
import {useLanguageToggle} from '@/components/LanguageToggle';
import "./StudentProfile.scss";
import studentImage1 from "@/assets/icons/profile_image_1.svg";


export const StudentProfile: FC = () => {
  const {language} = useLanguageToggle();
  
  const studentCards = [
    {
      nameEn: "Michel M.",
      nameEs: "Michel M.",
      profileImage: studentImage1
    },
    
    {
      nameEn: "Michel M.",
      nameEs: "Michel M.",
      profileImage: studentImage1
    },

    {
      nameEn: "Michel M.",
      nameEs: "Michel M.",
      profileImage: studentImage1
    },

    {
      nameEn: "Michel M.",
      nameEs: "Michel M.",
      profileImage: studentImage1
    },

    {
      nameEn: "Michel M.",
      nameEs: "Michel M.",
      profileImage: studentImage1
    },

  ];

    return (
      <>
        <PackHeader 
	        bannerColor="#FFF8F0"
          title={language === 'en' ? 'Select your profile' : 'Selecciona tu perfil'}
          subtitle="Select your profile."
          titleClassName="text-5xl color-suelo"
          subtitleClassName="text-3xl color-english semibold"
        />
        <div className="content-container">   
          <div className="heading-container">
            <h1 className="text-6xl bold carousel-header-margin">
	      {language !== 'en' && 'Nuevas funciones en camino'}
	      {language === 'en' && 'New features on the way'}
            </h1>
            {language === 'esen' &&
              <p className="text-4xl color-english">
                New features on the way
              </p>
            }
          </div>

          
        </div>
        <StudentProfileCard nameEn={""} nameEs={""} profileImage={""}/>
      </>
    );
};
