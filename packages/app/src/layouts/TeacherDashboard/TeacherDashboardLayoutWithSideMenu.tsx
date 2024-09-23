import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { SideMenu } from "@/components/Settings/SideMenu";

export const TeacherDashboardLayoutWithSideMenu: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="2" style={{ minHeight: "100vh" }}>
          <SideMenu />
        </IonCol>
        <IonCol size="10">{children}</IonCol>
      </IonRow>
    </IonGrid>
  );
};
