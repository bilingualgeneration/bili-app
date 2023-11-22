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
        <IonPage>
            <IonContent>
                <IonGrid className="ion-no-padding">
                    <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100vh' }}>
                        <IonCol offset="2.5">
                            <IonCard className='fabrica-de-cuentos-card'>
                                <IonRow>
                                    <IonCol>
                                        <IonText>
                                            <div id='story-juego-fabrica-colorful-text-container'> 
                                                <div id='story-juego-fabrica-colorful-text'>
                                                    <span style={{ color: '#006A67' } as any}>!</span>
                                                    <span style={{ color: '#FF5708' } as any}>F</span>
                                                    <span style={{ color: '#8E84E9' } as any}>á</span>
                                                    <span style={{ color: '#F28AC9' } as any}>b</span>
                                                    <span style={{ color: '#006A67' } as any}>r</span>
                                                    <span style={{ color: '#E3C029' } as any}>i</span>
                                                    <span style={{ color: '#F48722' } as any}>c</span>
                                                    <span style={{ color: '#8E84E9' } as any}>a</span>
                                                    <span> </span>
                                                    <span style={{ color: '#F28AC9' } as any}>d</span>
                                                    <span style={{ color: '#F48722' } as any}>e</span>
                                                    <span> </span>
                                                    <span style={{ color: '#E3C029' } as any}>c</span>
                                                    <span style={{ color: '#006A67' } as any}>u</span>
                                                    <span style={{ color: '#FF5708' } as any}>e</span>
                                                    <span style={{ color: '#8E84E9' } as any}>n</span>
                                                    <span style={{ color: '#F28AC9' } as any}>t</span>
                                                    <span style={{ color: '#006A67' } as any}>o</span>
                                                    <span style={{ color: '#E3C029' } as any}>s</span>
                                                    <span style={{ color: '#FF5708' } as any}>!</span>
                                                </div>
                                            </div>
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonCard className='story-card-1'></IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard className='story-card-2'></IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard className='story-card-3'></IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    </>
);
  
export default StoryFactoryPage5;