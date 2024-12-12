import { Avatar } from "@/components/Avatar";
import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { PackHeader } from "@/components/PackHeader";
import { StudentProfileCard } from "@/components/StudentProfileCard";

import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useI18n } from "@/hooks/I18n";
import { useParams } from "react-router";
import { useStudent } from "@/hooks/Student";
import { useProfile } from "@/hooks/Profile";

import "./StudentSelect.scss";

interface StudentCard {
  firstName: string;
  lastName: string;
  profileImage: string;
}

export const StudentSelect: React.FC = () => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const {
    user: { uid },
  } = useProfile();
  if (classroomId === undefined) {
    // logging in as a caregiver
    return (
      <FirestoreCollectionProvider
        collection="student"
        filters={[["caregiver", "array-contains", uid]]}
      >
        <HomeLoader />
      </FirestoreCollectionProvider>
    );
  } else {
    // logging in as a teacher
    return (
      <FirestoreDocProvider
        collection="classroom"
        id={classroomId}
        populate={{
          student: ["classroom", "array-contains", classroomId],
        }}
      >
        <ClassroomLoader />
      </FirestoreDocProvider>
    );
  }
};

const HomeLoader: React.FC = () => {
  const { status, data } = useFirestoreCollection();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      return <StudentSelectHydrated students={data} />;
      break;
    default:
      return <>default case</>;
      break;
  }

  return <></>;
};

const ClassroomLoader: React.FC = () => {
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
        className="color-suelo"
        id="teacherDashboard.selectStudent.title"
      />
      <div id="student-profile">
        <div className="content-container">
          {isTeacherProfile && (
            <div className="margin-bottom-2">
              <h1 className="text-3xl semibold">{classroomName}</h1>
            </div>
          )}

          <hr />

          <IonGrid>
            <IonRow class="ion-align-items-center">
              {students.map(
                ({ id, firstName, lastName }: any, index: number) => (
                  <div
                    key={id}
                    className={`${
                      currentStudentId === id
                        ? "student-card-selected"
                        : "student-card"
                    }`}
                    onClick={() => handleCardClick(index)}
                  >
                    <StudentProfileCard
                      id={id}
                      nameEn={`${firstName} ${lastName[0]}.`}
                    />
                  </div>
                ),
              )}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};
