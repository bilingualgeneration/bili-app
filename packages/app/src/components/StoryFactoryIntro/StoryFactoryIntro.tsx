// Option 1 where three intro pages are on same page and condionally rendered

import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

interface StoryFactoryIntroProps {
    page: number;
}

const StoryFactoryIntro: React.FC<StoryFactoryIntroProps> = ({ page }) => {
    const { isNewUser } = useProfile();
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        // Use 'page' prop to initialize 'currentPage' when it changes
        setCurrentPage(page);
    }, [page]);

    const getPageContent = (currentPage: number) => {
        switch (currentPage) {
            case 1:
                return (
                <>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey1" defaultMessage="Default Text 1" /> */}
                        Page 1
                    </div>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey2" defaultMessage="Default Text 2" /> */}
                    </div>
                    {/* ... other content for page 1 ... */}
                </>
                );

            case 2:
                return (
                <>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey3" defaultMessage="Default Text 3 for Page 2" /> */}
                        Page 2
                    </div>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey4" defaultMessage="Default Text 4 for Page 2" /> */}
                    </div>
                    {/* ... other content for page 2 ... */}
                </>
                );

            case 3:
                return (
                    <>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey3" defaultMessage="Default Text 3 for Page 2" /> */}
                        Page 3
                    </div>
                    <div className='ion-margin-top'>
                        {/* <FormattedMessage id="translationKey4" defaultMessage="Default Text 4 for Page 2" /> */}
                    </div>
                    {/* ... other content for page 3 ... */}
                    </>
                );

        default:
            return null;
        }
    };

    const handleNext = () => {
        // Logic to determine when to switch to the next page
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        } else {
            // Redirect to other pages if user not new
    }
  };

    return isNewUser ? (
        <>
            <IonCard className='story-intro'>
                <IonCardContent>
                    {getPageContent(currentPage)}

                    <div className='story-intro-button'>
                        <IonButton 
                        color='var(--Flamenco-High)'
                        className="story-button"
                        expand='block' 
                        shape='round' 
                        type='button'
                        onClick={handleNext}>
                            <div>
                                <div>
                                    <h1 className='story-button-bold'>Siguiente</h1>
                                </div>
                                <div className='story-button-reg'>
                                    {/* <FormattedMessage id="storyFactory.next" defaultMessage="Next" /> */}
                                    Next
                                </div>
                            </div>
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        </>
    ) : null;
};

export default StoryFactoryIntro;

