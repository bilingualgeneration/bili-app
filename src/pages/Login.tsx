import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonRouterLink,
} from '@ionic/react';
import './Login.css'; // For future CSS


const handleLogin = () => {
  // Add login logic here
  // Can use state management or API calls to handle the login process
};

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" />
        <IonInput placeholder="Password" type="password" />
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>

        {/* Add a link to the password reset page */}
        <IonRouterLink routerLink="/reset-password">Forgot Password?</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Login;
