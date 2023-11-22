import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

const StoryFactoryPage5: React.FC = () => (
    <>
        <IonGrid className="ion-no-padding">
            <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100vh' }}>
                <IonCol>
                    <IonCard className='fabrica-de-cuentos-card'>
                        <IonRow>
                            <IonCol>
                                <div className='story-juego-fabrica-text-container'>
                                    <IonText className='story-juego-fabrica-text'>
                                        ¡Fábrica de cuentos!
                                    </IonText>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className='story-card-1' style={{ backgroundImage: 'url("packages/app/public/assets/img/card_image.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}></IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className='story-card-2'></IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className='story-card-3'></IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className='story-card-4'></IonCard>
                            </IonCol>
                        </IonRow>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage5;