import React, { useState } from 'react';
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
import UserTypePopover from './UserTypePopover'; // Import the UserTypePopover component
import LayoutHOC from '../layouts/LayoutHOC'; // Import the LayoutHOC

const handleLogin = () => {
  // Add login logic here
  // Can use state management or API calls to handle the login process
};

// Define your layoutProps object with the desired layout settings
const layoutProps = {
  headerTitle: 'Login', // Set the header title
  showSidebar: false, // Set to true if you have a sidebar
  theme: 'light', // Choose your desired theme
  // Add more layout props as needed
};

// Wrap your Login component with LayoutHOC and pass layoutProps
const Login: React.FC = () => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const openPopover = () => {
    setPopoverIsOpen(true);
  };

  const closePopover = () => {
    setPopoverIsOpen(false);
  };

  const handleTeacherSelected = () => {
    // Handle teacher selection here
    // You can navigate to the teacher login page or perform any other action
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{layoutProps.headerTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" onFocus={openPopover} />
        <IonInput placeholder="Password" type="password" />
        <IonButton expand="block" onClick={handleLogin}>
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
        <UserTypePopover
          isOpen={popoverIsOpen}
          onDismiss={closePopover}
          onTeacherSelected={handleTeacherSelected}
        />
      </IonContent>
    </IonPage>
  );
};

// Wrap Login with LayoutHOC and pass layoutProps
export default LayoutHOC(Login, layoutProps);

