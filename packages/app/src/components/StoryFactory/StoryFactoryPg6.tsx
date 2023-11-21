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

const StoryFactoryPage6: React.FC = () => (
    <>
        <IonGrid>
            <IonCard>
                <IonCardContent>
                    <div className='ion-margin-top'>
                        Page 6
                    </div>
                    <div className='ion-margin-top'>
                        {/* Content for page 3 */}
                    </div>
                </IonCardContent>
            </IonCard>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage6;