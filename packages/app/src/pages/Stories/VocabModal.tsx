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
import { useProfile } from '@/hooks/Profile';
import { AudioButton } from '@/components/AudioButton';


// todo: ion-padding on IonContent is overridden

export const VocabModal: React.FC = () => {
  const { language } = useLanguageToggle(); // is es, esen, or en
  const { profile: { isInclusive } } = useProfile();
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
  console.log("VOCABLOOKUP", vocabLookup)
  console.log("CUrrentVocabWord", currentVocabWord)
  console.log("LOKUP", lookup)
  const es = vocab.es[lookup.es];
  const esInc = vocab['es-inc'][lookup['es-inc']];
  const en = lookup.en ? vocab.en[lookup.en] : vocab.en[currentVocabWord];

  const imageUrl = language === 'en' ? (en?.image?.url || '') : (isInclusive ? (esInc?.image?.url || '') : (es?.image?.url || ''));


  /*
     to see the props in es, run console.log(es);
     esInc and en have the same props;
     sometimes es, esInc, and en can be undefined
     if esInc is undefined, reuse es instead
   */
  console.log(es, "SPANISH");
  console.log(esInc?.word, "INCLUSIVE");
  console.log(en, "ENGLISH");

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
                <IonRow class="ion-align-items-start">
                  <IonCol>
                    <div className='word-row'>
                      <div className='audio-button-word'>
                        <AudioButton audio={{
                          en: {
                            url: en?.word_audio?.url || '',
                          },
                          es: {
                            url: (isInclusive ? esInc : es)?.word_audio?.url || '',
                          }
                        }} />
                      </div>
                      
                      <IonText>
                        <h1 className="text-4xl semibold">
                          {language !== 'en' && (isInclusive ? esInc?.word : es?.word)}
                          {language === 'en' && en?.word}
                        </h1>
                        {language === 'esen' &&
                          <p className="text-3xl">
                            en?.word
                          </p>
                        }
                      </IonText>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow class="ion-align-items-start">
                  <IonCol>
                    <div className='word-row'>
                      <div className='audio-button-word'>
                        <AudioButton audio={{
                          en: {
                            url: en?.definition_audio?.url || '',
                          },
                          es: {
                            url: (isInclusive ? esInc : es)?.definition_audio?.url || '',
                          }
                        }} />
                      </div>
                     
                      <IonText>
                        <h1 className="text-2xl semibold">
                          {language !== 'en' && (isInclusive ? esInc?.definition : es?.definition)}
                          {language === 'en' && en?.definition}
                        </h1>
                        {language === 'esen' &&
                          <p className="text-xl">
                            en?.definition
                          </p>
                        }
                      </IonText>
                    </div>
                  </IonCol>

                </IonRow>

              </IonCol>
              {imageUrl && (
                <IonCol>
                  <img src={imageUrl} alt="Word popover image" />
                </IonCol>
              )}

            </IonRow>

          </IonList>
        </div>
      </IonContent>
    </IonModal>
  </>;
}
