import React from 'react';
import { IonCard, IonCardContent, IonGrid, IonCol, IonRow } from '@ionic/react';
import useStoryFactoryButton from '@/components/StoryFactory/StoryFactoryButtonLogic';

interface StoryFactoryProps {
  children: React.ReactNode;
}

const StoryFactory: React.FC<StoryFactoryProps> = ({ children }) => {
  const { isNewUser, currentPage, handleNext, redirect } = useStoryFactoryButton(true, 1);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement, {
      handleNext,
      isNewUser,
      currentPage,
    })
  );

  return isNewUser ? (
    <>
      <div>
        <IonGrid>
          <IonCol >
            <IonCard className='story-intro'>
              <IonCardContent>
              {childrenWithProps}
                <IonRow>
                  <IonCol size="10"></IonCol>
                  <IonCol size="2">BILI GOES HERE</IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonGrid>
      </div>
      {/* Redirect based on logic in useStoryFactoryButton */}
      {redirect()}
    </>
  ) : null;
};

export default StoryFactory;