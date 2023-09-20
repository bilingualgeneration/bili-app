// page for teachers to login separately

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/react';

const TeacherLogin: React.FC = () => {
  const handleTeacherLogin = () => {
    // Handle teacher login logic here
    // You can use state management or API calls to handle the login process for teachers
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Teacher Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" />
        <IonInput placeholder="Password" type="password" />
        <IonButton expand="block" onClick={handleTeacherLogin}>
          Login as Teacher
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TeacherLogin;