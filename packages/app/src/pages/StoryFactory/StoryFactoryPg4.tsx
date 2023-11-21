import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonText
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

const StoryFactoryPage4: React.FC = () => (
    <>
        <IonGrid>
            <IonCard>
                <IonCardContent>
                    <div className='ion-margin-top'>
                        Page 4
                    </div>
                    <div className='ion-margin-top'>
                        {/* Content for page 3 */}
                    </div>
                </IonCardContent>
            </IonCard>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage4;