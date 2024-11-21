import { DnDGame } from "./DnDGame";
import { TitleCard } from "./TitleCard";
import { PageCounter } from "./PageCounter";
import { KeyVocabPage } from "./KeyVocabPage";
import { PageWrapper } from "./PageWrapper";
import { StoriesCongrats } from "./StoriesCongrats";
import { StoriesGame } from "./StoriesGame";
import { StoryPage } from "./StoryPage";
import { useActivity } from "@/contexts/ActivityContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFirestoreDoc } from "@/hooks/FirestoreDoc";
import { useLanguage } from "@/hooks/Language";
import { useParams } from "react-router";
import { useStory } from "./StoryContext";

interface StoryLoader {
  vocab: any;
}

const generateVocabLookup = (vocab: any) => {
  return Object.fromEntries(
    vocab
      .map((v: any) =>
        v.word
          .map((w: any) =>
            w.word.split(",").map((x: string) => [x.trim(), v.handle]),
          )
          .flat(),
      )
      .flat(),
  );
};

export const StoryLoader = ({ vocab }: StoryLoader) => {
  const { uuid } = useParams<{ uuid: string }>();
  const {
    pageBackward,
    pageNumber,
    pages,
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
  const { languageNormalized } = useLanguage();
  const history = useHistory();
  const { setGamesData, setActivityState } = useActivity();
  const { data } = useFirestoreDoc();
  useEffect(() => {
    setActivityState({
      type: "story",
      id: uuid,
    });
    setId(uuid);
    setVocab(vocab);
    setVocabLookup(generateVocabLookup(vocab));
    let payload: any[] = [];
    payload.push({
      component: (
        <TitleCard
          cover_image={data.cover_image}
          is_student_story={data.is_student_story ?? false}
          is_translanguaged={data.is_translanguaged ?? false}
          title={data.title}
        />
      ),
      id: "title card",
      languages: ["all"],
    });

    payload.push({
      component: (
        <>
          <PageWrapper>
            <KeyVocabPage
              age_min={data.age_min}
              age_max={data.age_max}
              author={data.author}
              illustrator={data.illustrator}
              narrator={data.narrator}
              words={vocab}
            />
          </PageWrapper>
          <PageCounter />
        </>
      ),
      id: "key vocab",
      languages: ["all"],
    });

    for (let [index, p] of data.pages.entries()) {
      const languages = p.text.map((subp: any) => subp.language);
      payload.push({
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
      });
    }
    for (const dnd of data["dn-d"]) {
      payload.push({
        component: (
          <>
            <PageWrapper>
              <DnDGame data={dnd} />
            </PageWrapper>
            <PageCounter />
          </>
        ),
        id: `dnd ${dnd.uuid}`,
        languages: dnd.language,
      });
    }
    for (const mcg of data["multiple-choice"]) {
      const hasAudio = mcg.choices[0].audio !== null;
      const correctChoice = mcg.choices.filter(
        (choice: any) => choice.isCorrect,
      )[0];
      const incorrectChoices = mcg.choices.filter(
        (choice: any) => !choice.isCorrect,
      );
      const mcgType = hasAudio ? "syllable" : "image";
      let mcgPayload = {
        [`multiple_${mcgType}_text`]: mcg.instructions,
        [`multiple_${mcgType}_correct_image`]: correctChoice.image,
        [`multiple_${mcgType}_correct_audio`]: correctChoice.audio,
      };
      for (let index = 0; index < 3; index++) {
        mcgPayload[`multiple_${mcgType}_incorrect_image_${index + 1}`] =
          incorrectChoices[index].image;
        mcgPayload[`multiple_${mcgType}_incorrect_audio_${index + 1}`] =
          incorrectChoices[index].audio;
      }
      payload.push({
        component: (
          <>
            <PageWrapper>
              <StoriesGame
                id={mcg.uuid}
                game={mcgPayload}
                gameType={hasAudio ? "syllable" : "image"}
              />
            </PageWrapper>
            <PageCounter />
          </>
        ),
        id: `mcg ${mcg.uuid}`,
        languages: mcg.language,
      });
    }
    payload.push({
      component: (
        <>
          <PageWrapper>
            <StoriesCongrats
              onKeepGoingClick={() => {
                history.push("/stories");
              }}
            />
          </PageWrapper>
          <PageCounter />
        </>
      ),
      id: "congrats",
      languages: ["all"],
    });
    setIsTranslanguaged(data.is_translanguaged);
    setPages(payload);
    setPageNumber(0);
    setReady(true);
  }, []);
  const noLanguageAvailable =
    ready &&
    !pages[pageNumber].languages.includes(languageNormalized) &&
    pages[pageNumber].languages.join() !== "all";

  useEffect(() => {
    if (noLanguageAvailable) {
      pageBackward();
    }
  }, [noLanguageAvailable, pageNumber]);
  if (ready === false || noLanguageAvailable) {
    return <></>;
  }

  return (
    <div style={{ marginLeft: 45, marginRight: 45, width: "100%" }}>
      {pages[pageNumber].component}
    </div>
  );
};
