import React from 'react';
import { IonContent, IonPage, IonToolbar, IonTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import UnauthedLayout from '../layouts/Unauthed'; // Import the Unauthed layout component

const Home: React.FC = () => {
  return (
    <UnauthedLayout>
      <IonPage>
        <IonContent fullscreen>
          {/* Page content */}
          <ExploreContainer />
        </IonContent>
      </IonPage>
    </UnauthedLayout>
  );
};

export default Home;
