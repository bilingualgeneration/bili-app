import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';
import JuegoCard from '@/components/StoryFactory/JuegoCard';

const StoryFactoryPage4: React.FC = () => (
    <>
        <IonGrid>
            <IonRow className='rectangle-header'>
                <IonCol size="1" offset="2.5" class="ion-no-padding"> 
                   <IonText>
                        <h1 id='story-juego-title'>Juego</h1>
                        <p id='story-juego-title2'>Play</p>
                    </IonText>
                </IonCol>
            </IonRow>
               
            <IonRow className='juego-divider'></IonRow>
            <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCard className='juego-card'>
                    <div className='juego-content-container'>
                        <IonRow>
                            <IonCol>
                                <IonText>
                                    <h1 id='story-juego-fabrica-es'> ¡Fábrica de cuentos! </h1>
                                    <h3 id='story-factory-en'> Story factory </h3>
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol class="ion-no-padding" size="4">
                                <JuegoCard backgroundImage='/assets/img/card_image.png' isLocked={false}>
                                    <IonText>
                                        <p className="title">Paquete 1</p>
                                    </IonText>
                                    <IonText>
                                        <p className="subtitle">Pack 1</p>
                                    </IonText>
                                </JuegoCard>
                            </IonCol>
                            <IonCol class="ion-no-padding" size="4">
                                <JuegoCard backgroundImage='/assets/img/card_image2.png' isLocked={true}>
                                    <IonText>
                                        <p className="title">Paquete 2</p>
                                    </IonText>
                                    <IonText>
                                        <p className="subtitle">Pack 1</p>
                                    </IonText>
                                </JuegoCard>
                            </IonCol>
                            <IonCol class="ion-no-padding" size="4">
                                <JuegoCard backgroundImage='/assets/img/card_image3.png' isLocked={true}>
                                    <IonText>
                                        <p className="title">Paquete 3</p>
                                    </IonText>
                                    <IonText>
                                        <p className="subtitle">Pack 1</p>
                                    </IonText>
                                </JuegoCard>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonCard>
            </IonRow>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage4;