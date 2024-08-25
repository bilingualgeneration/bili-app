import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { VocabModal } from "./VocabModal";
import { useLanguageToggle } from "@/components/LanguageToggle";
import { useStory } from "./StoryContext";

import AgesIcon from "@/assets/icons/ages_icon.png";
import AuthorIcon from "@/assets/icons/author_icon.png";
import IllustratorIcon from "@/assets/icons/illustrator_icon.png";
import NarratorIcon from "@/assets/icons/narrator_icon.png";

const getWordByLanguage = (word: any, language: string) => {
  let payload = word.filter((w: any) => w.language === language);
  return payload.length === 1 ? payload[0].word.split(",")[0].trim() : null;
};

const Word: React.FC<{ word: any }> = ({ word }) => {
  const { language } = useLanguageToggle();
  const { setCurrentVocabWord } = useStory();
  const image = word.image.url;
  const en = getWordByLanguage(word.word, "en");
  const es = getWordByLanguage(word.word, "es");
  const esInc = getWordByLanguage(word.word, "es-inc");
  return (
    <IonCol
      size="4"
      className="ion-text-center"
      onClick={() => {
        setCurrentVocabWord(en);
      }}
    >
      <div>
        <img src={image} style={{ height: 120, width: "auto" }} />
      </div>
      <IonText>
        <h1 className="text-2xl semibold color-suelo">
          {language === "en" && en}
          {(language === "es" || language === "esen") && es}
        </h1>
        {language === "esen" && (
          <h2 className="text-1xl color-english">{en}</h2>
        )}
      </IonText>
    </IonCol>
  );
};

interface KeyVocab {
  words: any;
  age_min: any;
  age_max: any;
  author: any;
  illustrator: any;
  narrator: any;
}

export const KeyVocab: React.FC<KeyVocab> = ({
  words,
  age_min,
  age_max,
  author,
  illustrator,
  narrator,
}) => {
  return (
    <>
      <IonCol size="auto">
        <IonCard className="sf-card drop-shadow story-page">
          <IonCardContent>
            <Pill
              icon={AgesIcon}
              text={{
                en: "Ages",
                es: "Edades",
              }}
              value={`${age_min}-${age_max}`}
            />
            <Pill
              icon={AuthorIcon}
              text={{
                es: "Escrito por",
                en: "Written by",
              }}
              value={author}
            />
            <Pill
              icon={IllustratorIcon}
              text={{
                es: "Ilustrado por",
                en: "Illustrated by",
              }}
              value={illustrator}
            />
            <Pill
              icon={NarratorIcon}
              text={{
                es: "Narrado por",
                en: "Narrated by",
              }}
              value={narrator}
            />
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol size="auto">
        <IonCard
          className="sf-card drop-shadow story-page"
          style={{
            display: "block",
            position: "relative",
          }}
        >
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {Object.values(words).map((word: any) => (
                  <Word key={word.handle} word={word} />
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <VocabModal />
    </>
  );
};

const Pill: (args: any) => any = ({ icon, text, value }) => {
  const { language } = useLanguageToggle();
  return (
    <IonGrid
      style={{
        backgroundColor: "white",
        border: "1px solid #bebebe",
        borderRadius: "1rem",
      }}
      className="drop-shadow margin-bottom-1"
    >
      <IonRow style={{ alignItems: "center" }}>
        <IonCol size="1">
          <IonImg src={icon} />
        </IonCol>
        <IonCol size="auto">
          <IonText>
            <h2
              style={{ marginTop: 0 }}
              className="text-lg semibold color-suelo"
            >
              {language === "en" ? text.en : text.es}
            </h2>
            <p className="text-sm color-english">{value}</p>
          </IonText>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
