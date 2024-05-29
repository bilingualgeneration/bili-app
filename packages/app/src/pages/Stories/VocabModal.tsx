import {
  IonContent,
  IonModal,
} from '@ionic/react';
import {useLanguageToggle} from '@/components/LanguageToggle';
import {useStory} from './StoryContext';

// todo: ion-padding on IonContent is overridden

export const VocabModal: React.FC = () => {
  const {language} = useLanguageToggle(); // is es, esen, or en
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
      }}>
      <IonContent>
	<div className='ion-padding'>
	  stuff goes here
	</div>
      </IonContent>
    </IonModal>
  </>;
}
