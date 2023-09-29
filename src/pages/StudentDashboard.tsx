import React from 'react';
import { IonButton, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {useAuth} from '../contexts/useAuth';

const StudentDashboard: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showCarouselOptions, setShowCarouselOptions] = useState(false);
  const [showGoToStoriesButton, setShowGoToStoriesButton] = useState(false);
    const history = useHistory();
    
    const {isAuthed} = useAuth();
    console.log(isAuthed);

    
  const handleStartClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (event: CustomEvent) => {
    const value = event.detail.value as string;
    setSelectedOption(value);

    // Check if the user selected "explore"
    if (value === 'explore') {
        setShowCarouselOptions(true);
        } else {
        setShowCarouselOptions(false);
        // Hide the "Go to Stories" button when another option is selected
        setShowGoToStoriesButton(false);
        }
    };

  // Function to show the "Go to Stories" button
  const showGoToStories = () => {
    setShowGoToStoriesButton(true);
  };

  return (
    <>
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
