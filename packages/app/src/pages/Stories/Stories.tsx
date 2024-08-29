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
import { useEffect, useState } from "react";
import { VocabModal } from "./VocabModal";
import volumeButton from "@/assets/icons/sf_audio_button.svg";
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
      return (
        <ActivityProvider>
          <StoryProvider>
            <StoryLoader />
          </StoryProvider>
        </ActivityProvider>
      );
      break;
    default:
      return <>default case</>;
      break;
  }
};

export const StoryLoader = () => {
  // @ts-ignore
  const { uuid } = useParams();
  const { language } = useLanguageToggle();

  const history = useHistory();

  const {
    pages,
    setPages,
    setPageNumber,
    pageNumber,
    ready,
    setPageLocks,
    setReady,
    setVocab,
    setVocabLookup,
    setId,
  } = useStory();

  const { setGamesData, setActivityState } = useActivity();

  const { status, data } = useFirestoreDoc();
  console.log("data", data);

  const {
    profile: { isInclusive },
  } = useProfile();

  useEffect(() => {
    if (!uuid) return;

    setActivityState({
      type: "story",
      id: uuid,
    });
  }, [uuid]);

  useEffect(() => {
    if (data) {
      setId(uuid);

      let firstGamePageNumber = null;
      const gamesData: GameData = new Map();

      const fp = data.pages.filter((p: any) => {
        const langs = p.text.map((t: any) => t.language);
        if (isInclusive) {
          return langs.includes("es-inc");
        } else {
          return langs.includes("es");
        }
      });
      let pages: any[] = [];
      let pageLocks: any = {};
      // push intro page
      pages.push(<TitleCard data={data} />);

      // handle story vocabulary
      let tempVocab = {
        es: {},
        "es-inc": {},
        en: {},
      };
      let keyVocab: any[] = [];
      if (data["story-vocabulary-list"]) {
        let tempVocabLookup = {};
        for (const list of data["story-vocabulary-list"]) {
          for (const word of list.words) {
            keyVocab.push(word);
            for (const translation of word.word) {
              for (const targetWord of translation.word
                .split(",")
                .map((s: string) => s.trim())) {
                // todo: better typing
                // @ts-ignore
                tempVocab[translation.language][targetWord] = {
                  ...translation,
                  image: word.image,
                };

                // nested loops!
                // needed to build out lookup table
                // performance is ok since it's a max of 3 items
                for (const nestedTranslation of word.word) {
                  if (translation.language !== nestedTranslation.language) {
                    // @ts-ignore
                    if (!tempVocabLookup[targetWord]) {
                      // @ts-ignore
                      tempVocabLookup[targetWord] = {
                        [nestedTranslation.language]: targetWord,
                      };
                    } else {
                      // @ts-ignore
                      tempVocabLookup[targetWord][nestedTranslation.language] =
                        targetWord;
                    }
                  }
                }
              }
            }
          }
        }
        setVocabLookup(tempVocabLookup);
        setVocab(tempVocab);
      }

      // key vocab
      if (
        (language === "en" && Object.keys(tempVocab.en).length > 0) ||
        (language.startsWith("es") &&
          Object.keys(tempVocab.es).length +
            Object.keys(tempVocab["es-inc"]).length >
            0)
      ) {
        pages.push(
          <>
            <KeyVocabPageWrapper>
              <KeyVocab
                age_min={data.age_min}
                age_max={data.age_max}
                author={data.author}
                illustrator={data.illustrator}
                narrator={data.narrator}
                words={keyVocab}
              />
            </KeyVocabPageWrapper>
            <PageCounter />
          </>,
        );
      }

      // push filtered pages
      pages = pages.concat(
        fp.map((data: any) => (
          <>
            <PageWrapper>
              <StoryPage page={data} />
            </PageWrapper>
            <PageCounter />
          </>
        )),
      );

      for (let index = 0; index < data["dnd-game"].length; index++) {
        pageLocks[pages.length + index] = true;
      }

      if (data["dnd-game"]) {
        const gamePages = data["dnd-game"]
          .filter((d: any) => {
            if (isInclusive && language === "es") {
              return d.language === "es-inc";
            } else {
              return d.language === language;
            }
          })
          .map((data: any, index: number) => {
            console.log("data dnd", data);
            gamesData.set(data.uuid, {
              totalMistakesPossible: data.pieces.length,
            });
            // gamesData[pages.length + index] = {
            //   totalMistakesPossible: data.pieces.length,
            // };

            return (
              <>
                <PageWrapper>
                  <DnDGame data={data} />
                </PageWrapper>
                <PageCounter />
              </>
            );
          });

        if (!firstGamePageNumber) firstGamePageNumber = pages.length;

        pages = pages.concat(gamePages);
      }

      if (data["multiple-choice-game"]) {
        const gamePages = data["multiple-choice-game"]
          .filter((mcg: any) => mcg.language.includes(language))
          .map((mcg: any, index: number) => {
            gamesData.set(mcg.uuid, {
              totalMistakesPossible: mcg.choices.length,
            });
            // gamesData[pages.length + index] = {
            //   totalMistakesPossible: mcg.choices.length,
            // };

            const hasAudio = mcg.choices[0].audio !== null;
            const correctChoice = mcg.choices.filter(
              (choice: any) => choice.isCorrect,
            )[0];
            const incorrectChoices = mcg.choices.filter(
              (choice: any) => !choice.isCorrect,
            );
            let payload;
            if (hasAudio) {
              // todo: refactor
              payload = {
                multiple_syllable_text: mcg.instructions,
                multiple_syllable_correct_image: correctChoice.image,
                multiple_syllable_correct_audio: correctChoice.audio,
                multiple_syllable_incorrect_image_1: incorrectChoices[0].image,
                multiple_syllable_incorrect_audio_1: incorrectChoices[0].audio,
                multiple_syllable_incorrect_image_2: incorrectChoices[1].image,
                multiple_syllable_incorrect_audio_2: incorrectChoices[1].audio,
                multiple_syllable_incorrect_image_3: incorrectChoices[2].image,
                multiple_syllable_incorrect_audio_3: incorrectChoices[2].audio,
              };
            } else {
              payload = {
                multiple_image_text: mcg.instructions,
                multiple_image_correct_image: correctChoice.image,
                multiple_image_correct_audio: correctChoice.audio,
                multiple_image_incorrect_image_1: incorrectChoices[0].image,
                multiple_image_incorrect_audio_1: incorrectChoices[0].audio,
                multiple_image_incorrect_image_2: incorrectChoices[1].image,
                multiple_image_incorrect_audio_2: incorrectChoices[1].audio,
                multiple_image_incorrect_image_3: incorrectChoices[2].image,
                multiple_image_incorrect_audio_3: incorrectChoices[2].audio,
              };
            }

            return (
              <>
                <PageWrapper>
                  <IonCol size="auto">
                    <StoriesGame
                      id={mcg.uuid}
                      game={payload}
                      gameType={hasAudio ? "syllable" : "image"}
                    />
                  </IonCol>
                </PageWrapper>
                <PageCounter />
              </>
            );
          });

        if (!firstGamePageNumber) firstGamePageNumber = pages.length;

        pages = pages.concat(gamePages);
      }

      if (
        data.multiple_syllable_text &&
        data.multiple_syllable_text.length > 0
      ) {
        console.log("multi syll", data.multiple_syllable_text);
        pageLocks[pages.length] = true;

        const gameId = "multiple_syllable_text";

        gamesData.set(gameId, {
          totalMistakesPossible: 4,
        });
        // gamesData[pages.length] = {
        //   totalMistakesPossible: 4,
        // };

        if (!firstGamePageNumber) firstGamePageNumber = pages.length;

        pages.push(
          <>
            <PageWrapper>
              <IonCol size="auto">
                <StoriesGame id={gameId} game={data} gameType="syllable" />
              </IonCol>
            </PageWrapper>
            <PageCounter />
          </>,
        );
      }

      pages.push(
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
        </>,
      );

      setGamesData(gamesData);
      setPageLocks(pageLocks);
      setPages(pages);
      // setFirstGamePageNumber(firstGamePageNumber);
      setPageNumber(0);
      setReady(true);
    }
  }, [data, language]);

  if (status === "loading" || ready === false) {
    return <></>;
  }
  return pages[pageNumber];
};

