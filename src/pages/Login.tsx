import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonRouterLink,
} from '@ionic/react';

const handleLogin = () => {
  // Add login logic here
  // Can use state management or API calls to handle the login process
};

const Login: React.FC = () => {

  const handleTeacherSelected = () => {
    // Handle teacher selection here
    // You can navigate to the teacher login page or perform any other action
  };

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

      {/* OPTION 2: Prompt user to confirm or deny they are a teacher via popup */}
      {/* Render the UserTypePopover component */}
      {/* Passing functions from UserTypePopover.tsx as props */}
    </>
  );
};

export default Login;

