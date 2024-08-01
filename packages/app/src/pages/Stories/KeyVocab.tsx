import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
} from '@ionic/react';
import { useLanguageToggle } from "@/components/LanguageToggle";

const getWordByLanguage = (word: any, language: string) => {
  let payload = word.filter((w: any) => w.language === language);
  return payload.length === 1 ? payload[0].word.split(',')[0].trim() : null;
}

const Word: React.FC<{word: any}> = ({word}) => {
  const { language } = useLanguageToggle();
  const image = word.image.url;
  const en = getWordByLanguage(word.word, 'en');
  const es = getWordByLanguage(word.word, 'es');
  const esInc = getWordByLanguage(word.word, 'es-inc');
  return <IonCol size='4' className='ion-text-center'>
    <div>
      <img src={image} style={{height: 120, width: 'auto'}} />
    </div>
    <IonText>
      <h1 className='text-2xl semibold color-suelo'>
	{language === 'en' && en}
	{(language === 'es' || language === 'esen') && es}
      </h1>
      {language === 'esen' &&
      <h2 className='text-1xl color-english'>
	{en}
      </h2>}
    </IonText>
  </IonCol>;
};

export const KeyVocab: React.FC<{words: any}> = ({
  words
}) => {
  return <IonCard
           className="sf-card drop-shadow story-page"
           style={{
             display: "block",
             position: "relative",
           }}
	 >
    <IonCardContent>
      <IonGrid>
	<IonRow>
	  {Object.values(words).map((word: any) => <Word key={word.handle} word={word} />)}
	</IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>;
};
