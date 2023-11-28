import React, { Children } from 'react';
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { volumeMedium } from 'ionicons/icons';
import VolumeCard from './VolumeCard';
import polygonUp from '@/assets/icons/polygon_up.svg';
import polygonDown from '@/assets/icons/polygon_down.svg';
import { FormattedMessage } from 'react-intl';

// EVERYTHING THAT IS COMMENTED OUT CAN BE READDED ONCE USER PROFILE IS COMPLETE

interface FabricaCardProps {
    // isSpanishBilingual?: boolean;
    // formattedMessage?: string;
    // id: string;
    // defaultMessage: string;
    // description?: string;
    children?: React.ReactNode;
}

const FabricaCard: React.FC<FabricaCardProps> = ({ /* isSpanishBilingual = false, id, defaultMessage, description,*/ children }) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IonGrid class="ion-no-padding">
                    <IonRow>
                        <IonCol class="ion-text-center">
                            <div className='polygon-up'>
                                <img src={polygonUp} alt='arrow shape pointing upwards'/>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonCard className='mini-fabrica-card'>
                    <IonCardContent>
                        <IonGrid>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <IonRow class="ion-justify-content-center">
                                    <IonCol class="ion-text-center" >
                                        <VolumeCard />
                                    </IonCol>
                                </IonRow>

                                {/* {isSpanishBilingual ? ( */}
                                    {/* <>*/}
                                        {/* Spanish text that comes from React-intl goes here -- anything that follows needs to be indented upon implemented */}
                                <IonRow>
                                    <IonText>
                                        {children}
                                    </IonText>
                                </IonRow>

                                {/* Editable English text */}
                                {/* <IonRow> */}
                                    {/* <IonText> */}
                                        {/* <FormattedMessage id={id} defaultMessage={defaultMessage} description={description} /> */}
                                    {/* </IonText> */}
                                {/* </IonRow>                */}
                                {/* </> */}
                                {/* ) : ( */}
                                    {/* // Single row for Spanish with translated English text */}
                                    {/* <IonRow>
                                        <IonText>
                                            {children}
                                        </IonText>
                                    </IonRow> */}
                                {/* )} */}

                                <IonRow class="ion-justify-content-center">
                                    <IonCol class="ion-text-center" >
                                        <VolumeCard iconClass='volume-icon-container-greyed-out'/>   
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                <IonGrid class="ion-no-padding">
                    <IonRow>
                        <IonCol class="ion-text-center">
                            <div className='polygon-up'>
                                <img src={polygonDown} alt='arrow shape pointing downwards'/>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div> 
        </>
    );
};

export default FabricaCard;