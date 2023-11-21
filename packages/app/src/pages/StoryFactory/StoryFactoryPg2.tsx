import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

const IntroPage2: React.FC = () => (
    <>
      <div className='ion-margin-top'>
        Page 2
      </div>
      <div className='ion-margin-top'>
        {/* Content for page 2 */}
      </div>
    </>
);
  
export default IntroPage2;