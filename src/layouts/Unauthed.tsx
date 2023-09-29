import React from 'react';
import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar
  } from '@ionic/react';
  
  interface UnauthedLayoutProps {
    children?: React.ReactNode; // Define children as an optional ReactNode
  }
  
  const UnauthedLayout: React.FC<UnauthedLayoutProps> = ({
    children
  }) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Welcome to Bili</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          {children}
        </IonContent>
      </IonPage>
    );
  }
  
  export default UnauthedLayout;  
