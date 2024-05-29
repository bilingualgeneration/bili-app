import React, { FC, useState } from "react";
import { PackHeader } from "@/components/PackHeader";
import { StudentProfileCard } from "@/components/StudentProfileCard";
import { useLanguageToggle } from '@/components/LanguageToggle';
import "./StudentProfile.scss";
import studentImage1 from "@/assets/icons/profile_image_1.svg";
import { IonCol, IonGrid, IonItem, IonItemDivider, IonRow } from "@ionic/react";


interface StudentCard {
  nameEn: string;
  nameEs: string;
  profileImage: string;
}

export const StudentProfile: FC = () => {
  const { language } = useLanguageToggle();
  const classroomName = "304";
  const isTeacherProfile = true;
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentCard | null>(null);

  const handleCardClick = (index: number, student: StudentCard) => {
    setSelectedCardIndex(index);
    setSelectedStudent(student);
    
    console.log("Selected student:", student);
  };


  const studentCards:StudentCard[] = [
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
      nameEn: "Jack M.",
      nameEs: "Jack M.",
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
        subtitleClassName="text-3xl color-english"
      />
      <div id = "student-profile" > 
        <div className="content-container">
          {isTeacherProfile &&
          <IonItem>
            <div className="heading-container">
              <h1 className="text-3xl semibold">
                {language !== 'en' && `Aula ${classroomName} clase`}
                {language === 'en' && `Classroom ${classroomName} Class`}
              </h1>
            </div>
          </IonItem>

          }
          
          <IonGrid className="table-cards">
            <IonRow class="ion-align-items-center">
              {studentCards.map((student, index) => (
                <IonCol 
                  key={index} 
                  size-xl="2" 
                  size-sm="3"
                  className={`student-card${selectedCardIndex === index ? '-selected' : ''}`}
                  onClick={() => handleCardClick(index,student)}
                >
                  <StudentProfileCard
                    nameEn={student.nameEn}
                    profileImage={student.profileImage}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>

    </>
  );
};
