// StoryFactoryButton.tsx
import React from 'react';
import { IonButton } from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import useStoryFactoryButton from '@/components/StoryFactory/StoryFactoryButtonLogic';

interface StoryFactoryButtonProps {
  currentPage: number;
}

const StoryFactoryButton: React.FC<StoryFactoryButtonProps> = ({ currentPage }) => {
  const { handleNext } = useStoryFactoryButton(currentPage);

  return (
    <div className='story-intro-button-container'>
      <IonButton
        color='var(--Flamenco-High)'
        className='story-button'
        expand='block'
        shape='round'
        type='button'
        onClick={handleNext}
      >
        <div>
          <div className='story-button-bold'>Siguiente</div>
          <div className='story-button-reg'>
            <FormattedMessage
              id='storyFactory.nextButton'
              defaultMessage='Next'
              description='Button to move to the next page in intro pages'
            />
          </div>
        </div>
      </IonButton>
    </div>
  );
};

export default StoryFactoryButton;