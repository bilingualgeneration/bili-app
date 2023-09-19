import React from 'react'
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Splash.css';

const Splash: React.FC = () => {
  console.log('Rendering Splash component');
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Bili</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonButton routerLink="/sign-up" className="sign-up-button">Sign Up</IonButton>
        {/* <IonButton expand="full" routerLink="/sign-in" className="sign-in-button">Sign In</IonButton> */}
        
      </IonContent>
    </IonPage>
  );
};

export default Splash;

