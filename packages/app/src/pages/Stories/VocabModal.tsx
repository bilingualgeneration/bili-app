import {
  IonButton,
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
import CloseButton from '@/assets/icons/close_button.svg'


// todo: ion-padding on IonContent is overridden

export const VocabModal: React.FC = () => {
  const { language } = useLanguageToggle(); // is es, esen, or en
  const { profile: { isInclusive } } = useProfile();
  const {
    vocab,
    vocabLookup,
    currentVocabWord,
    setCurrentVocabWord
  } = useStory();
  const lookup = vocabLookup[currentVocabWord ?? ''] || {
    es: '',
    ['es-inc']: '',
    en: ''
  };
  const es = vocab.es[lookup.es];
  const esInc = vocab['es-inc'][lookup['es-inc']];
  const en = lookup.en ? vocab.en[lookup.en] : vocab.en[currentVocabWord!];

  const imageUrl = language === 'en' ? (en?.image?.url || '') : (isInclusive ? (esInc?.image?.url || '') : (es?.image?.url || ''));

  return <>
    <IonModal
      isOpen={currentVocabWord !== null}
      onWillDismiss={() => {
        setCurrentVocabWord(null);
      }}>
      <IonContent id='vocab-modal-id' className='vocab-modal-content'>
        <div className='ion-padding modal-container'>
          <IonButton
            onClick={() => setCurrentVocabWord(null)}
            size='small'
            fill='clear'
            className="close-button-icon"
          >
            <img src={CloseButton} />
          </IonButton>
          <IonList>
            <IonRow style={{gap: '14px'}}>
              <IonCol size='8'>
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
                          {language !== 'en' && (isInclusive ?
                            <SyllableBreakdown word={esInc?.syllable_breakdown} /> : <SyllableBreakdown word={es?.syllable_breakdown} />)}
                          {language === 'en' && <SyllableBreakdown word={en?.syllable_breakdown} />}
                        </h1>
                        {language === 'esen' &&
                          <p className="text-3xl semibold word-color">
                            <SyllableBreakdown word={en?.syllable_breakdown} />
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
                          <p className="text-xl word-color">
                            {en?.definition}
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

const SyllableBreakdown: React.FC<{ word: string }> = ({ word = '' }) => {
  const segments = word
    .split(' ')
    .map((w: string) => w.split('-').map((s: string, index: number) => (
      <span className='vocab-syllable-breakdown segment' key={index}>
        {s}
        <span className='vocab-syllable-breakdown underline'></span>
      </span>
    ))
    );
  return <>
    {segments.map((w: any, index: number) => (
      <span className='vocab-syllable-breakdown word' key={index}>
        {w}
      </span>
    ))}
  </>;
};
