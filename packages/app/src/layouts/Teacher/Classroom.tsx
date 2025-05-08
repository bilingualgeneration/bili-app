// TODO: migrate to ion-split-pane

import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { DashboardMenu } from "@/components/DashboardMenu";
import { TeacherHeader, TeacherLayout } from "./Teacher";
import { Redirect, useParams } from "react-router-dom";
import { useOldProfile } from "@/hooks/OldProfile";

export const TeacherClassroomLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const { profile, isLoggedIn } = useOldProfile();

  if (!isLoggedIn || profile?.role !== "teacher") {
    return <Redirect to="/" />;
  }

  return (
    <FirestoreDocProvider
      collection="classroom"
      id={classroomId}
      populate={{
        classroomAnalytics: ["classroom", "==", classroomId],
      }}
    >
      <TeacherClassroomLayoutLoader children={children} />
    </FirestoreDocProvider>
  );
};

const TeacherClassroomLayoutLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "errorx":
      return <Redirect to="/classrooms" />;
      break;
    case "ready":
      return <TeacherClassroomLayoutHydrated children={children} />;
      break;
    default:
      return <>default case</>;
      break;
  }
};

const TeacherClassroomLayoutHydrated: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { classroomId } = useParams<any>();
  return (
    <TeacherLayout showHeader={false}>
      <IonGrid>
        <IonRow>
          <IonCol size="2" style={{ minHeight: "100vh" }}>
            <DashboardMenu />
          </IonCol>
          <IonCol size="10">
            <TeacherHeader />
            {children}
          </IonCol>
        </IonRow>
      </IonGrid>
    </TeacherLayout>
  );
};
