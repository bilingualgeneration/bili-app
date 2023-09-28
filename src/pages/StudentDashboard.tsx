import React from 'react';
import { IonButton, IonItem } from '@ionic/react';

const StudentDashboard: React.FC = () => {
  return (
    <>
      <h1>Welcome to Student Dashboard Page</h1>

      <IonButton expand="block" routerLink="/journeys">
        Journeys
      </IonButton>
      <IonButton expand="block" routerLink="/explore">
        Explore
      </IonButton>
      <IonButton expand="block" routerLink="/wellness-carousel" className="wellness-carousel-button">
        Wellness Carousel
      </IonButton>
      <IonButton expand="block" routerLink="/play-carousel" className="play-carousel-button">
        Play Carousel
      </IonButton>
      <IonButton expand="block" routerLink="/community-carousel" className="community-carousel-button">
        Community Carousel
      </IonButton>
      <IonButton expand="block" routerLink="/story-factory" className="story-factory-button">
        Story Factory
      </IonButton>
      <IonButton expand="block" routerLink="/memory" className="memory-button">
        Memory
      </IonButton>
      <IonButton expand="block" routerLink="/intruder" className="intruder-button">
        Intruder
      </IonButton>
    </>
  );
};

export default StudentDashboard;
