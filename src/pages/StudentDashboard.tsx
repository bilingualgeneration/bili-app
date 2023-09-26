import React, { useState } from 'react';
import {
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showCarouselOptions, setShowCarouselOptions] = useState(false);
  const [showGoToStoriesButton, setShowGoToStoriesButton] = useState(false);
  const history = useHistory();

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

  const navigateToRoute = (route: string) => {
    history.push(route);
    setDropdownOpen(false);
  };

  // Function to show the "Go to Stories" button
  const showGoToStories = () => {
    setShowGoToStoriesButton(true);
  };

  return (
    <>
      <IonButton expand="block" onClick={handleStartClick}>
        Start
      </IonButton>
      {isDropdownOpen && (
        <IonList>
          <IonItem>
            <IonLabel>Select an Option:</IonLabel>
            <IonSelect
              value={selectedOption}
              onIonChange={handleOptionChange}
            >
              <IonSelectOption value="journeys">Journeys</IonSelectOption>
              <IonSelectOption value="explore">Explore</IonSelectOption>
              {/* Add more options if needed here */}
            </IonSelect>
          </IonItem>
          {showCarouselOptions && selectedOption === 'explore' && (
            <>
              <IonItem>
                <IonButton
                  expand="block"
                  onClick={() => showGoToStories()}
                >
                  Stories Carousel
                  </IonButton>
              </IonItem>
              {/* Display the "Go to Stories" button */}
              {showGoToStoriesButton && (
                <IonItem>
                  <IonButton
                    expand="block"
                    onClick={() => navigateToRoute('/story')}
                  >
                    Go to Stories
                  </IonButton>
                </IonItem>
              )}
              <IonItem>
                <IonButton
                  expand="block"
                  onClick={() => navigateToRoute('/wellness-carousel')}
                >
                  Wellness Carousel
                </IonButton>
              </IonItem>
              <IonItem>
                <IonButton
                  expand="block"
                  onClick={() => navigateToRoute('/play-carousel')}
                >
                  Play Carousel
                </IonButton>
              </IonItem>
              <IonItem>
                <IonButton
                  expand="block"
                  onClick={() => navigateToRoute('/community-carousel')}
                >
                  Community Carousel
                </IonButton>
              </IonItem>
            </>
          )}
        </IonList>
      )}
    </>
  );
};

export default StudentDashboard;