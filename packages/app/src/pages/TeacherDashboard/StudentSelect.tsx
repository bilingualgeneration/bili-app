import { useCallback, useState } from "react";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { PackHeader } from "@/components/PackHeader";
import { StudentProfileCard } from "@/components/StudentProfileCard";
import { useLanguageToggle } from '@/components/LanguageToggle';
import "./StudentSelect.css";
import studentImage1 from "@/assets/icons/profile_image_1.svg";
import { IonCol, IonGrid, IonItem, IonItemDivider, IonRow } from "@ionic/react";
import {useClassroom} from '@/hooks/Classroom';
import { useHistory } from 'react-router-dom';
import {useStudent} from '@/hooks/Student';
import { useParams } from "react-router";


interface StudentCard {
  firstName: string;
  lastName: string;
  profileImage: string;
}

export const StudentSelect: React.FC = () => {
  const { classroomId } = useParams<{classroomId: string}>();
  return <FirestoreDocProvider
	   collection='classroom'
	   id={classroomId}
	   populate={{
	     'student': ['classroom', 'array-contains', classroomId]
	   }}
	 >
    <StudentSelectLoader />
  </FirestoreDocProvider>;
}

const StudentSelectLoader: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch(status){
    case 'loading':
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      return <StudentSelectHydrated
	       classroomName={data.name}
	       students={data.student}
      />;
      break;
    default:
      return <>default case</>;
      break;
  }

  return <>
  </>;
};

const StudentSelectHydrated: React.FC<any> = ({
  //classroomName,
  students,
}) => {
  const {name: classroomName} = useClassroom();
  const {
    id: currentStudentId,
    setInfo,
  } = useStudent();
  const history = useHistory();
  const { language } = useLanguageToggle();
  const isTeacherProfile = true;

  const handleCardClick = useCallback((index: number) => {
    setInfo(students[index]);
    history.push('/student-dashboard');
  }, [setInfo, history]);

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
                {language !== 'en' && classroomName}
                {language === 'en' && classroomName}
              </h1>
            </div>
          </IonItem>

          }
          
          <IonGrid className="table-cards">
            <IonRow class="ion-align-items-center">
              {students.map(({id, firstName, lastName, profilePic}: any, index: number) => (
                <IonCol 
                  key={index} 
                  size-xl="2" 
                  size-sm="3"
                  className={`student-card${currentStudentId === id ? '-selected' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <StudentProfileCard
                    nameEn={`${firstName} ${lastName[0]}.`}
                    profileImage={profilePic || studentImage1}
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
