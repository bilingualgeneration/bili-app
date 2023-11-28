import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';
import StoryFactoryButton from '@/components/StoryFactory/StoryFactoryButton';
import biliCharacter from '@/assets/icons/bili_character.svg';

interface IntroPage2Props {
  currentPage: number;
}

const IntroPage2: React.FC<IntroPage2Props> = ({ currentPage }) => (
  <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IonCard className='story-page-2-main-card'>
            <IonGrid>
                <IonRow class="ion-justify-content-center">
                    <IonCol >
                        <IonCardHeader className='story-header'>
                            <IonCardTitle style={{  textAlign: 'left' }}>
                              <div id='story-page-2-title'> En este juego, podrás crear más de 90.000 historias diferentes con solo 
                                    deslizar el dedo o hacer clic en un botón. Haz clic en "Siguiente" para ver cómo.
                              </div>
                            </IonCardTitle>
                            <IonCardSubtitle>
                              <div id='story-page-2-subtitle'>In this game, you can create over 90,000 different stories with the 
                                                  swipe of your finger or click of a button. Click “Next” to see how.
                              </div> 
                            </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCol>

                    <IonCol size="4">
                      <img src={biliCharacter} alt='Bili character'/>  
                    </IonCol>
                </IonRow>

                <IonRow class="ion-justify-content-center">
                    <StoryFactoryButton currentPage={currentPage} />
                </IonRow>
            </IonGrid>
        </IonCard>
      </div>
  </>
);
  
export default IntroPage2;