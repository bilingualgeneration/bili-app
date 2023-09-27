import React from 'react';
import { IonPage } from "@ionic/react";

interface StoriesProps {
  id: string; // Define the id prop
}

const Stories: React.FC<StoriesProps> = ({ id }) => {
  return (
    <IonPage>
      {/* Use id prop as needed */}
      <h1>Story ID: {id}</h1>
    </IonPage>
  );
}

export default Stories;