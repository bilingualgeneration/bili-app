import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonRouterLink,
} from '@ionic/react';
import {useAuth} from '../contexts/useAuth';

const Login: React.FC = () => {

  return (
    <>
      {/* Content of the login page */}
      <IonInput placeholder="Username"/>
      <IonInput placeholder="Password" type="password" />
      <IonButton expand="block" routerLink="/student-dashboard" className="login-button">
        Login
      </IonButton>

      {/* Add a link to the password reset page */}
      <IonRouterLink id="reset-password-link" routerLink="/reset-password">
        Forgot Password?
      </IonRouterLink>

      {/* OPTION 1: Have teacher login link displayed from the beginning next to 'Forgot Password?' */}
      <IonRouterLink routerLink="/teacher-login">I'm a teacher</IonRouterLink>
    </>
  );
};

export default Login;

