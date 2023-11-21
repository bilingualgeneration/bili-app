import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

const IntroPage1: React.FC = () => (
    <>
        <div className='ion-margin-top'>
            <IonText>
                <h1>¡Bienvenidos a la </h1>
                <IonText>
                    <h1
                    style={{
                    color: 'var(--Habanero-Habanero)'
                    }}
                    >fábrica de cuentos!</h1>
                </IonText>
            </IonText>
        </div>
        <div className='ion-margin-top'>
            <IonText color='medium'>
                <h3>¡Un lugar para lecturas silábicas graciosas!</h3>
            </IonText>
        </div>
    </>
);
  
export default IntroPage1;