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

const StoryFactoryPage6: React.FC = () => (
    <>
        <IonGrid className="ion-no-padding">
            <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100vh' }}>
                <IonCol offset="2.5">
                    <IonCard className='felicitaciones-card'>
                        <IonRow>
                            <div id='felicitaciones-text-container'> 
                                <IonCol>
                                    <IonText>
                                        <div id='felicitaciones-text-lg'>
                                            ¡Felicitaciones!
                                        </div>   
                                    </IonText>
                                </IonCol>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div id='felicitaciones-text-lg2'>
                                Has creado y leído cinco cuentos. ¿Puedes seguir?
                            </div> 
                        </IonRow>
                        <IonRow>
                            {/* space row */}
                        </IonRow>
                        <IonRow>
                            <div id='congrats-text-sm'>
                                Congrats!
                            </div>
                        </IonRow>
                        <IonRow>
                            <div id='congrats-text-sm2'>
                                You've created and read five stories. Can you keep going?
                            </div>
                        </IonRow>
                        <IonRow>
                            <IonButton className='sigue-adelante-button' shape='round'>
                                <div>
                                    <div className='sigue-button-es'>¡Sigue adelante!</div>
                                    <div className='sigue-button-en'>Keep going!</div>
                                </div>
                            </IonButton>    
                        </IonRow>
                    </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    </>
);
  
export default StoryFactoryPage6;