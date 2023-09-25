import React from 'react';
import UnauthedLayout from '../layouts/Unauthed';
import {
  IonContent,
  IonInput,
  IonButton,
} from '@ionic/react';

const TeacherLogin: React.FC = () => {
  const handleTeacherLogin = () => {
    // Handle teacher login logic here
    // You can use state management or API calls to handle the login process for teachers
  };

  return (
    <UnauthedLayout>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" />
        <IonInput placeholder="Password" type="password" />
        <IonButton expand="block" onClick={handleTeacherLogin}>
          Login as Teacher
        </IonButton>
      </IonContent>
    </UnauthedLayout>
  );
};

export default TeacherLogin;