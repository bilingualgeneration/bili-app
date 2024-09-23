import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { SideMenu } from "@/components/Settings/SideMenu";
import {
  TeacherDashboardHeader,
  TeacherDashboardLayout,
} from "./TeacherDashboardLayout";

export const TeacherDashboardLayoutWithSideMenu: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
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
