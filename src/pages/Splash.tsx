import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
// import './Splash.css';

const Splash: React.FC = () => {
  console.log('Rendering Splash component');
    return (
	<>
	<IonButton routerLink="/sign-up" className="sign-up-button">Sign Up</IonButton>
	{/* <IonButton expand="full" routerLink="/sign-in" className="sign-in-button">Sign In</IonButton> */}
	</>
  );
};

export default Splash;

