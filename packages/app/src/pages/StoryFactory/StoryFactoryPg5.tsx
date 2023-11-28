import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText
} from '@ionic/react';
import { FormattedMessage } from 'react-intl';
import { useProfile } from '@/contexts/ProfileContext';
import FabricaCard from '@/components/StoryFactory/FabricaCard';
import fabricaRectangle from '@/assets/icons/fabrica_swirl_rectangle.svg';
import fabricaHalfCircle from '@/assets/icons/fabrica_swirl_half_circle.svg';

// EVERYTHING THAT IS COMMENTED OUT CAN BE READDED ONCE USER PROFILE IS COMPLETE

const StoryFactoryPage5: React.FC = () => (
    <>
        <IonGrid class="ion-no-padding">
            <IonRow class="ion-justify-content-center">
                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-swirl-rectangle'>
                        <img src={fabricaHalfCircle} alt='grey half circle piece'/>
                    </div>
                </IonCol>

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-swirl-rectangle fabrica-flipped-swirl'>
                        <img src={fabricaHalfCircle} alt='grey half circle piece'/>
                    </div>
                </IonCol>

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-swirl-rectangle'>
                        <img src={fabricaHalfCircle} alt='grey half circle piece'/>
                    </div>
                </IonCol>

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-swirl-rectangle fabrica-flipped-swirl'>
                        <img src={fabricaHalfCircle} alt='grey half circle piece'/>
                    </div>
                </IonCol>
            </IonRow>

            <IonRow class="ion-justify-content-center">
                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-rectangle'>
                        <img src={fabricaRectangle} alt='grey rectangle piece'/>
                    </div>
                </IonCol> 

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-rectangle'>
                        <img src={fabricaRectangle} alt='grey rectangle piece'/>
                    </div>
                </IonCol>  

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-rectangle'>
                        <img src={fabricaRectangle} alt='grey rectangle piece'/>
                    </div>
                </IonCol>  

                <IonCol size="2" class="ion-text-center">
                    <div className='fabrica-rectangle'>
                        <img src={fabricaRectangle} alt='grey rectangle piece'/>
                    </div>
                </IonCol>    
            </IonRow>
        </IonGrid>
        
        <IonCard className='fabrica-de-cuentos-large-card'>
            <IonCardContent className='fabrica-card-content'>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCardHeader class="ion-align-items-center">
                                <IonCardTitle>
                                    <div className='fabrica-text-container'>
                                        <div id='fabrica-header-text'>
                                            ¡Fábrica de cuentos!
                                        </div> 
                                    </div>
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <FabricaCard
                                // isSpanishBilingual={true} 
                                // id={'fabrica.innerCard1'} 
                                // defaultMessage={'The frog'} 
                                // description={'Text for the first card in \'¡Fabrica de cuentos!\' page'}
                            >
                                <p className='fabrica-text1-spanish'>
                                    El sapo
                                </p>

                                <p className='fabrica-text2-english'>
                                    The frog
                                </p>
                            </FabricaCard>
                        </IonCol>

                        <IonCol>
                            <FabricaCard 
                                // isSpanishBilingual={true} 
                                // id={'fabrica.innerCard2'} 
                                // defaultMessage={'food'} 
                                // description={'Text for the second card in \'¡Fabrica de cuentos!\' page'}
                            >
                                <p className='fabrica-text1-spanish'>
                                    comida
                                </p>

                                <p className='fabrica-text2-english'>
                                    eats
                                </p> 
                            </FabricaCard>
                        </IonCol>

                        <IonCol>
                            <FabricaCard 
                                // isSpanishBilingual={true} 
                                // id={'fabrica.innerCard3'} 
                                // defaultMessage={'insects'} 
                                // description={'Text for the third card in \'¡Fabrica de cuentos!\' page'}
                            >
                                <p className='fabrica-text1-spanish'>
                                    insectos
                                </p>

                                <p className='fabrica-text2-english'>
                                    insects
                                </p>
                            </FabricaCard>
                        </IonCol>

                        <IonCol>
                            <FabricaCard 
                                // isSpanishBilingual={true} 
                                // id={'fabrica.innerCard4'} 
                                // defaultMessage={'in the forest'} 
                                // description={'Text for the fourth card in \'¡Fabrica de cuentos!\' page'}
                            >
                                <p className='fabrica-text1-spanish'>
                                    en el bosque.
                                </p>

                                <p className='fabrica-text2-english'>
                                    in the forest.
                                </p>
                            </FabricaCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    </>
);
  
export default StoryFactoryPage5;