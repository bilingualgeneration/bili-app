import { AudioButton } from "@/components/AudioButton";
import classnames from "classnames";
import { DnD, MAX_HEIGHT } from "@/components/DnD";

import { DnDProvider, useDnD } from "@/hooks/DnD";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonImg,
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  useIonModal,
} from "@ionic/react";
import { KeyVocab } from "./KeyVocab";
import { StoriesCongrats } from "./StoriesCongrats";
import { StoriesGame } from "./StoriesGame";
import { StoryProvider, useStory } from "./StoryContext";
import { FirestoreDocProvider, useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useParams } from "react-router";
import { useProfile } from "@/hooks/Profile";
import { useEffect, useMemo, useState } from "react";
import { VocabModal } from "./VocabModal";
import { useAudioManager } from "@/contexts/AudioManagerContext";
import { useHistory } from "react-router-dom";
import { useLanguageToggle } from "@/components/LanguageToggle";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

import "./Stories.scss";
import {
  ActivityProvider,
  GameData,
  useActivity,
} from "@/contexts/ActivityContext";

const getLang = (lang: string, data: any) => {
  return data.filter((d: any) => d.language === lang)[0];
};

const generateKeyVocab = (vocabularyList: any) => {
  // handle story vocabulary
  let vocab = {
    es: {},
    "es-inc": {},
    en: {},
  };
  let keyVocab: any[] = [];
  let vocabLookup = {};
  if (vocabularyList) {
    for (const list of vocabularyList) {
      for (const word of list.words) {
        keyVocab.push(word);
        for (const translation of word.word) {
          for (const targetWord of translation.word
            .split(",")
            .map((s: string) => s.trim())) {
            // todo: better typing
            // @ts-ignore
            vocab[translation.language][targetWord] = {
              ...translation,
              image: word.image,
            };

            // nested loops!
            // needed to build out lookup table
            // performance is ok since it's a max of 3 items
            for (const nestedTranslation of word.word) {
              if (translation.language !== nestedTranslation.language) {
                // @ts-ignore
                if (!vocabLookup[targetWord]) {
                  // @ts-ignore
                  vocabLookup[targetWord] = {
                    [nestedTranslation.language]: targetWord,
                  };
                } else {
                  // @ts-ignore
                  vocabLookup[targetWord][nestedTranslation.language] =
                    targetWord;
                }
              }
            }
          }
        }
      }
    }
  }
  return {
    keyVocab,
    vocab,
    vocabLookup,
  };
};

export const Stories = () => {
  // @ts-ignore
  const { uuid } = useParams();
  return (
    <FirestoreDocProvider
      collection="story"
      id={uuid}
      populate={{
        "story-vocabulary-list": ["story", "==", uuid],
        "dnd-game": ["story", "==", uuid],
        "multiple-choice-game": ["story", "==", uuid],
      }}
    >
      <StoriesHydrated />
    </FirestoreDocProvider>
  );
};

const StoriesHydrated: React.FC = () => {
  const { status, data } = useFirestoreDoc();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      const languageParsedPages = {
        inclusive: data.pages.filter((p: any) =>
          p.text.map((t: any) => t.language).includes("es-inc"),
        ),
        noninclusive: data.pages.filter((p: any) =>
          p.text.map((t: any) => t.language).includes("es"),
        ),
      };
      const { keyVocab, vocab, vocabLookup } = generateKeyVocab(
        data["story-vocabulary-list"],
      );
      return (
        <ActivityProvider>
          <StoryProvider>
            <div id="story-wrapper">
              <div>
                <StoryLoader
                  {...{
                    keyVocab,
                    languageParsedPages,
                    vocab,
                    vocabLookup,
                  }}
                />
              </div>
            </div>
          </StoryProvider>
        </ActivityProvider>
      );
      break;
    default:
      return <>default case</>;
      break;
  }
};

interface StoryLoaderProps {
  keyVocab: any;
  vocab: any;
  vocabLookup: any;
}

const allLanguages = ["en", "es", "es-inc"];

