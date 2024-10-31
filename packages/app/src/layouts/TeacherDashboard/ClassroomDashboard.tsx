import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { SideMenu } from "@/components/Settings/SideMenu";
import {
  TeacherDashboardHeader,
  TeacherDashboardLayout,
} from "./TeacherDashboardLayout";
import { Redirect, useParams } from "react-router-dom";

export const ClassroomDashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { classroomId } = useParams<{ classroomId: string }>();
  return (
    <FirestoreDocProvider
      collection="classroom"
      id={classroomId}
      populate={{
        classroomAnalytics: ["classroom", "==", classroomId],
      }}
    >
      <ClassroomDashboardLayoutLoader children={children} />
    </FirestoreDocProvider>
  );
};

const ClassroomDashboardLayoutLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <Redirect to="/classrooms" />;
      break;
    case "ready":
      return <ClassroomDashboardLayoutHydrated children={children} />;
      break;
    default:
      return <>default case</>;
      break;
  }
};

const ClassroomDashboardLayoutHydrated: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { classroomId } = useParams<any>();
  return (
    <TeacherDashboardLayout showHeader={false}>
      <IonGrid className="ion-no-padding">
        <IonRow>
          <IonCol size="2" style={{ minHeight: "100vh" }}>
            <SideMenu />
          </IonCol>
          <IonCol size="10">
            <TeacherDashboardHeader />
            {children}
          </IonCol>
        </IonRow>
      </IonGrid>
    </TeacherDashboardLayout>
  );
};
