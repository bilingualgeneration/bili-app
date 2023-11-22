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

const StoryFactoryPage4: React.FC = () => (
    <>
        <IonGrid>
            <IonRow className='rectangle-header'>
                {/* <IonCol size="1"></IonCol> */}
                <IonCol size="1" offset="1" className="juego-column"> 
                    <div id='story-juego-title'>Juego</div>
                    <div id='story-juego-title2'>Play</div>
                </IonCol>
                {/* <IonCol></IonCol> */}
            </IonRow>
            <IonRow className='juego-divider'></IonRow>
            <IonCard className='juego-card'>
                <div className='story-page-1-text-container'>
                    <IonRow>
                        <IonCol>
                            <IonText>
                                <div id='story-juego-fabrica-es'> ¡Fábrica de cuentos! </div>
                                <div id='story-factory-en'> Story factory </div>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCard className='story-card-1'><img src="'https://s3-alpha-sig.figma.com/img/433d/bc84/995857f008f1b00aa644f27cd82a2a44?Expires=1701648000&Signature=BNyg61dtWLe~D9c~uQra0zXlgV1LGUJOpXoTSGEmpq-IoeuH8rKBCfeIgTxyiCw2dNWsUORQjDtFy18tweH7wKJiKAhIzK3dINpDeh-XO2vZdXEcckTrSj0udR~va4WpU2TgGUd0LZzpPXqs9g5hQONar~OZr7uPi6FrBRQDEzHlvrojtJe-idCFKPfkEQxPaEZ6ggGWTT1yCOXGQqxdj2mf0nK1uwV0vNdymKln~N-lK4a18QqRD8kt~2~dFRDFMAIHIzyiqSCRShPGsC5MccT0ivBzRCBU8BqG3zMzJEj4A8Tbjon6olfVnwMYmuCTbLlb6rUWMMGwTK~rM9uaPQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';"/></IonCard>
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
  
export default StoryFactoryPage4;