import classnames from "classnames";
import { I18nMessage } from "@/components/I18nMessage";
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
import { useLanguage } from "@/hooks/Language";
import { useStory } from "./StoryContext";

import AgesIcon from "@/assets/icons/ages_icon.svg";
import AuthorIcon from "@/assets/icons/author_icon.png";
import IllustratorIcon from "@/assets/icons/illustrator_icon.png";
import NarratorIcon from "@/assets/icons/narrator_icon.png";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import bili from "@/assets/icons/bili_big_avatar.svg";

import "./KeyVocabPage.scss";

const getWordByLanguage = (word: any, language: string) => {
  let payload = word.filter((w: any) => w.language === language);
  return payload.length === 1 ? payload[0].word.split(",")[0].trim() : null;
};

const Word: React.FC<{ word: any }> = ({ word }) => {
  const { populateText } = useLanguage();
  const { setCurrentVocabHandle, sendAnalytics } = useStory();
  const image = word.image?.url || bili;
  const words = populateText(word.word);

  return (
    <IonCol
      size="4"
      className="ion-text-center"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setCurrentVocabHandle(word.handle);
      }}
    >
      <div>
        <img src={image} style={{ height: "6rem", width: "auto" }} />
      </div>
      <IonText>
        <h1 className="text-2xl semibold color-selva">
          {words[0]?.word.split(",")[0].trim()}
        </h1>
        {words.length > 1 && (
          <p className="text-xl color-english">
            {words[1].word.split(",")[0].trim()}
          </p>
        )}
      </IonText>
    </IonCol>
  );
};

interface KeyVocabPage {
  words: any;
  age_min: any;
  age_max: any;
  author: any;
  illustrator: any;
  narrator: any;
}

export const KeyVocabPage: React.FC<KeyVocabPage> = ({
  words,
  age_min,
  age_max,
  author,
  illustrator,
  narrator,
}) => {
  const { language } = useLanguage();
  return (
    <>
      <IonCol size="6">
        <IonCard
          className="drop-shadow story-page"
          style={{ marginLeft: "auto" }}
        >
          <IonCardContent>
            <Pill
              icon={AgesIcon}
              text={[
                {
                  language: "es",
                  text: "Edades",
                },
                {
                  language: "es-inc",
                  text: "Edades",
                },
                {
                  language: "en",
                  text: "Ages",
                },
              ]}
              value={`${age_min}-${age_max}`}
            />
            <Pill
              icon={AuthorIcon}
              text={[
                {
                  language: "es",
                  text: "Escrito por",
                },
                {
                  language: "es-inc",
                  text: "Escrito por",
                },
                {
                  language: "en",
                  text: "Written by",
                },
              ]}
              value={author}
            />
            <Pill
              icon={IllustratorIcon}
              text={[
                {
                  language: "es",
                  text: "Illustrado por",
                },
                {
                  language: "es-inc",
                  text: "Illustrado por",
                },
                {
                  language: "en",
                  text: "Illustrated by",
                },
              ]}
              value={illustrator}
            />
            <Pill
              icon={NarratorIcon}
              text={[
                {
                  language: "es",
                  text: "Narrado por",
                },
                {
                  language: "es-inc",
                  text: "Narrado por",
                },
                {
                  language: "en",
                  text: "Narrated by",
                },
              ]}
              value={narrator}
            />
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol size="6">
        <IonCard className="drop-shadow story-page ion-no-padding">
          <IonCardContent>
            <IonText>
              <h1 className="text-4xl semibold color-suelo margin-top-1 ion-text-center">
                <I18nMessage id="story.keyVocabulary.title" />
              </h1>
              <I18nMessage
                id="story.keyVocabulary.title"
                level={2}
                wrapper={(text: string) => (
                  <h2 className="text-2xl color-english margin-bottom-1 ion-text-center">
                    {text}
                  </h2>
                )}
              />
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
  const { populateText } = useLanguage();
  const texts = populateText(text);
  return (
    <div className="stories-key-vocab-pill drop-shadow">
      <IonImg
        src={icon}
        style={{ height: "2.5rem", aspectRatio: 1, marginRight: "1rem" }}
      />
      <IonText>
        <h2 style={{ marginTop: 0 }}>
          <span className="text-xl semibold color-suelo">{texts[0].text}</span>
          {texts.length > 1 && (
            <span className="text-xl color-english"> {texts[1].text}</span>
          )}
        </h2>
        <p className="text-md color-english">{value}</p>
      </IonText>
    </div>
  );
};
