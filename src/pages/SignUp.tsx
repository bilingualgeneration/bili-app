import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
  } from "@ionic/react";
  import React, { useState } from "react";
  
  const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const handleSignup = () => {
      console.log("Email: ", email);
      console.log("Password: ", password);
      //signup logic here
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign Up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>
            <IonButton expand="block" type="button" onClick={handleSignup}>
              Sign Up
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SignUp;