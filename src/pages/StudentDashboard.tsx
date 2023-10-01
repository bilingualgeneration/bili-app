import React from 'react';
import { IonButton, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {useAuth} from '../contexts/useAuth';

const StudentDashboard: React.FC = () => {
 
  return (
    <>
    <h1>Welcome to Student Dashboard Page</h1>

    <IonButton expand="block" routerLink="/journeys" data-cy="journeys-button">
      Journeys
    </IonButton>
    <IonButton expand="block" routerLink="/explore" data-cy="explore-button">
      Explore
    </IonButton>
    <IonButton expand="block" routerLink="/wellness-carousel" data-cy="wellness-carousel-button">
      Wellness Carousel
    </IonButton>
    <IonButton expand="block" routerLink="/play-carousel" data-cy="play-carousel-button">
      Play Carousel
    </IonButton>
    <IonButton expand="block" routerLink="/community-carousel" data-cy="community-carousel-button">
      Community Carousel
    </IonButton>
    <IonButton expand="block" routerLink="/story-factory" data-cy="story-factory-button">
      Story Factory
    </IonButton>
    <IonButton expand="block" routerLink="/memory" data-cy="memory-button">
      Memory
    </IonButton>
    <IonButton expand="block" routerLink="/intruder" data-cy="intruder-button">
      Intruder
    </IonButton>
  </>
  );
};

export default StudentDashboard;
