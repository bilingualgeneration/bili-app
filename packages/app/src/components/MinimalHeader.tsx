import { BackButton } from "@/components/BackButton/BackButton";
import { IonContent, IonPage } from "@ionic/react";

export const MinimalHeader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <IonPage>
        <IonContent
          fullscreen={true}
          className="ion-padding background-figures"
        >
          <div
            className="page-wrapper"
            style={{ background: "white", position: "relative", padding: 0 }}
          >
            <div
              style={{ position: "absolute", left: 10, top: 24, zIndex: 999 }}
            >
              <BackButton />
            </div>
            {children}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};
