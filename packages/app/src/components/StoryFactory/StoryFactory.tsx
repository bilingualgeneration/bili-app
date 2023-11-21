// Intro pages will be conditionally rendered

import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonText,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';
import IntroPage1 from '@/pages/StoryFactory/StoryFactoryPg1';
import IntroPage2 from '@/pages/StoryFactory/StoryFactoryPg2';
import IntroPage3 from '@/pages/StoryFactory/StoryFactoryPg3';
import StoryFactoryPage4 from '@/pages/StoryFactory/StoryFactoryPg4';
import StoryFactoryPage5 from './StoryFactoryPg5';
import StoryFactoryPage6 from './StoryFactoryPg6';
import { useHistory } from 'react-router-dom';

interface StoryFactoryProps {
    page: number;
}

const StoryFactory: React.FC<StoryFactoryProps> = ({ page }) => {
    const { isNewUser } = useProfile();
    const [currentPage, setCurrentPage] = useState(page);
    const history = useHistory();

    useEffect(() => {
        // Use 'page' prop to initialize 'currentPage' when it changes
        setCurrentPage(page);
    }, [page]);

    useEffect(() => {
        console.log('isNewUser:', isNewUser);
        console.log('currentPage:', currentPage);
    }, [isNewUser, currentPage]);

    const handleNext = () => {
        // Logic to determine when to switch to the next page
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        } else {
            // Redirect to other pages if user not new
            if (!isNewUser) {
                history.push(`/story-factory/${currentPage + 1}`);
            }
        }
    };

    const renderContent = () => {
        if (isNewUser) {
            // Render intro pages 1, 2, 3 if new users
            switch (currentPage) {
                case 1:
                    return <IntroPage1 />;
                case 2:
                    return <IntroPage2 />;
                case 3:
                    return <IntroPage3 />;
                default:
                    return null;
            }
        } else {
            // Render pages 4, 5, 6 if current users
            switch (currentPage) {
                case 4:
                    return <StoryFactoryPage4 />;
                case 5:
                    return <StoryFactoryPage5 />;
                case 6:
                    return <StoryFactoryPage6 />;
                default:
                    return null;
            }
        }
    };

  return isNewUser ? (
    <>
            <IonCard className='story-intro'>
                <IonCardContent>
                    {renderContent()}

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
                                <IonText>
                                    <h1 className='story-button-bold'>Siguiente</h1>
                                </IonText>
                                <IonText className='story-button-reg'>
                                    <FormattedMessage id="storyFactory.button" defaultMessage="Next" description="Button to move to next page in intro pages"/>
                                </IonText>
                            </div>
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
    </>
  ) : null;
};

export default StoryFactory;