const PageCounter = () => {
  const { pages, pageNumber } = useStory();
  const totalPages = pages.length;
  let pills = [];
  for (let index = 0; index < totalPages!; index++) {
    if (index <= pageNumber!) {
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

const TitleCard = ({ data }: any) => {
  const {
    profile: { isInclusive },
  } = useProfile();
  const { language } = useLanguageToggle();
  const { pageForward } = useStory();
  return (
    <div className="content-wrapper padding-top-1">
      <IonCard
        className="sf-card drop-shadow story-page"
        style={{
          background: `url(${data.cover_image.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
          display: "block",
          position: "relative",
        }}
      >
        <IonCardContent>
          <IonText className="ion-text-center">
            <h1 className="text-5xl color-suelo">
              {language === "en"
                ? getLang("en", data.title).text
                : getLang(isInclusive ? "es-inc" : "es", data.title).text}
            </h1>
            {language === "esen" && (
              <p className="text-3xl color-english">
                {getLang("en", data.title).text}
              </p>
            )}
          </IonText>
        </IonCardContent>
        <div
          className="ion-text-center"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: 0,
            padding: "auto",
            width: "100%",
          }}
        >
          <IonButton shape="round" onClick={pageForward}>
            <IonText
              style={{
                paddingLeft: "5rem",
                paddingRight: "5rem",
              }}
            >
              <h1 className="text-3xl semibold color-nube">
                {language === "en" ? "Let's read!" : "¡Leamos!"}
              </h1>
              {language === "esen" && (
                <p className="text-sm color-nube">Let's read!</p>
              )}
            </IonText>
          </IonButton>
        </div>
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
    <div className="content-wrapper padding-top-1">
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
    <div className="content-wrapper padding-top-1">
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

export const StoryPage: React.FC<React.PropsWithChildren<{ page: any }>> = ({
  page,
}) => {
  const { pageNumber, pages, pageForward, pageBackward } = useStory();
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
  const texts = Object.fromEntries(page.text.map((p: any) => [p.language, p]));
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
              {language === "esen" && (
                <p className="text-lg color-english">
                  <SegmentedText language="en">{texts.en.text}</SegmentedText>
                </p>
              )}
            </IonText>
            <div>
              <IonButton
                size="small"
                fill="clear"
                className="stories-volume-button"
                onClick={() => {
                  let audios = [];
                  switch (language) {
                    case "en":
                      if (texts["en"].audio) {
                        audios.push(texts["en"].audio.url);
                      }
                      break;
                    case "es":
                      if (isInclusive) {
                        if (texts["es-inc"].audio) {
                          audios.push(texts["es-inc"].audio.url);
                        }
                      } else {
                        if (texts["es"].audio) {
                          audios.push(texts["es"].audio.url);
                        }
                      }

                      break;
                    case "esen":
                      if (isInclusive) {
                        if (texts["es-inc"].audio) {
                          audios.push(texts["es-inc"].audio.url);
                        }
                      } else {
                        if (texts["es"].audio) {
                          audios.push(texts["es"].audio.url);
                        }
                      }
                      if (texts["en"].audio) {
                        audios.push(texts["en"].audio.url);
                      }
                      break;
                    default:
                      break;
                  }
                  addAudio(audios);
                }}
              >
                <img className="stories-volume-icon" src={volumeButton} />
              </IonButton>
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

const DnDGame: React.FC<{ data: any }> = ({ data }) => {
  return (
    <DnDProvider>
      <WrappedDnDGame data={data} />
    </DnDProvider>
  );
};

const WrappedDnDGame: React.FC<{ data: any }> = ({ data }) => {
  console.log("dnd game", data);
  const { pageLocks, setPageLocks, pageNumber, pageForward } = useStory();
  const { piecesDropped, totalTargets } = useDnD();
  useEffect(() => {
    if (piecesDropped >= totalTargets && totalTargets > 0) {
      setPageLocks({
        ...pageLocks,
        [pageNumber]: false,
      });
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
