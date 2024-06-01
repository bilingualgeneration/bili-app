import {
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonRow,
  IonText,
} from '@ionic/react';
import { useLanguageToggle } from '@/components/LanguageToggle';
import { useStory } from './StoryContext';
import StudentAvatar from "@/assets/icons/avatar_profile.svg";
import "./VocabModal.scss";

// todo: ion-padding on IonContent is overridden

export const VocabModal: React.FC = () => {
  const { language } = useLanguageToggle(); // is es, esen, or en
  const {
    vocab,
    vocabLookup,
    currentVocabWord,
    setIsVocabOpen,
    isVocabOpen
  } = useStory();
  const lookup = vocabLookup[currentVocabWord] || {
    es: '',
    ['es-inc']: '',
    en: ''
  };
  const es = vocab.es[lookup.es];
  const esInc = vocab['es-inc'][lookup['es-inc']];
  const en = vocab.en[lookup.en];

  /*
     to see the props in es, run console.log(es);
     esInc and en have the same props;
     sometimes es, esInc, and en can be undefined
     if esInc is undefined, reuse es instead
   */
  console.log(es);
  console.log(esInc);
  console.log(en);

  // to close modal, call setIsVocabOpen(false);

  return <>
    <IonModal
      isOpen={isVocabOpen}
      onWillDismiss={() => {
        setIsVocabOpen(false);
        
      }}
      >
      <IonContent id='vocab-modal-id' className='vocab-modal-content'>
        <div className='ion-padding modal-width'>
          <IonList>
            <IonRow>
              <IonCol>
              <IonItem>
              <IonIcon icon={StudentAvatar} />
              <IonText>
                <h1 className="text-md semibold">
                  {language !== 'en' && `amable`}
                  {language === 'en' && `kind`}
                </h1>
                {language === 'esen' &&
                  <p className="text-sm">
                    kind
                  </p>
                }
              </IonText>
            </IonItem>
            <IonItem>
              <IonIcon icon={StudentAvatar} />
              <IonText>
                <h1 className="text-md semibold">
                  {language !== 'en' && `Una palabra usada para describir a alguien o algo que muestra <dulce>, consideración, y cariño.`}
                  {language === 'en' && `A word used to describe someone or something that is sweet, thoughtful, or caring. `}
                </h1>
                {language === 'esen' &&
                  <p className="text-sm">
                    A word used to describe someone or something that is sweet, thoughtful, or caring. 
                  </p>
                }
              </IonText>
            </IonItem>
              </IonCol>
              <IonCol>
                <img src="/src/assets/icons/vocab_image.png" alt="" />
              </IonCol>
            </IonRow>

          </IonList>
        </div>
      </IonContent>
    </IonModal>
  </>;
}