export const StoryLoader = ({
  keyVocab: propsKeyVocab,
  vocab: propsVocab,
  vocabLookup: propsVocabLookup,
}: StoryLoaderProps) => {
  // @ts-ignore
  const { uuid } = useParams();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { setTempAllowedLanguages, setTempLanguage, language } =
    useLanguageToggle();

  const history = useHistory();

  const {
    pages,
    pageNumber,
    ready,
    setId,
    setIsTranslanguaged,
    setPageLocks,
    setPageNumber,
    setPages,
    setReady,
    setVocab,
    setVocabLookup,
  } = useStory();

  const { setGamesData, setActivityState } = useActivity();
  const { data } = useFirestoreDoc();
  useEffect(() => {
    setActivityState({
      type: "story",
      id: uuid,
    });
    setId(uuid);
    setVocabLookup(propsVocabLookup);
    setVocab(propsVocab);

    const gamesData: GameData = new Map();

    let tempPages: any[] = [];
    tempPages.push({
      component: (
        <TitleCard
          cover_image={data.cover_image}
          is_student_story={data.is_student_story ?? false}
          is_translanguaged={data.is_translanguaged ?? false}
          title={data.title}
        />
      ),
      id: "title card",
      languages: allLanguages,
    });
    tempPages.push({
      component: (
        <>
          <KeyVocabPageWrapper>
            <KeyVocab
              age_min={data.age_min}
              age_max={data.age_max}
              author={data.author}
              illustrator={data.illustrator}
              narrator={data.narrator}
              words={propsKeyVocab}
            />
          </KeyVocabPageWrapper>
          <PageCounter />
        </>
      ),
      id: "key vocab",
      languages: allLanguages,
    });
    tempPages = tempPages.concat(
      data.pages.map((p: any, index: number) => {
        const languages = p.text.map((subp: any) => subp.language);
        return {
          component: (
            <>
              <PageWrapper>
                <StoryPage page={p} languages={languages} />
              </PageWrapper>
              <PageCounter />
            </>
          ),
          id: `story page ${index}`,
          languages,
        };
      }),
    );
    for (const dndGame of data["dnd-game"]) {
      tempPages.push({
        component: (
          <>
            <PageWrapper>
              <DnDGame data={dndGame} languages={[dndGame.language]} />
            </PageWrapper>
            <PageCounter />
          </>
        ),
        id: `dnd ${dndGame.uuid}`,
        languages: [dndGame.language],
      });
      gamesData.set(dndGame.uuid, {
        totalMistakesPossible: dndGame.pieces.length,
      });
    }
    for (const mcg of data["multiple-choice-game"]) {
      const hasAudio = mcg.choices[0].audio !== null;
      const correctChoice = mcg.choices.filter(
        (choice: any) => choice.isCorrect,
      )[0];
      const incorrectChoices = mcg.choices.filter(
        (choice: any) => !choice.isCorrect,
      );
      const mcgType = hasAudio ? "syllable" : "image";
      let payload = {
        [`multiple_${mcgType}_text`]: mcg.instructions,
        [`multiple_${mcgType}_correct_image`]: correctChoice.image,
        [`multiple_${mcgType}_correct_audio`]: correctChoice.audio,
      };
      for (let index = 0; index < 3; index++) {
        payload[`multiple_${mcgType}_incorrect_image_${index + 1}`] =
          incorrectChoices[index].image;
        payload[`multiple_${mcgType}_incorrect_audio_${index + 1}`] =
          incorrectChoices[index].audio;
      }
      tempPages.push({
        component: (
          <>
            <PageWrapper>
              <IonCol size="auto">
                <StoriesGameWrapper
                  id={mcg.uuid}
                  game={payload}
                  gameType={hasAudio ? "syllable" : "image"}
                  languages={mcg.language}
                />
              </IonCol>
            </PageWrapper>
            <PageCounter />
          </>
        ),
        id: `mcg ${mcg.uuid}`,
        languages: mcg.language,
      });
      gamesData.set(mcg.uuid, {
        totalMistakesPossible: mcg.choices.length,
      });
    }

    tempPages.push({
      component: (
        <>
          <PageWrapper>
            <IonCol size="auto">
              <StoriesCongrats
                onKeepGoingClick={() => {
                  history.push("/stories");
                }}
              />
            </IonCol>
          </PageWrapper>
          <PageCounter />
        </>
      ),
      id: "congrats",
      languages: allLanguages,
    });

    setIsTranslanguaged(data.is_translanguaged);
    setPages(tempPages);
    setPageNumber(0);
    setReady(true);

    if (data.is_translanguaged) {
      setTempLanguage("esen");
      setTempAllowedLanguages(["esen"]);
      return () => {
        setTempLanguage(null);
        setTempAllowedLanguages(null);
      };
    } else {
      return () => {};
    }
  }, []);
  if (ready === false) {
    return <></>;
  }
  return pages[pageNumber].component;
};

