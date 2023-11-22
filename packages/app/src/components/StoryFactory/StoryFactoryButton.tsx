import React from 'react';
import { IonButton, IonText } from '@ionic/react';
import { FormattedMessage } from 'react-intl';

interface StoryFactoryButtonProps {
  onClick: () => void;
  isNewUser: boolean;
  currentPage: number;
}

const StoryFactoryButton: React.FC<StoryFactoryButtonProps> = ({
  onClick,
  isNewUser,
  currentPage,
}) => (
  <div className='story-intro-button-container'>
    <IonButton
      color='var(--Flamenco-High)'
      className='story-button'
      expand='block'
      shape='round'
      type='button'
      onClick={onClick}
    >
      <div>
        <IonText>
          <h1 className='story-button-bold'>Siguiente</h1>
        </IonText>
        <IonText className='story-button-reg'>
          <FormattedMessage
            id='storyFactory.button'
            defaultMessage='Next'
            description='Button to move to the next page in intro pages'
          />
        </IonText>
      </div>
    </IonButton>
  </div>
);

export default StoryFactoryButton;