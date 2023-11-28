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
  IonHeader,
  IonRow,
  IonText,
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';
import JuegoCard from '@/components/StoryFactory/JuegoCard';

const StoryFactoryPage4: React.FC = () => (
    <>
        <IonGrid class="ion-no-padding">
            <IonRow>
                <IonCol>
                    <div className="rectangle-header">
                        <div className='rectangle-header-text'>
                            <h1 id='story-juego-title'>Juego</h1>
                            <p id='story-juego-title2'>Play</p>
                        </div>
                        {/* Semi-Transparent Overlay for Rectangle Header */}
                        <div className="rectangle-header-semi-transparent-overlay"></div>    
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IonCard className='juego-fabrica-de-cuentos-main-card'>
                <IonCardContent className='juego-fabrica-de-cuentos-card-content'>
                    <IonGrid class="ion-no-padding">
                        <IonRow>
                            <IonCol>
                                <IonCardHeader className='fabrica-de-cuentos-header'>
                                    <IonCardTitle style={{  textAlign: 'left' }}>
                                        <div id='story-juego-fabrica-es'> ¡Fábrica de cuentos! </div>
                                    </IonCardTitle>

                                    <IonCardSubtitle>
                                        <div id='story-factory-en'> Story factory </div>
                                    </IonCardSubtitle>       
                                </IonCardHeader>
                            </IonCol>
                        </IonRow>
                    
                        <IonRow class="ion-justify-content-center justify-content-between">
                            <IonCol>
                                <JuegoCard storyId='5' backgroundImage='./assets/img/card_image.png' isLocked={false} isSpanishBilingual={true} packNumber={1}/>
                            </IonCol>
                                
                            <IonCol>
                                <JuegoCard backgroundImage='/assets/img/card_image2.png' isLocked={true} isSpanishBilingual={true} packNumber={2}/>
                            </IonCol>

                            <IonCol>
                                <JuegoCard backgroundImage='/assets/img/card_image3.png' isLocked={true} isSpanishBilingual={true} packNumber={3}/>  
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </div>
    </>
);
  
export default StoryFactoryPage4;