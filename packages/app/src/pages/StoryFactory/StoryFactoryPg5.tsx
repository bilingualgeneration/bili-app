import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';

const StoryFactoryPage5: React.FC = () => (
    <>
        <IonGrid>
            <IonCard>
                <div className='story-page-1-text-container'>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <div id='story-juego-fabrica-colorful-container'> 
                                    <span style={{ color: '#FF0000' } as any}>!</span>
                                    <span style={{ color: '#FF0000' } as any}>F</span>
                                    <span style={{ color: '#FF0000' } as any}>á</span>
                                    <span style={{ color: '#FF0000' } as any}>b</span>
                                    <span style={{ color: '#FF0000' } as any}>r</span>
                                    <span style={{ color: '#FF0000' } as any}>i</span>
                                    <span style={{ color: '#FF0000' } as any}>c</span>
                                    <span style={{ color: '#FF0000' } as any}>a</span>
                                    <span style={{ color: '#FF0000' } as any}> </span>
                                    <span style={{ color: '#FF0000' } as any}>d</span>
                                    <span style={{ color: '#FF0000' } as any}>e</span>
                                    <span style={{ color: '#FF0000' } as any}> </span>
                                    <span style={{ color: '#FF0000' } as any}>c</span>
                                    <span style={{ color: '#FF0000' } as any}>u</span>
                                    <span style={{ color: '#FF0000' } as any}>e</span>
                                    <span style={{ color: '#FF0000' } as any}>n</span>
                                    <span style={{ color: '#FF0000' } as any}>t</span>
                                    <span style={{ color: '#FF0000' } as any}>o</span>
                                    <span style={{ color: '#FF0000' } as any}>s</span>
                                    <span style={{ color: '#FF0000' } as any}>!</span>
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
                </div>
            </IonCard>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage5;