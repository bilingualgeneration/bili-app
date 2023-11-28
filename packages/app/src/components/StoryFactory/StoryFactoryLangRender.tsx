// This page can be edited/used once we code user profile and are able to grab language settings

import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';

interface StoryFactoryProps {
    languageMode: 'spanish' | 'bilingual';
}

export const StoryFactory: React.FC<StoryFactoryProps> = ({ languageMode }) => {
    return (
        <>
            <IonCard>
                <IonCardContent>
                    <div className='ion-margin-top'>
                        <FormattedMessage
                            id={`storyFactory.text1.${languageMode}`}
                            defaultMessage="Default Text 1"
                        />
                    </div>

                    <div className='ion-margin-top'>
                        <FormattedMessage
                            id={`storyFactory.text2.${languageMode}`}
                            defaultMessage="Default Text 2"
                        />
                    </div>

                    {languageMode === 'bilingual' && (
                        <div className='ion-margin-top'>
                            <FormattedMessage
                                id={`storyFactory.text3.${languageMode}`}
                                defaultMessage="Default Text 3 for Bilingual Mode"
                            />
                        </div>
                    )}

                    {languageMode === 'bilingual' && (
                        <div className='ion-margin-top'>
                            <FormattedMessage
                                id={`storyFactory.text4.${languageMode}`}
                                defaultMessage="Default Text 4 for Bilingual Mode"
                            />
                        </div>
                    )}

                    <div className='ion-margin-top'>
                        <IonButton
                            expand='block'
                            href='/story-factory'
                            shape='round'>
                            <FormattedMessage id="storyFactory.next" defaultMessage="Next" />
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        </>
    );
};

// This is how it would more or less look when used in the accompanying StoryFactoryIntro pages:

// Use state to manage the user's language mode selection
// const userLanguageMode = 'bilingual';    <-- replace with actual user selection

// Page 1
// <StoryFactory languageMode={userLanguageMode} />

// Page 2
// <StoryFactory languageMode={userLanguageMode} />

// Page 3
// <StoryFactory languageMode={userLanguageMode} />
