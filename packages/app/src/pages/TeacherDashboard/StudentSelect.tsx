import { useCallback, useState } from "react";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { PackHeader } from "@/components/PackHeader";
import { StudentProfileCard } from "@/components/StudentProfileCard";
import { useLanguageToggle } from "@/components/LanguageToggle";
import "./StudentSelect.css";
import studentImage1 from "@/assets/icons/profile_image_1.svg";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useStudent } from "@/hooks/Student";
import { useParams } from "react-router";
import { useI18n } from "@/hooks/I18n";
import { Avatar } from "@/components/Avatar";

interface StudentCard {
  firstName: string;
  lastName: string;
  profileImage: string;
}

export const StudentSelect: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <FirestoreDocProvider
      collection="classroom"
      id={classroomId}
      populate={{
        student: ["classroom", "array-contains", classroomId],
      }}
    >
      <StudentSelectLoader />
    </FirestoreDocProvider>
  );
};

const StudentSelectLoader: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      return (
        <StudentSelectHydrated
          classroomName={data.name}
          students={data.student}
        />
      );
      break;
    default:
      return <>default case</>;
      break;
  }

  return <></>;
};

const StudentSelectHydrated: React.FC<any> = ({ classroomName, students }) => {
  const { id: currentStudentId, setInfo } = useStudent();
  const history = useHistory();
  const { getText } = useI18n();
  const { language } = useLanguageToggle();
  const isTeacherProfile = true;

  const handleCardClick = useCallback(
    (index: number) => {
      setInfo(students[index]);
      history.push("/student-dashboard");
    },
    [setInfo, history],
  );
  return (
    <>
      <PackHeader
        bannerColor="#FFF8F0"
        id="teacherDashboard.selectStudent.title"
        titleClassName="text-5xl color-suelo"
        subtitleClassName="text-3xl color-english"
      />
      <div id="student-profile">
        <div className="content-container">
          {isTeacherProfile && (
            <div className="margin-bottom-2">
              <h1 className="text-3xl semibold">
                {language !== "en" && classroomName}
                {language === "en" && classroomName}
              </h1>
            </div>
          )}

          <hr />

          <IonGrid>
            <IonRow class="ion-align-items-center">
              {students.map(
                ({ id, firstName, lastName }: any, index: number) => (
                  <StudentProfileCard
                    id={id}
                    nameEn={`${firstName} ${lastName[0]}.`}
                    onClick={() => handleCardClick(index)}
                  />
                ),
              )}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