const PageCounter = () => {
  const { pages, pageNumber } = useStory();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();

  const filteredPages = useMemo(
    () =>
      pages.filter((p: any) =>
        p.languages.includes(
          language === "en" ? "en" : isInclusive ? "es-inc" : "es",
        ),
      ),
    [pages, language, isInclusive],
  );
  const currentPage = pages[pageNumber];
  const filteredPageNumber = filteredPages.findIndex(
    (p: any) => p.id === currentPage.id,
  );
  const totalPages = filteredPages.length;
  let pills = [];
  for (let index = 0; index < totalPages!; index++) {
    if (index <= filteredPageNumber!) {
      pills.push(true);
    } else {
      pills.push(false);
    }
  }

  const styles = {
    height: 8,
    width: "3rem",
    borderRadius: 4,
    display: "inline-block",
    marginLeft: 4,
    marginRight: 4,
  };

  const stylesFilled = {
    ...styles,
    backgroundColor: "#006a67",
  };

  const stylesEmpty = {
    ...styles,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  };

  return (
    <div className="ion-text-center margin-top-2">
      {pills.map((p: boolean, index: number) => {
        if (p) {
          return <div style={stylesFilled} key={index}></div>;
        } else {
          return <div style={stylesEmpty} key={index}></div>;
        }
      })}
    </div>
  );
};

interface MetaFlag {
  color: string;
  primaryText: string;
  secondaryText?: string;
}

const MetaFlag: React.FC<MetaFlag> = ({
  color,
  primaryText,
  secondaryText,
}) => {
  return (
    <div id="story-translanguaged-flag" className={`background-${color}`}>
      <IonText>
        <div className="text-xs semibold color-suelo">{primaryText}</div>
        {secondaryText && (
          <div className="text-xs color-grey">{secondaryText}</div>
        )}
      </IonText>
    </div>
  );
};

interface TitleCard {
  cover_image: any;
  is_student_story: boolean;
  is_translanguaged: boolean;
  title: string;
}

const TitleCard = ({
  cover_image,
  is_student_story,
  is_translanguaged,
  title,
}: TitleCard) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { pageForward } = useStory();
  return (
    <div className="content-wrapper">
      <IonCard
        className="sf-card drop-shadow story-page story-title-card"
        style={{
          backgroundImage: `url(${cover_image.url})`,
        }}
      >
        {is_translanguaged && (
          <MetaFlag
            color="cielo-low"
            primaryText={
              language === "en" ? "Translanguage Story" : "Cuento Translenguaje"
            }
            secondaryText={
              language === "esen" ? "Translanguage Story" : undefined
            }
          />
        )}
        {is_student_story && (
          <MetaFlag
            color="flamenco-flamenco"
            primaryText={
              language === "en" ? "Student Story" : "Cuento de Estudiante"
            }
            secondaryText={language === "esen" ? "Student Story" : undefined}
          />
        )}
        <IonCardContent>
          <IonText
            className="ion-text-center"
            style={{
              display: "block",
              height: "140px",
            }}
          >
            <h1 className="text-3xl color-suelo">
              {language === "en"
                ? getLang("en", title).text
                : getLang(isInclusive ? "es-inc" : "es", title).text}
            </h1>
            {language === "esen" && (
              <p className="text-xl color-english">
                {getLang("en", title).text}
              </p>
            )}
          </IonText>
          <div className="ion-text-center">
            <button
              //shape="round"
              onClick={pageForward}
              className="continue-story-button"
            >
              <IonText
                style={{
                  paddingLeft: "5rem",
                  paddingRight: "5rem",
                }}
              >
                <h1 className="text-2xl semibold color-nube">
                  {language === "en" ? "Let's read!" : "¡Leamos!"}
                </h1>
                {language === "esen" && (
                  <p className="text-sm color-nube">Let's read!</p>
                )}
              </IonText>
            </button>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { pageBackward, pageForward, pageNumber, pages, pageLocks } =
    useStory();
  const totalPages = pages.length;
  return (
    <div className="content-wrapper">
      <IonGrid>
        <IonRow>
          <IonCol />
          <IonImg
            className="page-control backward"
            src={backward}
            onClick={pageBackward}
          />
          {children}
          <IonImg
            className={classnames("page-control", "forward", {
              locked: pageLocks[pageNumber],
            })}
            src={forward}
            onClick={pageForward}
            style={{ opacity: pageNumber === totalPages - 1 ? 0 : 1 }}
          />
          <IonCol />
        </IonRow>
      </IonGrid>
    </div>
  );
};

const KeyVocabPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { pageBackward, pageForward, pageNumber, pages, pageLocks } =
    useStory();
  const totalPages = pages.length;
  return (
    <div className="content-wrapper">
      <IonGrid>
        <IonRow>
          <IonCol />
          <IonImg
            className="page-control backward"
            src={backward}
            onClick={pageBackward}
          />
          {children}
          <IonImg
            className={classnames("page-control", "forward", {
              locked: pageLocks[pageNumber],
            })}
            src={forward}
            onClick={pageForward}
            style={{ opacity: pageNumber === totalPages - 1 ? 0 : 1 }}
          />
          <IonCol />
        </IonRow>
      </IonGrid>
    </div>
  );
};

const SegmentedText: React.FC<
  React.PropsWithChildren<{ language: string }>
> = ({ children, language }) => {
  const { setCurrentVocabWord, vocab } = useStory();
  let isItalic: boolean = false;
  // @ts-ignore
  return children!.split(" ").map((text: string, index: number) => {
    let classes = ["word"];
    const normalized_word = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]*$/, "");
    if (vocab[language][normalized_word]) {
      classes.push("vocab");
    }
    if (text.startsWith("*")) {
      isItalic = true;
    }
    if (isItalic) {
      classes.push("italic");
    }
    if (text.endsWith("*")) {
      isItalic = false;
    }
    return (
      <span
        className={classnames(classes)}
        onClick={() => {
          if (vocab[language][normalized_word]) {
            setCurrentVocabWord(normalized_word);
          }
        }}
        key={index}
      >
        {text.replace(/^\*|\*$/g, "")}
      </span>
    );
  });
};

export const StoryPage: React.FC<
  React.PropsWithChildren<{ page: any; languages: any[] }>
> = ({ page, languages }) => {
  const { isTranslanguaged, pageNumber, pages, pageForward, pageBackward } =
    useStory();
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { addAudio, clearAudio } = useAudioManager();
  useEffect(() => {
    return clearAudio;
  }, []);
  useEffect(() => {
    clearAudio();
  }, [pageNumber]);

  useEffect(() => {
    // check if page has the correct language
    switch (language) {
      case "en":
        if (!languages.includes("en")) {
          pageBackward();
        }
        break;
      case "esen":
        if (
          !languages.includes("en") ||
          !(isInclusive
            ? languages.includes("es-inc")
            : languages.includes("es"))
        ) {
          pageBackward();
        }
        break;
      case "es":
        if (
          isInclusive
            ? !languages.includes("es-inc")
            : !languages.includes("es")
        ) {
          pageBackward();
        }
        break;
      default:
      // this should never fire
    }
  }, [isInclusive, language, languages, pageBackward]);

  const defaultTexts: any = {
    en: { text: "" },
    es: { text: "" },
    "es-inc": { text: "" },
  };
  const texts = {
    ...defaultTexts,
    ...Object.fromEntries(page.text.map((p: any) => [p.language, p])),
  };
  return (
    <>
      <IonCol size="auto">
        <IonCard className="sf-card drop-shadow story-page">
          <IonCardContent
            className="ion-text-center ion-no-padding"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div></div>
            <IonText className="ion-text-center">
              <h1 className="text-1_5xl semibold color-suelo">
                <SegmentedText language={language === "esen" ? "es" : language}>
                  {language === "en"
                    ? texts.en.text
                    : isInclusive
                      ? texts["es-inc"].text
                      : texts.es.text}
                </SegmentedText>
              </h1>
              {!isTranslanguaged && language === "esen" && (
                <p className="text-lg color-english">
                  <SegmentedText language="en">{texts.en.text}</SegmentedText>
                </p>
              )}
            </IonText>
            <div>
              <AudioButton
                audio={{
                  en: { url: texts["en"].audio.url },
                  es: {
                    url: isInclusive
                      ? texts["es-inc"].audio.url
                      : texts["es"].audio.url,
                  },
                }}
              />
            </div>
          </IonCardContent>
        </IonCard>
      </IonCol>
      <IonCol size="auto">
        <IonCard className="sf-card drop-shadow story-page">
          <IonCardContent className="ion-text-center ion-no-padding">
            <img src={page.image.url} />
          </IonCardContent>
        </IonCard>
      </IonCol>
      <VocabModal />
    </>
  );
};

