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
  const history = useHistory();

  const handleStartClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (event: CustomEvent) => {
    setSelectedOption(event.detail.value);
  };

  const navigateToRoute = (route: string) => {
    history.push(route);
    setDropdownOpen(false);
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
            </IonSelect>
          </IonItem>
          {selectedOption === 'explore' && (
            <>
              <IonItem>
                <IonButton
                  expand="block"
                  onClick={() => navigateToRoute('/stories-carousel')}
                >
                  Stories Carousel
                </IonButton>
              </IonItem>
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
            </>
          )}
        </IonList>
      )}
    </>
  );
};

export default StudentDashboard;