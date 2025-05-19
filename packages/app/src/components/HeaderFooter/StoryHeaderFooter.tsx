import { IonGrid, IonRow, IonCol, IonPage, IonContent } from "@ionic/react";
import { BackButton } from "@/components/BackButton";
import { ProfileChip } from "@/components/ProfileChip";
import "./StoryHeaderFooter.scss";

export const StoryHeaderFooter: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => (
  <IonPage>
    <IonContent fullscreen className="story-page-wrapper">
      <IonGrid className="story-header">
        <IonRow className="ion-align-items-center ion-justify-content-between">
          <IonCol size="auto">
            <BackButton />
          </IonCol>
          <IonCol size="auto" className="profile-chip-container">
            <ProfileChip size="minimal" />
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className="story-content">{children}</div>
    </IonContent>
  </IonPage>
);