const DnDGame: React.FC<{ data: any; languages: any }> = ({
  data,
  languages,
}) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { pageBackward } = useStory();

  useEffect(() => {
    // check if page has the correct language
    switch (language) {
      case "en":
        if (!languages.includes("en")) {
          pageBackward();
        }
        break;
      case "esen":
        if (
          !languages.includes("en") ||
          !(isInclusive
            ? languages.includes("es-inc")
            : languages.includes("es"))
        ) {
          pageBackward();
        }
        break;
      case "es":
        if (
          isInclusive
            ? !languages.includes("es-inc")
            : !languages.includes("es")
        ) {
          pageBackward();
        }
        break;
      default:
      // this should never fire
    }
  }, [isInclusive, language, languages, pageBackward]);
  return (
    <DnDProvider>
      <WrappedDnDGame data={data} />
    </DnDProvider>
  );
};

const WrappedDnDGame: React.FC<{ data: any }> = ({ data }) => {
  const { pageLocks, setPageLocks, pageNumber, pageForward } = useStory();
  const { piecesDropped, totalTargets } = useDnD();
  useEffect(() => {
    if (piecesDropped >= totalTargets && totalTargets > 0) {
      /*
      setPageLocks({
        ...pageLocks,
        [pageNumber]: false,
      });
      */
      pageForward();
    }
  }, [piecesDropped, totalTargets]);

  return (
    <>
      <IonCol size="auto">
        <div style={{ height: MAX_HEIGHT }}>
          <IonText>
            <h1 className="text-4xl ion-text-center color-suelo">
              {data.instructions}
            </h1>
          </IonText>
          <DnD
            gameId={data.uuid}
            audioOnComplete={data.audio_on_complete}
            width={1366}
            target={data.target}
            pieces={data.pieces}
          />
        </div>
      </IonCol>
    </>
  );
};

const StoriesGameWrapper: React.FC<any> = ({
  id,
  game,
  gameType,
  languages,
}) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { pageBackward } = useStory();
  useEffect(() => {
    // check if page has the correct language
    switch (language) {
      case "en":
        if (!languages.includes("en")) {
          pageBackward();
        }
        break;
      case "esen":
        if (
          !languages.includes("en") ||
          !(isInclusive
            ? languages.includes("es-inc")
            : languages.includes("es"))
        ) {
          pageBackward();
        }
        break;
      case "es":
        if (
          isInclusive
            ? !languages.includes("es-inc")
            : !languages.includes("es")
        ) {
          pageBackward();
        }
        break;
      default:
      // this should never fire
    }
  }, [isInclusive, language, languages, pageBackward]);
  if (
    game[`multiple_${gameType}_text`].filter(
      (a: any) => a.language === language,
    ).length === 0
  ) {
    // no suitable language found
    return <></>;
  }
  return (
    <StoriesGame
      {...{
        id,
        game,
        gameType,
      }}
    />
  );
};
