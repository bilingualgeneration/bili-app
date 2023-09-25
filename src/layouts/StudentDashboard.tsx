import React, { useState } from 'react';
import {
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

const StudentDashboard: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleStartClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (event: CustomEvent) => {
    setSelectedOption(event.detail.value);
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
            </IonList>
        )}
      
    </>
  );
};

export default StudentDashboard;
  