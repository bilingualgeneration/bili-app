import React from 'react';
import UnauthedLayout from '../layouts/Unauthed';
import {
  IonContent,
  IonInput,
  IonButton,
} from '@ionic/react';

const ResetPassword: React.FC = () => {
  // Add password reset logic here

  const handleResetPassword = () => {
    // Implement the password reset logic here
  };

  return (
    <UnauthedLayout>
      <IonContent className="ion-padding">
        <p>Enter your email address to reset your password:</p>
        <IonInput placeholder="Email" />
        <IonButton expand="block" onClick={handleResetPassword}>
          Reset Password
        </IonButton>
      </IonContent>
    </UnauthedLayout>
  );
};

export default ResetPassword;