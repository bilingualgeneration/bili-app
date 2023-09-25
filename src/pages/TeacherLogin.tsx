import React from 'react';
import {
  IonInput,
  IonButton,
} from '@ionic/react';

const TeacherLogin: React.FC = () => {
  const handleTeacherLogin = () => {
    // Handle teacher login logic here
    // You can use state management or API calls to handle the login process for teachers
  };

  return (
    <>
      <IonInput placeholder="Username" />
      <IonInput placeholder="Password" type="password" />
      <IonButton expand="block" onClick={handleTeacherLogin}>
        Login as Teacher
      </IonButton>
    </>
  );
};

export default TeacherLogin;