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
import bili from "@/assets/icons/bili_big_avatar.svg";

import "./KeyVocab.css";

const getWordByLanguage = (word: any, language: string) => {
  let payload = word.filter((w: any) => w.language === language);
  return payload.length === 1 ? payload[0].word.split(",")[0].trim() : null;
};

const Word: React.FC<{ word: any }> = ({ word }) => {
  const { language } = useLanguageToggle();
  const { setCurrentVocabWord } = useStory();
  const image = word.image?.url || bili;
  const en = getWordByLanguage(word.word, "en");
  const es = getWordByLanguage(word.word, "es");
  const esInc = getWordByLanguage(word.word, "es-inc");
  return (
    <IonCol
      size="4"
      className="ion-text-center"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setCurrentVocabWord(en);
      }}
    >
      <div>
        <img src={image} style={{ height: 120, width: "auto" }} />
      </div>
      <IonText>
        <h1 className="text-2xl semibold color-selva">
          {language === "en" && en}
          {(language === "es" || language === "esen") && es}
        </h1>
        {language === "esen" && <h2 className="text-xl color-english">{en}</h2>}
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
  const { language } = useLanguageToggle();
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
          className="sf-card drop-shadow story-page ion-no-padding"
          style={{
            display: "block",
            position: "relative",
          }}
        >
          <IonCardContent>
            <IonText>
              <h1 className="text-4xl text-semibold color-suelo ion-text-center">
                {language === "en"
                  ? "Story vocabulary"
                  : "Vocabulario del cuento"}
              </h1>
              {language === "esen" && (
                <h2 className="text-2xl color-english ion-text-center">
                  Story vocabulary
                </h2>
              )}
            </IonText>
            <IonGrid className="ion-no-padding">
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
    <div className="stories-key-vocab-pill drop-shadow">
      <IonImg
        src={icon}
        style={{ height: 38, aspectRatio: 1, marginRight: "1rem" }}
      />
      <IonText>
        <h2 style={{ marginTop: 0 }}>
          <span className="text-lg semibold color-suelo">
            {language === "en" ? text.en : text.es}
          </span>
          {language === "esen" && (
            <span className="text-lg color-english"> {text.en}</span>
          )}
        </h2>
        <p className="text-sm color-english">{value}</p>
      </IonText>
    </div>
  );
};
