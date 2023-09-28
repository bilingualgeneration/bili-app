import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Journeys: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Journeys</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h1>Welcome to Journeys Page</h1>
          {/* Add your content here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Journeys;