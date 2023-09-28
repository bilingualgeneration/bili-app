import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Splash: React.FC = () => {
  console.log('Rendering Splash component');
    return (
	<>
		<h1>Welcome to Splash Page</h1>
		<IonButton routerLink="/sign-up" className="sign-up-button" data-cy="sign_up">Sign Up</IonButton>
		<IonButton routerLink="/login" className="sign-in-button" data-cy="sign_in">Sign In</IonButton>
	</>
  );
};

export default Splash;

