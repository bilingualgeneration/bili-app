import React from 'react';
import { IonCard, IonCol, IonGrid, IonImg, IonRow, IonText } from '@ionic/react';
import StoryFactoryButton from '@/components/StoryFactory/StoryFactoryButton';
import bili_character from 'packages/app/public/assets/img/bili_character.svg';

interface IntroPage1Props {
  handleNext: () => void;
  isNewUser: boolean;
  currentPage: number;
}

const IntroPage1: React.FC<IntroPage1Props> = ({ handleNext, isNewUser, currentPage }) => (
  <>
    <IonGrid>
        <IonCard className='story-intro'>
            <div className='story-page-1-text-container'>
                <IonRow>
                    <IonCol>
                        <IonText>
                            <div id='story-bienvenidos'> ¡Bienvenidos a la </div>
                            <div id='story-fabrica'> fábrica de cuentos! </div>
                            <div id='story-un-lugar'>¡Un lugar para lecturas silábicas</div> 
                            <div id='story-graciosas'> graciosas! </div>
                        </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonText>
                            <div id='story-welcome'>Welcome to the <span id='story-fact'>story factory!</span></div>
                            <div id='story-a-place'>A place for silly syllabic reading! </div>
                        </IonText>
                    </IonCol>
                </IonRow>
            </div>
            <div>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <StoryFactoryButton onClick={handleNext} isNewUser={isNewUser} currentPage={currentPage} />
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </div>
        </IonCard>
    </IonGrid>
    <IonGrid>
        <IonRow>
            <IonCol> </IonCol>
            <IonCol size="auto">
                <div style={{ width: '411px', height: '733px' }}>*Bili Img Goes Here*</div>
                {/* <img src={bili_character} alt="Bili character" width="411" height="733"/> */}
            </IonCol>
        </IonRow>
    </IonGrid>
  </>
);

export default IntroPage1;
