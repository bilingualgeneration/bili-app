import React from 'react';
import {
  IonInput,
  IonButton,
} from '@ionic/react';

const TeacherLogin: React.FC = () => {
  const handleTeacherLogin = () => {
    // Handle teacher login logic here
  };

  return (
    <>
      <h1>Welcome to Teacher Login Page</h1>
      <IonInput placeholder="Username" />
      <IonInput placeholder="Password" type="password" />
      <IonButton expand="block" onClick={handleTeacherLogin}>
        Login as Teacher
      </IonButton>
    </>
  );
};

export default TeacherLogin;